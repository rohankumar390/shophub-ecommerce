import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { applyCoupon, removeCoupon } from "../redux/slices/cartSlice";
import { coupons } from "../utils/coupons";

function CouponForm({ subtotal, coupon }) {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    const selectedCoupon = coupons[couponCode.toUpperCase()];

    if (!selectedCoupon) {
      toast.error("Invalid Coupon");
      return;
    }

    if (subtotal < selectedCoupon.minimumAmount) {
      toast.warning(`Minimum order should be $${selectedCoupon.minimumAmount}`);
      return;
    }

    dispatch(applyCoupon(selectedCoupon));
    toast.success("Coupon Applied");
    setCouponCode("");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter Coupon"
        className="border p-2 mr-2"
      />

      <button
        onClick={handleApplyCoupon}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>

      {coupon && (
        <div className="mt-3">
          <p className="text-green-600">
            Coupon Applied ({coupon.discount}% OFF)
          </p>
          <button
            onClick={() => {
              dispatch(removeCoupon());
              toast.info("Coupon Removed");
            }}
            className="text-red-500"
          >
            Remove Coupon
          </button>
        </div>
      )}
    </div>
  );
}

export default CouponForm;
