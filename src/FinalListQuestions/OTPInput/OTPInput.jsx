import React, { useRef, useState, useEffect } from "react";
import "./OTPInput.css";

/**
 * OTPInput Component - Creates a One-Time Password input field
 * 
 * Features:
 * - Auto-focus to next input when digit is entered
 * - Backspace navigation to previous input
 * - Paste support for entire OTP
 * - Only allows numeric input (0-9)
 * 
 * @param {number} length - Number of OTP digits (default: 4)
 */
const OTPInput = ({ length = 4 }) => {
  // State to store the OTP digits as an array
  // Example: ["1", "2", "3", "4"] for a 4-digit OTP
  const [otp, setOtp] = useState(Array(length).fill(""));
  
  // Refs to access each input element directly
  // This allows us to programmatically focus inputs
  const inputRefs = useRef([]);

  /**
   * Focus the first input on component mount for better UX
   */
  useEffect(() => {
    // Focus the first input when component loads
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Handle input change for each OTP digit
   * 
   * @param {string} value - The entered value
   * @param {number} index - Position of the input (0-based)
   */
  const handleInputChange = (value, index) => {
    // Only allow single digits (0-9), reject any other characters
    if (!/^[0-9]?$/.test(value)) return;
    
    // Create a copy of current OTP array to avoid direct mutation
    const newOtp = [...otp];
    
    // Update the specific position with the new value
    newOtp[index] = value;
    
    // Update the state with new OTP array
    setOtp(newOtp);

    // Auto-focus to next input if:
    // 1. A digit was entered (value is not empty)
    // 2. We're not at the last input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  /**
   * Handle keyboard events (mainly for Backspace navigation)
   * 
   * @param {KeyboardEvent} e - The keyboard event
   * @param {number} index - Position of the current input
   */
  const handleKeyDown = (e, index) => {
    // Handle Backspace key
    if (e.key === "Backspace") {
      // If current input is empty, move focus to previous input
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
      // If current input has a digit, it will be deleted automatically
      // and focus stays on current input
    }
  };

  /**
   * Handle paste event to fill multiple inputs at once
   * 
   * @param {ClipboardEvent} e - The paste event
   */
  const handlePaste = (e) => {
    // Prevent default paste behavior
    e.preventDefault();
    
    // Get pasted text and extract only digits
    const pastedText = e.clipboardData.getData("text");
    const digits = pastedText.replace(/\D/g, "").slice(0, length);
    
    // Create new OTP array
    const newOtp = [...otp];
    
    // Fill inputs with pasted digits
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
      // Also update the input value directly (for visual feedback)
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digits[i];
      }
    }
    
    // Update state
    setOtp(newOtp);
    
    // Focus on the next empty input after pasted content
    if (digits.length < length) {
      inputRefs.current[digits.length]?.focus();
    }
  };

  /**
   * Get the complete OTP as a string
   * Useful for parent components to access the full OTP
   */
  const getOTPValue = () => {
    return otp.join("");
  };

  // You can call this function from parent component if needed
  // Example: const otpRef = useRef(); otpRef.current.getOTPValue()

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {/* Create input for each OTP digit */}
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          maxLength={1}
          className="otp-input"
          // Add accessibility attributes
          aria-label={`OTP digit ${index + 1}`}
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default OTPInput;
