import { Link } from 'react-router-dom';
import './Szklo.css';

const Szklo = () => {
  return (
    <div className="szklo-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Strona główna</Link> / 
          <Link to="/produkty">Produkty</Link> / 
          <span>Ochrona szkła/okien</span>
        </div>
        
        <div className="page-header">
          <h1>LamiSec – ochrona szkła/okien</h1>
          <p>Specjalistyczny materiał ochronny do zabezpieczania powierzchni szklanych</p>
        </div>
        
        <div className="product-blocks">
          <div className="product-block">
            <div className="block-image">
              <img src="/images/szklo.jpg" alt="Ochrona szkła" />
            </div>
            <div className="block-content">
              <h3>Opis produktu</h3>
              <p>
                Specjalistyczny materiał ochronny przeznaczony do zabezpieczania 
                powierzchni szklanych. Zapewnia długotrwałą ochronę przed 
                zarysowaniami i zanieczyszczeniami.
              </p>
              <ul className="product-benefits">
                <li>Wysoka przyczepność do powierzchni szklanych</li>
                <li>Łatwe usuwanie bez pozostawiania śladów</li>
                <li>Odporność na wilgoć i zmiany temperatury</li>
                <li>Przezroczystość zachowująca estetykę</li>
              </ul>
              <Link to="/zamow" className="btn btn-primary">Oblicz koszty</Link>
            </div>
          </div>
          
          <div className="product-block reverse">
            <div className="block-content">
              <h3>Korzyści i zalety</h3>
              <p>
                Nasz materiał ochronny do szkła wyróżnia się unikalnymi właściwościami, 
                które zapewniają maksymalną ochronę przy minimalnych kosztach.
              </p>
              <ul className="product-benefits">
                <li>Zużycie: 80-100 g/m² (średnio 90 g/m²)</li>
                <li>Dostępne opakowania: 1kg, 5kg, 20kg</li>
                <li>Przezroczystość zachowująca estetykę</li>
                <li>Ochrona przed zarysowaniami</li>
              </ul>
            </div>
            <div className="block-image">
              <img src="/images/szklo2.jpg" alt="Korzyści ochrony szkła" />
            </div>
          </div>
          
          <div className="product-block">
            <div className="block-image">
              <img src="/images/szklo3.jpg" alt="Zastosowania ochrony szkła" />
            </div>
            <div className="block-content">
              <h3>Zastosowania</h3>
              <p>
                Materiał LamiSec do szkła znajduje zastosowanie w wielu branżach, 
                gdzie wymagana jest ochrona delikatnych powierzchni szklanych.
              </p>
              <ul className="product-benefits">
                <li>Ochrona podczas prac budowlanych</li>
                <li>Zabezpieczenie w przemyśle</li>
                <li>Ochrona okien i fasad</li>
                <li>Zabezpieczenie podczas transportu</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="product-cta">
          <div className="cta-content">
            <h3>Gotowy do zamówienia?</h3>
            <p>
              Skorzystaj z naszego kalkulatora, aby obliczyć koszty dla Twojej powierzchni, 
              lub wybierz szybki zakup bez obliczania.
            </p>
            <div className="cta-buttons">
              <Link to="/zamow" className="btn btn-primary">
                Oblicz koszty
              </Link>
              <Link to="/szybki-zakup" className="btn btn-secondary">
                Szybki zakup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Szklo;
