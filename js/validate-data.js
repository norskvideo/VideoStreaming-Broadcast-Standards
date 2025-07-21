/**
 * Data Validation for Video Streaming Standards JSON
 * Helps contributors validate their JSON changes before submitting
 */

class DataValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
    }

    validateData(data) {
        this.errors = [];
        this.warnings = [];

        // Validate metadata
        this.validateMetadata(data.metadata);

        // Validate layers
        if (!data.layers || !Array.isArray(data.layers)) {
            this.errors.push("Missing or invalid 'layers' array");
            return false;
        }

        data.layers.forEach((layer, index) => {
            this.validateLayer(layer, index);
        });

        return this.errors.length === 0;
    }

    validateMetadata(metadata) {
        if (!metadata) {
            this.errors.push("Missing 'metadata' section");
            return;
        }

        const requiredFields = ['title', 'subtitle', 'version'];
        requiredFields.forEach(field => {
            if (!metadata[field]) {
                this.errors.push(`Missing required metadata field: '${field}'`);
            }
        });
    }

    validateLayer(layer, index) {
        const requiredFields = ['id', 'name', 'subtitle', 'description', 'keyFunctions', 'categories'];
        
        requiredFields.forEach(field => {
            if (!layer[field]) {
                this.errors.push(`Layer ${index}: Missing required field '${field}'`);
            }
        });

        if (layer.categories && Array.isArray(layer.categories)) {
            layer.categories.forEach((category, catIndex) => {
                this.validateCategory(category, index, catIndex);
            });
        }
    }

    validateCategory(category, layerIndex, catIndex) {
        const requiredFields = ['id', 'name', 'description', 'keyOrganizations', 'researchAreas', 'links', 'technologies'];
        
        requiredFields.forEach(field => {
            if (!category[field]) {
                this.errors.push(`Layer ${layerIndex}, Category ${catIndex}: Missing required field '${field}'`);
            }
        });

        if (category.technologies && Array.isArray(category.technologies)) {
            category.technologies.forEach((tech, techIndex) => {
                this.validateTechnology(tech, layerIndex, catIndex, techIndex);
            });
        }
    }

    validateTechnology(tech, layerIndex, catIndex, techIndex) {
        const requiredFields = ['name', 'description', 'searchTerms'];
        
        requiredFields.forEach(field => {
            if (!tech[field]) {
                this.errors.push(`Layer ${layerIndex}, Category ${catIndex}, Technology ${techIndex}: Missing required field '${field}'`);
            }
        });

        // Validate searchTerms is an array
        if (tech.searchTerms && !Array.isArray(tech.searchTerms)) {
            this.errors.push(`Layer ${layerIndex}, Category ${catIndex}, Technology ${techIndex}: 'searchTerms' must be an array`);
        }

        // Validate links if present
        if (tech.links && Array.isArray(tech.links)) {
            tech.links.forEach((link, linkIndex) => {
                this.validateLink(link, layerIndex, catIndex, techIndex, linkIndex);
            });
        }
    }

    validateLink(link, layerIndex, catIndex, techIndex, linkIndex) {
        if (!link.text || !link.url) {
            this.errors.push(`Layer ${layerIndex}, Category ${catIndex}, Technology ${techIndex}, Link ${linkIndex}: Missing 'text' or 'url'`);
        }

        // Validate URL format
        if (link.url && !this.isValidUrl(link.url)) {
            this.warnings.push(`Layer ${layerIndex}, Category ${catIndex}, Technology ${techIndex}, Link ${linkIndex}: URL may be invalid: ${link.url}`);
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    getValidationReport() {
        const report = {
            isValid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            summary: {
                totalErrors: this.errors.length,
                totalWarnings: this.warnings.length
            }
        };

        if (this.errors.length > 0) {
            report.summary.message = `❌ Validation failed with ${this.errors.length} error(s)`;
        } else if (this.warnings.length > 0) {
            report.summary.message = `⚠️ Validation passed with ${this.warnings.length} warning(s)`;
        } else {
            report.summary.message = `✅ Validation passed successfully!`;
        }

        return report;
    }

    // Helper method to validate a JSON string
    static validateJsonString(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            const validator = new DataValidator();
            const isValid = validator.validateData(data);
            return {
                isValid,
                data,
                report: validator.getValidationReport()
            };
        } catch (error) {
            return {
                isValid: false,
                error: error.message,
                report: {
                    isValid: false,
                    errors: [`JSON parsing error: ${error.message}`],
                    warnings: [],
                    summary: {
                        message: `❌ Invalid JSON format: ${error.message}`,
                        totalErrors: 1,
                        totalWarnings: 0
                    }
                }
            };
        }
    }
}

// Export for use in browser
window.DataValidator = DataValidator;

// Add validation to the main data loader
if (window.StreamingStandardsDataLoader) {
    const originalLoadData = window.StreamingStandardsDataLoader.prototype.loadData;
    
    window.StreamingStandardsDataLoader.prototype.loadData = async function() {
        const data = await originalLoadData.call(this);
        
        // Validate the loaded data
        const validator = new DataValidator();
        const isValid = validator.validateData(data);
        
        if (!isValid) {
            console.warn('Data validation warnings:', validator.getValidationReport());
        }
        
        return data;
    };
} 