# Pinora

A lightweight Chrome extension that replaces your new tab page with a clean, searchable bookmark viewer.

## Features

- **Clean Interface**: View all your bookmarks in a organized, hierarchical layout
- **Instant Search**: Press `/` or start typing to search through bookmarks by title, URL, or folder
- **Collapsible Folders**: Click folders to expand/collapse them; state persists across sessions
- **Theme Support**: Automatically adapts to your system's light/dark theme preference
- **Privacy-Focused**: Zero telemetry, zero external API calls, all data stays local
- **Lightweight**: No build process, no dependencies, pure vanilla JavaScript

## Installation

### From Chrome Web Store
*(Coming soon)*

### From Microsoft Edge Add-ons
*(Coming soon)*

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `pinora` directory

## Usage

- **Open**: Create a new tab (Ctrl+T / Cmd+T)
- **Search**: Press `/` to focus the search bar, or just start typing
- **Navigate**: Click on any bookmark to open it
- **Organize**: Click folder names to collapse/expand sections

## Development

This is a pure vanilla JavaScript project with no build step:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Pinora extension card
4. Open a new tab to see your changes

See [CLAUDE.md](CLAUDE.md) for detailed development guidance.

## Technical Details

- **Manifest Version**: V3
- **Permissions**: `bookmarks`, `storage`
- **Architecture**: Single-page app with vanilla JS
- **Styling**: CSS custom properties with theme support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
