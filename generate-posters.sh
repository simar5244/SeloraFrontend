#!/bin/bash

# Script to generate poster images from videos
# Run this script if you don't have poster images yet

VIDEO_DIR="public/optimized"
POSTER_DIR="public/optimized"

# Create poster directory if it doesn't exist
mkdir -p "$POSTER_DIR"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg is not installed. Please install ffmpeg to generate poster images."
    echo "On macOS: brew install ffmpeg"
    echo "On Ubuntu: sudo apt install ffmpeg"
    exit 1
fi

# Video files that need poster images
VIDEOS=(
    "giferp.webm"
    "giffeedback.webm"
    "GIFORGAI.webm"
    "gifusermanagement.webm"
    "gifreport.webm"
    "gifprojects.webm"
    "gif1.webm"
    "gif2.webm"
    "gif3.webm"
    "admin1.webm"
    "employee1.webm"
    "adminapproval.webm"
)

echo "Generating poster images..."

for video in "${VIDEOS[@]}"; do
    video_path="$VIDEO_DIR/$video"
    base_name="${video%.*}"
    poster_path="$POSTER_DIR/${base_name}-poster.webp"
    
    if [ -f "$video_path" ]; then
        if [ ! -f "$poster_path" ]; then
            echo "Generating poster for $video..."
            # Extract first frame as poster image in WebP format
            ffmpeg -i "$video_path" -ss 00:00:00.000 -vframes 1 -q:v 1 -c:v libwebp -lossless 0 -compression_level 6 -q:v 70 "$poster_path" -y 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "✓ Created $poster_path"
            else
                echo "✗ Failed to create poster for $video"
            fi
        else
            echo "✓ Poster already exists for $video"
        fi
    else
        echo "⚠ Video file not found: $video_path"
    fi
done

echo "Poster generation complete!"
echo ""
echo "Generated posters can be found in: $POSTER_DIR"
echo "If any videos were missing, make sure they exist in: $VIDEO_DIR"