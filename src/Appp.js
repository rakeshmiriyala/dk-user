import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center font-sans items-center h-screen">
      <div className="bg-black p-6 rounded-md sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-4/4 flex flex-col justify-center items-center">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          
          window.location.href="/#/license"
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-purple-600 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-purple-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                 <h2 className="text-center text-xl text-white font-semibold">
          Enter your number to send otp
        </h2>
        {/* <div className="mt-4 w-full">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-4 text-black border rounded-md text-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 text-black border rounded-md text-sm"
            required
          /> */} 
          <PhoneInput country={"in"} value={ph} onChange={setPh} inputStyle={{width:"290px"}}/>
          {/* <br />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 text-black border rounded-md text-sm"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 text-black border rounded-md text-sm"
            required
          />
          <div className="w-full flex flex-col items-center"> */}
          <button
                  onClick={onSignup}
                  className="bg-purple-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
          {/* </div>
        </div> */}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

