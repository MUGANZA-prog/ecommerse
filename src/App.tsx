
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";
import Home from "./pages/home";
import DetailsPage from "./pages/details";


const App = () => (
    <CartProvider>
      <FilterProvider>
      
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/details" element={<DetailsPage/>} />
            </Routes>
          </BrowserRouter>
      </FilterProvider>
    </CartProvider>
);

export default App;
