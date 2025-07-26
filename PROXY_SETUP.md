# TMDB Proxy Server Setup Guide

This guide will help you set up a proxy server to bypass TMDB API restrictions imposed by certain ISPs (like Jio).

## 🎯 What This Solution Does

- **Bypasses ISP restrictions** on TMDB APIs
- **Keeps all other functionality intact** (Firebase auth, AI chat, etc.)
- **Provides a seamless experience** for users on restricted networks
- **Easy to switch** between proxy and direct API modes

## 📁 Project Structure

```
netflix-gpt/
├── src/
│   ├── utils/
│   │   ├── proxyApi.js          # New proxy API utilities
│   │   ├── apiConfig.js         # API configuration
│   │   └── constant.js          # Original TMDB config (unchanged)
│   └── hooks/                   # Updated to use proxy
└── ../server/                   # New proxy server directory
    ├── server.js               # Main proxy server
    ├── package.json            # Server dependencies
    ├── setup.js               # Setup script
    ├── env.example            # Environment template
    └── README.md              # Server documentation
```

## 🚀 Quick Setup

### 1. Set Up Proxy Server

```bash
# Navigate to server directory
cd ../server

# Run setup script
npm run setup

# Install dependencies (if not done by setup)
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `../server` directory:

```env
TMDB_ACCESS_TOKEN=your_actual_tmdb_access_token_here
PORT=5000
```

### 3. Start the Proxy Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 4. Update Frontend Configuration (Optional)

Add to your frontend `.env` file:

```env
REACT_APP_API_MODE=proxy
REACT_APP_PROXY_URL=http://localhost:5000
```

## 🔧 How It Works

### Before (Direct TMDB API)
```javascript
// Direct API call (blocked by Jio)
fetch('https://api.themoviedb.org/3/movie/now_playing', TMDB_API_OPTIONS)
```

### After (Proxy Server)
```javascript
// Proxy API call (bypasses restrictions)
fetch('http://localhost:5000/api/movies/now-playing')
```

## 📡 API Endpoints

The proxy server provides these endpoints:

| Original TMDB Endpoint | Proxy Endpoint |
|----------------------|----------------|
| `/movie/now_playing` | `/api/movies/now-playing` |
| `/movie/popular` | `/api/movies/popular` |
| `/movie/top_rated` | `/api/movies/top-rated` |
| `/movie/upcoming` | `/api/movies/upcoming` |
| `/movie/{id}` | `/api/movies/{id}` |
| `/movie/{id}/videos` | `/api/movies/{id}/videos` |
| `/movie/{id}/similar` | `/api/movies/{id}/similar` |
| `/search/movie` | `/api/search/movies?query={query}` |
| `/discover/movie` | `/api/discover/movies?with_genres={genre}` |

## 🔄 Switching Between Modes

### Use Proxy Server (Recommended for Jio users)
```env
REACT_APP_API_MODE=proxy
REACT_APP_PROXY_URL=http://localhost:5000
```

### Use Direct TMDB API (For other ISPs)
```env
REACT_APP_API_MODE=direct
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per minute per IP
- **CORS Protection**: Only allows requests from your frontend
- **Input Validation**: Validates all parameters
- **Error Handling**: Comprehensive error responses
- **Security Headers**: Helmet.js protection

## 🧪 Testing

### Test Proxy Server
```bash
# Health check
curl http://localhost:5000/health

# Test movie endpoint
curl http://localhost:5000/api/movies/now-playing
```

### Test Frontend
1. Start your React app: `npm start`
2. Navigate to the browse page
3. Check browser console for API mode confirmation
4. Verify movies are loading

## 🐛 Troubleshooting

### Proxy Server Issues
1. **Port already in use**: Change PORT in .env file
2. **TMDB token invalid**: Verify your TMDB_ACCESS_TOKEN
3. **CORS errors**: Check if frontend URL is in allowed origins

### Frontend Issues
1. **Movies not loading**: Check if proxy server is running
2. **API errors**: Verify proxy URL in environment variables
3. **Network errors**: Ensure proxy server is accessible

### Common Error Messages
- `TMDB_ACCESS_TOKEN is required`: Add token to .env file
- `Too many requests`: Wait for rate limit to reset
- `Endpoint not found`: Check endpoint URL

## 📊 Monitoring

### Server Logs
The proxy server logs all requests and errors:
```bash
# View logs in real-time
npm run dev
```

### Health Check
```bash
curl http://localhost:5000/health
# Returns: {"status":"OK","message":"TMDB Proxy Server is running"}
```

## 🔄 Deployment

### Local Development
```bash
# Terminal 1: Start proxy server
cd ../server && npm run dev

# Terminal 2: Start frontend
npm start
```

### Production Deployment
1. Deploy proxy server to a cloud service (Heroku, Vercel, etc.)
2. Update `REACT_APP_PROXY_URL` to your deployed server URL
3. Set environment variables on your hosting platform

## 📝 Notes

- **Firebase Authentication**: Unchanged - continues to work normally
- **AI Chat**: Unchanged - continues to work normally
- **YouTube API**: Unchanged - continues to work normally
- **Image URLs**: Unchanged - TMDB CDN images still work directly

## 🆘 Support

If you encounter issues:
1. Check the server logs for error messages
2. Verify your TMDB access token is valid
3. Ensure the proxy server is running and accessible
4. Check browser console for frontend errors

## 🎉 Success!

Once set up, your app will work seamlessly on Jio network, bypassing the TMDB API restrictions while maintaining all other functionality. 