import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <input type="phone" name="phone" placeholder="Phonee" onChange={handleChange} required />
      <input type="address" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="city" name="city" placeholder="City" onChange={handleChange} required />
      <input type="country" name="country" placeholder="Country" onChange={handleChange} required />
      <input type="postCode" name="postCode" placeholder="postCode" onChange={handleChange} required />
      <label ></label>
         <input type="radio" id="seller" name="role" value="seller" onChange={handleChange}></input>
         <label >Seller</label>
         <input type="radio" id="buyer" name="role" value="buyer" onChange={handleChange}></input>
         <label >Buyer</label><br></br>
      <button type="submit">Registrarse</button>
      {message && <p>{message}</p>}
    </form>

  );
};

export default RegisterForm;