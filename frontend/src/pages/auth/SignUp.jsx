import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../validations/authSchema.js";
import { signUp } from "../../api/authApi.js";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [submitError, setsubmitError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data) => {
    try {
    const res = await signUp(data);
    console.log(res?.data);
    setsubmitError('');
    navigate('/auth/verify-otp')
    return res;

  } catch (error) {
    setsubmitError(error.response?.data.message);
    console.log(error.response?.data);
    return;
  }
  };
  return (
    <AuthLayout
      message="Get Started"
      title="Create your account"
      subtitle="Start shortening links in seconds — no card required."
    >
      <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
        <Input
          htmlFor="name"
          id="name"
          type="text"
          placeholder="Enter Name"
          error={errors.name?.message}
          {...register("name")}
          label="Full Name"
        />
        <Input
          htmlFor="email"
          id="email"
          type="text"
          placeholder="mirza@gmail.com"
          error={errors.email?.message}
          {...register('email')}
          label="Email Address"
        />
        <Input
          htmlFor="password"
          id="password"
          type="password"
          placeholder="Create a password"
          error = {errors.password?.message}
          {...register('password')}
          label="Password"
        />

        {submitError && <p className="mt-4 text-red-400">
          {submitError}
          </p>}

        <Button  value={isSubmitting ? "Creating..." : "Create Account"} />
      </form>
            <div className="text-sm text-lightext mt-4 font-semibold"><span>Already have an account? </span><Link to='/auth/login' className="text-accent2">Sign in</Link></div>
    </AuthLayout>
  );
};

export default SignUp;
