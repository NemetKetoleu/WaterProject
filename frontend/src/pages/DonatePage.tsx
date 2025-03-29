import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function Donate() {
  const navigate = useNavigate();
  const { projectName, projectId } = useParams();
  const { addToCart } = useCart();
  const [amount, setAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || 'Unknown Project',
      donationAmount: amount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(x) => setAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default Donate;