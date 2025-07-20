#!/bin/bash

# Create optimized directory if it doesn't exist
mkdir -p public/optimized

# Process each MOV file
for file in public/*.mov; do
  if [ -f "$file" ]; then
    # Get the base filename without extension
    base_name=$(basename "$file" .mov)
    output_file="public/optimized/${base_name}.webm"
    
    echo "Optimizing $file..."
    
    # Convert to WebM with VP9 codec (best compression for web)
    ffmpeg -i "$file" \
      -c:v libvpx-vp9 \
      -crf 30 \
      -b:v 0 \
      -b:a 128k \
      -c:a libopus \
      -f webm \
      -pass 1 \
      -an \
      -f null \
      /dev/null && \
    
    ffmpeg -i "$file" \
      -c:v libvpx-vp9 \
      -crf 30 \
      -b:v 0 \
      -b:a 128k \
      -c:a libopus \
      -f webm \
      -pass 2 \
      "$output_file"
    
    # Create a WebP poster image (first frame)
    ffmpeg -i "$file" -ss 00:00:00.000 -vframes 1 -c:v libwebp -lossless 0 -compression_level 6 -q:v 70 "public/optimized/${base_name}-poster.webp"
    
    echo "Optimized version saved to $output_file"
    echo "Original size: $(du -h "$file" | cut -f1)"
    echo "Optimized size: $(du -h "$output_file" | cut -f1)"
    echo ""
  fi
done

echo "All videos have been optimized!"

# Generate HTML examples for using the optimized videos
echo ""
echo "HTML usage example:"
echo "------------------"
for file in public/optimized/*.webm; do
  if [ -f "$file" ]; then
    base_name=$(basename "$file" .webm)
    echo "<!-- ${base_name} -->"
    echo "<video width=\"800\" height=\"450\" controls poster=\"optimized/${base_name}-poster.webp\" preload=\"none\">"
    echo "  <source src=\"optimized/${base_name}.webm\" type=\"video/webm\">"
    echo "  Your browser does not support the video tag."
    echo "</video>"
    echo ""
  fi
done
