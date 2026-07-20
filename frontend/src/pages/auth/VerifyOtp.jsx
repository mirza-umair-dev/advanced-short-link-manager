import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { useRef, useState } from "react";
import Button from "../../components/Button";
import { instance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Timer from "../../components/Timer";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [error, seterror] = useState("");

  const handleInput = (e, index) => {
    seterror("");
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value == "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    const otp = otpArray.join("");
    try {
      const res = await instance.post(API_PATHS.AUTH.VERIFY_OTP, { otp });
      if (res.data.success) {
        navigate("/");
      } else {
        seterror(res.data.message || "Invalid Otp!");
      }
    } catch (error) {
      seterror(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };
  return (
    <AuthLayout
      message="Verify Email"
      title="Enter confirmation code"
      subtitle="We sent a 4-digit code to your email. Enter it below to verify your account."
    >
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="px-8">
          <div className="w-full h-20 flex items-center justify-center">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="bg-surface w-16 h-16 ml-5 rounded-lg border border-bd focus:border-accent2 outline-0 text-center"
                />
              ))}
          </div>
          <div className="w-full">
            <Timer />
          </div>
          {error && <p className="mt-6 text-red-400 text-sm">{error}</p>}
          <Button />
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
