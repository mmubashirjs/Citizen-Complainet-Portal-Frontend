import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import './FileUpload.css';

export const FileUpload = ({ label = "Optional Photo", onFileSelect, value }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPreview(result);
        if (onFileSelect) onFileSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (onFileSelect) onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload-container">
      {label && <label className="form-label">{label}</label>}

      {preview ? (
        <div className="file-upload-preview-card">
          <img src={preview} alt="Upload preview" className="file-upload-img" />
          <button
            type="button"
            className="file-upload-remove-btn"
            onClick={handleRemove}
            title="Remove photo"
          >
            <X size={16} /> Remove
          </button>
        </div>
      ) : (
        <div
          className={`file-upload-dropzone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="file-upload-input"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="file-upload-icon-circle">
            <UploadCloud size={24} />
          </div>
          <span className="file-upload-title">Upload a photo</span>
          <span className="file-upload-hint">PNG, JPG up to 5MB</span>
        </div>
      )}
    </div>
  );
};
