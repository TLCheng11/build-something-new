import { BrowserRouter, Route, Routes } from "react-router-dom";
import DesignPage from "./components/DesignPage/DesignPageLayout/DesignPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Page Count: </h1>} />
          <Route path="/design-page" element={<DesignPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
