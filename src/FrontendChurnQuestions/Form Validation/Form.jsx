import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    let error = "";
    if (!value) return "This field is required";

    if ((name === "firstName" || name === "lastName") && value.length < 3) {
      return `${name === "firstName" ? "First" : "Last"} Name must be at least 3 characters long`;
    }
    
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email format";
    }
    
    if (name === "confirmPassword" && value !== formData.password) {
      return "Passwords do not match";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Form submitted successfully!");
      setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } else {
      setErrors(newErrors);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:
          <input type="text" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} />
        </label>
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
      </div>
      
      <div>
        <label>Last Name:
          <input type="text" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} />
        </label>
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
      </div>
      
      <div>
        <label>Email Address:
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      
      <div>
        <label>Password:
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      
      <div>
        <label>Confirm Password:
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
        </label>
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
      </div>
      
      <button type="submit">Register</button>
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default Form;
