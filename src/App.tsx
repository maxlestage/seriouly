import { HashRouter, Routes, Route } from 'react-router-dom';
import GlassCursor from './components/GlassCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Messages from './pages/Messages';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <GlassCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
