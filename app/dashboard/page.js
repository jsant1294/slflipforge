'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
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
                The reseller operating system for fast-moving flippers. Track inventory,
                estimate margins, publish faster, and grow like a rocket seller.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '18px'
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
                  View Inventory Manager
                </Link>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '12px',
                  marginTop: '16px'
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

            <div>
              <div
                className="card"
                style={{
                  minHeight: '420px',
                  position: 'relative',
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at top right, rgba(245,184,77,0.28), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: '22px',
                    fontSize: '2.6rem'
                  }}
                >
                  🚀
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 20px 20px 20px'
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gap: '12px'
                    }}
                  >
                    <div className="card">
                      <strong>Rocket Seller Mode</strong>
                      <p className="muted" style={{ marginTop: '8px' }}>
                        Track flips, spot high-margin deals, and move inventory with confidence.
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

                    <div className="card">
                      <p className="muted" style={{ marginBottom: '8px' }}>
                        FlipBot Signal
                      </p>
                      <strong>Milwaukee M18 Bundle</strong>
                      <div className="muted" style={{ marginTop: '6px' }}>
                        Expected Profit: $84 • ROI: 71% • Recommendation: BUY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <div className="dashboard-grid-4">
            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📦</div>
              <strong>Inventory Manager</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                Add inventory, update statuses, and track margins.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📷</div>
              <strong>Flip Scanner</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                Evaluate products and estimate resale value fast.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📈</div>
              <strong>Profit Analytics</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                Visualize profit, leaderboard flips, and ROI.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🚨</div>
              <strong>FlipBot Alerts</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                Surface hot opportunities and sourcing signals.
              </p>
            </div>
          </div>
        </section>

        <section
          className="card"
          style={{ marginBottom: '24px', padding: '24px' }}
        >
          <div
            className="dashboard-grid-2"
            style={{ alignItems: 'start' }}
          >
            <div>
              <p className="muted" style={{ marginBottom: '10px' }}>
                How it works
              </p>
              <h2 style={{ marginBottom: '14px' }}>
                From sourcing to profit in one workflow
              </h2>
              <p className="muted" style={{ maxWidth: '620px' }}>
                SLFlipForge gives flippers a focused operating system: source smarter,
                evaluate faster, organize inventory, and keep profit visible at every step.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div className="card">
                <strong>1. Find the deal</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  Source products and scan opportunities.
                </div>
              </div>

              <div className="card">
                <strong>2. Estimate the flip</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  Calculate resale, fees, shipping, and ROI.
                </div>
              </div>

              <div className="card">
                <strong>3. Scale the hustle</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  Track listed, sold, and best-performing inventory.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="card"
          style={{
            padding: '28px',
            marginBottom: '24px',
            textAlign: 'center',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(245,184,77,0.08))'
          }}
        >
          <p className="muted" style={{ marginBottom: '8px' }}>
            Ready to flip faster?
          </p>

          <h2 style={{ marginBottom: '12px' }}>
            Become a rocket seller with SLFlipForge
          </h2>

          <p
            className="muted"
            style={{ maxWidth: '720px', margin: '0 auto 18px auto' }}
          >
            Launch your flipping workflow, track every margin, and build momentum with a real reseller dashboard.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <Link href="/dashboard" className="btn">
              Enter SLFlipForge
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
              Start with Inventory
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}