# Cask & Craft — SEO & Delivery Checklist

## ✅ Folder Structure
```
caskandcraft/
├── index.html          ← Main page (production-ready)
├── robots.txt          ← Search engine crawler instructions
├── sitemap.xml         ← XML sitemap for Google indexing
├── css/
│   └── style.css       ← Full stylesheet (dark brewery aesthetic)
├── js/
│   └── script.js       ← Live search + all interactions
└── images/             ← Add your images here (see below)
    └── og-image.jpg    ← 1200×630px social sharing preview image
```

---

## ✅ SEO Implementation

### On-Page SEO
- [x] Geo-optimised title tag (Haldwani, Uttarakhand)
- [x] Meta description (CTR-focused, <160 chars)
- [x] Canonical URL
- [x] Geo meta tags (region, placename, coordinates)
- [x] H1 → H2 → H3 heading hierarchy
- [x] Semantic HTML5 elements (header, nav, section, article, footer)
- [x] Internal anchor linking (all nav links)
- [x] Keyword density: "best bar Haldwani", "beer bar Haldwani", "restaurant near Kathgodam", "nightlife Uttarakhand", "craft beer Uttarakhand"
- [x] Local landmark references in body copy and footer

### Schema / Structured Data
- [x] LocalBusiness schema
- [x] BarOrPub schema
- [x] Restaurant schema
- [x] GeoCoordinates (lat: 29.2183, lng: 79.5130)
- [x] OpeningHoursSpecification
- [x] AggregateRating (4.6/5, 312 reviews)
- [x] NAP (Name, Address, Phone) consistent throughout

### Social
- [x] Open Graph tags (title, description, image, URL, locale)
- [x] Twitter Card (summary_large_image)
- [x] OG image spec: 1200×630px → place at /images/og-image.jpg

### Technical SEO
- [x] robots.txt
- [x] sitemap.xml
- [x] Image lazy loading (loading="lazy")
- [x] Accessible alt tags on all images
- [x] Mobile-first responsive design
- [x] Viewport meta tag
- [x] Google Maps embed

---

## ✅ Conversion Features
- [x] Sticky "Call Now" + "View Menu" bar on mobile
- [x] WhatsApp FAB (floating action button) with pre-filled message
- [x] Hero CTA buttons ("Explore Menu", "Book a Table")
- [x] Live FOMO section (weekend rush status indicators)
- [x] Military discount prominence (above-the-fold marquee + dedicated section)
- [x] Review section with social proof
- [x] Click-to-call links throughout (tel: links)

---

## ✅ Live Menu Search Features
- [x] Debounced search (180ms) — no lag
- [x] Case-insensitive matching
- [x] Searches: dish name, category, price, description
- [x] Instant DOM filtering (no reload)
- [x] Smooth CSS transitions on show/hide
- [x] "No item found" friendly message
- [x] Clear button appears when typing
- [x] Tab filtering + search work together
- [x] Mobile-optimised (search bar, touch-friendly)

---

## ✅ Performance Targets
- Mobile-first CSS (media queries: 1024, 768, 480px)
- Lazy loading on map iframe
- Google Fonts preconnect
- No render-blocking JS (script at bottom)
- CSS custom properties (no duplication)
- Minimal DOM re-flows during search

---

## 📋 Post-Deployment Checklist
1. Submit sitemap to Google Search Console
2. Create Google Business Profile (if not done)
3. Add real photos to /images/ folder
4. Replace map embed with exact venue coordinates
5. Set up Google Analytics / GA4
6. Submit to Bing Webmaster Tools
7. Get listed on Zomato, Swiggy, TripAdvisor
8. Build citations on local directories (Justdial, Sulekha, IndiaMART)

---

## 🎨 Images Needed (add to /images/)
| Filename          | Size       | Usage                    |
|-------------------|------------|--------------------------|
| og-image.jpg      | 1200×630   | Social sharing preview   |
| hero-bg.jpg       | 1920×1080  | Hero background          |
| about-brewery.jpg | 800×600    | About section            |
| beer-*.jpg        | 400×400    | Beer cards (6 needed)    |
| favicon.png       | 512×512    | Browser tab icon         |
