# Quick Start Guide - Case Study CMS

## For Admins: Creating Your First Case Study

### Step 1: Access the Admin Panel
1. Navigate to `/admin/login`
2. Enter your credentials
3. You'll be redirected to the admin dashboard

### Step 2: Go to Case Studies Tab
- Click on the **"Case Studies"** button in the navigation tabs
- You'll see a list of existing case studies (or an empty state if none exist)

### Step 3: Create a New Case Study
Click the **"New Case Study"** button in the top right

### Step 4: Fill in the Basic Information
**Required Fields (marked with *):**
- **Client Name**: e.g., "Tech Startup Inc"
- **Slug**: URL-friendly name, e.g., "tech-startup-inc" (lowercase, hyphens only)
- **Title**: e.g., "SaaS Platform Growth Story"
- **Subtitle**: e.g., "300% Increase in User Acquisition"
- **Primary Metric Value**: e.g., "300%"
- **Primary Metric Label**: e.g., "Increase in User Acquisition"

**Optional Fields:**
- **Website**: Client's website URL
- **Timeline**: e.g., "6 months", "1 year"

### Step 5: Add Tags
- Type a tag in the input field
- Press **Enter** or click the **+** button
- Add multiple tags: "SaaS", "B2B", "Growth Marketing", etc.
- Remove tags by clicking the **X** on each tag

### Step 6: Fill in the Overview Section
**Three text boxes:**
- **Challenge**: What problem did the client face?
- **Solution**: What approach did you take?
- **Results**: What was achieved?

Keep these concise (2-3 sentences each)

### Step 7: Add Execution Strategies
1. Click **"Add Strategy"**
2. Enter a **Title** (e.g., "Content Marketing Overhaul")
3. Enter a **Description** (explain what was done)
4. Add more strategies as needed
5. Remove unwanted strategies with the trash icon

### Step 8: Add Results Metrics
1. Click **"Add Metric"**
2. Enter:
   - **Value**: e.g., "150%"
   - **Label**: e.g., "Increase in Organic Traffic"
   - **Description** (optional): Additional context
3. Add 2-4 metrics typically
4. Remove unwanted metrics with the trash icon

### Step 9: Before/After Section (Optional)
- **Before Text**: Describe the state before your work
- **Before Image URL**: Path to image, e.g., `/images/before-screenshot.png`
- **After Text**: Describe the state after your work
- **After Image URL**: Path to image, e.g., `/images/after-screenshot.png`

### Step 10: Publish
- Check the **"Publish immediately"** box if ready to go live
- Or leave unchecked to save as a draft

### Step 11: Save
Click **"Create Case Study"** button

---

## Managing Existing Case Studies

### Edit a Case Study
1. Find the case study in the list
2. Click the **pencil icon** (Edit)
3. Make your changes
4. Click **"Update Case Study"**

### Publish/Unpublish
- Click the **eye icon** to toggle
- **Open eye** = Published (visible on website)
- **Closed eye** = Draft (only visible in admin)

### Delete a Case Study
1. Click the **trash icon**
2. Confirm the deletion
3. **Warning**: This cannot be undone!

---

## Tips for Writing Great Case Studies

### Client Name & Title
- Use the actual client name if permitted
- Or use "Leading [Industry] Company" for anonymity

### Slug Best Practices
- Keep it short but descriptive
- Use hyphens, not underscores
- Example: "saas-growth-story", "ecommerce-seo-success"

### Metrics That Work
- Use percentages for increases: "235%"
- Use specific numbers: "1,200 new customers"
- Use time frames: "in 6 months"
- Focus on business outcomes, not just vanity metrics

### Story Structure
1. **Challenge**: What was the pain point?
2. **Solution**: What did you do differently?
3. **Execution**: How did you implement it?
4. **Results**: What measurable outcomes?

### Image Guidelines
- Use high-quality screenshots
- Before/after comparisons are powerful
- Blur sensitive data if needed
- Store images in `/public/images/` folder
- Reference as: `/images/your-image.png`

### Tags
- Use 3-5 tags per case study
- Mix industry tags ("E-commerce", "SaaS")
- Mix service tags ("SEO", "Content Marketing")
- Keep tags consistent across case studies

---

## Common Questions

**Q: Can I save a draft?**
A: Yes! Just uncheck "Publish immediately" before saving.

**Q: How do I upload images?**
A: Currently, images must be placed in the `/public/images/` folder manually, then reference them as `/images/filename.png`. Future versions will have direct upload.

**Q: Can I reorder case studies?**
A: They display in newest-first order. Future versions may add manual ordering.

**Q: What if I delete by mistake?**
A: Deletions are permanent. Always double-check before deleting. Consider unpublishing instead.

**Q: How many case studies can I create?**
A: Unlimited! The system scales with your needs.

**Q: Can I duplicate a case study?**
A: Not yet, but it's planned for a future update. For now, you can create a new one and copy/paste content.

---

## Troubleshooting

### Case Study Not Showing on Website
- ✅ Check it's published (eye icon should be open)
- ✅ Check the slug is correct
- ✅ Try refreshing the page

### Images Not Loading
- ✅ Verify image is in `/public/images/`
- ✅ Check the image URL path is correct
- ✅ Check image file extension matches

### Form Won't Submit
- ✅ Check all required fields (marked with *) are filled
- ✅ Ensure slug is URL-friendly (lowercase, hyphens)
- ✅ Check browser console for errors

### Slug Already Exists Error
- Each slug must be unique
- Try adding a number or modifier: "company-name-2024"

---

## For Developers: Technical Notes

### Where Case Studies Are Stored
- Database table: `CaseStudy`
- ORM: Prisma
- Database: PostgreSQL

### API Endpoints
```
GET    /api/admin/case-studies       # List all
POST   /api/admin/case-studies       # Create new
PUT    /api/admin/case-studies       # Update existing
DELETE /api/admin/case-studies?id=X  # Delete by ID
```

### File Locations
```
app/
├── api/admin/case-studies/route.ts
├── (routes)/
│   ├── admin/_components/
│   │   ├── CaseStudyList.tsx
│   │   └── CaseStudyForm.tsx
│   └── caseStudies/
│       ├── page.tsx              # Listing
│       └── [slug]/page.tsx       # Detail page
```

### Adding Custom Fields
1. Update `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Update API route
4. Update form component
5. Update display component

---

## Need Help?

Contact the development team or refer to:
- `CASE_STUDY_CMS_README.md` - Full technical documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
