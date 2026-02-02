/**
 * Cloudinary Upload Utility
 * Free Tier: 25GB storage, 25GB bandwidth/month
 * Sign up: https://cloudinary.com/users/register_free
 */

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  console.log('🔍 Cloudinary Config:', { cloudName, uploadPreset });

  if (!cloudName || !uploadPreset) {
    console.error('❌ Cloudinary credentials missing!');
    throw new Error('Cloudinary credentials not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local');
  }

  console.log('📤 Uploading to Cloudinary...');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'elite-drug-products'); // Organize images in a folder

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Cloudinary API error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    console.log('✅ Upload successful:', data.secure_url);
    return data.secure_url; // Return the permanent URL
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw error;
  }
}

export async function uploadMultipleToCloudinary(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadToCloudinary(file));
  return Promise.all(uploadPromises);
}
