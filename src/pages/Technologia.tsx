import { Link } from 'react-router-dom';
import './Technologia.css';

const Technologia = () => {
  return (
    <div className="technologia-page">
      <div className="container">
        <div className="page-header">
          <h1>Technologiczna karta LamiSec</h1>
          <p>
            Poznaj szczegółowy proces aplikacji materiałów ochronnych LamiSec. 
            Nasza karta technologiczna zawiera kompletne informacje o każdym etapie procesu, 
            zapewniając profesjonalną i bezpieczną aplikację materiałów ochronnych.
          </p>
        </div>
        
        <div className="tech-map">
          <div className="tech-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Przygotowanie powierzchni</h3>
              <p>
                Podstawowe przygotowanie powierzchni nie jest wymagane. Materiał LamiSec można nakładać na kurz i zabrudzenia. Mycie i czyszczenie przed aplikacją nie jest potrzebne.
              </p>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Aplikacja materiału</h3>
              <p>
                Nanoszenie wykonuje się równomiernie zwykłym wałkiem malarskim, rozprowadzając po powierzchni.
              </p>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Wysychanie i utwardzanie</h3>
              <p>
                Nie ma potrzeby czekać na wyschnięcie powłoki. Można od razu rozpoczynać prace brudne, np. malowanie ścian, tynkowanie, szpachlowanie.
              </p>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Eksploatacja i konserwacja</h3>
              <p>
                Prawidłowe użytkowanie chronionej powierzchni oraz regularna 
                kontrola stanu warstwy ochronnej w trakcie eksploatacji. Powłoka może pozostawać na powierzchni bez ograniczeń czasowych – od 1 roku do 10 lat i dłużej.
              </p>
            </div>
          </div>
        </div>
        
        <div className="tech-notes">
          <div className="note-card">
            <h3>Ważne uwagi techniczne</h3>
            <ul>
              <li>Temperatura aplikacji: 15-25°C</li>
              <li>Wilgotność powietrza: max 70%</li>
              <li>Czas utwardzania: 24-48 godzin</li>
              <li>Przyczepność: min 95%</li>
              <li>Transport możliwy w temperaturze od -20°C do +36°C.</li>
              <li>Nakładanie od -1°C do +40°C.</li>
              <li>Czas schnięcia zależy od temperatury i wilgotności.</li>
              <li>Mieszanie przed użyciem nie jest wymagane!!!</li>
              <li>Po eksploatacji powłoka usuwa się bez śladów, a powierzchnia pozostaje czysta jak nowa.</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h3>Bezpieczeństwo pracy</h3>
            <ul>
              <li>Używanie rękawic ochronnych</li>
              <li>Wentylacja pomieszczenia</li>
              <li>Unikanie kontaktu z oczami</li>
              <li>Przechowywanie w miejscu niedostępnym dla dzieci</li>
            </ul>
          </div>
        </div>
        
        <div className="tech-cta">
          <h3>Potrzebujesz szczegółowych instrukcji?</h3>
          <p>
            Skontaktuj się z naszym zespołem technicznym, aby otrzymać 
            kompletne instrukcje aplikacji dla konkretnego zastosowania.
          </p>
          <div className="cta-buttons">
            <Link to="/kontakt" className="btn btn-primary">
              Skontaktuj się z nami
            </Link>
            <Link to="/zamow" className="btn btn-secondary">
              Oblicz koszty
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologia;
