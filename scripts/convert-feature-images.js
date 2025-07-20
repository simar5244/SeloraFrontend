const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/optimized/features');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// List of feature images to convert
const featureImages = [
  'workflow-01.png',
  'workflow-02.png',
  'workflow-03.png'
];

async function convertToWebP() {
  console.log('🚀 Starting image conversion to WebP...');
  
  let convertedCount = 0;
  
  for (const image of featureImages) {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(outputDir, image.replace(/\.(png|jpg|jpeg)$/, '.webp'));
    
    // Skip if output already exists and is newer than input
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`⏭️  Skipping ${image} (already converted)`);
        continue;
      }
    }
    
    try {
      console.log(`🔄 Converting ${image}...`);
      
      await sharp(inputPath)
        .webp({
          quality: 80,
          alphaQuality: 80,
          lossless: false,
          effort: 6,
        })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size / 1024;
      const newSize = fs.statSync(outputPath).size / 1024;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ Converted ${image}: ${originalSize.toFixed(1)}KB → ${newSize.toFixed(1)}KB (${savings}% smaller)`);
      convertedCount++;
    } catch (error) {
      console.error(`❌ Error converting ${image}:`, error);
    }
  }
  
  if (convertedCount === 0) {
    console.log('✨ All feature images are already in WebP format!');
  } else {
    console.log(`✨ Successfully converted ${convertedCount} images to WebP format`);
  }
  
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the conversion
convertToWebP().catch(console.error);
