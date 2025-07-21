/**
 * Data Loader for Video Streaming Standards Diagram
 * Loads JSON data and renders the interactive diagram with exact original styling
 */

class StreamingStandardsDataLoader {
    constructor() {
        this.data = null;
        this.container = null;
    }

    async loadData() {
        try {
            const response = await fetch('data/streaming-standards-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    renderDiagram(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }

        if (!this.data) {
            throw new Error('Data not loaded. Call loadData() first.');
        }

        // Clear the loading message
        this.container.innerHTML = '';

        this.renderLayers();
        this.renderWorkflows();
        this.renderLegend();
    }

    renderLayers() {
        console.log('Rendering layers, total layers:', this.data.layers.length);
        this.data.layers.forEach((layer, index) => {
            console.log(`Rendering layer ${index + 1}:`, layer.name, 'with', layer.categories.length, 'categories');
            const layerElement = this.createLayerElement(layer);
            this.container.appendChild(layerElement);
            console.log('Layer element created:', layerElement);
        });
    }

    createLayerElement(layer) {
        const layerDiv = document.createElement('div');
        layerDiv.className = `layer`;
        layerDiv.setAttribute('data-layer', layer.id);

        const layerHeader = `
            <div class="layer-header ${layer.id}">
                ${layer.name} - ${layer.subtitle}
                <div class="layer-tooltip">
                    <h5>${layer.name}</h5>
                    <p>${layer.description}</p>
                    <p><strong>Key Functions:</strong></p>
                    <ul>
                        ${layer.keyFunctions.map(func => `<li>${func}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        const layerContent = document.createElement('div');
        layerContent.className = 'layer-content';

        console.log(`Creating categories for layer ${layer.name}:`, layer.categories.length);
        layer.categories.forEach((category, catIndex) => {
            console.log(`Creating category ${catIndex + 1}:`, category.name);
            const categoryElement = this.createCategoryElement(category);
            layerContent.appendChild(categoryElement);
        });

        layerDiv.innerHTML = layerHeader;
        layerDiv.appendChild(layerContent);
        return layerDiv;
    }

    createCategoryElement(category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const categoryHeader = `
            <h4 class="category-header" data-search="${category.name.toLowerCase()}">${category.name}</h4>
            <div class="category-tooltip">
                <h5>${category.name}</h5>
                <p>${category.description}</p>
                
                <p><strong>Key Organizations:</strong></p>
                <ul>
                    ${category.keyOrganizations.map(org => 
                        `<li><strong>${org.name}:</strong> ${org.description}</li>`
                    ).join('')}
                </ul>
                
                <p><strong>Research Areas:</strong></p>
                <ul>
                    ${category.researchAreas.map(area => `<li>${area}</li>`).join('')}
                </ul>
                
                <p><strong>Links:</strong></p>
                ${category.links.map(link => 
                    `<a href="${link.url}" target="_blank">🔗 ${link.text}</a>`
                ).join('')}
            </div>
        `;

        // Set the innerHTML first
        categoryDiv.innerHTML = categoryHeader;

        // Then append the tech elements
        category.technologies.forEach(tech => {
            const techElement = this.createTechnologyElement(tech);
            categoryDiv.appendChild(techElement);
        });

        return categoryDiv;
    }

    createTechnologyElement(tech) {
        const techDiv = document.createElement('div');
        techDiv.className = 'tech-item';
        techDiv.setAttribute('data-search', tech.searchTerms.join(' '));

        const techContent = `
            ${tech.name}
            <div class="tooltip">
                <h5>${tech.name}</h5>
                <p>${tech.description}</p>
                ${tech.links ? tech.links.map(link => 
                    `<a href="${link.url}" target="_blank">🔗 ${link.text}</a>`
                ).join('') : ''}
            </div>
        `;

        techDiv.innerHTML = techContent;
        return techDiv;
    }

    renderWorkflows() {
        const workflowDiv = document.createElement('div');
        workflowDiv.className = 'workflow';
        workflowDiv.innerHTML = `
            <h3>Typical Workflows</h3>
            
            <div class="workflow-path">
                <h4>Live Streaming Workflow</h4>
                <div class="path-flow">
                    Camera/Input → Encoder → Packager → CDN → Player
                </div>
            </div>
            
            <div class="workflow-path">
                <h4>VOD Workflow</h4>
                <div class="path-flow">
                    Source File → Transcoder → Storage → CDN → Player
                </div>
            </div>
            
            <div class="workflow-path">
                <h4>Broadcast Workflow</h4>
                <div class="path-flow">
                    Studio → Encoder → Distribution → Transmitter → Receiver
                </div>
            </div>
            
            <div class="workflow-path">
                <h4>OTT Workflow</h4>
                <div class="path-flow">
                    Content → Ingest → Processing → CDN → Apps/Web
                </div>
            </div>
            
            <div class="workflow-path">
                <h4>Real-Time/Interactive</h4>
                <div class="path-flow">
                    Camera → WebRTC → SFU → WebRTC → Browser
                </div>
            </div>
        `;
        this.container.appendChild(workflowDiv);
    }

    renderLegend() {
        const legendDiv = document.createElement('div');
        legendDiv.className = 'legend';
        legendDiv.innerHTML = `
            <div class="legend-item">
                <div class="legend-color application"></div>
                <span>Application Layer - User-facing services and business logic</span>
            </div>
            <div class="legend-item">
                <div class="legend-color adaptive"></div>
                <span>Adaptive Streaming - Client-side quality adaptation</span>
            </div>
            <div class="legend-item">
                <div class="legend-color transport"></div>
                <span>Transport Layer - Protocol and session management</span>
            </div>
            <div class="legend-item">
                <div class="legend-color reliable-udp"></div>
                <span>Reliable UDP - Professional transport with error correction</span>
            </div>
            <div class="legend-item">
                <div class="legend-color container-layer"></div>
                <span>Container Layer - Media packaging and metadata</span>
            </div>
            <div class="legend-item">
                <div class="legend-color codec"></div>
                <span>Codec Layer - Compression and decompression algorithms</span>
            </div>
            <div class="legend-item">
                <div class="legend-color network"></div>
                <span>Network Layer - Basic network protocols and routing</span>
            </div>
            <div class="legend-item">
                <div class="legend-color physical"></div>
                <span>Physical Layer - Hardware interfaces and transmission</span>
            </div>
        `;
        this.container.appendChild(legendDiv);
    }

    searchTechnologies(query) {
        const results = [];
        
        this.data.layers.forEach(layer => {
            layer.categories.forEach(category => {
                category.technologies.forEach(tech => {
                    const searchText = `${tech.name} ${tech.searchTerms.join(' ')} ${category.name}`.toLowerCase();
                    if (searchText.includes(query)) {
                        results.push({
                            tech: tech,
                            category: category,
                            layer: layer
                        });
                    }
                });
            });
        });

        return results;
    }

    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.hideAllItems();
            return;
        }

        this.highlightSearchResults(results);
    }

    highlightSearchResults(results) {
        // Hide all items first
        this.hideAllItems();
        
        // Show only matching items
        results.forEach(result => {
            const techElements = document.querySelectorAll(`[data-search*="${result.tech.name.toLowerCase()}"]`);
            techElements.forEach(el => {
                el.style.opacity = '1';
                el.style.backgroundColor = '#667eea';
                el.style.color = 'white';
            });
        });
    }

    hideAllItems() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.style.opacity = '0.3';
            item.style.backgroundColor = '';
            item.style.color = '';
        });
    }

    showAllItems() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.style.opacity = '1';
            item.style.backgroundColor = '';
            item.style.color = '';
        });
    }
}

// Global function for search result highlighting
window.highlightTechnology = function(techName) {
    const loader = window.streamingStandardsLoader;
    if (loader) {
        loader.hideAllItems();
        const techElements = document.querySelectorAll(`[data-search*="${techName.toLowerCase()}"]`);
        techElements.forEach(el => {
            el.style.opacity = '1';
            el.style.backgroundColor = '#667eea';
            el.style.color = 'white';
        });
    }
};

// Export for use in main HTML file
window.StreamingStandardsDataLoader = StreamingStandardsDataLoader; 