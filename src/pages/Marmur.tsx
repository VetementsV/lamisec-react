import { Link } from 'react-router-dom';
import './Marmur.css';

const Marmur = () => {
  return (
    <div className="marmur-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Strona główna</Link> / 
          <Link to="/produkty">Produkty</Link> / 
          <span>Protektor (marmur)</span>
        </div>
        
        <div className="page-header">
          <h1>LamiSec – protektor (marmur)</h1>
          <p>Profesjonalny materiał ochronny dedykowany powierzchniom marmurowym</p>
        </div>
        
        <div className="product-blocks">
          <div className="product-block">
            <div className="block-image">
              <img src="/images/mramur.jpg" alt="Protektor marmur" />
            </div>
            <div className="block-content">
              <h3>Opis produktu</h3>
              <p>
                Profesjonalny materiał ochronny dedykowany powierzchniom marmurowym. 
                Chroni przed uszkodzeniami mechanicznymi i chemicznymi.
              </p>
              <ul className="product-benefits">
                <li>Specjalna formuła dla powierzchni marmurowych</li>
                <li>Ochrona przed kwasami i zasadami</li>
                <li>Odporność na ścieranie i uderzenia</li>
                <li>Przezroczystość zachowująca estetykę</li>
              </ul>
              <Link to="/zamow" className="btn btn-primary">Oblicz koszty</Link>
            </div>
          </div>
          
          <div className="product-block reverse">
            <div className="block-content">
              <h3>Korzyści i zalety</h3>
              <p>
                Materiał LamiSec do marmuru wyróżnia się unikalnymi właściwościami, 
                które zapewniają maksymalną ochronę delikatnych powierzchni marmurowych.
              </p>
              <ul className="product-benefits">
                <li>Zużycie: 350 g/m²</li>
                <li>Ochrona przed kwasami i zasadami</li>
                <li>Odporność na ścieranie i uderzenia</li>
                <li>Przezroczystość zachowująca estetykę</li>
              </ul>
            </div>
            <div className="block-image">
              <img src="/images/mramur.jpg" alt="Korzyści protektora" />
            </div>
          </div>
          
          <div className="product-block">
            <div className="block-image">
              <img src="/images/mramur.jpg" alt="Zastosowania protektora" />
            </div>
            <div className="block-content">
              <h3>Zastosowania</h3>
              <p>
                Materiał LamiSec do marmuru znajduje zastosowanie w wielu branżach, 
                gdzie wymagana jest ochrona delikatnych powierzchni marmurowych.
              </p>
              <ul className="product-benefits">
                <li>Ochrona podczas prac budowlanych</li>
                <li>Zabezpieczenie w przemyśle</li>
                <li>Ochrona powierzchni marmurowych</li>
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

export default Marmur;
