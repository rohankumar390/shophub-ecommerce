import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import CouponForm from "../components/CouponForm";

import useCart from "../hooks/useCart";

function Cart() {
  const { items, coupon, subtotal, discountAmount, gst, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-4xl font-bold mb-4">Your Cart is Empty</h2>

        <p className="text-gray-500 mb-8">
          Looks like you haven't added any products yet.
        </p>

        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div>
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <CouponForm subtotal={subtotal} coupon={coupon} />

            <div className="space-y-3 mt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">
                  -${discountAmount.toFixed(2)}
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

            <Link
              to="/checkout"
              className="block text-center mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
