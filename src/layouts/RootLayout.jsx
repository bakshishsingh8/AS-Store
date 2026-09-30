import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MiniCart from '../components/MiniCart'
import Toaster from '../components/Toaster'

/**
 * Shell shared by every page: header, page content, footer plus the two
 * global overlays (mini cart drawer and toast stack).
 */
export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MiniCart />
      <Toaster />
    </div>
  )
}

export default RootLayout
