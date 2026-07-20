import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validations/authSchema";
import { useState } from "react";
import { instance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Button from "../../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [submitError, setsubmitError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });
  const {token} = useParams();
  const submitHandler = async ({ password }) => {
    setsubmitError('');
    
    try {
      await instance.post(`${API_PATHS.AUTH.RESET_PASSWORD}/${token}`, {
        password,
      });
      navigate('/auth/password-changed');
    } catch (error) {
      setsubmitError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthLayout
      message="Last Step"
      title="Set Your Password"
      subtitle="Enter the Password that you could remeber easily"
    >

        <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
          <Input
            htmlFor="password"
            id="password"
            type="password"
            placeholder="**********"
            error={errors.password?.message}
            {...register("password")}
            label="Password"
          />

          {submitError && <p className="mt-4 text-red-400">{submitError}</p>}

          <Button  disabled={isSubmitting} value={isSubmitting ? "Setting..." : "Set"} />
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

export default ResetPassword;
