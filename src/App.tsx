import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { SearchPage } from "./pages/FindCardPage";
import { FavouriteCardsPage } from "./pages/FavouriteCardsPage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/search" replace />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:blueprintId" element={<SearchPage />} />
          <Route path="my_favourites" element={<FavouriteCardsPage />} />
          <Route path="product/:blueprintId" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
