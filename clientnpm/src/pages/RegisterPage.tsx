import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {

  return (
    <>
      <div className="container">
        <div className="row">
              <div className="col-lg-6 col-sm-12">
              <h1>Register</h1>
              <RegisterForm />
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