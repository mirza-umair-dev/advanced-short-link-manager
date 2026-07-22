import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../api/authApi.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "../../validations/authSchema.js";
import { AuthContext } from "../../context/authContext.js";

const SignIn = () => {
  const navigate = useNavigate();
  const { getUser } = useContext(AuthContext);

  const [submitError, setsubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data) => {

    try {
      await signIn(data);
      setsubmitError("");
      await getUser();
      navigate("/");
      return;
    } catch (error) {
      setsubmitError(error.response?.data.message);
      return;
    }
  };
  return (
    <AuthLayout
      message="Welcome Back"
      title="SignIn to Link Manager"
      subtitle="Manage your links, check click stats, and create new short URLs."
    >
      <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
        <Input
          htmlFor="email"
          id="email"
          type="text"
          placeholder="mirza@gmail.com"
          error={errors.email?.message}
          {...register("email")}
          label="Email Address"
        />
        <Input
          htmlFor="password"
          id="password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
          label="Password"
        />

        <div className="mt-4 flex items-center justify-end">
          {" "}
          <Link
            to="/auth/request-reset-password"
            className="text-right text-accent2 text-sm "
          >
            Forgot Password?
          </Link>
        </div>

        {submitError && <p className="mt-4 text-red-400">{submitError}</p>}

        <Button value={isSubmitting ? "Logging..." : "Login"} />
      </form>
      <div className="text-sm text-lightext mt-4 font-semibold">
        <span>New to Link Manager? </span>
        <Link to="/auth/register" className="text-accent2">
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
