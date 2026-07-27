# Case Study CMS - Admin Documentation

## Overview
The admin panel now includes a mini CMS for managing case study pages dynamically without hardcoding. Admins can create, edit, publish, and delete case studies through a user-friendly interface.

## Features

### 1. **Dynamic Case Study Management**
- Create new case studies through an intuitive form interface
- Edit existing case studies
- Publish/unpublish case studies (only published ones appear on the public website)
- Delete case studies
- All case studies are stored in the database (PostgreSQL via Prisma)

### 2. **Case Study Form Fields**

#### Basic Information
- **Client Name**: Name of the client/business
- **Website**: Client's website URL
- **Slug**: URL-friendly identifier (e.g., "uniformsready" → /caseStudies/uniformsready)
- **Title**: Case study title
- **Subtitle**: Brief subtitle or tagline
- **Timeline**: Duration of the project (e.g., "12 months")
- **Tags**: Categories/keywords for the case study

#### Primary Metric
- **Metric Value**: The main achievement (e.g., "235.86%")
- **Metric Label**: Description of the metric (e.g., "Increase in Organic Keywords")

#### Overview Section
- **Challenge**: What problem the client faced
- **Solution**: What approach was taken
- **Results**: What outcomes were achieved

#### Client Section
- **Description**: Multiple paragraphs describing the client
- **Goals**: List of client objectives

#### Plan Section
- **Description**: Detailed plan description paragraphs
- **Approach**: Key points of the approach

#### Execution Section
- **Description**: Overview of execution strategy
- **Strategies**: Multiple strategies with:
  - Title
  - Description

#### Results Section
- **Description**: Overview of results achieved
- **Metrics**: Multiple metrics with:
  - Value (e.g., "100%")
  - Label (e.g., "Keywords on Page One")
  - Description (optional details)

#### Before/After Section
- **Before Text**: Description of state before
- **Before Image URL**: URL to before screenshot/image
- **After Text**: Description of state after
- **After Image URL**: URL to after screenshot/image

### 3. **Access the CMS**

1. Navigate to `/admin` and login
2. Click on the **"Case Studies"** tab
3. You'll see a list of all case studies (published and drafts)

### 4. **Create a New Case Study**

1. Click **"New Case Study"** button
2. Fill in all required fields (marked with *)
3. Add execution strategies using the **"Add Strategy"** button
4. Add result metrics using the **"Add Metric"** button
5. Toggle **"Publish immediately"** if you want it live right away
6. Click **"Create Case Study"**

### 5. **Edit a Case Study**

1. Click the **edit icon** (pencil) on any case study in the list
2. Modify the fields as needed
3. Click **"Update Case Study"**

### 6. **Publish/Unpublish**

- Click the **eye icon** to toggle publish status
- Published case studies appear on `/caseStudies`
- Draft case studies are only visible in the admin panel

### 7. **Delete a Case Study**

- Click the **trash icon** to delete
- Confirm the deletion (this action cannot be undone)

## Database Structure

Case studies are stored in the `CaseStudy` table with the following schema:

```prisma
model CaseStudy {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  published             Boolean  @default(false)
  client                String
  website               String
  title                 String
  subtitle              String
  primaryMetricValue    String
  primaryMetricLabel    String
  timeline              String
  tags                  String[]
  overviewChallenge     String   @db.Text
  overviewSolution      String   @db.Text
  overviewResults       String   @db.Text
  clientDescription     String[] @default([])
  clientGoals           String[] @default([])
  planDescription       String[] @default([])
  planApproach          String[] @default([])
  executionDescription  String   @db.Text
  executionStrategies   Json
  resultsDescription    String   @db.Text
  resultsMetrics        Json
  beforeText            String?  @db.Text
  beforeImageUrl        String?
  afterText             String?  @db.Text
  afterImageUrl         String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  createdBy             String?
}
```

## API Endpoints

### GET `/api/admin/case-studies`
Fetch all case studies (or filtered by published status)
- Query param: `published=true` to get only published

### POST `/api/admin/case-studies`
Create a new case study
- Body: CaseStudy data object

### PUT `/api/admin/case-studies`
Update an existing case study
- Body: CaseStudy data object with `id`

### DELETE `/api/admin/case-studies?id={id}`
Delete a case study
- Query param: `id` of case study to delete

## File Structure

```
app/
├── api/admin/case-studies/
│   └── route.ts                    # API endpoints
├── (routes)/
│   ├── admin/
│   │   ├── _components/
│   │   │   ├── CaseStudyList.tsx   # List view component
│   │   │   └── CaseStudyForm.tsx   # Create/Edit form
│   │   └── page.tsx                # Admin dashboard (updated)
│   └── caseStudies/
│       ├── page.tsx                # Case studies listing (updated to fetch from DB)
│       └── [slug]/
│           └── page.tsx            # Dynamic case study page (updated to fetch from DB)
├── generated/prisma/               # Prisma client
prisma/
└── schema.prisma                   # Database schema
scripts/
└── seed-case-studies.ts            # Script to migrate existing hardcoded data
```

## Notes

- **Slug uniqueness**: Each case study must have a unique slug
- **Image URLs**: Use relative paths (e.g., `/images/before.png.webp`) or absolute URLs
- **Rich formatting**: Currently supports plain text; can be extended with WYSIWYG editor for HTML content
- **Array fields**: Tags, descriptions, goals, and approaches can have multiple entries
- **JSON fields**: Strategies and metrics are stored as JSON for flexibility

## Future Enhancements

- WYSIWYG rich text editor for longer text fields
- Image upload functionality (currently requires image URLs)
- Preview mode before publishing
- Revision history
- SEO metadata fields (meta description, keywords)
- Featured image/thumbnail
- Categories and advanced filtering
- Duplicate case study feature
- Bulk operations

## Troubleshooting

### Case study not appearing on frontend
- Check if it's published (eye icon should be filled)
- Verify the slug is correct and matches the URL

### Form validation errors
- Ensure all required fields (marked with *) are filled
- Check that slug is URL-friendly (lowercase, hyphens only)

### Images not loading
- Verify image URLs are correct and accessible
- Check that images are in the `/public` folder for relative paths

## Support

For issues or questions, contact the development team.
