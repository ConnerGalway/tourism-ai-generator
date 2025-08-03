/**
 * Tourism AI Content Generator
 * Main JavaScript functionality with improved security, accessibility, and error handling
 */

class ContentGenerator {
    constructor() {
        this.currentContent = {};
        this.isGenerating = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupValidation();
        this.setupAccessibility();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('contentForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', this.handleTabClick.bind(this));
            tab.addEventListener('keydown', this.handleTabKeydown.bind(this));
        });

        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', this.handleCopy.bind(this));
        }

        // Real-time validation
        this.setupRealTimeValidation();
    }

    setupValidation() {
        this.requiredFields = ['businessType', 'contentType', 'location'];
        this.errorMessages = {
            businessType: 'Please select a business type',
            contentType: 'Please select a content type',
            location: 'Please enter a location'
        };
    }

    setupAccessibility() {
        // Add keyboard navigation for tabs
        document.querySelectorAll('.tab').forEach((tab, index) => {
            tab.setAttribute('tabindex', '0');
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });
    }

    setupRealTimeValidation() {
        this.requiredFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('blur', () => this.validateField(fieldId));
                element.addEventListener('input', () => this.clearFieldError(fieldId));
            }
        });
    }

    validateField(fieldId) {
        const element = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (!element || !errorElement) return true;

        const value = element.value.trim();
        const isValid = value.length > 0;

        if (!isValid) {
            element.classList.add('error');
            errorElement.textContent = this.errorMessages[fieldId] || 'This field is required';
            return false;
        } else {
            this.clearFieldError(fieldId);
            return true;
        }
    }

    clearFieldError(fieldId) {
        const element = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (element && errorElement) {
            element.classList.remove('error');
            errorElement.textContent = '';
        }
    }

    validateForm() {
        let isValid = true;
        
        // Clear all previous errors
        this.requiredFields.forEach(fieldId => {
            this.clearFieldError(fieldId);
        });

        // Validate each required field
        this.requiredFields.forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showStatus('Please fill in all required fields', 'error');
            // Focus first error field
            const firstErrorField = this.requiredFields.find(fieldId => {
                const element = document.getElementById(fieldId);
                return element && element.classList.contains('error');
            });
            if (firstErrorField) {
                document.getElementById(firstErrorField).focus();
            }
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isGenerating) {
            return; // Prevent multiple submissions
        }

        if (!this.validateForm()) {
            return;
        }

        await this.generateContent();
    }

    handleTabClick(e) {
        e.preventDefault();
        const tab = e.currentTarget;
        const tabType = tab.getAttribute('data-tab');
        
        this.switchTab(tabType);
    }

    handleTabKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const tab = e.currentTarget;
            const tabType = tab.getAttribute('data-tab');
            this.switchTab(tabType);
        }
    }

    switchTab(tabType) {
        // Update tab states
        document.querySelectorAll('.tab').forEach(tab => {
            const isActive = tab.getAttribute('data-tab') === tabType;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive.toString());
        });

        // Update tab panels
        document.querySelectorAll('.output-area').forEach(panel => {
            const isActive = panel.id === `${tabType}-content`;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });

        // Display content for active tab
        this.displayContent(tabType);
    }

    async generateContent() {
        if (this.isGenerating) return;

        this.isGenerating = true;
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');

        try {
            // Show loading state
            this.showLoading();
            this.showStatus('Generating content ideas...', 'success');

            // Get form data
            const formData = this.getFormData();

            // Simulate API delay (replace with actual API call)
            await this.simulateApiCall();

            // Generate content
            this.currentContent = this.generateMockContent(formData);

            // Show results
            this.hideLoading();
            this.showStatus('Content generated successfully!', 'success');
            this.switchTab('main');
            this.showCopyButton();

        } catch (error) {
            console.error('Content generation failed:', error);
            this.hideLoading();
            this.showStatus('Content generation failed. Please try again.', 'error');
            this.showError('Sorry, content generation failed. Please try again.');
        } finally {
            this.isGenerating = false;
        }
    }

    getFormData() {
        const formData = {};
        const fields = ['businessType', 'contentType', 'location', 'season', 'target', 'tone', 'keywords'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                formData[field] = this.sanitizeInput(element.value);
            }
        });

        return formData;
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        // Remove potentially dangerous characters
        return input.replace(/[<>]/g, '').trim();
    }

    async simulateApiCall() {
        // Simulate network delay
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    generateMockContent(data) {
        try {
            const template = getTemplate(data.contentType, data.businessType);
            const mainContent = this.replaceTemplateVariables(template, data);

            const contentVariations = getVariations(data.businessType).map(v => 
                this.replaceTemplateVariables(v, data)
            );

            const hashtags = getHashtags(data.businessType);

            return {
                main: mainContent,
                variations: contentVariations.join('\n\n'),
                hashtags: hashtags.join(' ')
            };
        } catch (error) {
            console.error('Template processing error:', error);
            return {
                main: 'Error generating content. Please try again.',
                variations: 'Error generating variations.',
                hashtags: '#Error #TryAgain'
            };
        }
    }

    replaceTemplateVariables(template, data) {
        return template
            .replace(/{location}/g, data.location || 'your destination')
            .replace(/{season}/g, data.season || 'this season')
            .replace(/{target}/g, data.target || 'visitors')
            .replace(/{tone}/g, data.tone || 'friendly')
            .replace(/{keywords}/g, data.keywords || 'amazing features')
            .replace(/{businessType}/g, data.businessType || 'business');
    }

    displayContent(type) {
        const outputArea = document.getElementById(`${type}-content`);
        if (!outputArea) return;

        const content = this.currentContent[type];
        if (content) {
            outputArea.textContent = content; // Use textContent for security
        } else {
            outputArea.innerHTML = '<div class="welcome-message">No content available for this tab.</div>';
        }
    }

    showLoading() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<span class="spinner"></span> Generating Ideas...';
        }
    }

    hideLoading() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.textContent = '🎯 Generate Content Ideas';
        }
    }

    showStatus(message, type = 'success') {
        const statusElement = document.getElementById('generate-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-message ${type}`;
        }
    }

    showError(message) {
        const outputArea = document.getElementById('main-content');
        if (outputArea) {
            outputArea.innerHTML = `<div class="error-message">❌ ${message}</div>`;
        }
    }

    showCopyButton() {
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.style.display = 'block';
        }
    }

    async handleCopy() {
        const activeTab = document.querySelector('.tab.active');
        if (!activeTab) return;

        const tabType = activeTab.getAttribute('data-tab');
        const content = this.currentContent[tabType];

        if (!content) {
            this.showStatus('No content to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(content);
            
            const copyBtn = document.getElementById('copyBtn');
            if (copyBtn) {
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy to Clipboard';
                }, 2000);
            }
            
            this.showStatus('Content copied to clipboard!', 'success');
        } catch (error) {
            console.error('Copy failed:', error);
            this.showStatus('Failed to copy content', 'error');
        }
    }
}

// Error handling for missing dependencies
function checkDependencies() {
    if (typeof getTemplate === 'undefined') {
        console.error('Templates not loaded. Make sure templates.js is loaded before script.js');
        return false;
    }
    return true;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    if (checkDependencies()) {
        new ContentGenerator();
    } else {
        console.error('Application failed to initialize due to missing dependencies');
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
}); 