import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/testing" element={<h1>Test Route</h1>} />
          <Route path="/" element={<h1>Page Count: </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
