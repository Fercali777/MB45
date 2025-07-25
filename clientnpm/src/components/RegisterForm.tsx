import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useAlertModal } from "../hooks/useAlertModal";
import AlertModal from "./AlertModal";
import "./forms.css";
import "./buttons.css";
const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const { alertState, showSuccess, showError, hideAlert } = useAlertModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(formData);
      showSuccess("Success", "User created successfully! You are now logged in.");
      
      // Navigate to furnitures page after successful registration
      setTimeout(() => {
        navigate('/furnitures');
      }, 2000); // Wait 2 seconds for user to see the success message
    } catch (error: any) {
      showError("Registration Error", error.message || "Registration error");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="grid-2-col-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Pasword"
          onChange={handleChange}
          required
        />
        <input
          type="phone"
          name="phone"
          placeholder="Phonee"
          onChange={handleChange}
          required
        />
        <input
          type="address"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="city"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          type="country"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />
        <input
          type="postCode"
          name="postCode"
          placeholder="PostCode"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex align-items-center gap1 align-items-baseline ">
        <p>Seller</p>
        <input
          type="radio"
          id="seller"
          name="role"
          value="seller"
          onChange={handleChange}
          required checked={formData.role === "seller"} 
        ></input>
        <p>Buyer</p>
        <input
          type="radio"
          id="buyer"
          name="role"
          value="buyer"
          onChange={handleChange}
          checked={formData.role === "buyer"}
        ></input>
      </div>
      <div className="flex "></div>

      <button className="button-1 bt-orange margin-b" type="submit">
        Register
      </button>
    </form>
    <AlertModal
      isOpen={alertState.isOpen}
      onClose={hideAlert}
      type={alertState.type}
      title={alertState.title}
      message={alertState.message}
    />
  </>
  );
};

export default RegisterForm;
