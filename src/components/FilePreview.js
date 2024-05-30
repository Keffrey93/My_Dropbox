import React from "react";
import FileIcon from '../assets/file-icon.png'; 

const FilePreview = ({ file }) => {
  const fileUrl = URL.createObjectURL(file);
  const isImage = file.type && file.type.startsWith('image/');

  return (
    <div className="flex justify-center items-center border p-4 rounded-md shadow-md bg-gray-50">
      {isImage ? (
        <img src={fileUrl} alt="File Preview" className="max-w-full h-auto" />
      ) : (
        <div className="text-center">
          <img src={FileIcon} alt="File Icon" className="w-16 h-16 mx-auto" />
          <p className="mt-2 text-gray-600">Preview not available for this file type</p>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
