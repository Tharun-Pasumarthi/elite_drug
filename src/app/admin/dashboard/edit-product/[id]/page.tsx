'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2,
  Save,
  Eye,
  Sparkles
} from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface Product {
  id: string;
  name: string;
  composition: string;
  category: string;
  short_description: string;
  about?: string;
  price: number;
  mrp: number;
  is_prescription: boolean;
  consume_type: string;
  images: string[];
  usage?: string;
  side_effects?: string;
  precautions?: string;
  benefits?: string;
  how_it_works?: string;
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      
      const data = await response.json();
      console.log('📦 Fetched product data:', data);
      setProduct(data);
      
      // Ensure images is always an array
      const productImages = data.images;
      console.log('🖼️ Product images:', productImages);
      
      let imageArray: string[] = [];
      if (Array.isArray(productImages)) {
        imageArray = productImages.filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
      } else if (productImages && typeof productImages === 'object') {
        // If it's an object with gallery property, use that
        if (Array.isArray(productImages.gallery)) {
          imageArray = productImages.gallery.filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
        } else {
          // Otherwise try to extract array values
          imageArray = Object.values(productImages).filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
        }
      }
      
      console.log('✅ Final image array:', imageArray);
      setImages(imageArray);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    console.log('📤 Starting upload for', files.length, 'files');
    setIsUploading(true);
    
    // Compression helper function
    const compressImage = async (file: File, maxSizeMB = 9): Promise<File> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // Reduce dimensions if image is very large
            const MAX_DIMENSION = 2048;
            if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
              if (width > height) {
                height = (height / width) * MAX_DIMENSION;
                width = MAX_DIMENSION;
              } else {
                width = (width / height) * MAX_DIMENSION;
                height = MAX_DIMENSION;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, width, height);
            
            // Try different quality levels to get under size limit
            let quality = 0.9;
            const tryCompress = () => {
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    resolve(file);
                    return;
                  }
                  
                  const sizeMB = blob.size / (1024 * 1024);
                  console.log(`🔍 Compressed at quality ${quality}: ${sizeMB.toFixed(2)}MB`);
                  
                  if (sizeMB <= maxSizeMB || quality <= 0.3) {
                    const sanitizedName = file.name
                      .replace(/\s+/g, '_')
                      .replace(/[^a-zA-Z0-9._-]/g, '_');
                    const compressedFile = new File([blob], sanitizedName, { type: 'image/jpeg' });
                    console.log(`✅ Final size: ${sizeMB.toFixed(2)}MB`);
                    resolve(compressedFile);
                  } else {
                    quality -= 0.1;
                    tryCompress();
                  }
                },
                'image/jpeg',
                quality
              );
            };
            tryCompress();
          };
        };
      });
    };
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('⬆️ Processing:', file.name, `(${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
        
        // Compress image if it's over 9MB
        const processedFile = file.size > 9 * 1024 * 1024 
          ? await compressImage(file)
          : new File([file], file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '_'), { type: file.type });
        
        console.log('📤 Uploading:', processedFile.name);
        
        const formData = new FormData();
        formData.append('file', processedFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'elite_drug_products');
        formData.append('folder', 'products');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Upload failed:');
          console.error('  - Original filename:', file.name);
          console.error('  - Processed filename:', processedFile.name);
          console.error('  - Status:', response.status, response.statusText);
          console.error('  - Response:', errorText);
          
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { message: errorText };
          }
          
          throw new Error(`Upload failed for ${processedFile.name}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Uploaded:', file.name, '→', data.secure_url);
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('✅ All uploads complete:', uploadedUrls);
      setImages(prev => {
        const currentImages = Array.isArray(prev) ? prev : [];
        const newImages = [...currentImages, ...uploadedUrls];
        console.log('🖼️ Updated images state:', newImages);
        return newImages;
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Error uploading images: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeWithAI = async () => {
    if (!product) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/admin/analyze-composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          composition: product.composition,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ AI Response received:', data);
        console.log('📝 Fields filled:', {
          category: !!data.category,
          shortDescription: !!data.shortDescription,
          about: !!data.about,
          usage: !!data.usage,
          sideEffects: !!data.sideEffects,
          precautions: !!data.precautions,
          benefits: !!data.benefits,
          howItWorks: !!data.howItWorks,
        });
        setProduct(prev => prev ? {
          ...prev,
          category: data.category || prev.category,
          short_description: data.shortDescription || prev.short_description,
          about: data.about || prev.about,
          is_prescription: data.isPrescription !== undefined ? data.isPrescription : prev.is_prescription,
          consume_type: data.consumeType || prev.consume_type,
          usage: data.usage || prev.usage,
          side_effects: data.sideEffects || prev.side_effects,
          precautions: data.precautions || prev.precautions,
          benefits: data.benefits || prev.benefits,
          how_it_works: data.howItWorks || prev.how_it_works,
        } : null);
        setFormKey(prev => prev + 1); // Force form re-render
        console.log('🔄 Form re-render triggered');
        alert('✨ AI analysis complete!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('AI analysis failed:', errorData);
        alert(`AI analysis failed: ${errorData.error || 'Unknown error'}\n${errorData.details || ''}`);
      }
    } catch (error) {
      console.error('Error analyzing composition:', error);
      alert('Error analyzing composition. Please check the console for details.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    const formData = new FormData(e.currentTarget);

    setIsSaving(true);
    try {
      const payload = {
        name: formData.get('name'),
        composition: formData.get('composition'),
        category: formData.get('category'),
        short_description: formData.get('short_description'),
        about: formData.get('about') || '',
        price: parseFloat(formData.get('price') as string),
        mrp: parseFloat(formData.get('mrp') as string),
        is_prescription: formData.get('is_prescription') === 'on',
        consume_type: formData.get('consume_type'),
        images: Array.isArray(images) && images.length > 0 ? images : undefined,
        usage: formData.get('usage') || '',
        side_effects: formData.get('side_effects') || '',
        precautions: formData.get('precautions') || '',
        benefits: formData.get('benefits') || '',
        how_it_works: formData.get('how_it_works') || '',
      };
      
      console.log('📤 Updating product with payload:', payload);
      console.log('🖼️ Images being sent:', images);
      console.log('🔢 Number of images:', images.length);
      
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Update successful:', result);
        alert('✅ Product updated successfully!');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Update failed:', errorData);
        alert(`Failed to update product: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Error updating product');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF8C00]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link href="/admin/dashboard" className="text-[#FF8C00] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-sm text-gray-500">{product.name}</p>
              </div>
            </div>
            <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#FF8C00]">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View Website</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <form key={formKey} onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
              <button
                type="button"
                onClick={analyzeWithAI}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Write with AI
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Composition *</label>
                <textarea
                  name="composition"
                  defaultValue={product.composition}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={product.price}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">MRP (₹) *</label>
                <input
                  type="number"
                  name="mrp"
                  step="0.01"
                  defaultValue={product.mrp}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={product.category}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                <select
                  name="consume_type"
                  defaultValue={product.consume_type}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                >
                  <option>Tablet</option>
                  <option>Capsule</option>
                  <option>Syrup</option>
                  <option>Injection</option>
                  <option>Powder</option>
                  <option>Drops</option>
                  <option>Cream</option>
                  <option>Ointment</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                  name="short_description"
                  defaultValue={product.short_description}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">About (Detailed Description)</label>
                <textarea
                  name="about"
                  defaultValue={product.about}
                  rows={4}
                  placeholder="Detailed information about the medicine, composition, and therapeutic class..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_prescription"
                    defaultChecked={product.is_prescription}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <span className="text-sm font-semibold text-gray-700">Prescription Required (Rx)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Usage</label>
                <textarea
                  name="usage"
                  defaultValue={product.usage}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Benefits</label>
                <textarea
                  name="benefits"
                  defaultValue={product.benefits}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Side Effects</label>
                <textarea
                  name="side_effects"
                  defaultValue={product.side_effects}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Precautions</label>
                <textarea
                  name="precautions"
                  defaultValue={product.precautions}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">How It Works</label>
                <textarea
                  name="how_it_works"
                  defaultValue={product.how_it_works}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Product Images</h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#FF8C00] transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {isUploading ? 'Uploading...' : 'Click to add more images'}
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.filter(url => url && typeof url === 'string' && url.trim() !== '').map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url}
                        alt={`Product ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-32 object-contain bg-gray-50 rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
