import { Link, useNavigate } from "react-router-dom";
import logo from "/icon.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";

type TLogin = {
  email: string;
  password: string;
};

type TUser = {
  email: string;
  id: string;
  iat: number;
  role: string;
  name: string;
  phone: string;
};

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();

  const handleLoginForm: SubmitHandler<TLogin> = async (data) => {
    const toastId = toast.loading("Logging in");
    const result = await login(data);
    if (result.data.success) {
      const token = result?.data?.token as string;
      if (token) {
        const decoded = jwtDecode<TUser>(token);

        dispatch(
          setUser({
            user: decoded,
            token,
          })
        );
        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
          position: "bottom-right",
        });
        navigate("/");
      }
    }

    if (result.error) {
      if ("data" in result.error) {
        const apiError = result.error.data as { message: string };
        toast.error(apiError.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("An unexpected error occurred.", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div
      onSubmit={handleSubmit(handleLoginForm)}
      className="md:bg-[#E8E8E8] h-screen flex justify-center items-center"
    >
      <form className="bg-white w-[500px] md:shadow-lg pb-[70px] pt-[50px] rounded-2xl flex justify-center items-center flex-col">
        <img className="w-24 mb-5" src={logo} alt="" />
        <h3 className="text-3xl font-medium mb-4 text-gray-700">MeetEase</h3>
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="border mt-1 p-2 rounded border-[#E8E8E8] outline-none "
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            className="border mt-1 p-2 rounded border-[#E8E8E8] outline-none "
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <button className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-[10px] px-12 rounded-xl font-bold mt-4">
          Login
        </button>
        <Link
          to={`/sign-up`}
          className="text-[#b5b4b4] hover:underline mt-4 hover:cursor-pointer  hover:text-[#959595]"
        >
          Create a new account
        </Link>
      </form>
    </div>
  );
}
