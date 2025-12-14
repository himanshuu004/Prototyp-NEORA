#!/bin/bash
# Script to create favicon with white background

if command -v convert &> /dev/null; then
    convert public/neora_logo.png -background white -alpha remove -alpha off app/icon.png
    echo "✅ Favicon created with white background using ImageMagick"
elif command -v magick &> /dev/null; then
    magick public/neora_logo.png -background white -alpha remove -alpha off app/icon.png
    echo "✅ Favicon created with white background using ImageMagick"
else
    echo "ImageMagick not found. Please install it or manually add white background to icon.png"
    echo "You can use an online tool like: https://www.favicon-generator.org/"
fi

