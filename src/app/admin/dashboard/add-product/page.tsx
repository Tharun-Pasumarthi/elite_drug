'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, Upload, X, Loader2, Sparkles } from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function AddProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    composition: '',
    category: '',
    short_description: '',
    about: '',
    price: '',
    mrp: '',
    is_prescription: false,
    consume_type: 'ORAL',
    manufacturer: 'Elite Drug',
    expiry_date: '',
    usage: '',
    side_effects: '',
    precautions: '',
    benefits: '',
    how_it_works: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const analyzeWithAI = async () => {
    if (!formData.name || !formData.composition) {
      alert('Please enter product name and composition first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/admin/analyze-composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          composition: formData.composition,
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
        setFormData(prev => ({
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
        }));
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
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
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
        const newImages = [...prev, ...uploadedUrls];
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please fill in required fields: Name and Price');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: formData.name,
        composition: formData.composition,
        category: formData.category,
        shortDescription: formData.short_description,
        about: formData.about,
        price: parseFloat(formData.price),
        mrp: parseFloat(formData.mrp) || parseFloat(formData.price),
        isPrescription: formData.is_prescription,
        consumeType: formData.consume_type,
        manufacturer: formData.manufacturer,
        expiryDate: formData.expiry_date,
        images: images.length > 0 ? images : undefined,
        usage: formData.usage,
        sideEffects: formData.side_effects,
        precautions: formData.precautions,
        benefits: formData.benefits,
        howItWorks: formData.how_it_works,
      };
      
      console.log('📤 Sending product data:', payload);
      console.log('🖼️ Images being sent:', images);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('✅ Product created successfully!');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        console.error('❌ Failed to create product:', errorData);
        alert(`Failed to create product:\n${errorData.details || errorData.error || 'Unknown error'}\n${errorData.hint || ''}`);
      }
    } catch (error) {
      alert('Error creating product');
    } finally {
      setIsSaving(false);
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-sm text-gray-500">Create a new product listing</p>
              </div>
            </div>
            <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#FF8C00]">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              <button
                type="button"
                onClick={analyzeWithAI}
                disabled={isAnalyzing || !formData.name || !formData.composition}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Composition <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="composition"
                  value={formData.composition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                  placeholder="e.g., Paracetamol 500mg + Caffeine 65mg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Pain & Inflammation">Pain & Inflammation</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes Care">Diabetes Care</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                  <option value="Nutritional Supplements">Nutritional Supplements</option>
                  <option value="Vitamin Supplements">Vitamin Supplements</option>
                  <option value="Neuropathy & Pain">Neuropathy & Pain</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consume Type</label>
                <select
                  name="consume_type"
                  value={formData.consume_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                >
                  <option value="ORAL">Oral</option>
                  <option value="INJECTION">Injection</option>
                  <option value="TOPICAL">Topical</option>
                  <option value="INHALATION">Inhalation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  placeholder="DD-MM-YYYY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">About (Detailed Description)</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Detailed information about the medicine, composition, and therapeutic class..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_prescription"
                  checked={formData.is_prescription}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#FF8C00] focus:ring-[#FF8C00] border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">Prescription Required</label>
              </div>
            </div>
          </div>

          {/* Detailed Information Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage</label>
                <textarea
                  name="usage"
                  value={formData.usage}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects</label>
                <textarea
                  name="side_effects"
                  value={formData.side_effects}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precautions</label>
                <textarea
                  name="precautions"
                  value={formData.precautions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How It Works</label>
                <textarea
                  name="how_it_works"
                  value={formData.how_it_works}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Product Images Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600">Click to add more images</p>
                {isUploading && (
                  <p className="text-sm text-[#FF8C00]">Uploading...</p>
                )}
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
                        Primary
                      </span>
                    )}
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-[#FF8C00] text-white rounded-lg hover:bg-[#E67E00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
