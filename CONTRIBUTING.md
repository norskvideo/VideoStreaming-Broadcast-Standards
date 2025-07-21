# Contributing to Video Streaming & Broadcast Standards

Thank you for your interest in contributing to this interactive diagram! This guide is designed to help non-coders understand how to add, edit, or improve the content.

## 🎯 What You Can Contribute

### Content Areas
- **New Technologies**: Add emerging streaming technologies, codecs, or protocols
- **Updated Information**: Correct outdated descriptions, links, or specifications
- **New Categories**: Suggest new technology categories or reorganize existing ones
- **Research Areas**: Add new research topics or industry trends
- **Organization Information**: Update or add standards organizations and their roles
- **Links**: Add relevant documentation, specifications, or resources

### File Structure
```
data/
├── streaming-standards-data.json    # Main data file (this is what you edit!)
js/
├── data-loader.js                   # JavaScript that renders the data
interactive-streaming-standards-diagram.html  # Main HTML file
```

## 📝 How to Edit the Data

### The JSON Structure

The main data file (`data/streaming-standards-data.json`) is organized in layers:

```json
{
  "metadata": {
    "title": "Video Streaming & Broadcast Standards",
    "subtitle": "Interactive Technology Stack Diagram",
    "version": "1.0.0",
    "lastUpdated": "2024-01-01"
  },
  "layers": [
    {
      "id": "application",
      "name": "APPLICATION LAYER",
      "subtitle": "User Experience & Business Logic",
      "description": "What this layer does...",
      "keyFunctions": [
        "Function 1",
        "Function 2"
      ],
      "categories": [
        {
          "id": "drm-security",
          "name": "DRM & Security",
          "description": "Description of this category",
          "keyOrganizations": [
            {
              "name": "Organization Name",
              "description": "What they do"
            }
          ],
          "researchAreas": [
            "Research topic 1",
            "Research topic 2"
          ],
          "links": [
            {
              "text": "Link Description",
              "url": "https://example.com"
            }
          ],
          "technologies": [
            {
              "name": "Technology Name",
              "description": "Detailed description of the technology",
              "maturity": "",
              "links": [
                {
                  "text": "Documentation",
                  "url": "https://docs.example.com"
                }
              ],
              "searchTerms": ["keyword1", "keyword2", "keyword3"]
            }
          ]
        }
      ]
    }
  ]
}
```

### Technology Maturity Field

The `maturity` field allows you to indicate the development stage of a technology. This enables future features like color coding and filtering based on technology maturity.

#### Maturity Levels (Recommended Values)

- **`"mature"`** - Well-established, widely adopted, stable technology (e.g., H.264, MP4)
- **`"stable"`** - Production-ready, actively used in industry (e.g., HLS, DASH)
- **`"emerging"`** - Growing adoption, becoming mainstream (e.g., AV1, WebRTC)
- **`"experimental"`** - Early development, limited adoption (e.g., new protocols)
- **`"deprecated"`** - Being phased out, legacy support only (e.g., MP3, older protocols)
- **`""`** - Not yet classified (current default)

#### Example Usage

```json
{
  "name": "H.264/AVC",
  "description": "Widely adopted video codec...",
  "maturity": "mature",
  "links": [...],
  "searchTerms": [...]
}
```

#### Future Features

The maturity field will enable:
- **Color coding**: Different shades based on maturity level
- **Visual indicators**: Icons or borders showing maturity status
- **Filtering**: Show/hide technologies by maturity level
- **Timeline tracking**: Track how protocols evolve over time

## 🔧 Step-by-Step Editing Guide

### 1. Adding a New Technology

To add a new technology to an existing category:

1. **Find the right category** in the JSON file
2. **Add a new technology object** in the `technologies` array:

```json
{
  "name": "Your New Technology",
  "description": "A clear, concise description of what this technology does, its key features, and where it's used. Include technical details like latency, bandwidth requirements, or compatibility.",
  "maturity": "",
  "links": [
    {
      "text": "Official Documentation",
      "url": "https://official-docs.com"
    },
    {
      "text": "Specification",
      "url": "https://specification-url.com"
    }
  ],
  "searchTerms": ["technology", "keyword1", "keyword2", "related", "terms"]
}
```

### 2. Adding a New Category

To add a new category to a layer:

1. **Find the right layer** in the JSON file
2. **Add a new category object** in the `categories` array:

```json
{
  "id": "your-category-id",
  "name": "Your Category Name",
  "description": "Description of what this category covers",
  "keyOrganizations": [
    {
      "name": "Organization Name",
      "description": "What this organization does in this area"
    }
  ],
  "researchAreas": [
    "Current research topic 1",
    "Emerging trend 2",
    "Industry focus area 3"
  ],
  "links": [
    {
      "text": "Industry Report",
      "url": "https://report-url.com"
    }
  ],
  "technologies": [
    // Your technologies go here
  ]
}
```

### 3. Updating Existing Information

To update existing content:

1. **Find the specific field** you want to change
2. **Edit the value** while maintaining the JSON structure
3. **Keep the formatting consistent** with existing entries

### 4. Adding a New Layer

To add a completely new layer:

1. **Add a new layer object** to the `layers` array:

```json
{
  "id": "your-layer-id",
  "name": "YOUR LAYER NAME",
  "subtitle": "Brief Description",
  "description": "Detailed description of what this layer does and why it's important.",
  "keyFunctions": [
    "Primary function 1",
    "Primary function 2",
    "Primary function 3"
  ],
  "categories": [
    // Your categories go here
  ]
}
```

## 📋 Content Guidelines

### Technology Descriptions
- **Be specific**: Include technical details, use cases, and limitations
- **Include context**: Mention where it's used, by whom, and why
- **Keep it concise**: Aim for 1-3 sentences
- **Include metrics**: Latency, bandwidth, compatibility where relevant

### Search Terms
- **Be comprehensive**: Include common names, abbreviations, and related terms
- **Think like a user**: What would someone search for to find this technology?
- **Include variations**: Different spellings, acronyms, and brand names

### Links
- **Use official sources**: Prefer official documentation and specifications
- **Be descriptive**: Link text should clearly indicate what the link contains
- **Keep links current**: Ensure URLs are working and up-to-date

### Organizations
- **Focus on relevance**: Only include organizations that are actively involved
- **Be specific**: Describe their exact role in this technology area
- **Include current information**: Ensure descriptions reflect current activities

## 🚀 How to Submit Changes

### Option 1: GitHub Pull Request (Recommended)

1. **Fork the repository** on GitHub
2. **Create a new branch** for your changes
3. **Edit the JSON file** with your changes
4. **Test your changes** by opening the HTML file in a browser
5. **Commit and push** your changes
6. **Create a pull request** with a clear description of your changes

### Option 2: GitHub Issue

1. **Create a new issue** on GitHub
2. **Describe your suggested changes** in detail
3. **Include the specific JSON you want to add/modify**
4. **Provide context** about why the change is needed

### Option 3: Direct Edit via GitHub

1. **Navigate to the JSON file** on GitHub
2. **Click the pencil icon** to edit
3. **Make your changes** in the web editor
4. **Commit directly** or create a pull request

## 🧪 Testing Your Changes

Before submitting:

1. **Open the HTML file** in a web browser
2. **Check that your new content appears** correctly
3. **Test the search functionality** with your new search terms
4. **Verify tooltips work** for your new content
5. **Check that links open** correctly

## 📚 Common Examples

### Adding a New Codec
```json
{
  "name": "AV2",
  "description": "Next-generation video codec from AOMedia. Successor to AV1 with improved compression efficiency. Expected to reduce bandwidth by 30% compared to AV1. Currently in development.",
  "links": [
    {
      "text": "AOMedia AV2",
      "url": "https://aomedia.org/av2/"
    }
  ],
  "searchTerms": ["av2", "aomedia", "codec", "video", "compression"]
}
```

### Adding a New Protocol
```json
{
  "name": "RIST Protocol",
  "description": "Reliable Internet Stream Transport protocol for professional video contribution. Provides sub-second latency with error correction. Used for live news and sports broadcasting over public internet.",
  "links": [
    {
      "text": "RIST Specification",
      "url": "https://www.rist.tv/"
    }
  ],
  "searchTerms": ["rist", "reliable", "internet", "stream", "transport", "contribution"]
}
```

## 🤝 Getting Help

- **Check existing issues** to see if your question has been answered
- **Create a new issue** for questions or problems
- **Join discussions** in existing pull requests
- **Ask for clarification** if the JSON structure is unclear

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (Creative Commons Attribution-NoDerivatives 4.0 International).

---

Thank you for helping make this resource more comprehensive and up-to-date! 🎉 