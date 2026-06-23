import { useMemo } from "react";
import { useSelector } from "react-redux";

function useProduct() {
    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const totalItem = useMemo(() => {
        return products.length
    }, [products])

    return {
        products,
        totalItem,
        loading,
        error
    };
}

export default useProduct;