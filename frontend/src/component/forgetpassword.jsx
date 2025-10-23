import { API } from "../../api/api";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const ForgetPassword = ({ setForgetPassword }) => {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [optstyle, setoptstyle] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPasswordui, setShowPasswordui] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/forgetpassword/send-otp", { email });

      alert("OTP has been sent to your email.");
      setoptstyle(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      const msg = error.response?.data?.message || "Something went wrong.";
      alert(msg);
    }
  };

  const handleverifyotp = async () => {
    console.log("Verifying OTP:", email, otp);
    try {
      const response = await API.post("/forgetpassword/verify-otp", {
        email,
        otp,
      });
      alert("OTP verified successfully.");
      // setEmail("");
      setoptstyle(false);
      setShowPasswordui(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const msg = error.response?.data?.message || "Something went wrong.";
      alert(msg);
    }
  };

  const handleresetpassword = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await API.post("/forgetpassword/reset-password", {
        email,
        otp,
        password,
      });
      alert("Password reset successfully.");
      setShowPasswordui(false);
      setForgetPassword(false);
    } catch (error) {
      console.error("Error resetting password:", error);
      const msg = error.response?.data?.message || "Something went wrong.";
      alert(msg);
    }
  };

  if (optstyle) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 ">
        {/* OTP Input Box */}
        <div className="bg-white rounded-2xl md:p-6 p-3 w-full max-w-sm flex flex-col items-center">
          <OptStyle setotp={setotp} />

          {/* Verify Button */}
          <button
            type="submit"
            className="mt-6 w-3/4 bg-secondary text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200"
            onClick={handleverifyotp}
          >
            Verify OTP
          </button>
        </div>
      </div>
    );
  }

  if (showPasswordui) {
    return (
      <div className="my-4">
        <form className="space-y-4" onSubmit={handleresetpassword}>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;

const OptStyle = ({ setotp }) => {
  return (
    <>
      <InputOTP maxLength={6} onChange={(value) => setotp(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </>
  );
};
