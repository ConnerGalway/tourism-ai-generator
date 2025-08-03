# Tourism AI Content Idea Generator

A modern, accessible web application for generating tourism content ideas with AI-powered assistance. Built with vanilla JavaScript, HTML5, and CSS3 with a focus on security, accessibility, and user experience.

## 🚀 Features

### Core Functionality
- **Content Generation**: Generate blog posts, social media content, email campaigns, and more
- **Business Type Support**: Hotels, restaurants, tour operators, attractions, destinations, and vacation rentals
- **Target Audience Focus**: Content tailored for families, couples, solo travelers, groups, business travelers, adventure seekers, and luxury travelers
- **Seasonal Content**: Generate content specific to different seasons and time periods
- **Tone Customization**: Friendly, professional, exciting, luxury, casual, and informative tones

### Technical Features
- **Security**: Input sanitization and XSS prevention
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized loading and efficient code structure

### User Experience
- **Real-time Validation**: Form validation with immediate feedback
- **Loading States**: Visual feedback during content generation
- **Copy to Clipboard**: Easy content copying functionality
- **Tab Navigation**: Organized content display with keyboard navigation
- **Status Messages**: Clear feedback for all user actions

## 📁 Project Structure

```
tourism-ai-generator/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # External CSS with custom properties
├── templates.js        # Content templates and utilities
├── script.js           # Main JavaScript functionality
└── README.md          # This documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation

1. **Clone or Download**
   ```bash
   # If using git
   git clone <repository-url>
   cd tourism-ai-generator
   
   # Or download and extract the files
   ```

2. **Start Local Server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   ```
   http://localhost:8000
   ```

### Development Setup

For enhanced development experience:

1. **Install Live Server Extension** (VS Code)
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

2. **Code Formatting**
   - Use Prettier for consistent code formatting
   - Configure your editor for HTML, CSS, and JavaScript formatting

## 🎨 Customization

### Adding New Business Types

1. **Update HTML Options**
   ```html
   <option value="new-business">New Business Type</option>
   ```

2. **Add Templates**
   ```javascript
   // In templates.js
   TEMPLATES.blog.new-business = `Your template here...`;
   TEMPLATES.social.new-business = `Your social template...`;
   ```

3. **Add Variations and Hashtags**
   ```javascript
   VARIATIONS.new-business = ["Variation 1", "Variation 2"];
   HASHTAG_SETS.new-business = ["#NewBusiness", "#Local"];
   ```

### Styling Customization

The CSS uses custom properties for easy theming:

```css
:root {
    --primary-color: #2196F3;    /* Change main brand color */
    --success-color: #4CAF50;    /* Change success color */
    --border-radius: 10px;       /* Change border radius */
    --transition: all 0.3s ease; /* Change animation speed */
}
```

## 🔒 Security Features

### Input Sanitization
- All user inputs are sanitized to prevent XSS attacks
- HTML tags are stripped from inputs
- Content is displayed using `textContent` instead of `innerHTML`

### Error Handling
- Comprehensive error catching and user feedback
- Graceful degradation for missing dependencies
- Global error handlers for uncaught exceptions

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA Labels**: Screen reader support for all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Meets WCAG contrast requirements
- **Screen Reader Support**: Proper ARIA roles and descriptions

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Flexible Layout**: Adapts to different screen sizes
- **Touch Friendly**: Large touch targets for mobile users

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation works correctly
- [ ] Content generation produces expected results
- [ ] Tab navigation works with mouse and keyboard
- [ ] Copy to clipboard functionality works
- [ ] Error messages display appropriately
- [ ] Loading states show correctly
- [ ] Responsive design works on different screen sizes
- [ ] Accessibility features work with screen readers

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Static Hosting Options

1. **Netlify**
   ```bash
   # Drag and drop the folder to Netlify
   # Or use Netlify CLI
   netlify deploy
   ```

2. **Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings

4. **Traditional Hosting**
   - Upload files to web server
   - Ensure proper MIME types are set

### Production Considerations

1. **Performance**
   - Minify CSS and JavaScript
   - Enable gzip compression
   - Use CDN for static assets

2. **Security**
   - Enable HTTPS
   - Set proper security headers
   - Implement CSP (Content Security Policy)

3. **Monitoring**
   - Add analytics tracking
   - Monitor error rates
   - Track user engagement

## 🔧 API Integration

### Replacing Mock Data

To integrate with a real AI API:

1. **Update `simulateApiCall()` in `script.js`**
   ```javascript
   async simulateApiCall(formData) {
       const response = await fetch('/api/generate-content', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData)
       });
       
       if (!response.ok) {
           throw new Error('API request failed');
       }
       
       return response.json();
   }
   ```

2. **Update Content Generation**
   ```javascript
   // Replace generateMockContent with API response processing
   this.currentContent = await this.processApiResponse(apiResponse);
   ```

## 📊 Analytics Integration

### Google Analytics
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking
```javascript
// Track content generation
gtag('event', 'generate_content', {
    'business_type': formData.businessType,
    'content_type': formData.contentType
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Content Not Generating**
   - Check browser console for errors
   - Verify all files are loaded correctly
   - Ensure templates.js is loaded before script.js

2. **Styling Issues**
   - Clear browser cache
   - Check CSS file path
   - Verify CSS custom properties support

3. **Accessibility Issues**
   - Test with screen reader
   - Check keyboard navigation
   - Validate ARIA attributes

### Debug Mode

Enable debug logging:
```javascript
// Add to script.js
const DEBUG = true;

function debugLog(message) {
    if (DEBUG) {
        console.log(`[DEBUG] ${message}`);
    }
}
```

## 🤝 Contributing

### Development Guidelines

1. **Code Style**
   - Use consistent indentation (2 spaces)
   - Follow existing naming conventions
   - Add comments for complex logic

2. **Accessibility**
   - Test with screen readers
   - Ensure keyboard navigation works
   - Maintain color contrast ratios

3. **Testing**
   - Test on multiple browsers
   - Test on mobile devices
   - Validate HTML and CSS

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons from Unicode emoji
- Color schemes inspired by Material Design
- Accessibility guidelines from WCAG 2.1

## 📞 Support

For issues, questions, or contributions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Browser Support**: Modern browsers (ES6+)  
**Accessibility**: WCAG 2.1 AA compliant 