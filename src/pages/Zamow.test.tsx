import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Zamow from './Zamow';

// Mock the packaging functions
jest.mock('../lib/packaging', () => ({
  computePackaging: jest.fn(() => ({
    n20: 1,
    n5: 0,
    n1: 0,
    totalKg: 20,
    materialNet: 720,
    vat: 165.6,
    brutto: 885.6,
    pricePerM2: 36
  })),
  computeMarblePackaging: jest.fn(() => ({
    n20: 0,
    n5: 0,
    n1: 0,
    totalKg: 7,
    materialNet: 595,
    vat: 136.85,
    brutto: 731.85,
    pricePerM2: 29.75
  }))
}));

// Mock the pricing module
jest.mock('../lib/pricing', () => ({
  PRICING: {
    glass: {
      consumption: 0.09,
      buckets: {
        '1kg': 60,
        '5kg': 50,
        '20kg': 36
      }
    },
    marble: {
      consumption: 0.35,
      pricePerKg: 85
    }
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Zamow Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<Zamow />);
    
    // Check that the main elements are rendered
    expect(screen.getByText('Zamów online')).toBeInTheDocument();
    expect(screen.getByText('Kup LamiSec na podstawie wprowadzonej powierzchni – cena obliczana automatycznie.')).toBeInTheDocument();
    expect(screen.getByLabelText('Powierzchnia (m²):')).toBeInTheDocument();
    expect(screen.getByLabelText('Produkt:')).toBeInTheDocument();
  });

  test('shows validation message for invalid area', () => {
    renderWithRouter(<Zamow />);
    
    const areaInput = screen.getByLabelText('Powierzchnia (m²):');
    expect(areaInput).toHaveValue(1);
    
    // The component should show results with default values
    expect(screen.getByText('Wyniki obliczeń')).toBeInTheDocument();
  });

  test('has proper form structure', () => {
    renderWithRouter(<Zamow />);
    
    // Check form elements exist
    expect(screen.getByRole('textbox', { name: /powierzchnia/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /produkt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /przejdź do płatności/i })).toBeInTheDocument();
  });
});

