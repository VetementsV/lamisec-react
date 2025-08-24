import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Produkty from './pages/Produkty';
import Szklo from './pages/Szklo';
import Marmur from './pages/Marmur';
import Technologia from './pages/Technologia';
import Zamow from './pages/Zamow';
import Kontakt from './pages/Kontakt';
import Sukces from './pages/Sukces';
import Anulowano from './pages/Anulowano';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produkty" element={<Produkty />} />
            <Route path="/produkty/szklo" element={<Szklo />} />
            <Route path="/produkty/marmur" element={<Marmur />} />
            <Route path="/technologia" element={<Technologia />} />
            <Route path="/zamow" element={
              <ErrorBoundary>
                <Zamow />
              </ErrorBoundary>
            } />
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
