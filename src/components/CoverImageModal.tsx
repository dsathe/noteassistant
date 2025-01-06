'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UploadDropzone } from "@/utils/uploadthing";

export const COVER_IMAGE_PRESETS = [
  "https://fastly.picsum.photos/id/523/1200/400.jpg?hmac=-uO_rujkmOoX0oi38MOdF6RLQWEPGxGrZaIumMbFrUQ",
  "https://fastly.picsum.photos/id/458/1200/400.jpg?hmac=O5OJuVnbvex6Fe-uil2QAjpwL3I5L5SiTht43-_MmVM",
  "https://fastly.picsum.photos/id/936/1200/400.jpg?hmac=X5VY92jIt1AII_R9Ejazlb7WSzoIWTtl9b_1RGIwuw8",
]

interface ImageGenerationResponse {
  image: string;
  success: boolean;
  error?: string;
}

type Props = {
  onClose: () => void;
  onImageSelect: (image: string) => void;
}

const CoverImageModal = ({ onClose, onImageSelect }: Props) => {
  const [uploadMethod, setUploadMethod] = useState<'preset' | 'url' | 'file' | 'ai'>('preset');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePresetImageSelect = (image: string) => {
    onImageSelect(image);
    onClose();
  };

  const handleUrlImageSelect = () => {
    if (!imageUrl) {
      alert('Please enter an image URL');
      return
    }
    onImageSelect(imageUrl);
    onClose();
  }

  const handleAIImageGeneration = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/imageGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageDescription: imageUrl,
        }),
      });
      const data: ImageGenerationResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      onImageSelect(data.image);
      setImageUrl('');
      onClose();
    }
    catch (error) {
      console.error(error);
      setError('Failed to get reply. Please try again.');
    }
    finally {
      setLoading(false);
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the modal only if the click is on the background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4' onClick={handleOverlayClick}>
      <div className="bg-white round-xl p-6 w-full max-w-2xl h-full max-h-[45vh] overflow-y-auto rounded-xl">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Select New Cover Image</h2>
            <button onClick={onClose} className='text-gray-500 hover:text-gray-800'>
              <X size={24} />
            </button>
          </div>
          <div className="flex justify-center items-center space-x-4 mb-4 border-b border-gray-300">
            <button
              onClick={() => setUploadMethod('preset')}
              className={`px-6 py-2 rounded-t-md ${uploadMethod === 'preset'
                ? 'bg-green-500 text-white border-b-2 border-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Presets
            </button>
            <button
              onClick={() => setUploadMethod('url')}
              className={`px-6 py-2 rounded-t-md ${uploadMethod === 'url'
                ? 'bg-green-500 text-white border-b-2 border-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              URL
            </button>
            <button
              onClick={() => setUploadMethod('file')}
              className={`px-6 py-2 rounded-t-md ${uploadMethod === 'file'
                ? 'bg-green-500 text-white border-b-2 border-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              File
            </button>
            <button
              onClick={() => setUploadMethod('ai')}
              className={`px-6 py-2 rounded-t-md ${uploadMethod === 'ai'
                ? 'bg-green-500 text-white border-b-2 border-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              AI
            </button>
          </div>
        </div>

        {uploadMethod === 'preset' && (
          <div className="grid grid-cols-3 gap-4">
            {COVER_IMAGE_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetImageSelect(preset)}
                className="aspect-video overflow-hidden rounded-lg hover:opacity-80 transition"
              >
                <img
                  src={preset}
                  alt="Preset Cover"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {uploadMethod === 'url' && (
          <div className="flex flex-col space-y-4 justify-center items-start">

            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Enter the Image URL below:
            </label>
            <div className="flex flex-row space-x-2 w-full">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL"
                className="flex-grow border rounded-lg px-3 py-2"
              />
              <button
                onClick={handleUrlImageSelect}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Upload
              </button>
            </div>
            <p className="text-sm">
              Please ensure the image is in 1200x400 format
            </p>
          </div>

        )}

        {uploadMethod === 'file' && (
          <div>
            <UploadDropzone
              endpoint="imageUploader"
              className='ut-button:bg-green-500 ut-button:ut-readying:bg-green-500/50 cursor-pointer'
              onClientUploadComplete={async (res) => {
                const imageUrl = res[0].appUrl;
                onImageSelect(imageUrl);
                onClose();
              }}
              onUploadError={(error: Error) => {
                alert('Error uploading image. Please try again.');
              }}
            />
            <p className="text-sm mt-2">
              Please ensure the image is in 1200x400 format
            </p>
          </div>
        )}

        {uploadMethod === 'ai' && (
          <div className="flex flex-col space-y-4 justify-center items-start">

            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Enter a brief description of the image that you want to generate:
            </label>
            <div className="flex flex-row space-x-2 w-full">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter a brief description for a 1200x400 image"
                className="flex-grow border rounded-lg px-3 py-2"
                disabled={loading}
              />
              <button
                onClick={handleAIImageGeneration}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                disabled={loading}
              >
                Upload
              </button>
            </div>
            {loading && <p>Generating image. Please wait a moment. This may take a few minutes...</p>}
            {!loading && error && <p>An error occurred. Please try again later.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoverImageModal