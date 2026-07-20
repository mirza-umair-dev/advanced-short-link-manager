import { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { emailSchema } from "../../validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { instance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const RequestResetPassword = () => {
  const [submitError, setsubmitError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = async ({ email }) => {
    try {
      await instance.post(API_PATHS.AUTH.RESET_OTP, { email });
        navigate('/auth/token-sent');
      
      return;
    } catch (error) {
      setsubmitError(error.response?.data?.message || "Something went wrong.");
      return
    }
  };

  return (
    <AuthLayout
      message="Recover Now"
      title="Recover Your Password"
      subtitle="Enter the email, we will send you a token to verify and then choose your Password."
    >
      <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
        <Input
          htmlFor="email"
          id="email"
          type="email"
          placeholder="mirza@gmail.com"
          error={errors.email?.message}
          {...register("email")}
          label="Email Address"
        />

        {submitError && <p className="mt-4 text-red-400">{submitError}</p>}

        <Button value={isSubmitting ? "Sending..." : "Send"} />
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

export default RequestResetPassword;
