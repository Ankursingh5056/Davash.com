import { useState, useEffect, useRef } from "react";

// ─── Sample Data ────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Noir Velvet",
    tagline: "The Darkness You Desire",
    price: 3499,
    category: "Eau de Parfum",
    volume: "100ml",
    notes: ["Black Orchid", "Oud Wood", "Amber"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Golden Mirage",
    tagline: "A Shimmering Illusion",
    price: 4299,
    category: "Parfum",
    volume: "75ml",
    notes: ["Saffron", "Rose Absolute", "Sandalwood"],
    image: "https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=400&h=500&fit=crop",
    badge: "New",
  },
  {
    id: 3,
    name: "Ivory Whisper",
    tagline: "Silence Has a Scent",
    price: 2999,
    category: "Eau de Toilette",
    volume: "100ml",
    notes: ["White Musk", "Jasmine", "Vanilla"],
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=500&fit=crop",
    badge: null,
  },
  {
    id: 4,
    name: "Crimson Ember",
    tagline: "Burn Without Fire",
    price: 3799,
    category: "Eau de Parfum",
    volume: "50ml",
    notes: ["Cinnamon", "Leather", "Tobacco"],
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=500&fit=crop",
    badge: "Limited",
  },
  {
    id: 5,
    name: "Azure Drift",
    tagline: "Where the Ocean Meets the Sky",
    price: 2799,
    category: "Eau de Toilette",
    volume: "100ml",
    notes: ["Sea Salt", "Bergamot", "Driftwood"],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop",
    badge: null,
  },
  {
    id: 6,
    name: "Midnight Bloom",
    tagline: "Flowers That Open in the Dark",
    price: 4999,
    category: "Parfum Extrait",
    volume: "50ml",
    notes: ["Tuberose", "Black Currant", "Patchouli"],
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=500&fit=crop",
    badge: "Exclusive",
  },
];

const TESTIMONIALS = [
  { name: "Priya M.", text: "Noir Velvet is the only fragrance that gets me compliments every single time. Absolute masterpiece.", rating: 5 },
  { name: "Rohan K.", text: "Golden Mirage lasts 12+ hours on my skin. The sillage is intoxicating — people stop and ask what I'm wearing.", rating: 5 },
  { name: "Aisha S.", text: "Davash understands luxury. The packaging, the scent, the experience — everything is premium.", rating: 5 },
];

// ─── Main App ───────────────────────────────────────────────────
export default function DavashApp() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 2200);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const navigate = (p) => { setPage(p); setMobileMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <div style={styles.app}>
      <style>{globalCSS}</style>

      {/* Notification Toast */}
      {notification && (
        <div style={styles.toast} className="dv-toast">{notification}</div>
      )}

      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => navigate("home")}>
            <span style={styles.logoIcon}>◆</span> DAVASH
          </div>
          {/* Desktop Links */}
          <div style={styles.navLinks} className="dv-nav-links">
            {["home", "about", "cart"].map((p) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                style={{ ...styles.navLink, ...(page === p ? styles.navLinkActive : {}) }}
              >
                {p.toUpperCase()}
                {p === "cart" && cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
              </button>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <button style={styles.hamburger} className="dv-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu} className="dv-mobile-menu">
            {["home", "about", "cart"].map((p) => (
              <button key={p} onClick={() => navigate(p)} style={styles.mobileLink}>
                {p.toUpperCase()} {p === "cart" && cartCount > 0 && `(${cartCount})`}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Pages ── */}
      <main>
        {page === "home" && <HomePage products={PRODUCTS} addToCart={addToCart} navigate={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} navigate={navigate} />}
      </main>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}><span style={styles.logoIcon}>◆</span> DAVASH</div>
            <p style={styles.footerTagline}>Crafting memories through scent since 2024</p>
          </div>
          <div style={styles.footerColumns}>
            <div>
              <h4 style={styles.footerHead}>Quick Links</h4>
              {["home", "about", "cart"].map((p) => (
                <button key={p} onClick={() => navigate(p)} style={styles.footerLink}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
              ))}
            </div>
            <div>
              <h4 style={styles.footerHead}>Contact</h4>
              <p style={styles.footerText}>hello@davash.in</p>
              <p style={styles.footerText}>+91 9891919910</p>
            </div>
            <div>
              <h4 style={styles.footerHead}>Follow Us</h4>
              <p style={styles.footerText}>Instagram</p>
              <p style={styles.footerText}>Facebook</p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerCopy}>© 2026 Davash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────
function HomePage({ products, addToCart, navigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} className="dv-fade-up">
          <p style={styles.heroSub}>The Art of Fragrance</p>
          <h1 style={styles.heroTitle}>DAVASH</h1>
          <p style={styles.heroDesc}>
            Where every drop tells a story. Luxury perfumes handcrafted for those who refuse to be ordinary.
          </p>
          <button style={styles.heroBtn} onClick={() => {
            document.getElementById("dv-collection")?.scrollIntoView({ behavior: "smooth" });
          }}>
            EXPLORE COLLECTION
          </button>
        </div>
        <div style={styles.heroScroll} className="dv-float">↓</div>
      </section>

      {/* Marquee */}
      <div style={styles.marqueeWrap}>
        <div style={styles.marquee} className="dv-marquee">
          {Array(3).fill("LUXURY • HANDCRAFTED • EXCLUSIVE • TIMELESS • BOLD • UNFORGETTABLE • ").map((t, i) => (
            <span key={i} style={styles.marqueeText}>{t}</span>
          ))}
        </div>
      </div>

      {/* Features Strip */}
      <section style={styles.featuresStrip}>
        {[
          { icon: "✦", title: "Premium Ingredients", desc: "Sourced from the finest fields worldwide" },
          { icon: "◈", title: "Long Lasting", desc: "12+ hours of captivating sillage" },
          { icon: "❖", title: "Handcrafted", desc: "Every bottle is a work of art" },
        ].map((f, i) => (
          <div key={i} style={styles.featureCard} className="dv-fade-up">
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Collection */}
      <section id="dv-collection" style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionSub}>Our Signature</p>
          <h2 style={styles.sectionTitle}>The Collection</h2>
          <div style={styles.sectionDivider} />
        </div>
        <div style={styles.productGrid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ ...styles.section, ...styles.testimonialSection }}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionSub}>What They Say</p>
          <h2 style={styles.sectionTitle}>Voices of Davash</h2>
          <div style={styles.sectionDivider} />
        </div>
        <div style={styles.testimonialGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={styles.testimonialCard} className="dv-fade-up">
              <div style={styles.testimonialStars}>{"★".repeat(t.rating)}</div>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <p style={styles.testimonialName}>— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Find Your Signature Scent</h2>
          <p style={styles.ctaDesc}>Every fragrance is a chapter. Which one will you wear?</p>
          <button style={styles.heroBtn} onClick={() => navigate("about")}>OUR STORY</button>
        </div>
      </section>
    </div>
  );
}

// ─── Product Card ───────────────────────────────────────────────
function ProductCard({ product, addToCart }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.productCard, ...(hovered ? styles.productCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="dv-fade-up"
    >
      <div style={styles.productImgWrap}>
        <img src={product.image} alt={product.name} style={{ ...styles.productImg, ...(hovered ? styles.productImgHover : {}) }} />
        {product.badge && <span style={styles.productBadge}>{product.badge}</span>}
      </div>
      <div style={styles.productInfo}>
        <p style={styles.productCategory}>{product.category} · {product.volume}</p>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.productTagline}>{product.tagline}</p>
        <div style={styles.productNotes}>
          {product.notes.map((n, i) => (
            <span key={i} style={styles.noteTag}>{n}</span>
          ))}
        </div>
        <div style={styles.productBottom}>
          <span style={styles.productPrice}>₹{product.price.toLocaleString("en-IN")}</span>
          <button style={styles.addBtn} onClick={() => addToCart(product)}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────────
function AboutPage() {
  return (
    <div>
      {/* About Hero */}
      <section style={styles.aboutHero}>
        <div style={styles.heroOverlay} />
        <div style={styles.aboutHeroContent} className="dv-fade-up">
          <p style={styles.heroSub}>Our Journey</p>
          <h1 style={styles.aboutTitle}>The Soul of Davash</h1>
        </div>
      </section>

      {/* Story */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutGrid}>
          <div className="dv-fade-up">
            <p style={styles.sectionSub}>Est. 2024</p>
            <h2 style={styles.aboutHeading}>Born from Obsession</h2>
            <p style={styles.aboutText}>
              Davash was born from a single obsession — the belief that a fragrance should be as unforgettable
              as the person wearing it. We don't follow trends. We set them. Every bottle in our collection
              is a statement, not a suggestion.
            </p>
            <p style={styles.aboutText}>
              Our master perfumers travel the world — from the rose fields of Grasse to the oud forests
              of Assam — sourcing ingredients that can't be replicated. Each fragrance takes months of
              meticulous development, hundreds of iterations, and an uncompromising eye for perfection.
            </p>
          </div>
          <div style={styles.aboutImageWrap} className="dv-fade-up">
            <img
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&h=600&fit=crop"
              alt="Davash Craftsmanship"
              style={styles.aboutImage}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={styles.valuesSection}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionSub}>What We Stand For</p>
          <h2 style={styles.sectionTitle}>Our Pillars</h2>
          <div style={styles.sectionDivider} />
        </div>
        <div style={styles.valuesGrid}>
          {[
            { icon: "◇", title: "Authenticity", desc: "No shortcuts. No synthetics. Only the real thing — ingredients sourced ethically and crafted with intention." },
            { icon: "△", title: "Artistry", desc: "Each fragrance is composed like a symphony — with a top, heart, and base that evolve on your skin throughout the day." },
            { icon: "○", title: "Sustainability", desc: "Eco-conscious packaging, cruelty-free formulations, and a commitment to leaving the planet better than we found it." },
          ].map((v, i) => (
            <div key={i} style={styles.valueCard} className="dv-fade-up">
              <span style={styles.valueIcon}>{v.icon}</span>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section style={styles.numbersSection}>
        {[
          { num: "50+", label: "Fragrance Compositions" },
          { num: "12", label: "Countries Sourced" },
          { num: "10K+", label: "Happy Customers" },
          { num: "4.9", label: "Average Rating" },
        ].map((n, i) => (
          <div key={i} style={styles.numberCard}>
            <span style={styles.numberValue}>{n.num}</span>
            <span style={styles.numberLabel}>{n.label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

// ─── CART PAGE ───────────────────────────────────────────────────
function CartPage({ cart, updateQty, removeFromCart, navigate }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section style={styles.cartPage}>
      <div style={styles.cartInner}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionSub}>Your Selection</p>
          <h2 style={styles.sectionTitle}>Shopping Cart</h2>
          <div style={styles.sectionDivider} />
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyCart} className="dv-fade-up">
            <span style={styles.emptyIcon}>◇</span>
            <h3 style={styles.emptyTitle}>Your cart is empty</h3>
            <p style={styles.emptyText}>Discover our collection and find your signature scent.</p>
            <button style={styles.heroBtn} onClick={() => navigate("home")}>BROWSE COLLECTION</button>
          </div>
        ) : (
          <div style={styles.cartLayout}>
            <div style={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem} className="dv-fade-up">
                  <img src={item.image} alt={item.name} style={styles.cartItemImg} />
                  <div style={styles.cartItemInfo}>
                    <h3 style={styles.cartItemName}>{item.name}</h3>
                    <p style={styles.cartItemMeta}>{item.category} · {item.volume}</p>
                    <p style={styles.cartItemPrice}>₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                  <div style={styles.cartItemActions}>
                    <div style={styles.qtyControl}>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                      <span style={styles.qtyValue}>{item.qty}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.cartSummary} className="dv-fade-up">
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: "#c9a84c" }}>FREE</span>
              </div>
              <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <button style={styles.checkoutBtn}>CHECKOUT — ₹{total.toLocaleString("en-IN")}</button>
              <button style={styles.continueBtn} onClick={() => navigate("home")}>← Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Global CSS (animations, responsive) ────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  @keyframes dvFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dvFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes dvMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.33%); }
  }
  @keyframes dvToast {
    0% { transform: translateX(100%); opacity: 0; }
    10% { transform: translateX(0); opacity: 1; }
    90% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  .dv-fade-up { animation: dvFadeUp 0.8s ease-out both; }
  .dv-float { animation: dvFloat 2s ease-in-out infinite; }
  .dv-marquee { animation: dvMarquee 20s linear infinite; }
  .dv-toast { animation: dvToast 2.2s ease-in-out forwards; }

  .dv-hamburger { display: none !important; }

  @media (max-width: 768px) {
    .dv-nav-links { display: none !important; }
    .dv-hamburger { display: flex !important; }
  }
`;

// ─── Styles ─────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  surface2: "#1a1a1a",
  border: "#262626",
  gold: "#c9a84c",
  goldLight: "#d4ba6a",
  goldDark: "#a88a32",
  text: "#f0ece2",
  textMuted: "#8a8580",
  white: "#ffffff",
};

const font = {
  display: "'Cormorant Garamond', 'Georgia', serif",
  body: "'Outfit', sans-serif",
};

const styles = {
  app: {
    background: C.bg,
    color: C.text,
    fontFamily: font.body,
    minHeight: "100vh",
    overflowX: "hidden",
  },

  // Toast
  toast: {
    position: "fixed", top: 24, right: 24, zIndex: 9999,
    background: C.gold, color: C.bg,
    padding: "14px 28px", borderRadius: 4,
    fontFamily: font.body, fontSize: 14, fontWeight: 500,
    letterSpacing: "0.05em",
    boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
  },

  // Nav
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
  },
  navInner: {
    maxWidth: 1280, margin: "0 auto",
    padding: "0 32px", height: 72,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: {
    fontFamily: font.display, fontSize: 28, fontWeight: 600,
    letterSpacing: "0.2em", color: C.gold, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 10,
  },
  logoIcon: { fontSize: 16, opacity: 0.8 },
  navLinks: { display: "flex", gap: 8 },
  navLink: {
    background: "none", border: "none", color: C.textMuted,
    fontFamily: font.body, fontSize: 12, fontWeight: 500,
    letterSpacing: "0.15em", cursor: "pointer",
    padding: "8px 18px", borderRadius: 4,
    transition: "all 0.3s", position: "relative",
  },
  navLinkActive: { color: C.gold },
  cartBadge: {
    position: "absolute", top: 2, right: 4,
    background: C.gold, color: C.bg,
    fontSize: 10, fontWeight: 700,
    width: 18, height: 18, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  hamburger: {
    background: "none", border: "none", color: C.gold,
    fontSize: 24, cursor: "pointer", padding: 8,
    alignItems: "center", justifyContent: "center",
  },
  mobileMenu: {
    background: C.surface,
    borderTop: `1px solid ${C.border}`,
    padding: "16px 32px",
    display: "flex", flexDirection: "column", gap: 4,
  },
  mobileLink: {
    background: "none", border: "none", color: C.text,
    fontFamily: font.body, fontSize: 14, fontWeight: 500,
    letterSpacing: "0.12em", cursor: "pointer",
    padding: "12px 0", textAlign: "left",
    borderBottom: `1px solid ${C.border}`,
  },

  // Hero
  hero: {
    position: "relative", height: "100vh", minHeight: 600,
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundImage: "url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1400&h=900&fit=crop')",
    backgroundSize: "cover", backgroundPosition: "center",
  },
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.85))",
  },
  heroContent: {
    position: "relative", zIndex: 2,
    textAlign: "center", padding: "0 24px", maxWidth: 700,
  },
  heroSub: {
    fontFamily: font.body, fontSize: 12, fontWeight: 500,
    letterSpacing: "0.35em", color: C.gold,
    textTransform: "uppercase", marginBottom: 20,
  },
  heroTitle: {
    fontFamily: font.display, fontSize: "clamp(56px, 10vw, 110px)",
    fontWeight: 300, letterSpacing: "0.25em",
    color: C.text, lineHeight: 1, marginBottom: 24,
  },
  heroDesc: {
    fontFamily: font.body, fontSize: 16, fontWeight: 300,
    color: C.textMuted, lineHeight: 1.8,
    maxWidth: 500, margin: "0 auto 40px",
  },
  heroBtn: {
    background: "transparent", border: `1px solid ${C.gold}`,
    color: C.gold, fontFamily: font.body,
    fontSize: 12, fontWeight: 500, letterSpacing: "0.2em",
    padding: "16px 40px", cursor: "pointer",
    transition: "all 0.4s",
  },
  heroScroll: {
    position: "absolute", bottom: 40,
    zIndex: 2, color: C.gold, fontSize: 24, opacity: 0.6,
  },

  // Marquee
  marqueeWrap: {
    overflow: "hidden", borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`, padding: "18px 0",
    background: C.surface,
  },
  marquee: { display: "flex", whiteSpace: "nowrap", width: "max-content" },
  marqueeText: {
    fontFamily: font.display, fontSize: 14,
    letterSpacing: "0.3em", color: C.goldDark, opacity: 0.6,
  },

  // Features Strip
  featuresStrip: {
    display: "flex", justifyContent: "center", gap: 60,
    padding: "60px 32px", flexWrap: "wrap",
    maxWidth: 1100, margin: "0 auto",
  },
  featureCard: { textAlign: "center", maxWidth: 260 },
  featureIcon: { fontSize: 28, color: C.gold, display: "block", marginBottom: 16 },
  featureTitle: {
    fontFamily: font.display, fontSize: 20, fontWeight: 500,
    color: C.text, marginBottom: 8,
  },
  featureDesc: { fontFamily: font.body, fontSize: 13, color: C.textMuted, lineHeight: 1.6 },

  // Section
  section: { padding: "80px 32px", maxWidth: 1280, margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: 56 },
  sectionSub: {
    fontFamily: font.body, fontSize: 11, fontWeight: 500,
    letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: font.display, fontSize: "clamp(32px, 5vw, 48px)",
    fontWeight: 400, color: C.text, letterSpacing: "0.08em",
  },
  sectionDivider: {
    width: 60, height: 1, background: C.gold,
    margin: "20px auto 0", opacity: 0.5,
  },

  // Product Grid
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 32,
  },
  productCard: {
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 6, overflow: "hidden",
    transition: "all 0.4s", cursor: "pointer",
  },
  productCardHover: {
    borderColor: C.goldDark,
    boxShadow: "0 12px 48px rgba(201,168,76,0.08)",
    transform: "translateY(-4px)",
  },
  productImgWrap: { position: "relative", overflow: "hidden", height: 320 },
  productImg: {
    width: "100%", height: "100%", objectFit: "cover",
    transition: "transform 0.6s",
  },
  productImgHover: { transform: "scale(1.05)" },
  productBadge: {
    position: "absolute", top: 16, left: 16,
    background: C.gold, color: C.bg,
    fontFamily: font.body, fontSize: 10, fontWeight: 600,
    letterSpacing: "0.12em", textTransform: "uppercase",
    padding: "6px 14px", borderRadius: 3,
  },
  productInfo: { padding: "24px" },
  productCategory: {
    fontFamily: font.body, fontSize: 11, fontWeight: 500,
    letterSpacing: "0.15em", color: C.textMuted,
    textTransform: "uppercase", marginBottom: 8,
  },
  productName: {
    fontFamily: font.display, fontSize: 26, fontWeight: 500,
    color: C.text, marginBottom: 4,
  },
  productTagline: {
    fontFamily: font.body, fontSize: 13, color: C.textMuted,
    fontStyle: "italic", marginBottom: 16,
  },
  productNotes: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  noteTag: {
    background: C.surface2, border: `1px solid ${C.border}`,
    padding: "4px 12px", borderRadius: 20,
    fontFamily: font.body, fontSize: 11, color: C.textMuted,
    letterSpacing: "0.05em",
  },
  productBottom: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: 16, borderTop: `1px solid ${C.border}`,
  },
  productPrice: {
    fontFamily: font.display, fontSize: 24, fontWeight: 500, color: C.gold,
  },
  addBtn: {
    background: C.gold, border: "none", color: C.bg,
    fontFamily: font.body, fontSize: 11, fontWeight: 600,
    letterSpacing: "0.12em", padding: "12px 24px",
    borderRadius: 3, cursor: "pointer", transition: "all 0.3s",
  },

  // Testimonials
  testimonialSection: { background: C.surface, padding: "80px 32px", maxWidth: "100%", borderRadius: 0 },
  testimonialGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 32, maxWidth: 1100, margin: "0 auto",
  },
  testimonialCard: {
    background: C.bg, border: `1px solid ${C.border}`,
    padding: 32, borderRadius: 6,
  },
  testimonialStars: { color: C.gold, fontSize: 16, letterSpacing: 4, marginBottom: 16 },
  testimonialText: {
    fontFamily: font.display, fontSize: 18, fontWeight: 400,
    fontStyle: "italic", color: C.text, lineHeight: 1.6,
    marginBottom: 20,
  },
  testimonialName: {
    fontFamily: font.body, fontSize: 12, fontWeight: 500,
    letterSpacing: "0.1em", color: C.gold,
  },

  // CTA
  ctaSection: {
    textAlign: "center", padding: "100px 32px",
    background: `linear-gradient(to bottom, ${C.bg}, ${C.surface})`,
  },
  ctaContent: { maxWidth: 550, margin: "0 auto" },
  ctaTitle: {
    fontFamily: font.display, fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 400, color: C.text, marginBottom: 16,
  },
  ctaDesc: {
    fontFamily: font.body, fontSize: 15, color: C.textMuted,
    marginBottom: 32, lineHeight: 1.6,
  },

  // About Hero
  aboutHero: {
    position: "relative", height: "60vh", minHeight: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundImage: "url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1400&h=700&fit=crop')",
    backgroundSize: "cover", backgroundPosition: "center",
    marginTop: 72,
  },
  aboutHeroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" },
  aboutTitle: {
    fontFamily: font.display, fontSize: "clamp(36px, 7vw, 64px)",
    fontWeight: 300, color: C.text, letterSpacing: "0.12em",
  },

  // About
  aboutSection: { maxWidth: 1100, margin: "0 auto", padding: "80px 32px" },
  aboutGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
  },
  aboutHeading: {
    fontFamily: font.display, fontSize: 36, fontWeight: 400,
    color: C.text, marginBottom: 24,
  },
  aboutText: {
    fontFamily: font.body, fontSize: 15, color: C.textMuted,
    lineHeight: 1.8, marginBottom: 20,
  },
  aboutImageWrap: { borderRadius: 6, overflow: "hidden" },
  aboutImage: { width: "100%", height: "auto", display: "block" },

  // Values
  valuesSection: { padding: "80px 32px", background: C.surface },
  valuesGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 32, maxWidth: 1100, margin: "0 auto",
  },
  valueCard: {
    background: C.bg, border: `1px solid ${C.border}`,
    padding: 40, borderRadius: 6, textAlign: "center",
  },
  valueIcon: { fontSize: 36, color: C.gold, display: "block", marginBottom: 20 },
  valueTitle: {
    fontFamily: font.display, fontSize: 24, fontWeight: 500,
    color: C.text, marginBottom: 12,
  },
  valueDesc: { fontFamily: font.body, fontSize: 14, color: C.textMuted, lineHeight: 1.7 },

  // Numbers
  numbersSection: {
    display: "flex", justifyContent: "center", gap: 64,
    padding: "60px 32px", flexWrap: "wrap",
    maxWidth: 900, margin: "0 auto",
  },
  numberCard: {
    textAlign: "center", display: "flex", flexDirection: "column", gap: 4,
  },
  numberValue: {
    fontFamily: font.display, fontSize: 48, fontWeight: 300,
    color: C.gold, letterSpacing: "0.05em",
  },
  numberLabel: { fontFamily: font.body, fontSize: 12, color: C.textMuted, letterSpacing: "0.1em" },

  // Cart Page
  cartPage: { paddingTop: 120, paddingBottom: 80 },
  cartInner: { maxWidth: 1100, margin: "0 auto", padding: "0 32px" },
  emptyCart: { textAlign: "center", padding: "60px 0" },
  emptyIcon: { fontSize: 56, color: C.gold, display: "block", marginBottom: 20, opacity: 0.4 },
  emptyTitle: {
    fontFamily: font.display, fontSize: 28, fontWeight: 400,
    color: C.text, marginBottom: 12,
  },
  emptyText: { fontFamily: font.body, fontSize: 14, color: C.textMuted, marginBottom: 32 },

  cartLayout: { display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" },
  cartItems: { display: "flex", flexDirection: "column", gap: 20 },
  cartItem: {
    display: "flex", gap: 20, padding: 20,
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 6, alignItems: "center",
  },
  cartItemImg: { width: 90, height: 110, objectFit: "cover", borderRadius: 4 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontFamily: font.display, fontSize: 22, fontWeight: 500, color: C.text, marginBottom: 4 },
  cartItemMeta: { fontFamily: font.body, fontSize: 12, color: C.textMuted, letterSpacing: "0.08em", marginBottom: 8 },
  cartItemPrice: { fontFamily: font.display, fontSize: 20, color: C.gold },
  cartItemActions: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  qtyControl: { display: "flex", alignItems: "center", gap: 12 },
  qtyBtn: {
    background: C.surface2, border: `1px solid ${C.border}`,
    color: C.text, width: 32, height: 32, borderRadius: 4,
    cursor: "pointer", fontSize: 16,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  qtyValue: { fontFamily: font.body, fontSize: 14, color: C.text, minWidth: 20, textAlign: "center" },
  removeBtn: {
    background: "none", border: "none",
    fontFamily: font.body, fontSize: 11, color: C.textMuted,
    cursor: "pointer", letterSpacing: "0.08em",
    textDecoration: "underline", textUnderlineOffset: 3,
  },

  // Cart Summary
  cartSummary: {
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: 6, padding: 32, position: "sticky", top: 100,
  },
  summaryTitle: {
    fontFamily: font.display, fontSize: 24, fontWeight: 500,
    color: C.text, marginBottom: 24,
    paddingBottom: 16, borderBottom: `1px solid ${C.border}`,
  },
  summaryRow: {
    display: "flex", justifyContent: "space-between",
    fontFamily: font.body, fontSize: 14, color: C.textMuted,
    marginBottom: 14,
  },
  summaryTotal: {
    fontSize: 18, fontWeight: 600, color: C.text,
    paddingTop: 16, marginTop: 8,
    borderTop: `1px solid ${C.border}`,
  },
  checkoutBtn: {
    width: "100%", background: C.gold, border: "none",
    color: C.bg, fontFamily: font.body, fontSize: 13,
    fontWeight: 600, letterSpacing: "0.12em",
    padding: "16px", borderRadius: 4, cursor: "pointer",
    marginTop: 24, transition: "all 0.3s",
  },
  continueBtn: {
    width: "100%", background: "none", border: "none",
    fontFamily: font.body, fontSize: 12, color: C.textMuted,
    cursor: "pointer", marginTop: 16, letterSpacing: "0.05em",
  },

  // Footer
  footer: {
    borderTop: `1px solid ${C.border}`, background: C.surface,
    padding: "60px 0 0",
  },
  footerInner: { maxWidth: 1100, margin: "0 auto", padding: "0 32px" },
  footerBrand: { marginBottom: 40 },
  footerLogo: {
    fontFamily: font.display, fontSize: 24, fontWeight: 600,
    letterSpacing: "0.2em", color: C.gold,
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 8,
  },
  footerTagline: { fontFamily: font.body, fontSize: 13, color: C.textMuted },
  footerColumns: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 32, marginBottom: 40,
  },
  footerHead: {
    fontFamily: font.display, fontSize: 16, fontWeight: 500,
    color: C.text, marginBottom: 16,
  },
  footerLink: {
    display: "block", background: "none", border: "none",
    fontFamily: font.body, fontSize: 13, color: C.textMuted,
    cursor: "pointer", marginBottom: 10, padding: 0, textAlign: "left",
  },
  footerText: { fontFamily: font.body, fontSize: 13, color: C.textMuted, marginBottom: 8 },
  footerBottom: {
    borderTop: `1px solid ${C.border}`, padding: "24px 0",
    marginTop: 16,
  },
  footerCopy: { fontFamily: font.body, fontSize: 12, color: C.textMuted, textAlign: "center" },
};
