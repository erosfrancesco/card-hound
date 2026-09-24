import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { MyCardsPage } from "./pages/MyCardsPage";
import { SearchPage } from "./pages/FindCardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/my_cards" replace />} />
          <Route path="my_cards" element={<MyCardsPage />} />
          <Route path="search/:blueprintId" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
