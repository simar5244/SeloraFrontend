const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// List of important images to convert
const importantImages = [
  'images/hero-image-01.jpg',
  'images/features.png',
  'images/backgroundimage.png',
  'logo1.png',
  'Galaxy.png',
  'OrgChart.png',
  'OrgChartSS.png',
  'Succession.png'
];

// Convert a single image to WebP
async function convertImage(inputPath, outputPath) {
  try {
    const stats = await sharp(inputPath).metadata();
    
    // Skip if already converted and up-to-date
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`⏭️  Skipping ${path.basename(inputPath)} (already converted)`);
        return false;
      }
    }
    
    console.log(`🔄 Converting ${path.basename(inputPath)}...`);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Convert to WebP with optimized settings
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
    
    console.log(`✅ Converted ${path.basename(inputPath)}: ${originalSize.toFixed(1)}KB → ${newSize.toFixed(1)}KB (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

// Convert all images
async function convertAllImages() {
  console.log('🚀 Starting image conversion to WebP...');
  let convertedCount = 0;
  
  for (const image of importantImages) {
    const inputPath = path.join(inputDir, image);
    const outputPath = path.join(outputDir, image).replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    if (fs.existsSync(inputPath)) {
      const success = await convertImage(inputPath, outputPath);
      if (success) convertedCount++;
    } else {
      console.log(`⚠️  File not found: ${image}`);
    }
  }
  
  if (convertedCount === 0) {
    console.log('✨ All important images are already in WebP format!');
  } else {
    console.log(`✨ Successfully converted ${convertedCount} images to WebP format`);
  }
  
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the conversion
convertAllImages().catch(console.error);
