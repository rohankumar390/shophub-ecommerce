import { Link } from "react-router-dom";

function OrderConfirmation() {
  const orderId = localStorage.getItem("lastOrderId");

  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <div className="bg-white shadow-lg rounded-2xl p-10">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h1 className="text-4xl font-bold mt-6">Order Confirmed</h1>

        <p className="text-gray-500 mt-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <p className="text-gray-500">Order Number</p>

          <h2 className="text-2xl font-bold mt-2">{orderId}</h2>
        </div>

        <Link
          to="/products"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
