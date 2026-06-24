import { useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 mb-4 rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-24 h-24 object-cover mx-auto sm:mx-0"
        />

        <div className="flex-1">
          <h2 className="font-semibold text-lg">{item.title}</h2>

          <p className="text-gray-600">${item.price}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
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

        <div className="text-center sm:text-right">
          <p className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
