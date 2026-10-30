# MacQua Chrome Extensions

A repository for custom Manifest V3 Google Chrome extensions. 

You can download the latest packed `.zip` releases directly from the project's storefront:  
**[Visit the Extension Download Page](https://mcclud1c.github.io/MacQua-Chrome-Extensions/)**

## Available Extensions

### 1. Auto-Scroll for YouTube Shorts
Automatically scrolls to the next Short when the current video ends, allowing for hands-free viewing.

*(More extensions, such as the MacQuaLab PDF Viewer, will be added here in the future.)*

## Repository Structure
This repository uses a monorepo structure. The raw, unpacked source code for each extension is housed in its own respective directory for version control and peer review. 

The compiled `.zip` files for end-users are hosted via GitHub Releases and served through the `index.html` GitHub Pages site.

## Manual Installation (Developer Mode)
If you prefer to install the extensions manually from the raw source code rather than downloading the release `.zip`:

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the specific folder of the extension you wish to install (e.g., the folder containing the `manifest.json` for the YouTube auto-scroller).

## License
This project is licensed under the MIT License.
