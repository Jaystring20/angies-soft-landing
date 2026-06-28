// Angie's Soft Landing - Complete Turntable Widget
// Premium Nigerian Food Brand

// ============================================
// 1. ALL 11 FOOD IMAGES (Base64 Data URIs)
// ============================================
const IMGS = [
  // Placeholder - Images will be loaded from individual files
  // img0.txt - Quick Spark (fries+chicken)
  // img1.txt - Tarmac Spread (small chops)
  // ... img2.txt through img10.txt
];

// Function to load images from the img*.txt files
async function loadImages() {
  const imageFiles = Array.from({ length: 11 }, (_, i) => `img${i}.txt`);
  const images = [];

  for (const file of imageFiles) {
    try {
      const response = await fetch(file);
      const dataUri = await response.text();
      images.push(dataUri.trim());
    } catch (e) {
      console.warn(`Could not load ${file}`);
      images.push('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%237A4B2A%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E');
    }
  }
  return images;
}

// ============================================
// 2. DISH DATA (11 Signature Dishes)
// ============================================
const DISHES = [
  {
    category: 'FRIES & CHICKEN',
    name: 'Quick Spark',
    description: 'Seasoned fries + spiced grilled chicken wings.',
    price: '₦4,500',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Quick%20Spark.',
    popular: false,
    imageIndex: 0
  },
  {
    category: 'SMALL CHOPS',
    name: 'Tarmac Spread',
    description: 'Assorted small chops — puff puff, samosa, spring rolls, meat pie.',
    price: '₦6,800',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Tarmac%20Spread.',
    popular: true,
    imageIndex: 1
  },
  {
    category: 'SHAWARMA',
    name: 'Transit Wrap',
    description: 'Chicken & beef shawarma with signature sauce and toasted wraps.',
    price: '₦3,200',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Transit%20Wrap.',
    popular: false,
    imageIndex: 2
  },
  {
    category: 'GRILLED WRAPS',
    name: 'Pressed Route',
    description: 'Grilled pressed wraps — toasted, packed with protein and fresh garnish.',
    price: '₦3,800',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Pressed%20Route.',
    popular: false,
    imageIndex: 3
  },
  {
    category: 'FISH PEPPER SOUP',
    name: 'Still Waters',
    description: 'Fish pepper soup with boiled plantain — clean, restorative, deeply spiced.',
    price: '₦5,500',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20Still%20Waters.',
    popular: false,
    imageIndex: 4
  },
  {
    category: 'CHICKEN PEPPER SOUP',
    name: 'The Debrief',
    description: 'Chicken pepper soup — the end-of-day ritual, warmth in every sip.',
    price: '₦5,000',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Debrief.',
    popular: false,
    imageIndex: 5
  },
  {
    category: 'ASSORTED SOUP',
    name: 'Off Manifest',
    description: 'Assorted offal pepper soup — for those who know exactly what they want.',
    price: '₦5,800',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20Off%20Manifest.',
    popular: false,
    imageIndex: 6
  },
  {
    category: 'PEPPERED GIZZARD',
    name: 'Grid Lock',
    description: 'Peppered gizzard with boiled plantain — executive-grade street food.',
    price: '₦4,200',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20Grid%20Lock.',
    popular: true,
    imageIndex: 7
  },
  {
    category: 'PULLED CHICKEN',
    name: 'Unclassified',
    description: 'Peppered pulled chicken — slow-cooked, hand-shredded, deeply seasoned.',
    price: '₦4,800',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20Unclassified.',
    popular: false,
    imageIndex: 8
  },
  {
    category: 'GRILLED TILAPIA',
    name: 'Clear Skies',
    description: 'Grilled tilapia with fried plantain — clean protein, precise seasoning.',
    price: '₦6,500',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20Clear%20Skies.',
    popular: false,
    imageIndex: 9
  },
  {
    category: 'WEEKLY RESERVE',
    name: 'Weekly Reserve',
    description: '1-litre soup bowls — strategic nutrition for the professional week ahead.',
    price: '₦8,500',
    whatsapp: 'https://wa.me/2349024142280?text=Hi%20Angie%2C%20I%20want%20The%20Weekly%20Reserve.',
    popular: true,
    imageIndex: 10
  }
];

// ============================================
// 3. TURNTABLE CAROUSEL LOGIC
// ============================================

let images = [];
let currentIndex = 0;
let autoRotateInterval = null;
let touchStartX = 0;
let isAnimating = false;

// Turntable card positioning configuration
const TURNTABLE_CONFIG = [
  { x: 0, ry: 0, s: 1.2, o: 1 },      // Front (center, largest)
  { x: 76, ry: 25, s: 0.86, o: 0.7 }, // Right
  { x: 138, ry: 42, s: 0.68, o: 0.42 }, // Far right
  { x: 185, ry: 56, s: 0.52, o: 0.18 }  // Extreme right
];

// Calculate offset from current index (handles wrap-around)
function getOffset(i) {
  let d = i - currentIndex;
  if (d > DISHES.length / 2) d -= DISHES.length;
  if (d < -DISHES.length / 2) d += DISHES.length;
  return d;
}

// Render current state of hero and turntable
function render() {
  if (!images.length) return;

  const dish = DISHES[currentIndex];
  const img = images[currentIndex];

  // Update hero section
  const fciEl = document.getElementById('fci');
  const badgeEl = document.getElementById('badge');
  const dcatEl = document.getElementById('dcat');
  const dnmEl = document.getElementById('dnm');
  const ddsEl = document.getElementById('dds');
  const dprEl = document.getElementById('dpr');
  const dwaEl = document.getElementById('dwa');

  if (fciEl) {
    fciEl.style.backgroundImage = `url('${img}')`;
  }
  if (badgeEl) {
    badgeEl.style.display = dish.popular ? 'block' : 'none';
  }
  if (dcatEl) dcatEl.textContent = dish.category;
  if (dnmEl) dnmEl.innerHTML = dish.name.replace(' ', '<br>');
  if (ddsEl) ddsEl.textContent = dish.description;
  if (dprEl) dprEl.textContent = dish.price;
  if (dwaEl) {
    dwaEl.href = dish.whatsapp;
    dwaEl.textContent = 'Order via WhatsApp';
  }

  // Update turntable
  const ttiEl = document.getElementById('tti');
  if (ttiEl) {
    ttiEl.innerHTML = '';
    for (let i = 0; i < DISHES.length; i++) {
      const offset = getOffset(i);
      const config = TURNTABLE_CONFIG[Math.abs(offset)];
      if (!config) continue;

      const el = document.createElement('div');
      el.className = 'tc-item';
      el.style.backgroundImage = `url('${images[i]}')`;

      const translateX = offset > 0 ? config.x : -config.x;
      const rotateY = offset > 0 ? config.ry : -config.ry;
      el.style.transform = `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${config.s})`;
      el.style.opacity = config.o;
      el.style.zIndex = 4 - Math.abs(offset);

      el.addEventListener('click', () => goTo(i));
      ttiEl.appendChild(el);
    }
  }

  // Update dots
  const dotsEl = document.getElementById('dots');
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < DISHES.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }
}

// Navigate to specific dish
function goTo(index) {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = ((index % DISHES.length) + DISHES.length) % DISHES.length;
  render();
  stopAutoRotate();
  startAutoRotate();
  setTimeout(() => { isAnimating = false; }, 400);
}

// Next dish
function next() {
  goTo(currentIndex + 1);
}

// Previous dish
function prev() {
  goTo(currentIndex - 1);
}

// Auto-rotate
function startAutoRotate() {
  stopAutoRotate();
  autoRotateInterval = setInterval(() => {
    next();
  }, 3500);
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }
}

// Touch swipe handling
function setupTouchHandlers() {
  const ttiEl = document.getElementById('tti');
  if (!ttiEl) return;

  ttiEl.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoRotate();
  });

  ttiEl.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        next(); // Swipe left → next
      } else {
        prev(); // Swipe right → previous
      }
    }
    startAutoRotate();
  });
}

// ============================================
// 4. INITIALIZATION
// ============================================

async function initTurntable() {
  try {
    // Load images from files
    images = await loadImages();

    // Render initial state
    render();

    // Setup interactions
    setupTouchHandlers();

    // Start auto-rotation
    startAutoRotate();

    console.log('✅ Angie\'s Soft Landing turntable initialized');
    console.log(`📸 Loaded ${images.length} images`);
    console.log(`🍽️ ${DISHES.length} dishes ready to order`);
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTurntable);
} else {
  initTurntable();
}
