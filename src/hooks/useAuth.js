import { useSelector } from "react-redux";

function useAuth() {
    const { user, token, isAuthenticated } =
        useSelector((state) => state.auth);

    return {
        user,
        token,
        isAuthenticated,
    };
}

export default useAuth;