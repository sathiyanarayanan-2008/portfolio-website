# 🚀 Personal Portfolio Website

> A complete, professional, responsive Personal Portfolio Website built for the **RISE Internship Web Development Project**.

![Portfolio Preview](assets/images/preview.png)

---

## 📋 Project Description

This is a fully responsive personal portfolio website built using **HTML5**, **CSS3**, and **Vanilla JavaScript** — no frameworks required. It showcases skills, education, certifications, projects, achievements, resume, and contact information in a modern dark-themed design.

---

## ✨ Features

- ✅ Fully Responsive (Mobile, Tablet, Desktop)
- ✅ Dark Glassmorphism Design
- ✅ Smooth Scrolling Navigation
- ✅ Animated Hero Section with Typing Effect
- ✅ Particle Background Animation
- ✅ Scroll-Triggered Reveal Animations
- ✅ Mobile Hamburger Menu
- ✅ Active Navigation Highlighting
- ✅ Education Timeline
- ✅ Skill Cards with Hover Effects
- ✅ Certification Cards
- ✅ Project Showcase Cards
- ✅ Achievements Section
- ✅ Resume Download & View Buttons
- ✅ Contact Form with JavaScript Validation
- ✅ Back-to-Top Button
- ✅ CSS Custom Properties (Easy Theming)
- ✅ SEO Optimized
- ✅ Accessibility Best Practices

---

## 🛠️ Technologies Used

| Technology     | Purpose              |
|---------------|----------------------|
| HTML5          | Structure & Semantics |
| CSS3           | Styling & Animations |
| Vanilla JavaScript | Interactivity    |
| Google Fonts   | Typography (Outfit, Fira Code) |
| Font Awesome 6 | Icons               |

---

## 📁 Folder Structure

```
port folio/
│
├── index.html        ← Main HTML file
├── style.css         ← All styles (CSS Variables, Responsive)
├── script.js         ← All JavaScript functionality
├── resume.pdf        ← Place your resume PDF here
├── README.md         ← This file
│
└── assets/
    ├── images/       ← Place images here
    └── icons/        ← Place custom icons here
```

---

## 🚀 How to Run Locally

1. **Download or clone** the project folder.
2. Open the project folder in **VS Code** or any code editor.
3. Open `index.html` directly in your browser — **no server needed**.
4. Or use the **Live Server** extension in VS Code for auto-reload:
   - Install: `Ctrl+Shift+X` → search "Live Server" → Install
   - Right-click `index.html` → **"Open with Live Server"**

---

## 📄 How to Add Your Resume

1. Export your resume as a **PDF file**.
2. Rename it to exactly: `resume.pdf`
3. Place it in the **project root folder** (same folder as `index.html`).
4. The Download and View buttons will work automatically.

---

## ✏️ How to Customize Personal Information

Open `index.html` and search for these placeholder tokens — replace each one with your actual information:

| Placeholder          | Replace With                        |
|---------------------|-------------------------------------|
| `[YOUR NAME]`        | Your full name                      |
| `[YOUR EMAIL]`       | Your email address                  |
| `[YOUR GITHUB URL]`  | Full GitHub profile URL             |
| `[YOUR LINKEDIN URL]`| Full LinkedIn profile URL           |
| `[YOUR CGPA]`        | Your current CGPA                   |
| `[GRADUATION YEAR]`  | Expected graduation year            |
| `[YOUR SCHOOL NAME]` | Your school name                    |
| `[YOUR STREAM]`      | Science / Commerce / etc.           |
| `[YOUR SCORE]`       | Percentage or CGPA                  |
| `[YOUR PORTFOLIO URL]`| Your deployed website URL          |

Also update the **nav logo** in the `<nav>` section:
```html
<a href="#home" class="nav-logo">
  <span class="logo-bracket">&lt;</span>YN<span class="logo-bracket">/&gt;</span>
</a>
```
Replace `YN` with your actual initials.

---

## ➕ How to Add Projects

In `index.html`, find the `<!-- Project 2 -->` card and duplicate it:

```html
<article class="project-card reveal">
  <div class="project-header">
    <div class="project-icon"><i class="fas fa-laptop-code"></i></div>
    <div class="project-links-top">
      <a href="YOUR_GITHUB_REPO" target="_blank" class="project-icon-link">
        <i class="fab fa-github"></i>
      </a>
    </div>
  </div>
  <div class="project-content">
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Your project description here.</p>
    <div class="project-tech">
      <span class="tech-tag">HTML</span>
      <span class="tech-tag">CSS</span>
      <span class="tech-tag">JavaScript</span>
    </div>
  </div>
  <div class="project-footer">
    <a href="YOUR_GITHUB_REPO" target="_blank" class="btn btn-sm btn-outline">
      <i class="fab fa-github"></i> GitHub
    </a>
    <a href="YOUR_LIVE_DEMO" target="_blank" class="btn btn-sm btn-primary">
      <i class="fas fa-external-link-alt"></i> Live Demo
    </a>
  </div>
</article>
```

---

## 🏅 How to Add Certifications

Find the certifications section and duplicate a `cert-card` div:

```html
<div class="cert-card reveal">
  <div class="cert-icon"><i class="fas fa-certificate"></i></div>
  <div class="cert-content">
    <h3 class="cert-title">Your Certification Name</h3>
    <p class="cert-issuer"><i class="fas fa-building"></i> Issuing Organization</p>
    <p class="cert-date"><i class="fas fa-calendar-check"></i> Month, Year</p>
    <a href="CREDENTIAL_URL" target="_blank" class="cert-link">
      <i class="fas fa-external-link-alt"></i> View Credential
    </a>
  </div>
  <div class="cert-badge">Org Name</div>
</div>
```

---

## 🎨 How to Change Colors

Open `style.css`. At the very top, find `:root { ... }` and change these variables:

```css
:root {
  --clr-primary:   #6c63ff;  /* Main purple accent */
  --clr-secondary: #00d4ff;  /* Cyan accent */
  --clr-accent:    #ff6584;  /* Pink/red accent */
  --clr-bg:        #07070f;  /* Main background */
}
```

Change any hex color to instantly retheme the entire website.

---

## 📬 How to Enable Contact Form Email Sending

The form currently validates and shows a success message (no email is sent). To enable actual email sending:

### Option A: Formspree (Free)
1. Go to [https://formspree.io](https://formspree.io) and create an account.
2. Create a new form — copy the form endpoint URL.
3. In `script.js`, inside `initContactForm()`, replace the `setTimeout` block with:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name:    nameInput.value,
    email:   emailInput.value,
    subject: subjectInput.value,
    message: msgInput.value,
  }),
});
```

### Option B: EmailJS (Free)
1. Go to [https://emailjs.com](https://emailjs.com) and create an account.
2. Follow their documentation to set up a service and template.
3. Add their SDK and use `emailjs.send()` in the form submit handler.

---

## 🌐 How to Deploy — GitHub Pages

1. Create a new repository on GitHub (e.g., `my-portfolio`).
2. Upload all project files to the repository root.
3. Go to **Settings → Pages**.
4. Under **Source**, select `main` branch and `/ (root)`.
5. Click **Save**.
6. Your site will be live at: `https://yourusername.github.io/my-portfolio/`

> **Important**: Make sure `index.html` is in the repository root.

---

## 🌐 How to Deploy — Netlify

1. Go to [https://netlify.com](https://netlify.com) and sign up.
2. Click **"Add new site" → "Import an existing project"**.
3. Connect to GitHub and select your repository, OR
4. Drag and drop your project folder directly onto the Netlify dashboard.
5. Your site will be live instantly with a free Netlify subdomain.

---

## 📞 Contact

- **Email**: [YOUR EMAIL]
- **LinkedIn**: [YOUR LINKEDIN URL]
- **GitHub**: [YOUR GITHUB URL]

---

## 📝 License

This project is open source and available for personal and educational use.

---

*Built with ❤️ using HTML, CSS & JavaScript — RISE Internship 2026*
