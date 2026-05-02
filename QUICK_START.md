# 🚀 Quick Start - Google Cloud Deployment

## ⚠️ Important: Billing Account Required

Your project **promptwar-attempt-3** needs a billing account attached before deployment.

## Step 1: Set Up Billing

1. Go to [Google Cloud Console](https://console.cloud.google.com/billing)
2. Click **"Link a billing account"** or **"Create billing account"**
3. Follow the prompts to add payment information
4. Link the billing account to project: **promptwar-attempt-3**

**Note**: Google Cloud offers $300 free credits for new users, and App Engine has a generous free tier.

## Step 2: Create App Engine Application

After billing is set up, run:

```bash
gcloud app create --region=asia-south1
```

**Recommended regions for India:**
- `asia-south1` (Mumbai)
- `asia-south2` (Delhi)

## Step 3: Deploy Your Application

### Option A: Automated Deployment (Recommended)

**For Windows (PowerShell):**
```powershell
bash deploy.sh
```

**For Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option B: Manual Deployment

```bash
# 1. Build the application
npm run build

# 2. Copy required files to dist folder
Copy-Item app.yaml dist/
Copy-Item manifest.json dist/
Copy-Item sw.js dist/

# 3. Deploy from dist folder
cd dist
gcloud app deploy app.yaml --quiet
```

## Step 4: Access Your Application

After successful deployment:

```bash
# Open in browser
gcloud app browse

# Or get the URL
gcloud app browse --no-launch-browser
```

Your app will be available at:
```
https://promptwar-attempt-3.uc.r.appspot.com
```

## Step 5: Configure API Keys

Update the following in your deployed application:

### 1. Google Maps API Key
- Go to: [Google Cloud Console > APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials?project=promptwar-attempt-3)
- Create API Key
- Enable: Maps JavaScript API, Places API
- Update in `index.html` line 30

### 2. Google Analytics
- Go to: [Google Analytics](https://analytics.google.com)
- Create property for your domain
- Update measurement ID in `index.html` line 38

### 3. Firebase Configuration
- Go to: [Firebase Console](https://console.firebase.google.com)
- Add web app to project
- Copy config and update `index.html` lines 49-57

## Monitoring & Management

### View Logs
```bash
gcloud app logs tail -s default
```

### View in Console
```
https://console.cloud.google.com/appengine?project=promptwar-attempt-3
```

### Check Deployment Status
```bash
gcloud app versions list
```

## Cost Optimization

Your app is configured for minimal costs:
- **Free tier**: 28 instance hours/day
- **Auto-scaling**: Scales to zero when idle
- **F1 instance**: Smallest instance class

### Monitor Costs
```
https://console.cloud.google.com/billing?project=promptwar-attempt-3
```

## Troubleshooting

### "Billing account required" error
- Attach billing account at: https://console.cloud.google.com/billing

### "App Engine application not found"
- Run: `gcloud app create --region=asia-south1`

### Deployment fails
- Check logs: `gcloud app logs tail -s default`
- Verify project: `gcloud config get-value project`

## Next Steps

✅ **Deployment is ready!** Just need to:
1. Set up billing account
2. Run `gcloud app create --region=asia-south1`
3. Run `bash deploy.sh` or deploy manually

## Support Links

- **Project Console**: https://console.cloud.google.com/home/dashboard?project=promptwar-attempt-3
- **App Engine**: https://console.cloud.google.com/appengine?project=promptwar-attempt-3
- **Billing**: https://console.cloud.google.com/billing?project=promptwar-attempt-3
- **Full Documentation**: See `DEPLOYMENT.md`

---

**Project ID**: promptwar-attempt-3  
**Region**: asia-south1 (Mumbai, India)  
**Runtime**: Node.js 18  
**Status**: ✅ Ready to deploy (billing required)