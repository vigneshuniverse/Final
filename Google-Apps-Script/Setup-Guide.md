# Google Apps Script Setup Guide

Follow These Steps Carefully. Takes About 10–15 Minutes.

---

## Step 1: Create Or Update The Apps Script Project

1. Open [https://script.google.com](https://script.google.com) While Logged In As Your Founder Email
2. Open Existing Project **OR** Click **New project**
3. Rename To: `VigneshUniverse-Admin`
4. Delete Default `Code.gs` Content
5. Copy **All Content** From `Code.gs` (In This Folder) And Paste
6. Click **+** Next To Files → **HTML** → Name Exactly `Admin`
7. Paste All Content From `Admin.html`
8. Click **Save** (Ctrl+S)

**Founder Email Check:** In `Code.gs`, Line Near Top:
```js
var FOUNDER_EMAIL = 'founder.vigneshuniverse@gmail.com';
```
Change If Your Admin Google Account Is Different.

---

## Step 2: Deploy As Web App

1. Click **Deploy** → **New deployment** (Or Manage Deployments → Edit Existing)
2. Gear Icon ⚙️ → **Web App**
3. Fill In:
   - Description: `Vignesh Universe Admin v1`
   - Execute As: **Me**
   - Who Has Access: **Anyone**
4. Click **Deploy**
5. Authorize When Prompted (Allow)
6. **Copy The Web App URL**  
   Example: `https://script.google.com/macros/s/AKfycbxxxxxxxx/exec`

---

## Step 3: Connect The Website

1. Open `Assets/Js/Config.js`
2. Paste The Web App URL In **Both** Places:

```js
window.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxx/exec';
window.ADMIN_PANEL_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxx/exec';
```

3. Save And Upload To GitHub

---

## Step 4: Open Admin Panel

1. Website Homepage → Footer → **Admin Login**
2. Logged In As Founder Email → Admin Dashboard Appears
3. If "Access Denied" → Wrong Google Account

---

## Email Routing (Automatic)

When Someone Submits The Contact Form:

| Business Selected | Email Goes To |
|-------------------|---------------|
| Vignesh Digital Hub | vigneshdigitalhub1@gmail.com |
| Vignesh Digital Electronics Service | vigneshdigitalservice1@gmail.com |
| Vignesh Pixel Works | vigneshpixelworks1@gmail.com |
| Vignesh Digital Marketing | vigneshdigitalmarketer1@gmail.com |
| Vignesh Technologies | vigneshtechnologies1@gmail.com |

Also Saved In Sheet: **VigneshUniverse-Data** → **Contacts**  
Columns: Timestamp, Name, Email, Phone, Business, Message

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin Access Denied | Login As Founder Email In Code.gs |
| Form Says Configure URL | Paste Web App URL In config.js |
| No Email Received | Redeploy Code.gs; Check Spam; GmailApp Needs Authorization |
| Products Not Loading | Deployment Must Be "Anyone" |
| Sheet Not Found | Open Admin Once – Sheets Auto-Create |
