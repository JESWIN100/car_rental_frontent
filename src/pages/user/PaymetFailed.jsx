import React from 'react';

export default function PaymentFailed() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: 'auto'
    }}>
      <img 
        src='https://cdni.iconscout.com/illustration/premium/thumb/payment-error-illustration-download-in-svg-png-gif-file-formats--website-internet-webpage-empty-state-pack-design-development-illustrations-1800921.png'
        alt="Payment Failed" 
        style={{
          width: '150%',
          height: 'auto',
          marginBottom: '20px',
          borderRadius: '8px'
        }}
      />
      <h1 style={{ color: '#dc3545', fontSize: '24px', margin: '10px 0' }}>Payment Failed</h1>
      <p style={{ color: '#495057', fontSize: '16px', marginBottom: '20px' }}>
        We're sorry, but your payment could not be processed. Please try again or contact support if the issue persists.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Retry Payment
      </button>
    </div>
  );
}
