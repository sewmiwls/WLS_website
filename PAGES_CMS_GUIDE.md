# Pages CMS - Quick Start Guide

## Overview
The Pages CMS allows you to create flexible, SEO-optimized pages with a WYSIWYG editor (ReactQuill). This is perfect for:
- SEO landing pages
- Backlink pages
- Custom content pages
- Blog posts
- Information pages

## Key Features

### 1. **WYSIWYG Editor (ReactQuill)**
- Rich text formatting (bold, italic, underline, strikethrough)
- Headings (H1-H6)
- Lists (ordered and unordered)
- Links, images, and videos
- Text alignment and colors
- Code blocks and blockquotes

### 2. **SEO Optimization**
- Meta descriptions
- Meta keywords
- Custom URL slugs
- Featured images
- Open Graph metadata

### 3. **Flexible Layouts**
- **Default**: Standard centered content
- **Full Width**: Edge-to-edge content
- **Sidebar**: Two-column layout with related pages
- **Landing Page**: Hero + child pages grid

### 4. **Page Hierarchy**
- Create parent/child relationships
- Automatic related pages sidebar
- Navigation ordering

### 5. **Advanced Features**
- Custom CSS (page-specific styling)
- Custom JavaScript (page-specific functionality)
- Show/hide in navigation
- Draft/publish status

## Getting Started

### Step 1: Access Admin Panel
1. Go to `/admin`
2. Log in with your admin credentials
3. Click on the **"Pages"** tab

### Step 2: Create Your First Page
1. Click **"New Page"** button
2. Fill in the **Content** tab:
   - **Page Title**: Your page title (auto-generates slug)
   - **URL Slug**: The URL path (e.g., `seo-tips` → `/seo-tips`)
   - **Page Content**: Use the WYSIWYG editor to create your content
   - **Featured Image**: Optional image URL

### Step 3: Optimize for SEO
1. Switch to the **"SEO & Settings"** tab
2. Fill in:
   - **Meta Description**: 150-160 character summary
   - **Meta Keywords**: Add relevant keywords (press Enter after each)
   - **Page Layout**: Choose your layout style
   - **Show in Navigation**: Toggle if you want it in the menu
   - **Parent Page**: Optional - create a hierarchy

### Step 4: Advanced Customization (Optional)
1. Switch to the **"Advanced"** tab
2. Add custom CSS or JavaScript if needed
3. ⚠️ Use with caution - this is for advanced users

### Step 5: Publish
1. Check the **"Publish this page"** checkbox
2. Click **"Create Page"** or **"Update Page"**
3. Your page is now live at `/{slug}`

## Page Management

### Viewing Pages
- All pages are listed in the admin panel
- Status indicators show Published/Draft and navigation visibility
- URL slug is displayed for reference

### Editing Pages
1. Click the **Edit** icon (pencil) on any page
2. Make your changes
3. Click **"Update Page"**

### Quick Publish/Unpublish
- Click the **Eye/EyeOff** icon to toggle published status
- No need to open the full form

### Deleting Pages
- Click the **Trash** icon
- Confirm the deletion
- ⚠️ This action cannot be undone

## Layout Examples

### Default Layout
```
Best for: Blog posts, articles, standard content
URL: /your-article
```

### Full Width Layout
```
Best for: Landing pages, hero sections, visual content
URL: /full-width-landing
```

### Sidebar Layout
```
Best for: Documentation, guides with related content
URL: /guide-main
  └─ Sidebar shows child pages
```

### Landing Page Layout
```
Best for: Hub pages with multiple sub-pages
URL: /services
  └─ Grid of child pages at bottom
```

## SEO Best Practices

### Meta Descriptions
- Keep between 150-160 characters
- Include target keywords naturally
- Make it compelling (encourages clicks)
- Unique for each page

### Meta Keywords
- 5-10 relevant keywords
- Mix of short-tail and long-tail keywords
- Include location-based keywords for local SEO
- Avoid keyword stuffing

### URL Slugs
- Keep short and descriptive
- Use hyphens, not underscores
- Lowercase only
- Include target keyword

### Content Tips
- Use H1 for main title (auto-added from Page Title)
- Use H2-H3 for section headings
- Internal linking (link to other pages)
- External backlinks to authoritative sites
- Include target keywords naturally

## Parent/Child Page Hierarchy

### Creating a Page Hierarchy
1. Create the parent page first (e.g., "Services")
2. Create child pages (e.g., "Web Design", "SEO Services")
3. In each child page, select the parent from "Parent Page" dropdown

### Benefits
- Automatic related pages sidebar (sidebar layout)
- Grid of child pages (landing page layout)
- Better organization
- Improved internal linking

### Example Hierarchy
```
Services (landing page layout)
├─ Web Design
├─ SEO Services
└─ Content Marketing

About (default layout)
├─ Our Team
├─ Our Story
└─ Contact Us
```

## Custom CSS/JS Examples

### Custom CSS Example
```css
/* Make all paragraphs blue */
.prose p {
  color: #3b82f6;
}

/* Custom button styling */
.cta-button {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: white;
}
```

### Custom JS Example
```javascript
// Add click tracking
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    console.log('Link clicked:', this.href);
  });
});

// Simple form validation
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    // Your validation logic
  });
}
```

## Tips & Tricks

### 1. Using the WYSIWYG Editor
- **Bold**: Ctrl+B (Cmd+B on Mac)
- **Italic**: Ctrl+I (Cmd+I on Mac)
- **Link**: Click link icon, paste URL
- **Image**: Click image icon, paste image URL
- **Undo**: Ctrl+Z (Cmd+Z on Mac)

### 2. Creating Backlink Pages
```
1. Create a new page (e.g., "Local Business Resources")
2. Write valuable content (300-500 words)
3. Add 3-5 internal links to your important pages
4. Add 2-3 external links to authoritative sites
5. Include location-based keywords
6. Optimize meta description with location
```

### 3. SEO Landing Pages
```
1. Use "Landing Page" layout
2. Create compelling hero section with H1
3. Add benefits/features sections
4. Include CTA buttons
5. Create child pages for each service
6. Add FAQ section at bottom
```

### 4. Draft Pages
- Uncheck "Publish this page" to save as draft
- Draft pages are invisible to public
- Perfect for preparing content in advance
- Edit anytime before publishing

## Troubleshooting

### Page Not Showing Up
- ✅ Check if "Publish this page" is enabled
- ✅ Verify slug doesn't conflict with existing routes
- ✅ Check browser cache (try incognito mode)

### Formatting Issues
- ✅ Use the editor toolbar instead of pasting formatted text
- ✅ Try "Clear Formatting" button in editor
- ✅ Check custom CSS for conflicts

### Images Not Loading
- ✅ Verify image URL is accessible
- ✅ Use HTTPS URLs
- ✅ Check image hosting service

### Navigation Not Showing
- ✅ Toggle "Show in Navigation" checkbox
- ✅ Set appropriate navigation order
- ✅ Note: Navigation menu may need manual integration

## Need Help?

For technical support or feature requests, contact your development team.

---

**Created:** January 2025  
**Version:** 1.0
