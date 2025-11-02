# Pinora Installation Guide

## Installing the Extension

### Step 1: Download or Clone the Repository

```bash
git clone https://github.com/zhengxinzx/pinora.git
cd pinora
```

Or download the ZIP file from GitHub and extract it.

### Step 2: Load the Extension in Chrome

1. Open Google Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** by clicking the toggle switch in the top-right corner
4. Click the **Load unpacked** button
5. Select the `pinora` directory (the folder containing `manifest.json`)

### Step 3: Verify Installation

1. Open a new tab (Ctrl+T or Cmd+T)
2. You should now see Pinora displaying your bookmarks!
3. The theme will automatically match your system's light/dark mode preference

## Features

### Bookmark Display
All your Chrome bookmarks are displayed in an organized grid layout, grouped by folders.

### Search Functionality
- Type in the search box to filter bookmarks
- Search works across bookmark titles, URLs, and folder names
- Press `/` to quickly focus the search box

### Theme Support
The extension automatically adapts to your system theme:
- **Light Mode**: White background with dark text
- **Dark Mode**: Dark background with light text

To test theme switching:
- **macOS**: System Preferences → General → Appearance
- **Windows**: Settings → Personalization → Colors
- **Linux**: Change your system theme
- **Browser DevTools**: F12 → More tools → Rendering → Emulate CSS media feature "prefers-color-scheme"

## Troubleshooting

### Extension not loading
- Ensure all files are present: `manifest.json`, `newtab.html`, `newtab.js`, `styles.css`
- Check for errors in `chrome://extensions/` - click "Errors" if shown
- Try reloading the extension by clicking the refresh icon

### Bookmarks not showing
- Ensure the extension has "bookmarks" permission (should be granted automatically)
- Check the browser console (F12) for any error messages
- Try reloading the new tab page

### Theme not switching
- Check your system theme settings
- Try using Chrome DevTools to manually emulate the color scheme
- Ensure your browser supports `prefers-color-scheme` media query

## Uninstalling

To remove the extension:
1. Go to `chrome://extensions/`
2. Find "Pinora" in the list
3. Click **Remove**

## Privacy

Pinora operates entirely locally within your browser. It only accesses your Chrome bookmarks API and does not transmit any data to external servers.
