# Assets Guide

## Adding Images to Click Clean

### Where to Place Images
- **Public images**: Place static images in `public/images/` folder
- **Component images**: For images used in specific components, you can place them in `public/images/components/`
- **Icons**: Place custom icons in `public/images/icons/`

### How to Use Images in Components
In your React components, reference images like this:

```tsx
// For images in public folder
<img src="/images/your-image.jpg" alt="Description" />

// Or using Next.js Image component (recommended)
import Image from 'next/image';
<Image src="/images/your-image.jpg" alt="Description" width={300} height={200} />
```

### Image Naming Convention
- Use kebab-case for filenames: `civic-issue-icon.png`
- Include descriptive names: `garbage-collection-bin.jpg`
- Add size suffix if multiple sizes: `logo-small.png`, `logo-large.png`

### Supported Formats
- JPEG/JPG
- PNG
- WebP (recommended for better performance)
- SVG (for icons and logos)

### Optimization Tips
- Use WebP format when possible for smaller file sizes
- Compress images before adding them
- Use Next.js Image component for automatic optimization
- Consider responsive images for different screen sizes

### Example Usage
```tsx
// In a component
import Image from 'next/image';

const CivicIssueCard = () => {
  return (
    <div className="issue-card">
      <Image
        src="/images/pothole-example.jpg"
        alt="Pothole in street"
        width={200}
        height={150}
      />
      <h3>Pothole Issue</h3>
    </div>
  );
};
```