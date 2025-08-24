import { Link } from 'react-router-dom';
import './Technologia.css';

const Technologia = () => {
  return (
    <div className="technologia-page">
      <div className="container">
        <div className="page-header">
          <h1>Karta Technologiczna LamiSec</h1>
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
                Oczyszczenie i odtłuszczenie powierzchni przed aplikacją materiału ochronnego. 
                Usunięcie wszystkich zanieczyszczeń, kurzu i tłuszczu jest kluczowe dla 
                zapewnienia optymalnej przyczepności materiału.
              </p>
              <ul className="step-details">
                <li>Oczyszczenie mechaniczne powierzchni</li>
                <li>Usunięcie tłuszczu i zanieczyszczeń</li>
                <li>Sprawdzenie suchości powierzchni</li>
                <li>Przygotowanie narzędzi aplikacyjnych</li>
              </ul>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Aplikacja materiału</h3>
              <p>
                Równomierne naniesienie materiału LamiSec zgodnie z zalecanym zużyciem. 
                Materiał aplikuje się za pomocą specjalistycznych narzędzi, zapewniając 
                równomierną warstwę ochronną.
              </p>
              <ul className="step-details">
                <li>Przygotowanie materiału zgodnie z instrukcją</li>
                <li>Równomierna aplikacja na powierzchnię</li>
                <li>Kontrola grubości warstwy</li>
                <li>Unikanie pęcherzyków powietrza</li>
              </ul>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Wysychanie i utwardzanie</h3>
              <p>
                Pozwolenie na naturalne wyschnięcie i utwardzenie materiału ochronnego. 
                Czas utwardzania zależy od warunków środowiskowych i grubości warstwy.
              </p>
              <ul className="step-details">
                <li>Oczekiwanie na naturalne wyschnięcie</li>
                <li>Kontrola stopnia utwardzenia</li>
                <li>Ochrona przed wilgocią podczas utwardzania</li>
                <li>Sprawdzenie jakości aplikacji</li>
              </ul>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Kontrola jakości</h3>
              <p>
                Sprawdzenie poprawności aplikacji i jakości warstwy ochronnej. 
                Weryfikacja przyczepności i równomierności pokrycia powierzchni.
              </p>
              <ul className="step-details">
                <li>Wizualna kontrola powierzchni</li>
                <li>Sprawdzenie przyczepności materiału</li>
                <li>Kontrola grubości warstwy</li>
                <li>Dokumentacja procesu</li>
              </ul>
            </div>
          </div>
          
          <div className="tech-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Eksploatacja i konserwacja</h3>
              <p>
                Prawidłowe użytkowanie chronionej powierzchni oraz regularna 
                kontrola stanu warstwy ochronnej w trakcie eksploatacji.
              </p>
              <ul className="step-details">
                <li>Regularna kontrola stanu ochrony</li>
                <li>Delikatne czyszczenie powierzchni</li>
                <li>Unikanie agresywnych środków chemicznych</li>
                <li>Planowanie renowacji w razie potrzeby</li>
              </ul>
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
