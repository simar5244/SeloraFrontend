const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const POSTERS_DIR = path.join(__dirname, '../public/optimized');
const QUALITY = 80; // Quality for WebP (1-100)

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
    const newSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    
    console.log(`✅ Converted ${path.basename(inputPath)} (${originalSize}KB → ${newSize}KB)`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error);
    return false;
  }
}

async function optimizePosters() {
  try {
    console.log('🎨 Starting poster optimization...');
    
    // Read all files in the optimized directory
    const files = fs.readdirSync(POSTERS_DIR);
    const imageFiles = files.filter(file => 
      /(\.(jpg|jpeg|png))$/i.test(file) && 
      !file.includes('-poster.webp') &&
      file.includes('-poster.')
    );

    if (imageFiles.length === 0) {
      console.log('ℹ️  No poster images found to optimize');
      return;
    }

    console.log(`🖼️  Found ${imageFiles.length} poster(s) to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(POSTERS_DIR, file);
      const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Skip if WebP version already exists and is newer
      if (fs.existsSync(outputPath)) {
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        
        if (outputStats.mtimeMs > inputStats.mtimeMs) {
          console.log(`⏭️  Skipping ${file} (already has a newer WebP version)`);
          continue;
        }
      }
      
      await convertToWebP(inputPath, outputPath);
    }
    
    console.log('✨ All posters optimized successfully!');
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizePosters();
