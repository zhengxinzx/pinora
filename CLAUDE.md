# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pinora is a Chrome extension (Manifest V3) that replaces the new tab page with a bookmark viewer. It's a pure client-side extension with no build process, no dependencies, and no external API calls.

## Development Workflow

### Testing the Extension

1. **Load the extension**: Navigate to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and select this directory
2. **Test changes**: After modifying files, click the refresh icon on the extension card in `chrome://extensions/`
3. **View changes**: Open a new tab (Ctrl+T / Cmd+T) to see the updated extension
4. **Debug**: Open DevTools (F12) on the new tab page to see console errors

### Testing Themes

- Use DevTools (F12) → More tools → Rendering → Emulate CSS media feature "prefers-color-scheme"
- Or change your system theme settings to test light/dark modes
- The `theme-test.html` file provides a standalone test page for theme verification

### No Build Required

This is a vanilla JavaScript project with no build step. Edit files directly and reload the extension to see changes.

## Architecture

### Core Structure

**Single-page architecture**: The extension consists of three main files that work together:

1. **[newtab.html](newtab.html)**: Minimal HTML structure with search input and bookmarks container
2. **[newtab.js](newtab.js)**: Handles bookmark loading, tree parsing, display rendering, and search filtering
3. **[styles.css](styles.css)**: Theme-aware styling using CSS custom properties

### Key Implementation Details

**Bookmark Data Flow**:

- `loadBookmarks()` → fetches bookmark tree via Chrome API
- `flattenBookmarkTree()` → recursively flattens tree into array with folder paths for search
- `displayBookmarkTree()` → renders hierarchical tree structure with collapsible folders
- `renderBookmarkNode()` → recursively renders individual folders and bookmarks
- Search filters the flattened array and displays results in grouped view

**Theme System**:

- Uses CSS custom properties defined in `:root`
- Dark theme overrides via `@media (prefers-color-scheme: dark)`
- All colors reference CSS variables (e.g., `var(--bg-color)`)

**Folder Collapse State** ([newtab.js](newtab.js)):

- Folder collapse/expand state is persisted using Chrome Storage API
- State is stored in `collapsedFolders` Set and saved on each toggle
- State is restored when the extension loads

**System Folder Filtering** ([newtab.js](newtab.js)):

- Chrome system folders ("Bookmarks bar", "Other bookmarks", "Mobile bookmarks") are filtered out at root level
- Only their child bookmarks and folders are shown

**Search Behavior** ([newtab.js](newtab.js)):

- Real-time filtering on input
- Searches bookmark title, URL, and folder path
- "/" keyboard shortcut focuses search
- Search results displayed in flat grouped view instead of tree structure

### Extension Permissions

The extension requires two permissions ([manifest.json](manifest.json)):

- `bookmarks` - Access to Chrome bookmarks
- `storage` - Persist folder collapse state

It's a privacy-focused extension with zero telemetry and zero external network calls.

## Common Modifications

### Adding New Theme Colors

1. Add CSS variable to `:root` in [styles.css](styles.css)
2. Add dark mode override in `@media (prefers-color-scheme: dark)` block
3. Use the variable in your styles: `color: var(--your-variable-name)`

### Changing Bookmark Display Logic

The bookmark tree rendering logic is in `renderBookmarkNode()` in [newtab.js](newtab.js). This function:

- Recursively traverses the bookmark tree structure
- Renders folders with collapse/expand functionality
- Filters out system folders at root level
- Displays bookmarks as grid items within folders
- Handles folder nesting with proper indentation

The search results display uses `displayBookmarks()` which:

- Groups bookmarks by folder
- Filters out system folders
- Renders folder sections with bookmark lists
- Shows results in a flat grouped view

### Modifying Search Behavior

Search logic is in the `input` event listener in [newtab.js](newtab.js). It filters the `allBookmarks` array and calls `displayBookmarks()` with results.

## File Organization

```text
pinora/
├── manifest.json       # Extension config (Manifest V3)
├── newtab.html        # New tab page structure
├── newtab.js          # Bookmark logic and search
├── styles.css         # Theme-aware styling
├── icons/             # Extension icons (16, 48, 128px)
├── README.md          # User documentation
├── INSTALL.md         # Installation guide
├── SUMMARY.md         # Implementation summary
└── theme-test.html    # Standalone theme test page
```

## Code Conventions

- **No external dependencies**: Keep the extension lightweight with vanilla JS
- **Favor CSS variables**: All theme-related colors use CSS custom properties
- **Error handling**: Use try-catch for Chrome API calls and show user-friendly error messages
- **Accessibility**: Maintain keyboard navigation and semantic HTML
