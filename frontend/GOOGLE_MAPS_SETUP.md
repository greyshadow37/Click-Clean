# Google Maps API Setup Guide

## Step-by-Step Instructions

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "Click Clean Maps")
4. Click "Create"

### 2. Enable Required APIs
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable the following APIs:
   - **Maps JavaScript API** (required for displaying maps)
   - **Places API** (optional, for location search/autocomplete)
   - **Geocoding API** (optional, for converting addresses to coordinates)

### 3. Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Click "Restrict Key" to add security:
   - Select "HTTP referrers" for Website restrictions
   - Add your domain: `localhost:3000/*` (for development)
   - Add your production domain when deploying

### 4. Configure Environment Variables
1. In your project root (`d:\Click-Clean\frontend\`), open `.env.local`
2. Replace the placeholder with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### 5. Test the Integration
1. Start your development server: `npm run dev`
2. Navigate to the Tracking page
3. You should now see an interactive Google Map with markers

## Troubleshooting

### Map Not Loading
- Check that your API key is correctly set in `.env.local`
- Verify the APIs are enabled in Google Cloud Console
- Check browser console for specific error messages

### API Key Errors
- Make sure the key is not restricted to wrong domains
- Check that billing is enabled on your Google Cloud project (required for Maps API)

### Quota Exceeded
- Google Maps API has free tier limits
- Monitor usage in Google Cloud Console > APIs & Services > Quotas

## Security Best Practices
- Never commit API keys to version control
- Use restricted API keys in production
- Rotate keys periodically
- Monitor API usage and costs

## Cost Information
- Google Maps API has a generous free tier
- $200 monthly credit for new users
- Pay-as-you-go pricing after free tier
- Monitor costs in Google Cloud Console

## Alternative: Mapbox (Optional)
If you prefer an alternative to Google Maps:

1. Sign up at [Mapbox](https://account.mapbox.com/)
2. Get your access token
3. Install Mapbox GL JS: `npm install mapbox-gl`
4. Use Mapbox instead of Google Maps in your components

The current implementation uses Google Maps, but you can easily switch to Mapbox or other mapping providers.