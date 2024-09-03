import React from 'react';

function TotalAmountDisplay({ totalAmount }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Total Rental Amount: ₹{totalAmount}</h3>
    </div>
  );
}

export default TotalAmountDisplay;
