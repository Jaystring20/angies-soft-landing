# Angie's Soft Landing — Premium Nigerian Food Brand

**Tagline:** *Hard Day. Soft Landing.*

## Project Overview

Angie's Soft Landing is a premium Nigerian food brand website built for working professionals. The brand serves comfort food — soups, signature bowls, fries, and house sauces — with executive-grade presentation and an aviation-themed order journey.

### Brand Identity
- **Visual Style:** Dieter Rams Minimalism — "Less, but Better"
- **Color Palette:** Chiffon Cream + Golden Umber + Midnight Onyx
- **Typography:** Playfair Display (display) + DM Sans (body)
- **Command Language:** Aviation-inspired 2-word status updates
  - Landing Confirmed (Order Received)
  - Final Approach (Out for Delivery)
  - Touch Down (Delivered)

## Phase 1: Static Landing Page (Current)

**Features:**
- Mobile-first responsive design
- 3D drum turntable carousel with 11 signature dishes
- Real food photography (base64 embedded)
- Aviation-themed UI language
- WhatsApp order integration (no backend required)
- Progressive Web App (PWA) feel with touch gestures

**Tech Stack:**
- HTML5 + CSS3 + JavaScript (vanilla)
- Google Fonts (Playfair Display, DM Sans)
- No backend, no database, no authentication

**WhatsApp Integration:**
- Business Number: +234 902 414 2280
- Order Flow: Select dish → Tap WhatsApp → Pre-filled message

## 11 Signature Dishes

| # | Dish | Category | Price | Status |
|---|------|----------|-------|--------|
| 1 | Quick Spark | Fries & Chicken | ₦4,500 | |
| 2 | Tarmac Spread | Small Chops | ₦6,800 | ⭐ POPULAR |
| 3 | Transit Wrap | Shawarma | ₦3,200 | |
| 4 | Pressed Route | Grilled Wraps | ₦3,800 | |
| 5 | Still Waters | Fish Pepper Soup | ₦5,500 | |
| 6 | The Debrief | Chicken Pepper Soup | ₦5,000 | |
| 7 | Off Manifest | Assorted Soup | ₦5,800 | |
| 8 | Grid Lock | Peppered Gizzard | ₦4,200 | ⭐ POPULAR |
| 9 | Unclassified | Pulled Chicken | ₦4,800 | |
| 10 | Clear Skies | Grilled Tilapia | ₦6,500 | |
| 11 | Weekly Reserve | Liter Soup Bowls | ₦8,500 | ⭐ POPULAR |

## Project Structure

```
Soft Landing/
├── README.md                 # This file
├── .gitignore               # Git ignore rules
├── dish_imgs.js             # Complete widget HTML/CSS/JS (305KB)
├── imgs_array.txt           # All 11 images as base64 array
├── img0.txt - img10.txt     # Individual dish images (base64)
└── .git/                    # Git repository
```

## Design Language Card

### Colors
```css
--cr: #F7F2E9  /* Chiffon Cream (background) */
--um: #7A4B2A  /* Golden Umber (primary accent) */
--am: #C47B3B  /* Warm Amber (hover/active) */
--on: #1A1614  /* Midnight Onyx (text primary) */
--gr: #7A6E63  /* Warm Grey (text secondary) */
--cd: #EDE8DC  /* Deeper Cream (card background) */
--li: #D4C9B4  /* Linen (borders) */
--gn: #2E7D32  /* Success Green */
```

### Typography
- **Display:** Playfair Display (400, 700)
- **Body:** DM Sans (400, 500, 700)
- **Base Size:** 16px

### Spacing Scale
Base: 4px increments (4, 8, 12, 16, 24, 32, 48, 64)

## Key Features

### 3D Drum Turntable
- Auto-rotating carousel with 11 dishes
- Touch swipe gestures (40px threshold)
- Spring physics easing: `cubic-bezier(.34, 1.32, .64, 1)`
- Wrap-around infinite navigation
- Stops on user interaction, resumes after 3.5s idle

### Hero Section
- Large circular food photo (240×240px)
- Dish name, category, description
- Price visible (no hidden pricing)
- "Order via WhatsApp" button
- POPULAR badge for featured dishes

### Navigation
- Sticky top navbar (Angie's branding + Order Now CTA)
- Responsive grid layout
- Mobile-first, scales to desktop

### Brand Story Section
- Editorial layout
- "Hard Day. Soft Landing." tagline
- Brand mission statement

## Getting Started

### View the Project
1. Open `dish_imgs.js` in a browser
2. Or use Claude's widget rendering system to preview

### Edit the Project
1. Modify dish data in the JavaScript section
2. Update colors via CSS variables (`:root`)
3. Add new dishes to the array (requires new image base64)

### Deploy
Phase 2 will add:
- Real backend (Supabase)
- User authentication
- Order management
- Status tracking
- Customer dashboard

## Contact

**Order via WhatsApp:** [+234 902 414 2280](https://wa.me/2349024142280)

**Instagram:** [@angies_soft_landing](https://instagram.com/angies_soft_landing)

---

**Built with intention. Designed for professionals. Serving comfort, premium.**
