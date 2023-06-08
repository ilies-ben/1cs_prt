import { Routes, Route } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import HomePage from "./Pages/HomePage";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import ProductPage from "./Pages/ProductPage";
import Product from "./modules/Product/Product";
import Profile from "./Pages/Profile";
import WishlistPage from "./Pages/wishlist";
import CategoryProducts from "./modules/CategoryProducts/index";
function App() {
  return (
     <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/auth" element={<Authentication />}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/products" element={<ProductPage/>}></Route>
      <Route path="/products/:id" element={<Product/>} />
      <Route path="/myProfile" element={<Profile/>} />
      <Route path="/myWishlist" element={<WishlistPage/>} ></Route>
      <Route path="/categories/:name" element={<CategoryProducts/>} />
    </Routes> 
  );
}

export default App;
