import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Offers from './pages/Offers'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

/**
 * Route table. Everything renders inside <RootLayout /> so the header,
 * footer and cart drawer never remount between pages.
 */
function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
