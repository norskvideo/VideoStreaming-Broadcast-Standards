# Video Streaming & Broadcast Standards: Interactive Diagram

This project provides an **interactive, visually-rich HTML diagram** of the modern video streaming and broadcast technology stack. It is designed as a reference and learning tool for engineers, students, and anyone interested in the standards, protocols, and technologies powering video delivery from camera to screen.

## Preview
Note that this image is only periodically updated. To see what **latest** data we have click the image or the link below to launch the live version of the current html from this repository.

Contributions are welcome, particularly where we don't have latest standards documentation links in the pop up modals for each element in the chart.

[<img src="htmlpreview_github_io__.jpg" alt="Interactive Video Streaming Standards Diagram Preview" width="800">](https://htmlpreview.github.io/?https://github.com/norskvideo/VideoStreaming-Broadcast-Standards/blob/master/interactive-streaming-standards-diagram.html)

**[Launch Interactive Diagram](https://htmlpreview.github.io/?https://github.com/norskvideo/VideoStreaming-Broadcast-Standards/blob/master/interactive-streaming-standards-diagram.html)**



## Features
- **Layered Technology Stack:** Explore all major layers, from physical interfaces to application-level services.
- **Interactive Tooltips:** Hover over any technology to see concise explanations and links to official documentation or standards.
- **Search Functionality:** Instantly filter and highlight any standard, protocol, or codec.
- **Workflow Examples:** See typical end-to-end workflows for live streaming, broadcast, OTT, and real-time/interactive use cases.
- **Modern, Responsive UI:** Clean, mobile-friendly design for easy exploration.
- **Easy to Maintain:** JSON-based data structure for simple content updates by non-coders.
- **Community-Driven:** Designed for easy contributions from industry experts.

## Usage

### Option 1: GitHub Pages (Recommended)
The easiest way to view the diagram is through GitHub Pages:
**[Launch Interactive Diagram](https://htmlpreview.github.io/?https://github.com/norskvideo/VideoStreaming-Broadcast-Standards/blob/master/interactive-streaming-standards-diagram.html)**

### Option 2: Local Development Server
For local development, you'll need a simple web server due to browser CORS restrictions:

**Using Python (if installed):**
```bash
# Option A: Use our helper script (recommended)
python start-local-server.py

# Option B: Manual server
python -m http.server 8000
```
Then open: `http://localhost:8000/interactive-streaming-standards-diagram.html`

**Using Node.js (if installed):**
```bash
npx http-server
```
Then open: `http://localhost:8080/interactive-streaming-standards-diagram.html`

**Using PHP (if installed):**
```bash
php -S localhost:8000
```
Then open: `http://localhost:8000/interactive-streaming-standards-diagram.html`

### Why a Server is Needed
Modern browsers block local file access for security reasons. The diagram uses `fetch()` to load JSON data, which requires HTTP/HTTPS protocol.

## Contributing
**Pull requests are welcome!**

### For Non-Coders (Recommended)
The project now uses a **JSON-based data structure** that makes it easy for anyone to contribute:

1. **Edit the data file**: `data/streaming-standards-data.json`
2. **Follow the guide**: See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions
3. **Test your changes**: Open the HTML file in a browser to verify
4. **Submit a pull request**: We'll review and merge your improvements

### Community Guidelines
- Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing
- For security issues, see our [Security Policy](SECURITY.md)
- Check the [examples](examples/) folder for reference implementations

### For Developers
- If you have suggestions, corrections, or want to add new standards/technologies, please open a pull request.
- For larger changes, consider opening an issue first to discuss your ideas.
- I will be actively accepting pull requests to gather community input and improvements.

### What You Can Contribute
- **New Technologies**: Add emerging streaming technologies, codecs, or protocols
- **Updated Information**: Correct outdated descriptions, links, or specifications
- **New Categories**: Suggest new technology categories or reorganize existing ones
- **Research Areas**: Add new research topics or industry trends
- **Organization Information**: Update or add standards organizations and their roles

## License

This work is licensed under a [Creative Commons Attribution-NoDerivatives 4.0 International License](LICENSE).

You may use and reference this chart with attribution, but you may not create derivative works or forks. The latest version will always be available in this repository.

---

**Created for the video engineering and broadcast community.**
