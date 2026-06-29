import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import ProductListPage from "./components/ProductList/ProductListPage";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Container>
      <NavigationBar />

      <Routes>
        {/* <Route path="/user/:userId" element={<></>} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<ProductListPage />} />
        <Route path="*" element={<h2>404 - Page not found</h2>} />
      </Routes>
    </Container>
  );
}

export default App;
