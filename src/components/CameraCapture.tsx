"use client";

import { useRef, useState, useCallback } from "react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  disabled?: boolean;
}

export default function CameraCapture({
  onCapture,
  disabled,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      setError(
        "Could not access camera. Please allow camera permissions or upload a photo instead."
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  }, []);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setPreview(dataUrl);
    stopCamera();
  }, [stopCamera]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const submitImage = useCallback(() => {
    if (preview) {
      onCapture(preview);
    }
  }, [preview, onCapture]);

  const retake = useCallback(() => {
    setPreview(null);
    setError(null);
  }, []);

  // Preview state — show captured/uploaded image
  if (preview) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-xl overflow-hidden border-2 border-[var(--color-primary)] shadow-lg">
          <img
            src={preview}
            alt="Captured trailer"
            className="w-full max-h-[500px] object-contain bg-black"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={retake}
            disabled={disabled}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-[var(--color-text-muted)] hover:border-gray-400 transition-colors disabled:opacity-50"
          >
            Retake
          </button>
          <button
            onClick={submitImage}
            disabled={disabled}
            className="flex-1 py-3 px-4 bg-[var(--color-success)] text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {disabled ? "Analyzing..." : "Analyze for Damage"}
          </button>
        </div>
      </div>
    );
  }

  // Camera streaming state
  if (streaming) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-[500px] object-contain"
          />
          {/* Viewfinder overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-8 border-2 border-white/30 rounded-lg" />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
              Position trailer in frame
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={stopCamera}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-[var(--color-text-muted)] hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={captureFrame}
            className="flex-1 py-3 px-4 bg-[var(--color-danger)] text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Capture Photo
          </button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  // Default state — choose capture method
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={startCamera}
          className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--color-primary)] hover:bg-blue-50/50 transition-colors"
        >
          <span className="text-4xl">📷</span>
          <span className="font-semibold">Use Camera</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            Take a live photo of the trailer
          </span>
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--color-primary)] hover:bg-blue-50/50 transition-colors"
        >
          <span className="text-4xl">📁</span>
          <span className="font-semibold">Upload Photo</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            Select an existing photo from your device
          </span>
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
