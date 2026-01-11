import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Submit } from './pages/Submit';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--cream)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
