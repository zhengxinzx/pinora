# Pinora

Pinora is a Chrome extension that replaces the new tab page with a beautiful, organized view of your bookmarks.

## Features

- **Bookmark Display**: Shows all your Chrome bookmarks in an organized, easy-to-browse layout
- **Search Functionality**: Quickly find bookmarks by searching titles, URLs, or folder names
- **Theme Support**: Automatically adapts to light or dark mode based on your system/browser settings
- **Clean Interface**: Minimalist design that doesn't distract from your browsing
- **Instant Navigation**: Click any bookmark to navigate to that site

## Installation

### From Source

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension will now replace your new tab page

## Usage

- **Open a new tab**: The extension will automatically display your bookmarks
- **Search bookmarks**: Type in the search box to filter bookmarks by name, URL, or folder
- **Navigate**: Click any bookmark to open it in the current tab
- **Quick search**: Press `/` to quickly focus the search box

## Theme Support

Pinora automatically detects your system's color scheme preference:
- **Light mode**: Clean white background with dark text
- **Dark mode**: Dark background with light text

The theme switches automatically based on your operating system or browser theme settings (using `prefers-color-scheme` media query).

## Development

The extension consists of:
- `manifest.json`: Extension configuration
- `newtab.html`: New tab page structure
- `newtab.js`: Bookmark loading and search functionality
- `styles.css`: Theme-aware styling
- `icons/`: Extension icons

## Privacy

Pinora runs entirely locally in your browser. It only accesses your Chrome bookmarks and does not send any data to external servers.

## License

See LICENSE file for details.
