import { Route, Routes } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Dashboard from "./pages/Dashboard";
import DetailedPage from "./pages/DetailedPage";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
    <ThemeProvider>

    <Navbar/>
    <CartProvider>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/detailed-page/:id" element={<DetailedPage />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </ProductProvider>
    </CartProvider>
    </ThemeProvider>
    </>
  )
}