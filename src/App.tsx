import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Produkty from './pages/Produkty';
import Szklo from './pages/Szklo';
import Marmur from './pages/Marmur';
import Technologia from './pages/Technologia';
import Zamow from './pages/Zamow';
import SzybkiZakup from './pages/SzybkiZakup';
import Kontakt from './pages/Kontakt';
import Sukces from './pages/Sukces';
import Anulowano from './pages/Anulowano';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produkty" element={<Produkty />} />
            <Route path="/produkty/szklo" element={<Szklo />} />
            <Route path="/produkty/marmur" element={<Marmur />} />
            <Route path="/technologia" element={<Technologia />} />
            <Route path="/zamow" element={<Zamow />} />
            <Route path="/szybki-zakup" element={<SzybkiZakup />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/sukces" element={<Sukces />} />
            <Route path="/anulowano" element={<Anulowano />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
