"use client";

import { useState, useRef } from 'react';
import { User } from 'lucide-react';

export default function EditProfilePicture() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to trigger the file input when the div is clicked
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file selection and create a preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div
      className="w-[200px] h-[200px] bg-white border border-gray-200 rounded-md shadow-sm transition-opacity duration-300 ease-in-out flex items-center justify-center"
      style={{ opacity: isHovered ? 0.7 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDivClick}  // Trigger file input on click
    >
      {/* Show the selected image or the User icon if no image is selected */}
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Profile"
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        isHovered && <User className="text-gray-600" size={48} aria-hidden="true" />
      )}

      {/* Invisible file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}  // Hide the input
        onChange={handleFileChange}
      />
    </div>
  );
}
