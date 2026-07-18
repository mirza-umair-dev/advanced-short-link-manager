import { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../validations/authSchema.js";

const SignUp = () => {
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
    console.log(data);
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

        

        <Button  value={isSubmitting ? "Creating..." : "Create Account"} />
      </form>
    </AuthLayout>
  );
};

export default SignUp;
