# Qubool Hai Events & Decor — Image Replacement Guide

This website is designed around **real decoration photography** by Qubool Hai Events & Decor. Every single visual is fully editable, responsive, and organized in one clean directory:

```
public/
  images/
    hero/
      hero-main.jpg              (Home Hero background, 16:9 or 21:9, min 1920x1080)
      home-gallery-01.jpg        (Home Featured 01, 16:9)
      home-gallery-02.jpg        (Home Featured 02, 4:5)
      home-gallery-03.jpg        (Home Featured 03, 3:4)
      home-gallery-04.jpg        (Home Featured 04, 1:1)
      home-gallery-05.jpg        (Home Featured 05, 16:9)
    about/
      about-decoration.jpg       (About Page Main Decor, 4:5 or 3:4, min 1200x1600)
      about-founder.jpg          (Azhar Kazi Founder Portrait, 4:5, min 1000x1250)
      about-founder.svg          (Luxury SVG fallback placeholder)
    services/
      service-nikah.jpg          (Nikah Décor, 4:3)
      service-backdrop.jpg       (Custom Nikah Backdrops, 4:3)
      service-floral.jpg         (Floral Arrangements, 4:3)
      service-stage.jpg          (Stage Decoration, 4:3)
      service-lighting.jpg       (Lighting Design, 4:3)
      service-home.jpg           (Home Wedding Décor, 4:3)
      service-grand-wedding.jpg  (Grand Wedding Décor, 4:3)
      service-event-styling.jpg  (Custom Event Styling, 4:3)
    gallery/
      gallery-nikah-01.jpg
      gallery-nikah-02.jpg
      gallery-nikah-03.jpg
      gallery-stage-01.jpg
      gallery-stage-02.jpg
      gallery-floral-01.jpg
      gallery-floral-02.jpg
      gallery-home-01.jpg
      gallery-wedding-01.jpg
      gallery-wedding-02.jpg
      gallery-event-01.jpg
```

---

## How to Replace an Image in 3 Easy Steps

1. **Locate the file**: Find the file you wish to change in `public/images/...`.
2. **Copy your photo**: Replace the file with your high-resolution photograph keeping the exact same filename (or update the `src` attribute in the HTML).
3. **Adjust the Focal Point**: In `css/style.css` or inline via `style="object-position: center top;"`, you can easily tune which portion of the photo is emphasized without stretching or distorting.

### Automatic Fallback Placeholder
If any photograph file is missing or temporarily unavailable during development, the website automatically displays the bespoke **Baby Pink & White Qubool Hai placeholder** (`public/images/placeholder.svg`) with a delicate floral motif and camera icon.
