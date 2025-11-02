# Pinora

A minimalist Chrome extension that replaces the new tab page with a beautiful, organized tree view of your bookmarks. Inspired by Notion's clean design philosophy.

## Features

- **Tree View Display**: Shows bookmarks in a hierarchical folder structure that mirrors your actual Chrome bookmark organization
- **Collapsible Folders**: Click folders to expand/collapse them, with state persisted across sessions
- **Real-time Search**: Quickly find bookmarks by searching titles, URLs, or folder names
- **Instant Search**: Start typing any letter or number (a-z, A-Z, 0-9) anywhere on the page to automatically search bookmarks
- **Notion-Inspired Design**: Clean, minimalist interface with subtle colors and refined typography
- **Theme Support**: Automatically adapts to light or dark mode based on your system/browser settings
- **Grid Layout**: Bookmarks spread horizontally in an efficient grid while folders take full rows
- **Keyboard Shortcuts**: Press `/` to quickly focus the search box
- **Zero Dependencies**: Lightweight vanilla JavaScript with no external libraries
- **Privacy-First**: Runs entirely locally - no data collection or external API calls

## Screenshots

### Light Mode

Clean, minimal design with Notion-inspired warm grays and subtle borders.

### Dark Mode

Refined dark theme that's easy on the eyes during nighttime browsing.

## Installation

### From Source

1. Clone or download this repository

   ```bash
   git clone https://github.com/zhengxinzx/pinora.git
   cd pinora
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" using the toggle in the top-right corner

4. Click "Load unpacked" and select the `pinora` directory

5. Open a new tab to see Pinora in action!

## Usage

- **Browse bookmarks**: Bookmarks are displayed in a tree structure matching your Chrome folders
- **Expand/collapse folders**: Click on any folder to toggle its contents
- **Search**: Type in the search box to filter bookmarks by name, URL, or folder
- **Instant search**: Start typing any alphanumeric character (a-z, A-Z, 0-9) anywhere on the page to automatically begin searching
- **Quick search**: Press `/` to instantly focus the search box
- **Navigate**: Click any bookmark to open it in the current tab

## Development

### Project Structure

```text
pinora/
├── manifest.json          # Extension configuration (Manifest V3)
├── newtab.html           # New tab page structure
├── newtab.js             # Core functionality and bookmark management
├── styles.css            # Theme-aware styling with CSS variables
├── icons/                # Extension icons
├── CLAUDE.md             # Developer documentation
└── README.md             # This file
```

### Key Technologies

- **Manifest V3**: Latest Chrome extension format
- **Chrome Bookmarks API**: Access to user's bookmarks
- **Chrome Storage API**: Persistent folder collapse state
- **CSS Custom Properties**: Dynamic theme variables
- **CSS Media Queries**: System theme detection
- **Vanilla JavaScript**: No build process or dependencies required

### Making Changes

1. Edit the source files directly
2. Go to `chrome://extensions/` and click the refresh icon on Pinora
3. Open a new tab to see your changes

### Theme Customization

The extension uses CSS custom properties for easy theme customization. Edit `styles.css` to modify colors:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #37352f;
  --link-color: #2383e2;
  /* ... more variables */
}
```

## Browser Compatibility

- ✅ Google Chrome
- ✅ Microsoft Edge (Chromium-based)
- ✅ Brave Browser
- ✅ Any Chromium-based browser with Manifest V3 support

## Privacy

Pinora is built with privacy as a priority:

- ✅ 100% local operation
- ✅ No data collection or analytics
- ✅ No external API calls or network requests
- ✅ Only accesses Chrome's bookmarks and storage APIs
- ✅ Open source - audit the code yourself

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Created by [zhengxin](https://github.com/zhengxinzx)

## Acknowledgments

- Design inspired by [Notion](https://notion.so)'s minimalist aesthetic
- Built with modern web standards and best practices
