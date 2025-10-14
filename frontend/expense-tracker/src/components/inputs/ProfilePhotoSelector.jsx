import React, { useState, useRef, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, defaultImageUrl = null }) => {
  const inputrRef = useRef(null);
  const [previewUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    // Show existing image (e.g., from backend) on initial load or on reset
    if (!image && defaultImageUrl) {
      setPrevUrl(defaultImageUrl);
    }

    // Show preview if new file was selected
    if (image instanceof File) {
      const preview = URL.createObjectURL(image);
      setPrevUrl(preview);
    }
  }, [image, defaultImageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPrevUrl(null);
    if (inputrRef.current) {
      inputrRef.current.value = null;
    }
  };

  const onChooseFile = () => {
    if (inputrRef.current) {
      inputrRef.current.click();
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputrRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-20 h-20">
        {/* Profile image or user icon */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center">
            <LuUser className="text-4xl text-primary" />
          </div>
        )}

        {/* Upload button (bottom-right) */}
        <button
          type="button"
          onClick={onChooseFile}
          className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-sm"
          title="Upload photo"
        >
          <LuUpload className="text-[12px]" />
        </button>

        {/* Trash icon to remove image (only when image is selected) */}
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px]"
            title="Remove photo"
          >
            <LuTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
