import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({ items, setopencart }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(() =>
    items.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 border border-gray-200 mb-4"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex flex-col space-y-2 items-start">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-black font-bold">{item.price}</p>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantities[item.id] || 1}</span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button className="text-red-600 hover:text-red-800">Remove</button>
        </div>
      ))}
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg font-bold">
          ₹
          {items.reduce(
            (acc, curr) => acc + curr.price * (quantities[curr.id] || 1),
            0
          )}
        </span>
      </div>
      <button
        className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
        onClick={() => {
          navigate("/checkout");
          setopencart(false);
        }}
      >
        Checkout
      </button>
    </>
  );
};

export default CartItem;
