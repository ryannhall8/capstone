import { useState } from 'react'


function CheckoutForm({ onCheckout }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [ccv, setCcv] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      const shippingInfo = { name, address, city, postalCode };
      onCheckout(shippingInfo);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>
            CHECKOUT
        </h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Postal Code:
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
       <h3>Credit Card Information-</h3>
        <label>
          Name on card:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          card number:
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </label>
        <label>
          Expiration Date:
          <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        </label>
        <label>
          Ccv/Cvv:
          <input type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} />
        </label>
        <button type="submit">Checkout</button>
      </form>
    );
  }

  export default CheckoutForm;