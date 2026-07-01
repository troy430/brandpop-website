/**
 * Utility for uploading files to Supabase Storage
 */

export async function uploadFile(
  file: File,
  fileType: "ein_document" | "lead_csv",
  submissionId?: string
): Promise<{ path: string; url: string; fileName: string }> {
  const formData = new FormData();
  formData.append("file", file);
  if (submissionId) {
    formData.append("submissionId", submissionId);
  }
  formData.append("fileType", fileType);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Upload failed");
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Upload failed");
  }

  return {
    path: result.filePath,
    url: result.publicUrl,
    fileName: result.fileName,
  };
}