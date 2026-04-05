import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import mime from "mime-types";
import { createClient } from "@supabase/supabase-js";

dotenv.config({path: ".env.local"});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_ROLE_KEY) {
    throw new Error("Missing keys!")
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);


const MEMES_ROOT = path.join(process.cwd(), "public", "img");
const BUCKET_NAME = "memes";

type MemeInsert = {
    image: string;
    category: string;
    tags: string[];
};

function cleanBaseName(fileName: string) {
  return fileName.replace(path.extname(fileName), "");
};

function isImageFile(fileName: string) {
  return /\.(png|jpg|jpeg|webp|gif)$/i.test(fileName);
};

async function uploadFile(filePath: string, category: string, fileName: string){
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.lookup(fileName) || "application/octet-stream";

    const ext = path.extname(fileName).toLowerCase();
    const baseName = cleanBaseName(fileName);

    const storagePath = `${category}/${baseName}${ext}`;

    const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType: contentType.toString(),
      upsert: false,
    });

    if (uploadError) {
    const message = uploadError.message.toLowerCase();
    if (!message.includes("duplicate") && !message.includes("already exists")) {
      throw uploadError;
    }
  }; 

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

    return {
        publicUrl: data.publicUrl,
        storagePath,
    };
}

async function memeAlreadyExists(imageUrl: string) {
  const { data, error } = await supabase
    .from("memes")
    .select("id")
    .eq("image", imageUrl)
    .maybeSingle();

  if (error) throw error;

  return !!data;
};

async function insertMeme(meme: MemeInsert) {
  const { error } = await supabase.from("memes").insert(meme);

  if (error) {
    throw error;
  }
}

async function importMemes() {
  if (!fs.existsSync(MEMES_ROOT)) {
    throw new Error(`Memes folder not found: ${MEMES_ROOT}`);
  }

  const categories = fs
    .readdirSync(MEMES_ROOT)
    .filter((entry) => fs.statSync(path.join(MEMES_ROOT, entry)).isDirectory());

  console.log(`\n📂 Found categories: ${categories.join(", ")}\n`);

  let importedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const category of categories) {
    const categoryPath = path.join(MEMES_ROOT, category);

    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => isImageFile(file));

    console.log(`\n➡️  Processing category: ${category} (${files.length} files)`);

    for (const fileName of files) {
      const filePath = path.join(categoryPath, fileName);

      try {
        const { publicUrl } = await uploadFile(filePath, category, fileName);

        const exists = await memeAlreadyExists(publicUrl);

        if (exists) {
          console.log(`⏭️  Skipped (already in DB): ${fileName}`);
          skippedCount++;
          continue;
        }

        const meme: MemeInsert = {
          image: publicUrl,
          category,
          tags: [category]
        };

        await insertMeme(meme);

        console.log(`✅ Imported: ${fileName}`);
        importedCount++;
      } catch (error) {
        console.error(`❌ Failed: ${fileName}`);
        console.error(error);
        failedCount++;
      }
    }
  }
  console.log("\n==============================");
  console.log("🎉 Import finished");
  console.log(`✅ Imported: ${importedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log("==============================\n");
};

importMemes().catch((error) => {
  console.error("🔥 Fatal import error:");
  console.error(error);
  process.exit(1);
});