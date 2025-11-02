# Release Process

This document explains how to create releases for the Pinora Chrome Extension.

## Automated Release Workflow

The repository includes GitHub Actions workflows for automated building and releasing:

### 1. Build Workflow (`build.yml`)
- **Triggers**: Runs on every push to `main`, PRs, or can be triggered manually
- **Purpose**: Validates and packages the extension for testing
- **Output**: Creates a build artifact available for download from GitHub Actions

### 2. Release Workflow (`release.yml`)
- **Triggers**: Runs when you push a version tag (e.g., `v1.0.0`)
- **Purpose**: Creates an official GitHub Release with the packaged extension
- **Output**: GitHub Release with downloadable `.zip` file

## How to Create a Release

### Step 1: Update Version
1. Update the version in `manifest.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. Commit the changes:
   ```bash
   git add manifest.json
   git commit -m "Bump version to 1.1.0"
   git push origin main
   ```

### Step 2: Create and Push a Tag
```bash
# Create a tag matching the version in manifest.json
git tag v1.1.0

# Push the tag to GitHub
git push origin v1.1.0
```

### Step 3: Automatic Release
- The GitHub Actions workflow will automatically:
  1. Package the extension files into a `.zip`
  2. Generate a changelog from commit messages
  3. Create a GitHub Release
  4. Attach the packaged extension to the release

### Step 4: Verify the Release
1. Go to your GitHub repository
2. Click on "Releases" in the right sidebar
3. You should see your new release with the packaged extension

## Manual Release (Alternative)

If you prefer to create releases manually:

```bash
# Package the extension
zip -r pinora-1.1.0.zip \
  manifest.json \
  newtab.html \
  newtab.js \
  styles.css \
  icons/ \
  -x "*.git*" "*.md" "*theme-test.html"

# Then create a release manually on GitHub and upload the zip file
```

## Testing Before Release

### Option 1: Use the Build Workflow
1. Push changes to `main` or create a PR
2. The build workflow will create an artifact
3. Download the artifact from the Actions tab
4. Test the packaged extension locally

### Option 2: Manual Testing
```bash
# Create a test package
zip -r pinora-test.zip \
  manifest.json \
  newtab.html \
  newtab.js \
  styles.css \
  icons/

# Load in Chrome:
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the extracted folder
```

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features (backward compatible)
- **Patch** (1.1.1): Bug fixes

## Troubleshooting

### Release workflow didn't trigger
- Ensure you pushed the tag: `git push origin v1.0.0`
- Check that the tag format matches `v*.*.*` (must start with 'v')

### Build failed
- Check the Actions tab for error details
- Ensure `manifest.json` is valid JSON
- Verify all referenced files exist

### Need to delete a release
```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin :refs/tags/v1.0.0

# Then delete the release on GitHub UI
```
