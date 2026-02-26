import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rides from './pages/Rides';
import Events from './pages/Events';
import Members from './pages/Members';
import About from './pages/About';
import Partners from './pages/Partners';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
