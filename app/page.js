'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function HomePage() {
  const [language, setLanguage] = useState('en')

  const copy = useMemo(() => {
    if (language === 'es') {
      return {
        badge: 'SLFlipForge',
        heroTitle1: 'Convierte tu inventario',
        heroTitle2: 'en ganancias.',
        heroText:
          'El sistema operativo para revendedores que quieren publicar más rápido, calcular márgenes y crecer como vendedor cohete.',
        primaryCta: 'Entrar al Command Center',
        secondaryCta: 'Abrir Inventario',
        stat1Title: 'Publica rápido',
        stat1Text: 'Publica productos en segundos',
        stat2Title: 'Venta bilingüe',
        stat2Text: 'Vende en inglés y español',
        stat3Title: 'Ganancia primero',
        stat3Text: 'Maximiza cada flip',
        rocketCardTitle: 'Modo Vendedor Cohete',
        rocketCardText:
          'Controla flips, detecta oportunidades y mueve inventario con más confianza.',
        signalTitle: 'Señal de FlipBot',
        signalText: 'Ganancia esperada: $84 • ROI: 71% • Recomendación: COMPRAR',
        toolsTitle1: 'Administrador de Inventario',
        toolsText1: 'Agrega inventario, cambia estados y controla márgenes.',
        toolsTitle2: 'Escáner de Flips',
        toolsText2: 'Evalúa productos y estima valor de reventa rápido.',
        toolsTitle3: 'Analítica de Ganancias',
        toolsText3: 'Visualiza utilidad, ranking y ROI.',
        toolsTitle4: 'Alertas FlipBot',
        toolsText4: 'Descubre oportunidades y señales de compra.',
        howBadge: 'Cómo funciona',
        howTitle: 'Del sourcing a la ganancia en un solo flujo',
        howText:
          'SLFlipForge le da al revendedor un sistema claro para encontrar productos, estimar ganancias, organizar inventario y vender mejor.',
        step1Title: '1. Encuentra la oportunidad',
        step1Text: 'Busca productos y detecta flips prometedores.',
        step2Title: '2. Calcula el margen',
        step2Text: 'Mide reventa, fees, shipping y ROI.',
        step3Title: '3. Escala la operación',
        step3Text: 'Controla inventario, listados y ventas.',
        finalBadge: '¿Listo para vender más rápido?',
        finalTitle: 'Conviértete en vendedor cohete con SLFlipForge',
        finalText:
          'Activa tu flujo de reventa, controla cada margen y construye una operación real con un dashboard hecho para flippers.',
        finalPrimary: 'Entrar a SLFlipForge',
        finalSecondary: 'Comenzar con Inventario',
        visualTop: 'SL',
        visualBrand: 'FLIPFORGE',
        visualHeadline: 'Conviértete en un vendedor cohete',
        visualBullet1: 'Publica productos en segundos',
        visualBullet2: 'Vende en inglés y español',
        visualBullet3: 'Maximiza tus ganancias',
        visualButton: 'ENTRA AHORA',
        visualSub: 'y empieza a ganar dinero'
      }
    }

    return {
      badge: 'SLFlipForge',
      heroTitle1: 'Turn inventory',
      heroTitle2: 'into profit.',
      heroText:
        'The reseller operating system for flippers who want to publish faster, track margins, and grow like a rocket seller.',
      primaryCta: 'Launch Command Center',
      secondaryCta: 'Open Inventory',
      stat1Title: 'Post faster',
      stat1Text: 'Publish products in seconds',
      stat2Title: 'Bilingual selling',
      stat2Text: 'Sell in English and Spanish',
      stat3Title: 'Profit first',
      stat3Text: 'Maximize every flip',
      rocketCardTitle: 'Rocket Seller Mode',
      rocketCardText:
        'Track flips, spot opportunities, and move inventory with more confidence.',
      signalTitle: 'FlipBot Signal',
      signalText: 'Expected Profit: $84 • ROI: 71% • Recommendation: BUY',
      toolsTitle1: 'Inventory Manager',
      toolsText1: 'Add inventory, update statuses, and track margins.',
      toolsTitle2: 'Flip Scanner',
      toolsText2: 'Evaluate products and estimate resale value fast.',
      toolsTitle3: 'Profit Analytics',
      toolsText3: 'Visualize profit, leaderboard flips, and ROI.',
      toolsTitle4: 'FlipBot Alerts',
      toolsText4: 'Surface hot opportunities and sourcing signals.',
      howBadge: 'How it works',
      howTitle: 'From sourcing to profit in one workflow',
      howText:
        'SLFlipForge gives flippers a focused operating system: source smarter, estimate faster, organize inventory, and keep profit visible at every step.',
      step1Title: '1. Find the deal',
      step1Text: 'Source products and identify promising flips.',
      step2Title: '2. Estimate the margin',
      step2Text: 'Measure resale, fees, shipping, and ROI.',
      step3Title: '3. Scale the operation',
      step3Text: 'Track inventory, listings, and sold items.',
      finalBadge: 'Ready to sell faster?',
      finalTitle: 'Become a rocket seller with SLFlipForge',
      finalText:
        'Launch your flipping workflow, track every margin, and build a real operation with a dashboard made for resellers.',
      finalPrimary: 'Enter SLFlipForge',
      finalSecondary: 'Start with Inventory',
      visualTop: 'SL',
      visualBrand: 'FLIPFORGE',
      visualHeadline: 'Become a rocket seller',
      visualBullet1: 'Publish products in seconds',
      visualBullet2: 'Sell in English and Spanish',
      visualBullet3: 'Maximize your profits',
      visualButton: 'ENTER NOW',
      visualSub: 'and start making money'
    }
  }, [language])

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
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px'
            }}
          >
            <div
              className="card"
              style={{
                display: 'inline-flex',
                gap: '8px',
                padding: '8px'
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={() => setLanguage('en')}
                style={{
                  opacity: language === 'en' ? 1 : 0.65
                }}
              >
                EN
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setLanguage('es')}
                style={{
                  opacity: language === 'es' ? 1 : 0.65
                }}
              >
                ES
              </button>
            </div>
          </div>

          <div className="dashboard-grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p
                className="muted"
                style={{
                  marginBottom: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                {copy.badge}
              </p>

              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
                  lineHeight: 1.05,
                  marginBottom: '16px'
                }}
              >
                {copy.heroTitle1}
                <br />
                {copy.heroTitle2}
              </h1>

              <p
                className="muted"
                style={{
                  fontSize: '1.08rem',
                  maxWidth: '640px',
                  marginBottom: '22px'
                }}
              >
                {copy.heroText}
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
                  {copy.primaryCta}
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
                  {copy.secondaryCta}
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
                  <strong>{copy.stat1Title}</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    {copy.stat1Text}
                  </div>
                </div>

                <div className="card">
                  <strong>{copy.stat2Title}</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    {copy.stat2Text}
                  </div>
                </div>

                <div className="card">
                  <strong>{copy.stat3Title}</strong>
                  <div className="muted" style={{ marginTop: '6px' }}>
                    {copy.stat3Text}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className="card"
                style={{
                  minHeight: '520px',
                  position: 'relative',
                  overflow: 'hidden',
                  background:
                    'radial-gradient(circle at top right, rgba(245,184,77,0.30), transparent 28%), radial-gradient(circle at 80% 35%, rgba(255,120,0,0.20), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(4,10,24,0.15), rgba(4,10,24,0.55))'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '28px',
                    left: '28px',
                    right: '28px',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '18px'
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        background: 'linear-gradient(180deg, #2957c7, #15306e)',
                        border: '2px solid rgba(255,255,255,0.35)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1.4rem',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
                      }}
                    >
                      {copy.visualTop}
                    </div>

                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                        letterSpacing: '0.02em',
                        background: 'linear-gradient(90deg, #ffffff, #f5b84d 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {copy.visualBrand}
                    </div>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                      lineHeight: 1,
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      maxWidth: '520px'
                    }}
                  >
                    {copy.visualHeadline}
                  </h2>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '150px',
                    right: '36px',
                    fontSize: '6rem',
                    filter: 'drop-shadow(0 22px 40px rgba(0,0,0,0.45))',
                    transform: 'rotate(12deg)',
                    zIndex: 2
                  }}
                >
                  🚀
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    bottom: '26px',
                    right: '24px',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gap: '10px',
                      marginBottom: '18px'
                    }}
                  >
                    <div className="card">
                      <strong>🚀 {copy.visualBullet1}</strong>
                    </div>

                    <div className="card">
                      <strong>🌎 {copy.visualBullet2}</strong>
                    </div>

                    <div className="card">
                      <strong>💰 {copy.visualBullet3}</strong>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(180deg, #f6c15d, #e5a42d)',
                      color: '#111',
                      padding: '14px 22px',
                      borderRadius: '14px',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      boxShadow: '0 18px 40px rgba(245,184,77,0.22)',
                      marginBottom: '8px'
                    }}
                  >
                    {copy.visualButton}
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                      opacity: 0.9,
                      marginBottom: '8px'
                    }}
                  >
                    {copy.visualSub}
                  </div>

                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                      letterSpacing: '0.03em'
                    }}
                  >
                    SLFLIPFORGE.COM
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto auto 120px 24px',
                    width: '180px',
                    height: '120px',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.10)',
                    transform: 'rotate(-6deg)',
                    zIndex: 1
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 24px 150px auto',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(245,184,77,0.22), rgba(245,184,77,0.02) 70%)',
                    zIndex: 1
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <div className="dashboard-grid-4">
            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📦</div>
              <strong>{copy.toolsTitle1}</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                {copy.toolsText1}
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📷</div>
              <strong>{copy.toolsTitle2}</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                {copy.toolsText2}
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📈</div>
              <strong>{copy.toolsTitle3}</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                {copy.toolsText3}
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🚨</div>
              <strong>{copy.toolsTitle4}</strong>
              <p className="muted" style={{ marginTop: '8px' }}>
                {copy.toolsText4}
              </p>
            </div>
          </div>
        </section>

        <section
          className="card"
          style={{ marginBottom: '24px', padding: '24px' }}
        >
          <div className="dashboard-grid-2" style={{ alignItems: 'start' }}>
            <div>
              <p className="muted" style={{ marginBottom: '10px' }}>
                {copy.howBadge}
              </p>
              <h2 style={{ marginBottom: '14px' }}>{copy.howTitle}</h2>
              <p className="muted" style={{ maxWidth: '620px' }}>
                {copy.howText}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div className="card">
                <strong>{copy.step1Title}</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  {copy.step1Text}
                </div>
              </div>

              <div className="card">
                <strong>{copy.step2Title}</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  {copy.step2Text}
                </div>
              </div>

              <div className="card">
                <strong>{copy.step3Title}</strong>
                <div className="muted" style={{ marginTop: '6px' }}>
                  {copy.step3Text}
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
            {copy.finalBadge}
          </p>

          <h2 style={{ marginBottom: '12px' }}>{copy.finalTitle}</h2>

          <p
            className="muted"
            style={{ maxWidth: '720px', margin: '0 auto 18px auto' }}
          >
            {copy.finalText}
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
              {copy.finalPrimary}
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
              {copy.finalSecondary}
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}