# 📁 File Upload System – Frontend Assignment

A responsive file upload interface built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **ShadCN/UI**, featuring drag-and-drop uploads, file previews, validation, and real-time progress tracking.  
Files are securely uploaded to **Supabase Storage** with validation and error handling.

---

## 🚀 Features

### ✅ Core Upload Features
- Drag-and-drop or manual file/folder selection  
- Supports multiple file types: `.jpg`, `.jpeg`, `.png`, `.json`, `.csv`  
- Validation:
  - File type checking
  - File size limit (10MB/file)  
- Real-time previews:
  - Image thumbnails (`jpg/png/jpeg`)
  - File name & icons for CSV/JSON
- File management:
  - Add more files  
  - Replace files  
  - Delete files  
- Upload progress:
  - Individual progress bars with percentage  
  - Smooth, non-blocking UI updates
- Error handling:
  - Invalid file type  
  - Oversized file  
  - Upload failure (with retry option)

### 🧼 File Sanitization & Security
- File name sanitization before upload  
- Mock scanning for:
  - Oversized/corrupt files  
  - Malicious patterns  

### ☁️ Storage
- **Supabase Storage** integration for file uploads  
- Local filesystem support for development/testing  

### 🎨 UI
- Matches provided **Figma design** for desktop/laptop  
- On mobile devices: Shows a message →  
  `"Please switch to a laptop for the best experience."`  

### 🌟 Bonus
- Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **ShadCN/UI**  
- Live demo ready for **Vercel/Netlify** deployment  
- (Optional) Support for resumable/chunked uploads  

---

## 🛠️ Tech Stack

- [Next.js (App Router)](https://nextjs.org/docs/app) – React framework  
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [ShadCN/UI](https://ui.shadcn.com/) – Prebuilt UI components  
- [Supabase](https://supabase.com/) – Authentication & Storage  

---

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
├── lib/                  # Utilities
├── public/               # Static assets
├── styles/               # Global styles
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/file-upload-system.git
cd file-upload-system
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Supabase
- Create a Supabase project → [https://supabase.com](https://supabase.com)  
- Get your **Project URL** and **Anon/Public Key** from project settings  
- Create a **Storage bucket** (e.g., `uploads`)  

Add environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_BUCKET=uploads
```

### 4. Run Development Server
```bash
npm run dev
```
Visit → `http://localhost:3000`

---

## 🎯 Usage
1. Drag and drop files or click **“Upload Files”** button  
2. Preview files with thumbnails/names before upload  
3. Replace or delete unwanted files  
4. Start upload and track progress  
5. On success → Files are stored in **Supabase Storage bucket**  

---

## 🧪 Testing
- Try uploading an oversized file (>10MB) → Error message appears  
- Try uploading invalid file types → Error message appears  
- Try disconnecting internet mid-upload → Retry option shown  

---

## 📦 Deployment
- Deploy easily with **Vercel** or **Netlify**  
- Ensure `.env` variables are set in hosting provider  

---

## 📝 Evaluation Checklist

- [x] Modular, typed codebase (TypeScript)  
- [x] Upload validation + preview + progress  
- [x] UI matches Figma (desktop)  
- [x] Mobile fallback message  
- [x] Error handling with clear messages  
- [x] Non-blocking upload flow  
- [x] Supabase integration  

---
