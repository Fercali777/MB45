import Login from "../components/Login";

const LoginPage = () => {

  return (
    <>

<div className="container">
        <div className="row">
              <div className="col-lg-6 col-sm-12">
              <h1>Login</h1>
              <Login />
              </div>
              <div className="col-lg-6 col-sm-12">
              <img className="imgFormular" src="img/furnituresRegister.png"></img>
              </div>
        </div>
      </div>

    </>
  );
};

export default LoginPage;