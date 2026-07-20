import { useEffect, useState } from "react";
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Timer = () => {
  const [timeleft, settimeleft] = useState(15 * 60);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (timeleft <= 0) return;

    const interval = setInterval(() => {
      settimeleft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeleft]);
  const minutes = Math.floor(timeleft / 60);
  const seconds = timeleft % 60;

  const handleResend = async () => {
    if (loading) return;
    try {
      setloading(true);
      const res = await instance.post(API_PATHS.AUTH.SEND_VERIFY_OTP);
      settimeleft(15 * 60);
      console.log(res.data);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="text-sm text-lightext flex w-full items-center justify-between mt-4">
      <div className="flex gap-2">
        <p>Code expires in </p>{" "}
        <div>
          {minutes < 10 ? <span>0{minutes}</span> : minutes}:
          {seconds < 10 ? <span>0{seconds}</span> : seconds}
        </div>
      </div>
      <button
        type="button"
        onClick={handleResend}
        disabled={timeleft > 0 || loading}
        className="font-semibold text-accent2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Resend code"}
      </button>     
    </div>
  );
};

export default Timer;
