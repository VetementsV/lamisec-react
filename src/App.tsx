import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
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
      <ErrorBoundary>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkty/szklo" element={<Szklo />} />
              <Route path="/produkty/marmur" element={<Marmur />} />
              <Route path="/technologia" element={<Technologia />} />
              <Route path="/zamow" element={<Zamow />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/sukces" element={<Sukces />} />
              <Route path="/anulowano" element={<Anulowano />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
