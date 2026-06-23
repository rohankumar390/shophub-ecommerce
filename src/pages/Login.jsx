import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../services/authService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const localUser = users.find(
        (u) => u.username === data.username && u.password === data.password,
      );

      if (localUser) {
        const token = crypto.randomUUID();
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ user: localUser, token }));
        toast.success("Login successful");
        navigate("/");
        return;
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const result = await loginUser({
        username: data.username,
        password: data.password,
        expiresInMins: 60,
      });

      const token = result.accessToken || result.token;
      localStorage.setItem("token", token);

      dispatch(loginSuccess({ user: result, token }));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

        <p className="text-gray-500 text-center mb-8">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              {...register("username", { required: "Username required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
