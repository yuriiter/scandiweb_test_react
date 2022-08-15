import './sass/_main.scss'
import Category from './views/Category.jsx'
import ProductDetail from './views/ProductDetail.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cart from "./views/Cart";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Category />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
