'use client';

import Link from "next/link";
import { useState, useRef } from "react";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);

    // Simulate upload animation
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);

      // Reset after showing success
      setTimeout(() => {
        setUploadComplete(false);
      }, 3000);
    }, 2000);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1e3a5f]">
      {/* Navigation */}
      <nav className="border-b border-[#00d4ff]/20 bg-[#0a1628]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white font-[family-name:var(--font-jetbrains-mono)]">
                agenti
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/agents" className="text-gray-300 hover:text-[#00d4ff] transition">
                Browse Agents
              </Link>
              <Link href="/upload" className="text-white font-semibold transition">
                Upload
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-[#00d4ff] transition">
                Pricing
              </Link>
              <Link href="/signin" className="text-gray-300 hover:text-[#00d4ff] transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Upload Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-jetbrains-mono)]">
            Upload Your Agent
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Deploy your AI agent to the cloud and make it accessible to thousands of developers.
          </p>
        </div>

        {/* Drag and Drop Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-[#00d4ff] bg-[#00d4ff]/10 scale-105'
              : uploadComplete
              ? 'border-green-500 bg-green-500/10'
              : 'border-[#00d4ff]/30 bg-white/5 hover:border-[#00d4ff]/50 hover:bg-white/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".py,.js,.ts,.zip"
          />

          {/* Upload Icon/Animation */}
          <div className="flex flex-col items-center justify-center">
            {isUploading ? (
              // Uploading Animation
              <div className="mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-[#00d4ff]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#00d4ff] rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : uploadComplete ? (
              // Success Animation
              <div className="mb-6 animate-[fadeInUp_0.5s_ease-out]">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            ) : isDragging ? (
              // Dragging State
              <div className="mb-6 animate-bounce">
                <svg className="w-24 h-24 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
            ) : (
              // Default State
              <div className="mb-6 transition-transform group-hover:scale-110">
                <svg className="w-24 h-24 text-[#00d4ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            )}

            {/* Text */}
            <div className="text-center">
              {isUploading ? (
                <div>
                  <p className="text-2xl font-semibold text-white mb-2">Uploading...</p>
                  <p className="text-gray-400">Processing your agent</p>
                </div>
              ) : uploadComplete ? (
                <div>
                  <p className="text-2xl font-semibold text-green-500 mb-2">Upload Complete!</p>
                  <p className="text-gray-400">Your agent has been received</p>
                </div>
              ) : isDragging ? (
                <div>
                  <p className="text-2xl font-semibold text-[#00d4ff] mb-2">Drop it here!</p>
                  <p className="text-gray-400">Release to upload your agent</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-white mb-2">
                    Drag & drop your agent here
                  </p>
                  <p className="text-gray-400 mb-4">or click to browse files</p>
                  <p className="text-sm text-gray-500">
                    Supports: .py, .js, .ts, .zip files
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Instructions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#3b82f6] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#3b82f6]/50">
              <span className="text-white font-bold text-xl font-[family-name:var(--font-jetbrains-mono)]">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Prepare Your Agent
            </h3>
            <p className="text-gray-400 text-sm">
              Package your agent code with dependencies and configuration files.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#60a5fa] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#60a5fa]/50">
              <span className="text-white font-bold text-xl font-[family-name:var(--font-jetbrains-mono)]">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Upload & Configure
            </h3>
            <p className="text-gray-400 text-sm">
              Drop your file here and configure deployment settings.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#00d4ff] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#00d4ff]/50">
              <span className="text-white font-bold text-xl font-[family-name:var(--font-jetbrains-mono)]">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Deploy & Share
            </h3>
            <p className="text-gray-400 text-sm">
              Your agent goes live and becomes accessible to the community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
