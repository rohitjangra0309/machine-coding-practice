import React, { useState } from "react";
import OTPInput from "./OTPInput";

/**
 * Demo component showing how to use OTPInput
 */
const OTPDemo = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Example: How to get OTP value when user completes input
  const handleOTPComplete = (otp) => {
    setOtpValue(otp);
    
    // Example verification (in real app, you'd send this to server)
    if (otp === "1234") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>OTP Verification Demo</h2>
      <p>Enter your 4-digit OTP below:</p>
      
      <OTPInput length={4} />
      
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={() => {
            // You can access OTP value from the component
            console.log("Current OTP:", otpValue);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Verify OTP
        </button>
      </div>
      
      {isVerified && (
        <div style={{ marginTop: "10px", color: "green" }}>
          ✅ OTP Verified Successfully!
        </div>
      )}
      
      <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
        <h3>How to use:</h3>
        <ul style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto" }}>
          <li>Type digits one by one - auto-focuses to next input</li>
          <li>Press Backspace to go back to previous input</li>
          <li>Paste entire OTP (try copying "1234" and pasting)</li>
          <li>Only accepts numeric input (0-9)</li>
        </ul>
      </div>
    </div>
  );
};

export default OTPDemo; 