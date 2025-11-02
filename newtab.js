// Store all bookmarks for searching
let allBookmarks = [];

// System folder names to filter
const SYSTEM_FOLDERS = ['Bookmarks bar', 'Other bookmarks', 'Mobile bookmarks'];

// Initialize the extension
document.addEventListener('DOMContentLoaded', function() {
  loadBookmarks();
  setupSearch();
});

// Load and display bookmarks
async function loadBookmarks() {
  try {
    const bookmarkTree = await chrome.bookmarks.getTree();
    allBookmarks = [];
    parseBookmarkTree(bookmarkTree[0]);
    displayBookmarks(allBookmarks);
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    displayError('Failed to load bookmarks');
  }
}

// Recursively parse bookmark tree
function parseBookmarkTree(node, folderPath = '') {
  if (node.url) {
    // This is a bookmark
    allBookmarks.push({
      id: node.id,
      title: node.title || 'Untitled',
      url: node.url,
      folder: folderPath
    });
  }
  
  if (node.children) {
    // This is a folder
    const newPath = folderPath ? `${folderPath} > ${node.title}` : node.title;
    node.children.forEach(child => {
      parseBookmarkTree(child, node.title ? newPath : folderPath);
    });
  }
}

// Display bookmarks grouped by folder
function displayBookmarks(bookmarks) {
  const container = document.getElementById('bookmarksContainer');
  
  if (bookmarks.length === 0) {
    container.innerHTML = '<div class="no-results">No bookmarks found</div>';
    return;
  }
  
  // Group bookmarks by folder
  const groupedBookmarks = {};
  bookmarks.forEach(bookmark => {
    const folder = bookmark.folder || 'Other Bookmarks';
    if (!groupedBookmarks[folder]) {
      groupedBookmarks[folder] = [];
    }
    groupedBookmarks[folder].push(bookmark);
  });
  
  // Create HTML for grouped bookmarks
  container.innerHTML = '';
  Object.keys(groupedBookmarks).sort().forEach(folder => {
    if (SYSTEM_FOLDERS.includes(folder)) {
      // Skip top-level folders themselves, only show their contents
      return;
    }
    
    const folderDiv = document.createElement('div');
    folderDiv.className = 'bookmark-folder';
    
    const folderTitle = document.createElement('div');
    folderTitle.className = 'folder-title';
    folderTitle.textContent = folder;
    folderDiv.appendChild(folderTitle);
    
    const bookmarkList = document.createElement('ul');
    bookmarkList.className = 'bookmark-list';
    
    groupedBookmarks[folder].forEach(bookmark => {
      const listItem = document.createElement('li');
      listItem.className = 'bookmark-item';
      
      const link = document.createElement('a');
      link.href = bookmark.url;
      link.className = 'bookmark-link';
      
      // Create favicon
      const icon = document.createElement('img');
      icon.className = 'bookmark-icon';
      icon.src = `chrome://favicon/${bookmark.url}`;
      icon.alt = '';
      icon.onerror = function() {
        this.style.display = 'none';
      };
      
      const title = document.createElement('span');
      title.className = 'bookmark-title';
      title.textContent = bookmark.title;
      
      link.appendChild(icon);
      link.appendChild(title);
      listItem.appendChild(link);
      bookmarkList.appendChild(listItem);
    });
    
    folderDiv.appendChild(bookmarkList);
    container.appendChild(folderDiv);
  });
  
  // Show ungrouped bookmarks
  const ungrouped = bookmarks.filter(b => 
    !b.folder || SYSTEM_FOLDERS.includes(b.folder)
  );
  
  if (ungrouped.length > 0) {
    const folderDiv = document.createElement('div');
    folderDiv.className = 'bookmark-folder';
    
    const folderTitle = document.createElement('div');
    folderTitle.className = 'folder-title';
    folderTitle.textContent = 'Bookmarks';
    folderDiv.appendChild(folderTitle);
    
    const bookmarkList = document.createElement('ul');
    bookmarkList.className = 'bookmark-list';
    
    ungrouped.forEach(bookmark => {
      const listItem = document.createElement('li');
      listItem.className = 'bookmark-item';
      
      const link = document.createElement('a');
      link.href = bookmark.url;
      link.className = 'bookmark-link';
      
      const icon = document.createElement('img');
      icon.className = 'bookmark-icon';
      icon.src = `chrome://favicon/${bookmark.url}`;
      icon.alt = '';
      icon.onerror = function() {
        this.style.display = 'none';
      };
      
      const title = document.createElement('span');
      title.className = 'bookmark-title';
      title.textContent = bookmark.title;
      
      link.appendChild(icon);
      link.appendChild(title);
      listItem.appendChild(link);
      bookmarkList.appendChild(listItem);
    });
    
    folderDiv.appendChild(bookmarkList);
    container.appendChild(folderDiv);
  }
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
      displayBookmarks(allBookmarks);
      return;
    }
    
    // Filter bookmarks based on search query
    const filtered = allBookmarks.filter(bookmark => {
      return bookmark.title.toLowerCase().includes(query) ||
             bookmark.url.toLowerCase().includes(query) ||
             (bookmark.folder && bookmark.folder.toLowerCase().includes(query));
    });
    
    displayBookmarks(filtered);
  });
  
  // Focus search on '/' key
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

// Display error message
function displayError(message) {
  const container = document.getElementById('bookmarksContainer');
  container.innerHTML = `<div class="no-results">${message}</div>`;
}
