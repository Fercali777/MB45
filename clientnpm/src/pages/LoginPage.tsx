import Login from "../components/Login";
import { Link } from "react-router";

const LoginPage = () => {

  return (
    <>

<div className="container">
        <div className="row">
              <div className="col-lg-6 col-sm-12">
              <h1>Login</h1>
              <Login />
              
              <p>I don't have an account I want to register <Link to="/register" className="nav-item">click here</Link></p>
              </div>
              <div className="col-lg-6 col-sm-12">
              <img className="imgFormular hide-mobile" src="/img/furnituresRegister.png"></img>
              </div>
        </div>
      </div>

    </>
  );
};

export default LoginPage;