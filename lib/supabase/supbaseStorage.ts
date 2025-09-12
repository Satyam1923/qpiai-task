import { supabase } from "./server";

export async function uploadFile(
  file: File,
  folder: string = "uploads",
  retries: number = 3
): Promise<string> {
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/\s+/g, "_");
  const filePath = `${folder}/${timestamp}_${sanitizedFileName}`;

  let attempt = 0;
  while (attempt < retries) {
    try {
      const { error } = await supabase.storage.from("media").upload(filePath, file);
      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      attempt++;
      console.warn(`Upload attempt ${attempt} failed for ${file.name}:`, err);
      if (attempt === retries) {
        throw new Error(`Failed to upload ${file.name} after ${retries} attempts`);
      }
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
  throw new Error(`Unexpected error uploading ${file.name}`);
}

export interface SupabaseFile {
  name: string;
  url: string;
  size: number;
}

export async function fetchFiles(
  folder: string = "uploads"
): Promise<SupabaseFile[]> {
  let allFiles: SupabaseFile[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { data, error } = await supabase.storage.from("media").list(folder, {
      limit,
      offset,
    });

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;

    const mapped = data.map((file) => {
      const { data: publicData } = supabase.storage
        .from("media")
        .getPublicUrl(`${folder}/${file.name}`);
      return {
        name: file.name,
        url: publicData.publicUrl,
        size: file.metadata?.size || 0,
      };
    });

    allFiles = [...allFiles, ...mapped];
    if (data.length < limit) break; 
    offset += limit;
  }

  return allFiles;
}
