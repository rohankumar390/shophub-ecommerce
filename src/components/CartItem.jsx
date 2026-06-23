import { useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 border p-4 mb-4 rounded">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-24 h-24 object-cover"
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.title}</h2>

        <p>${item.price}</p>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
