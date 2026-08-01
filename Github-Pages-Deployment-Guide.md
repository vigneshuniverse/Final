# Github Pages Deployment Guide

**Project :** Vignesh Universe  
**Live Example :** [https://vigneshuniverse.github.io/Final/](https://vigneshuniverse.github.io/Final/)  
**Time Needed :** About 10–15 Minutes  

This Guide Shows How To Publish Your Complete Website Package On **Github Pages** For Free.

---

## Table Of Contents

1. [Before You Start](#before-you-start)
2. [Method A – New Repository](#method-a--new-repository)
3. [Method B – Existing Repository](#method-b--existing-repository)
4. [Enable Github Pages](#enable-github-pages)
5. [Custom Path / Folder Name](#custom-path--folder-name)
6. [Connect Google Apps Script](#connect-google-apps-script)
7. [Verify The Live Site](#verify-the-live-site)
8. [Update The Website Later](#update-the-website-later)
9. [Custom Domain (Optional)](#custom-domain-optional)
10. [Troubleshooting](#troubleshooting)

---

## Before You Start

You Need :

- A Free [Github](https://github.com) Account
- The Complete Website Zip / Folder (`Final-main` Or Your Project Files)
- (Optional) Google Account For Apps Script Backend (Contact Form, Shopping, Admin)

**Important :** Upload Files So That `Index.html` Is At The Root Of The Branch You Publish (Or Inside `/docs` If You Choose That Option).

---

## Method A – New Repository

### Step 1 : Create Repository

1. Go To [Https://Github.Com/New](https://github.com/new)
2. **Repository Name:** Example `Final` Or `Vignesh-Universe`
3. Choose **Public** (Required For Free Github Pages On Normal Accounts)
4. Do **Not** Tick “Add A README” If You Will Upload Your Own Files
5. Click **Create Repository**

### Step 2 : Upload Your Files

**Option 1 – Upload In Browser**

1. Open Your New Repo
2. Click **Add File → Upload Files**
3. Drag **All Files** From Inside `Final-main` (Not The Outer Folder Itself)
4. Make Sure You See At Root Level:
   - `Index.html`
   - `Contact.html`
   - `Assets/`
   - `manifest.json`
   - Etc.
5. Commit Message: `Initial Website Upload`
6. Click **Commit Changes**

**Option 2 – Git Command Line**

```bash
cd Final-main
git init
git add .
git commit -m "Initial Website Upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` And `YOUR_REPO` With Your Real Values.

---

## Method B – Existing Repository

1. Open Your Existing Repo On Github
2. Upload Or Push The Same Files So `Index.html` Is At The Root (Or In `/docs`)
3. Commit And Push To The Branch You Will Use For Pages (Usually `main`)

---

## Enable Github Pages

1. Open Your Repository On Github
2. Click **Settings**
3. Left Sidebar → **Pages**
4. Under **Build And Deployment**:
   - **Source:** Deploy From A Branch
   - **Branch:** `main` (Or `master`)
   - **Folder:** `/ (Root)`  
     Or `/docs` If You Put Files Inside A `docs` Folder
5. Click **Save**

Wait 1–3 Minutes. Github Will Show A Green Banner With Your Live Url:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

**Your Current Live Url Pattern:**

```
https://vigneshuniverse.github.io/Final/
```

---

## Custom Path / Folder Name

| Repo Name | Live Url |
|-----------|----------|
| `Final` | `https://username.github.io/Final/` |
| `Vignesh-Universe` | `https://username.github.io/Vignesh-Universe/` |
| `username.github.io` (Special) | `https://username.github.io/` (Root Site) |

If Your Repo Is Named `username.github.io`, The Site Is Served From The Domain Root.

**Canonical / Og Links:**  
If You Change The Repo Name Or Path, Update These In `Index.html` (And Other Pages If Present):

- `<link rel="canonical" href="...">`
- `og:url`
- `og:image` Absolute Urls

---

## Connect Google Apps Script

Github Pages Only Hosts The **Static** Website. Contact Form, Shopping Products, And Admin Need Apps Script.

1. Follow **`Google-Apps-Script/Setup-Guide.md`**
2. Deploy As Web App:
   - Execute As: **Me**
   - Who Has Access: **Anyone**
3. Copy The Web App Url
4. Open `Assets/Js/Config.js` And Paste In **Both** Places:

```js
window.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
window.ADMIN_PANEL_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

5. Commit And Push `Config.js` Again
6. Wait A Minute, Then Hard-Refresh The Live Site (Ctrl+F5)

Without This Step:

- Contact Form Shows “Configure Google Apps Script Url”
- Shopping Page Cannot Load Products
- Admin Login Link May Not Work Correctly

---

## Verify The Live Site

Open Your Live Url And Check:

| Check | How |
|-------|-----|
| Homepage Loads | Open Root Url |
| Navigation Works | Home, About, Businesses, Shopping, Contact |
| Business Pages | Open Each Of The 5 Service Pages |
| Contact Form | Submit A Test Message (After Apps Script Setup) |
| Shopping | Products Appear (After Adding In Admin) |
| Whatsapp / Call Buttons | Open On Mobile |
| Privacy Policy | Footer Link |
| Admin Login | Footer → Must Be Logged In As Founder Email |
| Mobile Menu | Hamburger Icon On Small Screen |

---

## Update The Website Later

1. Edit Files Locally Or On Github
2. Commit And Push To The Same Branch (`main`)
3. Github Pages Updates Automatically In About 1–3 Minutes
4. Hard-Refresh Browser (Ctrl+F5) Or Clear Cache If You Still See Old Content

For Apps Script Changes:

1. Edit `Code.gs` / `Admin.html` In Script Editor
2. **Deploy → Manage Deployments → Edit → New Version → Deploy**
3. Url Usually Stays The Same; No Need To Change `Config.js` Unless You Create A Brand-New Deployment

---

## Custom Domain (Optional)

1. Buy A Domain (E.g. From Namecheap, GoDaddy, Google Domains)
2. Repo → **Settings → Pages → Custom Domain**
3. Enter Your Domain (E.g. `www.vigneshuniverse.com`)
4. Follow Github’s DNS Instructions (A Records Or Cname)
5. Wait For Dns Propagation (Minutes To Hours)
6. Optional: Enable **Enforce HTTPS**

Also Update Canonical And Open Graph Urls In Your Html To The New Domain.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Page Not Found | Pages Not Enabled, Wrong Branch, Or `Index.html` Not At Root |
| Old Content Still Showing | Wait 2–3 Min; Hard-Refresh (Ctrl+F5); Check Correct Branch |
| Css / Images Missing | Paths Must Be Relative (`Assets/Css/Common.css`); Do Not Move Folders |
| Blank Page | Check Browser Console (F12) For Errors; Confirm `Index.html` Exists |
| Form “Configure Url” | Paste Real Web App Url In `Assets/Js/Config.js` And Push |
| Admin Access Denied | Login To Google As Email Set In `Code.gs` (`FOUNDER_EMAIL`) |
| Pages Option Missing | Repo Must Be **Public** (Or Use Github Pro For Private Pages) |
| Site Url Has Extra Folder | You Uploaded The Outer `Final-main` Folder; Upload **Inner** Files Only |

---

## Quick Checklist

- [ ] Github Account Ready  
- [ ] New Or Existing Public Repository  
- [ ] All Website Files At Repo Root (`Index.html` Visible)  
- [ ] Settings → Pages → Branch `main` → Folder `/ (Root)` → Save  
- [ ] Live Url Opens In Browser  
- [ ] `Config.js` Has Real Apps Script Url (Both Lines)  
- [ ] Contact Form Tested  
- [ ] Admin Login Tested With Founder Email  

---

## Your Current Setup (Reference)

| Item | Value |
|------|--------|
| Github User | `vigneshuniverse` |
| Repository | `Final` |
| Live Site | [https://vigneshuniverse.github.io/Final/](https://vigneshuniverse.github.io/Final/) |
| Founder Email (Admin) | `founder.vigneshuniverse@gmail.com` |
| Whatsapp | +91 7448357381 |

---
*Quality. Creativity. Innovation. Growth.*
