import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="page-shell home-page">

      <section className="hero-banner">

        <div className="hero-copy">

          <span className="eyebrow">
            Modern shopping made simple
          </span>

          <h1 className="hero-title">
            A premium storefront for everyday discovery.
          </h1>

          <p>
            Explore curated products, elegant category pages, and a smooth checkout flow designed to feel polished on every device.
          </p>

          <div className="hero-actions">

            <Link
              to="/products"
              className="hero-action"
            >
              Shop Now
            </Link>

            <Link
              to="/register"
              className="hero-action--ghost"
            >
              Create Account
            </Link>

          </div>

          <div className="hero-metrics">

            <div className="metric-card">
              <strong>Fast checkout</strong>
              <span>Streamlined purchase flow</span>
            </div>

            <div className="metric-card">
              <strong>Curated catalog</strong>
              <span>Better product discovery</span>
            </div>

            <div className="metric-card">
              <strong>Secure orders</strong>
              <span>Clean and reliable backend</span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-visual-card">

            <span className="eyebrow">
              New season drop
            </span>

            <h3>
              Designed to feel premium.
            </h3>

            <p>
              Rich colors, soft glass panels, and polished cards bring a more premium shopping experience.
            </p>

            <div className="badge-row">
              <span>Fast delivery</span>
              <span>Secure checkout</span>
              <span>Best sellers</span>
              <span>Fresh arrivals</span>
            </div>

          </div>

        </div>

      </section>

      <section className="feature-grid">

        <article className="feature-card">
          <h4>Elegant storefront</h4>
          <p>Glass panels, layered gradients, and a richer visual hierarchy make the catalog feel intentional.</p>
        </article>

        <article className="feature-card">
          <h4>Focused product pages</h4>
          <p>Clear imagery, strong pricing, and stronger CTA placement improve the shopping journey.</p>
        </article>

        <article className="feature-card">
          <h4>Clean account flow</h4>
          <p>Login, registration, cart, and checkout now share the same premium design language.</p>
        </article>

      </section>

    </div>
  );
}

export default Home;