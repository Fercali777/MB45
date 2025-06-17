import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router";

const RegisterPage = () => {

  return (
    <>
      <div className="container">
        <div className="row">
              <div className="col-lg-6 col-sm-12">
              <h1>Register</h1>
              <RegisterForm />
              <p>I already have an acount I wanna log in <Link to="/login" className="nav-item">click here</Link></p>
              </div>
              <div className="col-lg-6 col-sm-12">
              <img className="imgFormular" src="img/furnituresRegister.png"></img>
              </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;