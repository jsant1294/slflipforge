'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">

        {/* HERO SECTION */}

        <section
          className="card"
          style={{
            padding: '32px',
            marginBottom: '24px',
            background:
              'linear-gradient(135deg, rgba(245,184,77,0.16), rgba(7,18,43,0.92) 45%, rgba(255,255,255,0.03))'
          }}
        >

          <div
            className="dashboard-grid-2"
            style={{ alignItems: 'center' }}
          >

            {/* LEFT SIDE */}

            <div>

              <p
                className="muted"
                style={{
                  marginBottom: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                SLFlipForge
              </p>

              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
                  lineHeight: 1.05,
                  marginBottom: '16px'
                }}
              >
                Turn inventory
                <br />
                into profit.
              </h1>

              <p
                className="muted"
                style={{
                  fontSize: '1.08rem',
                  maxWidth: '640px',
                  marginBottom: '22px'
                }}
              >
                The reseller operating system for flippers who want to publish faster,
                track margins, and grow like a rocket seller.
              </p>

              {/* CTA BUTTONS */}

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '20px'
                }}
              >

                <Link href="/dashboard" className="btn">
                  Launch Command Center
                </Link>

                <Link
                  href="/inventory-manager"
                  className="card"
                  style={{
                    textDecoration: 'none',
                    padding: '10px 16px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  Open Inventory
                </Link>

              </div>

              {/* FEATURE CARDS */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
                  gap: '12px'
                }}
              >

                <div className="card">
                  <strong>Post faster</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    Publish products in seconds
                  </div>
                </div>

                <div className="card">
                  <strong>Bilingual selling</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    Sell in English and Spanish
                  </div>
                </div>

                <div className="card">
                  <strong>Profit first</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    Maximize every flip
                  </div>
                </div>

              </div>

            </div>


            {/* RIGHT SIDE VISUAL */}

            <div>

              <div
                className="card"
                style={{
                  minHeight: '420px',
                  position: 'relative',
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at top right, rgba(245,184,77,0.30), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
                }}
              >

                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '3rem'
                  }}
                >
                  🚀
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px'
                  }}
                >

                  <div className="card" style={{ marginBottom: '12px' }}>
                    <strong>Rocket Seller Mode</strong>
                    <p className="muted" style={{ marginTop: '6px' }}>
                      Track flips, spot opportunities, and move inventory faster.
                    </p>
                  </div>

                  <div className="dashboard-grid-2">

                    <div className="card">
                      <p className="muted">Projected Profit</p>
                      <h2>$2,480</h2>
                    </div>

                    <div className="card">
                      <p className="muted">Best ROI</p>
                      <h2>118%</h2>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  )
}