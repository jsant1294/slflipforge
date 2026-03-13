import './globals.css'

export const metadata = {
  title: 'SLFlipForge',
  description: 'Flip smarter. Sell faster.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}