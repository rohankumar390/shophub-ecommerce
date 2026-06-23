import { useMemo } from "react";
import { useSelector } from "react-redux";

function useCart() {
    const { items, coupon } = useSelector(
        (state) => state.cart
    );

    const subtotal = useMemo(() => {
        return items.reduce(
            (acc, item) =>
                acc + item.price * item.quantity,
            0
        );
    }, [items]);

    const discountAmount = useMemo(() => {
        if (!coupon) return 0;

        return subtotal * (coupon.discount / 100);
    }, [coupon, subtotal]);

    const gst = useMemo(() => {
        return (subtotal - discountAmount) * 0.18;
    }, [subtotal, discountAmount]);

    const total = useMemo(() => {
        return subtotal - discountAmount + gst;
    }, [subtotal, discountAmount, gst]);

    return {
        items,
        coupon,
        subtotal,
        discountAmount,
        gst,
        total,
    };
}

export default useCart;