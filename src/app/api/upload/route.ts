import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const submissionId = formData.get("submissionId") as string;
    const fileType = formData.get("fileType") as string; // "ein_document" or "lead_csv"

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Generate a unique file path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split(".").pop();
    const fileName = `${submissionId || "temp"}_${timestamp}_${randomId}.${fileExt}`;
    const filePath = `onboarding/${fileType}/${fileName}`;

    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("onboarding-files")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("onboarding-files")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      filePath,
      publicUrl: urlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process upload" },
      { status: 500 }
    );
  }
}