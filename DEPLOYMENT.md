# Deployment Guide - Google Cloud Platform

This guide will help you deploy the Indian Election Assistant to Google Cloud Platform using App Engine.

## Prerequisites

1. **Google Cloud Account**: Create one at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud SDK**: Install from [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
3. **Node.js**: Version 18 or higher
4. **Google Cloud Account**: `aishorts457@gmail.com`
5. **Project ID**: `attempt1-495115`

## Quick Deployment

### Option 1: Using the Deployment Script (Recommended)

```bash
# Make the script executable (Linux/Mac)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

For Windows (PowerShell):
```powershell
bash deploy.sh
```

### Option 2: Manual Deployment

Follow these steps for manual deployment:

#### Step 1: Install Google Cloud SDK

Download and install from: https://cloud.google.com/sdk/docs/install

#### Step 2: Authenticate

```bash
gcloud auth login
```

#### Step 3: Set Project

```bash
gcloud config set project attempt1-495115
```

#### Step 4: Enable Required APIs

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable maps-backend.googleapis.com
```

#### Step 5: Create App Engine Application

```bash
# Select region (e.g., asia-south1 for Mumbai, India)
gcloud app create --region=asia-south1
```

#### Step 6: Deploy

```bash
gcloud app deploy app.yaml
```

## Configuration Files

### app.yaml
- Configures App Engine runtime and settings
- Defines static file handlers
- Sets security headers
- Located at: `app.yaml`

### .gcloudignore
- Specifies files to exclude from deployment
- Similar to .gitignore
- Located at: `.gcloudignore`

## Post-Deployment Configuration

### 1. Update API Keys

You need to configure the following API keys in `index.html`:

#### Google Maps API Key (Line 30)
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_MAPS_API_KEY&libraries=places" defer></script>
```

**To get your API key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services > Credentials
3. Create credentials > API key
4. Enable Maps JavaScript API and Places API
5. Restrict the key to your domain

#### Google Analytics ID (Line 33)
```javascript
gtag('config', 'G-XXXXXXXXXX', {
```

**To get your Analytics ID:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Get your Measurement ID (G-XXXXXXXXXX)

#### Firebase Configuration (Lines 49-57)
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "extended-tenure-479214-r4.firebaseapp.com",
  projectId: "extended-tenure-479214-r4",
  storageBucket: "extended-tenure-479214-r4.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX"
};
```

**To get Firebase config:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Add project (use existing GCP project: extended-tenure-479214-r4)
3. Add web app
4. Copy the configuration

### 2. Enable Firebase Services

```bash
# Initialize Firebase in your project
firebase init

# Select:
# - Firestore
# - Hosting (optional)
# - Storage (optional)
```

## Useful Commands

### View Application
```bash
gcloud app browse
```

### View Logs
```bash
gcloud app logs tail -s default
```

### View Logs in Real-time
```bash
gcloud app logs tail -s default --level=info
```

### Deploy Specific Version
```bash
gcloud app deploy --version=v1 --no-promote
```

### List Versions
```bash
gcloud app versions list
```

### Delete Old Versions
```bash
gcloud app versions delete v1 v2
```

### View App Details
```bash
gcloud app describe
```

## Monitoring and Management

### Google Cloud Console
Access your application dashboard:
```
https://console.cloud.google.com/appengine?project=extended-tenure-479214-r4
```

### Key Metrics to Monitor
- Request count
- Response time
- Error rate
- Instance count
- Memory usage
- CPU usage

## Scaling Configuration

The app is configured with automatic scaling in `app.yaml`:

```yaml
automatic_scaling:
  min_idle_instances: 0
  max_idle_instances: 1
  min_pending_latency: 30ms
  max_pending_latency: automatic
  max_concurrent_requests: 50
```

### Adjust Scaling
Edit `app.yaml` and redeploy:

```yaml
automatic_scaling:
  min_instances: 1      # Always keep 1 instance running
  max_instances: 10     # Scale up to 10 instances
  target_cpu_utilization: 0.65
  target_throughput_utilization: 0.75
```

## Cost Optimization

### Free Tier Limits
- 28 instance hours per day
- 1 GB outbound data per day
- 5 GB Cloud Storage

### Tips to Reduce Costs
1. Set `min_idle_instances: 0` to scale to zero
2. Use caching effectively
3. Optimize static assets
4. Monitor usage regularly
5. Delete unused versions

## Security Best Practices

### 1. Content Security Policy
Already configured in `index.html` (line 12)

### 2. HTTPS Only
Enforced in `app.yaml` with `secure: always`

### 3. API Key Restrictions
- Restrict API keys to your domain
- Enable only required APIs
- Rotate keys regularly

### 4. Environment Variables
For sensitive data, use environment variables:

```yaml
env_variables:
  API_KEY: 'your-secret-key'
```

## Troubleshooting

### Deployment Fails
```bash
# Check logs
gcloud app logs tail -s default

# Verify project
gcloud config get-value project

# Check quota
gcloud app describe
```

### Application Not Loading
1. Check if deployment succeeded
2. Verify static files are uploaded
3. Check browser console for errors
4. Review App Engine logs

### Maps Not Working
1. Verify API key is correct
2. Enable Maps JavaScript API
3. Check API key restrictions
4. Verify billing is enabled

### Firebase Errors
1. Verify Firebase project is linked
2. Check Firebase configuration
3. Enable required Firebase services
4. Review Firebase console logs

## Rollback

If something goes wrong, rollback to previous version:

```bash
# List versions
gcloud app versions list

# Route traffic to previous version
gcloud app services set-traffic default --splits=v1=1
```

## Custom Domain

### Add Custom Domain
```bash
gcloud app domain-mappings create example.com
```

### Verify Domain
Follow the verification steps in Cloud Console

### Update DNS
Add the provided DNS records to your domain registrar

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Google Cloud

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Cloud SDK
      uses: google-github-actions/setup-gcloud@v0
      with:
        project_id: extended-tenure-479214-r4
        service_account_key: ${{ secrets.GCP_SA_KEY }}
    
    - name: Deploy
      run: gcloud app deploy app.yaml --quiet
```

## Support

### Resources
- [App Engine Documentation](https://cloud.google.com/appengine/docs)
- [Google Cloud Console](https://console.cloud.google.com)
- [Firebase Console](https://console.firebase.google.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-app-engine)

### Project Links
- **Project ID**: extended-tenure-479214-r4
- **Console**: https://console.cloud.google.com/appengine?project=extended-tenure-479214-r4
- **Logs**: https://console.cloud.google.com/logs?project=extended-tenure-479214-r4

## Next Steps

After successful deployment:

1. ✅ Update all API keys
2. ✅ Configure Firebase services
3. ✅ Set up custom domain (optional)
4. ✅ Configure monitoring alerts
5. ✅ Test all features
6. ✅ Set up CI/CD (optional)
7. ✅ Review security settings
8. ✅ Monitor costs

---

**Deployment Date**: 2026-05-02  
**Project**: Indian Election Assistant  
**Platform**: Google Cloud App Engine  
**Region**: asia-south1 (recommended for India)