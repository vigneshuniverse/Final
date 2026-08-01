# Vignesh Universe – Complete Website Package

**Live Website :** [https://vigneshuniverse.github.io/Final/Index.html](https://vigneshuniverse.github.io/Final/Index.html)

Static Multi-Page Website For **GitHub Pages** With A **Google Apps Script** Backend ( Admin Panel, Contact Form, Shopping Products, Email Routing ).

**Founder :** Vignesh A  
**Location :** Chennai, Tamil Nadu, India  
**Phone / Whatsapp:** +91 7448357381  
**Email :** founder.vigneshuniverse@gmail.com  

---
## Table Of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Live Pages](#live-pages)
4. [Folder Structure](#folder-structure)
5. [Tech Stack](#tech-stack)
6. [Quick Start](#quick-start)
7. [Google Apps Script Setup](#google-apps-script-setup)
8. [Email Routing](#email-routing)
9. [Contact Forms](#contact-forms)
10. [Shopping / Products](#shopping--products)
11. [Admin Panel](#admin-panel)
12. [Whatsapp Pre-Filled Messages](#whatsapp-pre-filled-messages)
13. [Pwa Support](#pwa-support)
14. [Privacy Policy](#privacy-policy)
15. [Customization Guide](#customization-guide)
16. [Troubleshooting](#troubleshooting)
17. [Deployment Checklist](#deployment-checklist)
18. [License & Contact](#license--contact)

---

## Overview

**Vignesh Universe** Is The Official Website Of Entrepreneur **Vignesh A**, Showcasing Five Professional Businesses Under One Brand :

| Business | Focus |
|----------|--------|
| **Vignesh Digital Hub** | Digital Services, Recharges, Bill Payments, Pan, Tickets, Graphic Design |
| **Vignesh Digital Electronics Service** | Laptop, Desktop, Led Tv Repair, Software, Virus Removal, Maintenance |
| **Vignesh Pixel Works** | Stock Images, Illustrations, Backgrounds, Creative Assets, Adobe Stock / Shutterstock |
| **Vignesh Digital Marketing** | Seo, Social Media, Google Ads, Meta Ads, Website Design, Analytics |
| **Vignesh Technologies** | Website Development, Mobile Apps, Software, Ui/Ux, Api Integration, Support |

The Package Is Optimized For **Github Pages**, Uses **No Bootstrap / No Font Awesome**, System Fonts, Inline Svg Icons, And Is Pagespeed-Friendly. Backend (Contacts, Products, Admin) Runs On **Google Apps Script** + **Google Sheets** + **Gmail** + **Google Drive**.

**Code Organization :** HTML, CSS And JavaScript Are Fully Separated. Each Page Has Its Own CSS File. All Filenames Start With A Capital Letter.

---

## Features

### Website
- Responsive Design (Mobile-First)
- Fixed Navbar With Mobile Hamburger Menu
- Hero Section With Profile Image
- About + Counters (5 Businesses, 500+ Projects, 100+ Clients, 24/7 Support)
- Unique Visitors Counter (Today / Weekly / Monthly / Yearly)
- Business Cards Linking To Dedicated Service Pages
- “Why Choose” Section On Every Business Page
- Client Testimonials
- Faq Accordion
- Dedicated **Contact** Page + Contact Section On Homepage
- Contact Form With **Name, Email, Phone, Business Select, Message**
- Floating Whatsapp & Call Buttons
- Back-To-Top Button
- Privacy Policy Page
- Shopping Page With Category Filters And Whatsapp Order Buttons
- PWA-Ready (`Manifest.json` + Service Worker)

### Backend (Google Apps Script)
- Contact Form → Saves To Google Sheet + Routes Email By Selected Business
- Products & Categories Crud (Admin Only)
- Image Upload To Google Drive (Public View Links)
- Admin Panel Restricted To Founder Email
- Public Product Api For Shopping Page
- Unique Visitor Tracking

### Design & Performance
- Custom Css Only (No Heavy Frameworks)
- Separated CSS Per Page + Shared Common.css
- System Font Stack
- Inline Svg Icons On All Service Cards
- Webp Images
- Smooth Scroll, Focus States, Reduced-Motion Support
- Title Case Content Style

---

## Live Pages

| Page | File | Description |
|------|------|-------------|
| Home | `Index.html` | Hero, About, Counters, Visitors, Businesses, Why, Testimonials, FAQ, Contact Form |
| Contact | `Contact.html` | Full Contact Page With Form + Business Emails |
| Shopping | `Shopping.html` | Product Grid Loaded From Apps Script |
| Digital Hub | `Digital-Hub.html` | Services + Why Choose + CTA |
| Electronics Service | `Electronics-Service.html` | Services + Why Choose + CTA |
| Pixel Works | `Pixel-Works.html` | Services + Why Choose + CTA |
| Digital Marketing | `Digital-Marketing.html` | Services + Why Choose + CTA |
| Technologies | `Technologies.html` | Services + Why Choose + CTA |
| Privacy Policy | `Privacy-Policy.html` | Full Privacy Policy |

**Live Base:** `https://vigneshuniverse.github.io/Final/`

---

## Folder Structure

```
Vignesh-Universe/  (Or Your Repo Root)
├── Index.html
├── Contact.html
├── Shopping.html
├── Digital-Hub.html
├── Electronics-Service.html
├── Pixel-Works.html
├── Digital-Marketing.html
├── Technologies.html
├── Privacy-Policy.html
├── Manifest.json
├── Sw.js
├── Robots.txt
├── Sitemap.xml
├── Favicon.webp
├── Pwa-Register-Snippet.html
├── README.md
├── Github-Pages-Deployment-Guide.md
├── Assets/
│   ├── Css/
│   │   ├── Common.css              ← Shared Styles (Navbar, Footer, Buttons, Variables)
│   │   ├── Index.css               ← Home Page Styles
│   │   ├── Contact.css             ← Contact Page Styles
│   │   ├── Shopping.css            ← Shopping Page Styles
│   │   ├── Digital-Hub.css         ← Digital Hub Page Styles
│   │   ├── Electronics-Service.css ← Electronics Service Page Styles
│   │   ├── Pixel-Works.css         ← Pixel Works Page Styles
│   │   ├── Digital-Marketing.css   ← Digital Marketing Page Styles
│   │   ├── Technologies.css        ← Technologies Page Styles
│   │   └── Privacy-Policy.css      ← Privacy Policy Page Styles
│   ├── Js/
│   │   ├── Config.js               ← Apps Script URL (Edit This)
│   │   ├── Script.js               ← Main JS (Nav, Form, Visitors, FAQ)
│   │   └── Shopping.js             ← Shopping Page Products Loader
│   └── Images/
│       ├── Icons/
│       │   ├── Icon.webp
│       │   ├── Icon-192.webp
│       │   └── Icon-512.webp
│       └── Profile/
│           └── Profile.webp
└── Google-Apps-Script/
    ├── Code.gs
    ├── Admin.html
    └── Setup-Guide.md
```

### CSS Architecture

| File | Used By | Contains |
|------|---------|----------|
| `Common.css` | All Pages | CSS Variables, Reset, Navbar, Buttons, Footer, Floating Buttons, Base Responsive |
| `Index.css` | Index.html | Hero, About, Counters, Visitors, Business Cards, Why, Testimonials, FAQ, Contact Section |
| `Contact.css` | Contact.html | Contact Hero, Contact Grid, Form Styles |
| `Shopping.css` | Shopping.html | Shop Hero, Filters, Product Cards, Empty State |
| `Digital-Hub.css` | Digital-Hub.html | Service Hero, Service Cards, CTA, Why Section |
| `Electronics-Service.css` | Electronics-Service.html | Service Hero, Service Cards, CTA, Why Section |
| `Pixel-Works.css` | Pixel-Works.html | Service Hero, Service Cards, CTA, Why Section |
| `Digital-Marketing.css` | Digital-Marketing.html | Service Hero, Service Cards, CTA, Why Section |
| `Technologies.css` | Technologies.html | Service Hero, Service Cards, CTA, Why Section |
| `Privacy-Policy.css` | Privacy-Policy.html | Privacy Hero, Content Typography, Info Boxes |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3 (Separated Per Page), Vanilla Javascript |
| Hosting | Github Pages |
| Backend | Google Apps Script (Web App) |
| Database | Google Sheets (Contacts, Categories, Products, Visitors) |
| Email | Gmail Via `Mail App` (Routed By Business) |
| Images | Google Drive (Product Images) |
| PWA | `Manifest.json` + `Sw.js` |

---

## Quick Start

### 1. Website (Github Pages)

1. Create A Github Repository (Or Use Existing).
2. Upload **All Files** From This Package To The Repo Root.
3. Go To **Settings → Pages**.
4. Source: Deploy From Branch (E.g. `Main` / Root).
5. Save. Site Will Be At :  
   `https://<username>.github.io/<repo>/`  
   Current Live: [https://vigneshuniverse.github.io/Final/](https://vigneshuniverse.github.io/Final/Index.html)

### 2. Backend (Google Apps Script)

1. Open [script.google.com](https://script.google.com) As The **Founder Email**.
2. Create/Open Project → Name E.g. `VigneshUniverse-Admin`.
3. Replace `Code.gs` With `Google-Apps-Script/Code.gs`.
4. Add HTML File Named Exactly `Admin` → Paste `Google-Apps-Script/Admin.html`.
5. **Deploy → New Deployment → Web App**:
   - Execute As: **Me**
   - Who Has Access: **Anyone**
6. Authorize When Prompted.
7. Copy The **Web App Url**.
8. Paste Into **Both** Places In `Assets/Js/Config.js`:

```js
window.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/your_deployment_id/exec';
window.ADMIN_PANEL_URL = 'https://script.google.com/macros/s/your_deployment_id/exec';
```

9. Commit And Push `Config.js`.

Full Steps: **`Google-Apps-Script/Setup-Guide.md`**.

### 3. Admin Login

- Homepage Footer → **Admin Login**
- Must Be Logged Into Google As The Founder Email In `Code.gs` (`founder.vigneshuniverse@gmail.com` By Default).

---

## Google Apps Script Setup

See: **`Google-Apps-Script/Setup-Guide.md`**

- Founder Email In `Code.gs`:
  ```js
  var FOUNDER_EMAIL = 'founder.vigneshuniverse@gmail.com';
  ```
- Sheets Auto-Created: **Contacts**, **Categories**, **Products**, **VisitorStats**, **VisitorLog**
- Spreadsheet Name: `VigneshUniverse-Data`
- Product Images Folder: `VigneshUniverse-Products`

After Any Change To `Code.gs` Or `Admin.html`, Create A **New Version** And Update The Deployment.

---

## Email Routing

| Selected Business | Email Received At |
|-------------------|-------------------|
| Vignesh Digital Hub | vigneshdigitalhub1@gmail.com |
| Vignesh Digital Electronics Service | vigneshdigitalservice1@gmail.com |
| Vignesh Pixel Works | vigneshpixelworks1@gmail.com |
| Vignesh Digital Marketing | vigneshdigitalmarketer1@gmail.com |
| Vignesh Technologies | vigneshtechnologies1@gmail.com |

Also Saved In Sheet → **Contacts** (Timestamp, Name, Email, Phone, Business, Message).

---

## Contact Forms

- Home Page (`#Contact`) And **Contact** Page (`Contact.html`)
- Fields: Name, Email, Phone, Select Business, Message
- Submits To Apps Script (`Action: 'Contact'`)

---

## Shopping / Products

- Page: `Shopping.html`
- Loads Via `get ?action=getProducts`
- Category Filters + Whatsapp Order Buttons
- Managed From Admin Panel

---

## Admin Panel

- Footer → **Admin Login**
- Tabs: Products, Sections/Categories, Contact Messages
- Restricted To Founder Email Only

---

## Whatsapp Pre-Filled Messages

Number: **+91 7448357381**

| Page | Message |
|------|---------|
| Home / Contact | General Enquiry |
| Digital Hub | Interested In Digital Hub Services |
| Electronics | Interested In Electronics Service |
| Pixel Works | Interested In Pixel Works |
| Digital Marketing | Interested In Digital Marketing |
| Technologies | Interested In Technologies |
| Shopping Product | Hello! I Am Interested In The Product: [Name] (₹ …) |

---

## PWA Support

- `Manifest.json` + `Sw.js`
- Icons: 192px & 512px Webp
- Optional Register Snippet In `Pwa-Register-Snippet.html`

---

## Privacy Policy

Full Policy At **`Privacy-Policy.html`** (Last Updated 1 August 2026). Covers Data Collection, Storage, Email Routing, Rights, And Indian Law (Chennai Jurisdiction).

---

## Customization Guide

| What | Where |
|------|--------|
| Founder / Admin Email | `FOUNDER_EMAIL` In `Code.gs` → Redeploy |
| Business Emails | `BUSINESS_EMAILS` In `Code.gs` → Redeploy |
| Whatsapp / Phone | Search `7448357381` In HTML Files |
| Apps Script Url | `Assets/Js/Config.js` (Both Variables) |
| Service Content | Respective `*-*.html` Pages |
| Homepage Text | `Index.html` |
| Shared Colors / Navbar | `Assets/Css/Common.css` |
| Home Page Styles | `Assets/Css/Index.css` |
| Contact Page Styles | `Assets/Css/Contact.css` |
| Shopping Styles | `Assets/Css/Shopping.css` |
| Digital Hub Styles | `Assets/Css/Digital-Hub.css` |
| Electronics Service Styles | `Assets/Css/Electronics-Service.css` |
| Pixel Works Styles | `Assets/Css/Pixel-Works.css` |
| Digital Marketing Styles | `Assets/Css/Digital-Marketing.css` |
| Technologies Styles | `Assets/Css/Technologies.css` |
| Privacy Styles | `Assets/Css/Privacy-Policy.css` |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin Access Denied | Login As Founder Email In `Code.gs` |
| Form Says Configure Url | Paste Web App Url In `Assets/Js/Config.js` |
| No Email Received | Redeploy; Check Spam; Re-Authorize |
| Products Not Loading | Deployment Must Be “Anyone” |
| Sheet Not Found | Open Admin Once – Sheets Auto-Create |
| Old Code Still Running | New Version → Deploy |
| Css / Images Missing | Paths Must Be Relative (`Assets/Css/Common.css`); Do Not Move Folders |
| 404 Page Not Found | Pages Not Enabled, Wrong Branch, Or `Index.html` Not At Root |

---

## Deployment Checklist

- [ ] All Files Uploaded To Github  
- [ ] Github Pages Enabled  
- [ ] `Code.gs` + `Admin.html` In Apps Script  
- [ ] Web App Deployed (Me + Anyone)  
- [ ] URL In Both Fields Of `Config.js`  
- [ ] Contact Form Tested  
- [ ] Admin Login Works  
- [ ] Shopping Page Loads Products  
- [ ] Whatsapp / Call Buttons Work  

---

## License & Contact

**Vignesh A – Founder, Vignesh Universe**  
Phone / Whatsapp: **+91 7448357381**  
Email : **founder.vigneshuniverse@gmail.com**  
Location : **Chennai, Tamil Nadu, India**  
Hours : Monday – Sunday • 08:00 AM – 08:00 PM  

**Live Site :** [https://vigneshuniverse.github.io/Final/Index.html](https://vigneshuniverse.github.io/Final/Index.html)

---
*Quality. Creativity. Innovation. Growth.*
