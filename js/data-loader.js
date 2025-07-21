/**
 * Data Loader for Video Streaming Standards Diagram
 * Loads JSON data and renders the interactive diagram
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

        this.renderHeader();
        this.renderLayers();
        this.renderWorkflows();
        this.renderSearch();
    }

    renderHeader() {
        const header = `
            <div class="header">
                <h1>${this.data.metadata.title}</h1>
                <p class="subtitle">${this.data.metadata.subtitle}</p>
                <p class="description">${this.data.metadata.description}</p>
            </div>
        `;
        this.container.innerHTML = header;
    }

    renderLayers() {
        const layersContainer = document.createElement('div');
        layersContainer.className = 'layers-container';

        this.data.layers.forEach(layer => {
            const layerElement = this.createLayerElement(layer);
            layersContainer.appendChild(layerElement);
        });

        this.container.appendChild(layersContainer);
    }

    createLayerElement(layer) {
        const layerDiv = document.createElement('div');
        layerDiv.className = `layer ${layer.id}`;

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

        layer.categories.forEach(category => {
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
                <ul>
                    ${category.links.map(link => 
                        `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`
                    ).join('')}
                </ul>
            </div>
        `;

        const technologiesDiv = document.createElement('div');
        technologiesDiv.className = 'technologies';

        category.technologies.forEach(tech => {
            const techElement = this.createTechnologyElement(tech);
            technologiesDiv.appendChild(techElement);
        });

        categoryDiv.innerHTML = categoryHeader;
        categoryDiv.appendChild(technologiesDiv);
        return categoryDiv;
    }

    createTechnologyElement(tech) {
        const techDiv = document.createElement('div');
        techDiv.className = 'tech-item';
        techDiv.setAttribute('data-search', tech.searchTerms.join(' '));

        const techContent = `
            <span class="tech-name">${tech.name}</span>
            <div class="tooltip">
                <h5>${tech.name}</h5>
                <p>${tech.description}</p>
                ${tech.links ? `
                    <p><strong>Links:</strong></p>
                    <ul>
                        ${tech.links.map(link => 
                            `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`
                        ).join('')}
                    </ul>
                ` : ''}
            </div>
        `;

        techDiv.innerHTML = techContent;
        return techDiv;
    }

    renderWorkflows() {
        // Add workflow sections if needed
        const workflowsContainer = document.createElement('div');
        workflowsContainer.className = 'workflows-container';
        workflowsContainer.innerHTML = `
            <div class="workflow-section">
                <h3>Live Streaming Workflow</h3>
                <div class="workflow-steps">
                    <div class="step">Camera/Input</div>
                    <div class="step">Encoder</div>
                    <div class="step">Packager</div>
                    <div class="step">CDN</div>
                    <div class="step">Player</div>
                </div>
            </div>
            
            <div class="workflow-section">
                <h3>VOD Workflow</h3>
                <div class="workflow-steps">
                    <div class="step">Source File</div>
                    <div class="step">Transcoder</div>
                    <div class="step">Storage</div>
                    <div class="step">CDN</div>
                    <div class="step">Player</div>
                </div>
            </div>
        `;
        this.container.appendChild(workflowsContainer);
    }

    renderSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search technologies..." class="search-input">
            <div id="searchResults" class="search-results"></div>
        `;
        this.container.appendChild(searchContainer);

        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                this.showAllItems();
                return;
            }

            const results = this.searchTechnologies(query);
            this.displaySearchResults(results, query);
        });
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
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            this.hideAllItems();
            return;
        }

        const resultsHtml = results.map(result => `
            <div class="search-result" onclick="highlightTechnology('${result.tech.name}')">
                <strong>${result.tech.name}</strong> - ${result.category.name} (${result.layer.name})
            </div>
        `).join('');

        searchResults.innerHTML = resultsHtml;
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