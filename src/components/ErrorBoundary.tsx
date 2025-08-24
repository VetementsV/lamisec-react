import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: any}> {
  constructor(props: any) { 
    super(props); 
    this.state = { error: null }; 
  }
  
  static getDerivedStateFromError(error: any) { 
    return { error }; 
  }
  
  componentDidCatch(error: any, info: any) { 
    console.error('[zamow] crash', error, info); 
  }
  
  render() { 
    if (this.state.error) {
      return (
        <div style={{
          padding: '2rem',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          margin: '1rem',
          color: '#c33'
        }}>
          <h3>Błąd na stronie zamówienia</h3>
          <p>Wystąpił błąd podczas ładowania strony. Spróbuj odświeżyć stronę.</p>
          <details style={{ marginTop: '1rem' }}>
            <summary>Szczegóły błędu (dla programistów)</summary>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem'
            }}>
              {this.state.error.toString()}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
