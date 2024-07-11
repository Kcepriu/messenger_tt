import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MainPage } from "./pages/MainPage";

const App: FC = () => {
  const unique_id = uuid();
  return (
    <Routes>
      <Route path="/:idSession" element={<MainPage />} />
      <Route path="*" element={<Navigate to={`/${unique_id}`} replace />} />
    </Routes>
  );
};

export default App;
