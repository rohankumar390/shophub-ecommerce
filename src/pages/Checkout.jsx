import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useCart from "../hooks/useCart";
import { clearCart } from "../redux/slices/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, subtotal, discountAmount, gst, total } = useCart();

  const handlePlaceOrder = () => {
    dispatch(clearCart());

    toast.success("Order placed successfully");

    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>

        <p className="text-gray-500">Add some products before checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Order Items</h2>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <div className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>

                <span className="text-green-600">
                  -$
                  {discountAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>

                <span>${gst.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
