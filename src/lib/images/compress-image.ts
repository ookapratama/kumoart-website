import imageCompression from "browser-image-compression";

export async function compressImageToWebp(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
    onProgress,
  });
}
