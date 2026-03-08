import { HashRouter, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import GlassCursor from './components/GlassCursor';
import Splash from './components/Splash';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Messages from './pages/Messages';
import About from './pages/About';
import './App.css';

const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

function App() {
  return (
    <HashRouter>
      <AnimatedBackground />
      {isMobile() && <Splash />}
      <div className="app">
        <ScrollToTop />
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
