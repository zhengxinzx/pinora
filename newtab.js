/**
 * Pinora - Chrome New Tab Bookmark Manager
 *
 * A minimalist bookmark viewer that displays bookmarks in a tree structure
 * with collapsible folders and persistent state management.
 */

// System folder names to skip when displaying
const SYSTEM_FOLDERS = ["Bookmarks bar", "Other bookmarks", "Mobile bookmarks"];

// Store bookmarks in tree structure and flat list for searching
let bookmarkTree = null;
let allBookmarks = [];
let collapsedFolders = new Set();

// Initialize the extension
document.addEventListener("DOMContentLoaded", async function () {
  await loadCollapsedState();
  await loadBookmarks();
  setupSearch();
});

/**
 * Load collapsed folder state from chrome.storage.local
 * Restores which folders were collapsed in previous sessions
 */
async function loadCollapsedState() {
  try {
    const result = await chrome.storage.local.get(["collapsedFolders"]);
    if (result.collapsedFolders) {
      collapsedFolders = new Set(result.collapsedFolders);
    }
  } catch (error) {
    console.error("Error loading collapsed state:", error);
  }
}

/**
 * Save collapsed folder state to chrome.storage.local
 * Persists folder collapse state across browser sessions
 */
async function saveCollapsedState() {
  try {
    await chrome.storage.local.set({
      collapsedFolders: Array.from(collapsedFolders),
    });
  } catch (error) {
    console.error("Error saving collapsed state:", error);
  }
}

/**
 * Load and display bookmarks from Chrome Bookmarks API
 * Fetches the bookmark tree and renders it on the page
 */
async function loadBookmarks() {
  try {
    const tree = await chrome.bookmarks.getTree();
    bookmarkTree = tree[0];
    allBookmarks = [];
    flattenBookmarkTree(bookmarkTree);
    displayBookmarkTree(bookmarkTree);
  } catch (error) {
    console.error("Error loading bookmarks:", error);
    displayError("Failed to load bookmarks");
  }
}

/**
 * Recursively flatten bookmark tree for search functionality
 * Creates a flat array of bookmarks with their folder paths
 *
 * @param {Object} node - Current bookmark tree node
 * @param {string} folderPath - Accumulated folder path (e.g., "Work > Projects")
 */
function flattenBookmarkTree(node, folderPath = "") {
  if (node.url) {
    allBookmarks.push({
      id: node.id,
      title: node.title || "Untitled",
      url: node.url,
      folder: folderPath,
    });
  }

  if (node.children && node.children.length > 0) {
    const newPath = folderPath ? `${folderPath} > ${node.title}` : node.title;
    node.children.forEach((child) => {
      flattenBookmarkTree(child, node.title ? newPath : folderPath);
    });
  }
}

/**
 * Display bookmarks in tree structure
 * Renders the hierarchical bookmark tree with collapsible folders
 *
 * @param {Object} node - Root bookmark tree node
 * @param {number} depth - Current depth level (0 = root)
 */
function displayBookmarkTree(node, depth = 0) {
  const container = document.getElementById("bookmarksContainer");

  // Clear container only at root level
  if (depth === 0) {
    container.innerHTML = "";

    // Skip the root node and render its children
    if (node.children) {
      node.children.forEach((child) => {
        const element = renderBookmarkNode(child, depth);
        if (element) {
          container.appendChild(element);
        }
      });
    }
  }
}

/**
 * Render a single bookmark node (folder or bookmark)
 * Recursively creates DOM elements for folders and bookmarks
 *
 * @param {Object} node - Bookmark tree node
 * @param {number} depth - Current nesting depth
 * @returns {HTMLElement|DocumentFragment|null} - DOM element or fragment
 */
function renderBookmarkNode(node, depth = 0) {
  // Skip system folders at root level
  if (depth === 0 && SYSTEM_FOLDERS.includes(node.title)) {
    // But render their children
    const fragment = document.createDocumentFragment();
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const element = renderBookmarkNode(child, depth);
        if (element) {
          fragment.appendChild(element);
        }
      });
    }
    return fragment.childNodes.length > 0 ? fragment : null;
  }

  // This is a bookmark (leaf node)
  if (node.url) {
    const listItem = document.createElement("li");
    listItem.className = "bookmark-item";

    const link = document.createElement("a");
    link.href = node.url;
    link.className = "bookmark-link";

    const title = document.createElement("span");
    title.className = "bookmark-title";
    title.textContent = node.title || "Untitled";

    link.appendChild(title);
    listItem.appendChild(link);

    return listItem;
  }

  // This is a folder
  if (node.children && node.children.length > 0) {
    const folderDiv = document.createElement("div");
    folderDiv.className = "bookmark-folder";
    folderDiv.style.marginLeft = `${depth * 20}px`;
    folderDiv.dataset.folderId = node.id;

    const folderHeader = document.createElement("div");
    folderHeader.className = "folder-header";

    const folderTitle = document.createElement("div");
    folderTitle.className = "folder-title";

    const collapseIcon = document.createElement("span");
    collapseIcon.className = "collapse-icon";
    const isCollapsed = collapsedFolders.has(node.id);
    collapseIcon.textContent = isCollapsed ? "▶" : "▼";

    const folderIcon = document.createElement("span");
    folderIcon.className = "folder-icon";
    folderIcon.innerHTML = isCollapsed ? "📂" : "📁";

    const titleText = document.createElement("span");
    titleText.textContent = node.title || "Untitled Folder";

    folderTitle.appendChild(collapseIcon);
    folderTitle.appendChild(folderIcon);
    folderTitle.appendChild(titleText);
    folderHeader.appendChild(folderTitle);

    // Add click handler for collapse/expand
    folderTitle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleFolder(node.id);
    });

    folderDiv.appendChild(folderHeader);

    // Create container for folder contents
    const folderContent = document.createElement("div");
    folderContent.className = "folder-content";

    if (isCollapsed) {
      folderContent.style.display = "none";
    }

    // Render children
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childElement = renderBookmarkNode(child, depth + 1);
        if (childElement) {
          folderContent.appendChild(childElement);
        }
      });
    }

    folderDiv.appendChild(folderContent);
    return folderDiv;
  }

  return null;
}

/**
 * Toggle folder collapsed/expanded state
 * Updates UI and saves state to storage
 *
 * @param {string} folderId - Unique identifier for the folder
 */
function toggleFolder(folderId) {
  if (collapsedFolders.has(folderId)) {
    collapsedFolders.delete(folderId);
  } else {
    collapsedFolders.add(folderId);
  }

  // Update UI
  const folderDiv = document.querySelector(`[data-folder-id="${folderId}"]`);
  if (folderDiv) {
    const icon = folderDiv.querySelector(".collapse-icon");
    const folderIcon = folderDiv.querySelector(".folder-icon");
    const content = folderDiv.querySelector(".folder-content");

    if (collapsedFolders.has(folderId)) {
      icon.textContent = "▶";
      folderIcon.innerHTML = "📂";
      content.style.display = "none";
    } else {
      icon.textContent = "▼";
      folderIcon.innerHTML = "📁";
      content.style.display = "block";
    }
  }

  // Save state
  saveCollapsedState();
}

/**
 * Display bookmarks from search results in flat grouped view
 * Used when user is actively searching bookmarks
 *
 * @param {Array} bookmarks - Filtered array of bookmark objects
 */
function displayBookmarks(bookmarks) {
  const container = document.getElementById("bookmarksContainer");

  if (bookmarks.length === 0) {
    container.innerHTML = '<div class="no-results">No bookmarks found</div>';
    return;
  }

  // Group bookmarks by folder
  const groupedBookmarks = {};
  bookmarks.forEach((bookmark) => {
    const folder = bookmark.folder || "Other Bookmarks";
    if (!groupedBookmarks[folder]) {
      groupedBookmarks[folder] = [];
    }
    groupedBookmarks[folder].push(bookmark);
  });

  // Create HTML for grouped bookmarks
  container.innerHTML = "";
  const sortedFolders = Object.keys(groupedBookmarks).sort();

  sortedFolders.forEach((folder) => {
    const folderDiv = document.createElement("div");
    folderDiv.className = "bookmark-folder";

    const folderTitle = document.createElement("div");
    folderTitle.className = "folder-title";
    folderTitle.textContent = folder;
    folderDiv.appendChild(folderTitle);

    const bookmarkList = document.createElement("ul");
    bookmarkList.className = "bookmark-list";

    groupedBookmarks[folder].forEach((bookmark) => {
      const listItem = document.createElement("li");
      listItem.className = "bookmark-item";

      const link = document.createElement("a");
      link.href = bookmark.url;
      link.className = "bookmark-link";

      const title = document.createElement("span");
      title.className = "bookmark-title";
      title.textContent = bookmark.title;

      link.appendChild(title);
      listItem.appendChild(link);
      bookmarkList.appendChild(listItem);
    });

    folderDiv.appendChild(bookmarkList);
    container.appendChild(folderDiv);
  });
}

/**
 * Setup search functionality
 * Initializes search input and keyboard shortcut (/)
 */
function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    console.error("Search input element not found");
    return;
  }

  searchInput.addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      // Show tree view when search is cleared
      displayBookmarkTree(bookmarkTree);
      return;
    }

    // Filter bookmarks based on search query
    const filtered = allBookmarks.filter((bookmark) => {
      return (
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.url.toLowerCase().includes(query) ||
        (bookmark.folder && bookmark.folder.toLowerCase().includes(query))
      );
    });

    // Show flat grouped view for search results
    displayBookmarks(filtered);
  });

  // Focus search on '/' key (similar to vim and other tools)
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Auto-focus search box when typing alphanumeric characters (a-z, A-Z, 0-9)
  // This allows users to start typing anywhere on the page to search bookmarks
  document.addEventListener("keydown", function (e) {
    // Skip if already focused on search input
    if (document.activeElement === searchInput) {
      return;
    }

    // Only capture alphanumeric characters (a-z, 0-9)
    const isAlphanumeric = /^[a-z0-9]$/i.test(e.key);

    if (isAlphanumeric) {
      e.preventDefault();
      searchInput.focus();
      // Append the typed character to the search input
      searchInput.value += e.key;
      // Trigger input event to activate search
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}

/**
 * Display error message to user
 *
 * @param {string} message - Error message to display
 */
function displayError(message) {
  const container = document.getElementById("bookmarksContainer");
  container.innerHTML = `<div class="no-results">${message}</div>`;
}
