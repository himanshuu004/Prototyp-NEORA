# Adding White Background to Favicon

To add a white background to the favicon:

## Option 1: Using ImageMagick (Recommended)
```bash
# Install ImageMagick first (if not installed)
# macOS: brew install imagemagick
# Then run:
./scripts/create-favicon.sh
```

## Option 2: Using Online Tool
1. Go to https://www.favicon-generator.org/ or similar
2. Upload `public/neora_logo.png`
3. Add white background
4. Download and save as `app/icon.png`

## Option 3: Using Image Editing Software
- Open `public/neora_logo.png` in any image editor (Photoshop, GIMP, etc.)
- Add white background layer
- Export as `app/icon.png` and save to `app/` directory

The favicon will automatically be used by Next.js when placed in the `app/icon.png` location.

