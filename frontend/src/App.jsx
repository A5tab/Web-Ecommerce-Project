import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Home, About, Contact } from "./pages/index.js";
import CategoryPage from "./components/ProductsContainer/CategoryPage.jsx";
import ProductPage from "./components/ProductsContainer/ProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
