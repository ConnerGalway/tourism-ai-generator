# Deployment Guide

## 🚀 **Deploy to Vercel (Recommended)**

### **Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

### **Step 2: Deploy**
```bash
vercel
```

### **Step 3: Add Environment Variables**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add: `OPENAI_API_KEY` with your API key value

### **Step 4: Redeploy**
```bash
vercel --prod
```

## 🌐 **Deploy to Railway**

### **Step 1: Connect GitHub**
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-deploy

### **Step 2: Add Environment Variables**
1. In Railway dashboard, go to your project
2. Click "Variables" tab
3. Add: `OPENAI_API_KEY` with your API key

## 🐳 **Deploy to Heroku**

### **Step 1: Install Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku
```

### **Step 2: Deploy**
```bash
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your-api-key
git push heroku main
```

## 📊 **Environment Variables Required**

- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Server port (optional, defaults to 3000)

## 🔒 **Security Notes**

- Never commit API keys to Git
- Use environment variables in production
- Monitor API usage to control costs
- Set up billing alerts on OpenAI dashboard

## 🌍 **Live URLs**

After deployment, your app will be available at:
- **Vercel**: `https://your-app-name.vercel.app`
- **Railway**: `https://your-app-name.railway.app`
- **Heroku**: `https://your-app-name.herokuapp.com`

## 📈 **Monitoring**

- **Vercel**: Built-in analytics and monitoring
- **Railway**: Logs and metrics in dashboard
- **Heroku**: Application logs and dyno metrics
- **OpenAI**: Usage tracking at platform.openai.com/usage 