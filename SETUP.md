# OpenAI Integration Setup Guide

This guide will help you set up the Tourism AI Content Generator with real OpenAI API integration.

## 🚀 **Prerequisites**

1. **Node.js** (version 14 or higher)
2. **OpenAI API Key** (get one at https://platform.openai.com/api-keys)
3. **Git** (for version control)

## 📋 **Step-by-Step Setup**

### **Step 1: Get OpenAI API Key**

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key (it starts with `sk-`)
5. **Keep this key secure** - don't share it publicly

### **Step 2: Configure Environment Variables**

1. **Copy the example environment file**:
   ```bash
   cp env.example .env
   ```

2. **Edit the .env file**:
   ```bash
   nano .env
   # or use your preferred text editor
   ```

3. **Add your OpenAI API key**:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3000
   ```

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Start the Server**

```bash
npm start
```

The server will start on `http://localhost:3000`

### **Step 5: Test the Application**

1. Open your browser to `http://localhost:3000`
2. Fill out the form with your tourism business details
3. **Optional**: Upload an image of your business, property, or location
4. Click "Generate Content Ideas"
5. You should see real AI-generated content inspired by your image!

## 🖼️ **Image Upload Feature**

### **Supported Formats**
- **JPG/JPEG**: Best for photos
- **PNG**: Good for graphics and transparent images
- **GIF**: Animated images supported
- **File size limit**: 5MB maximum

### **How It Works**
1. **Upload an image** of your business, property, or location
2. **AI analyzes the image** using GPT-4 Vision
3. **Content is generated** with visual context
4. **Images are automatically deleted** after processing for privacy

### **Best Practices**
- **Use high-quality images** for better results
- **Include your property/business** in the image
- **Show the location/area** around your business
- **Avoid personal photos** - focus on business/location

## 🔧 **Development Mode**

For development with auto-restart:

```bash
npm run dev
```

## 🌐 **Deployment Options**

### **Option 1: Local Development**
- Run `npm start` for production mode
- Run `npm run dev` for development mode

### **Option 2: Heroku Deployment**
1. Create a Heroku account
2. Install Heroku CLI
3. Run these commands:
   ```bash
   heroku create your-app-name
   heroku config:set OPENAI_API_KEY=your-api-key
   git push heroku main
   ```

### **Option 3: Vercel Deployment**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

### **Option 4: Railway Deployment**
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically

## 🔒 **Security Considerations**

1. **Never commit your .env file** - it's already in .gitignore
2. **Use environment variables** for API keys in production
3. **Monitor API usage** to avoid unexpected charges
4. **Set up rate limiting** for production deployments

## 💰 **OpenAI API Costs**

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4 Vision**: ~$0.01 per image analysis
- **Typical content generation**: ~$0.01-0.05 per request
- **With image upload**: ~$0.02-0.08 per request
- **Monthly cost estimate**: $5-100 depending on usage and image uploads

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"API key not found"**
   - Check that your .env file exists
   - Verify the API key is correct
   - Restart the server after adding the key

2. **"Failed to generate content"**
   - Check your internet connection
   - Verify your OpenAI API key is valid
   - Check OpenAI service status

3. **"CORS error"**
   - Make sure the server is running on the correct port
   - Check that the frontend is accessing the correct URL

### **Debug Mode**

Enable debug logging by adding to server.js:
```javascript
const DEBUG = true;
console.log('API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Missing');
```

## 📊 **Monitoring Usage**

### **OpenAI Dashboard**
- Monitor usage at https://platform.openai.com/usage
- Set up billing alerts
- Track API response times

### **Application Logs**
- Check server logs for errors
- Monitor response times
- Track successful vs failed requests

## 🔄 **Updating the Application**

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Install new dependencies**:
   ```bash
   npm install
   ```

3. **Restart the server**:
   ```bash
   npm start
   ```

## 🎯 **Next Steps**

1. **Add user authentication** for multi-user support
2. **Implement content saving** to database
3. **Add analytics tracking** for usage insights
4. **Create admin dashboard** for content management
5. **Add image generation** with DALL-E integration
6. **Implement image optimization** for faster uploads
7. **Add multiple image support** for galleries

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section above
2. Review OpenAI API documentation
3. Check server logs for error details
4. Verify your API key has sufficient credits

---

**Your Tourism AI Content Generator is now fully functional with real AI-powered content generation!** 🎉 