import ProfileInfo from "../components/ProfileInfo";
import ProductForm from "../components/ProductForm";

const Dashboard = () => {
  return (


    <div className="container">
        <div className="row">
        <h1>Profile Info</h1>
        <ProfileInfo />
              <div className="col-lg-4 col-sm-12">

              <h1>buttons</h1>
              </div>
              <div className="col-lg-8 col-sm-12">

              <h1>formular</h1>
              <ProductForm />
              </div>
        </div>
    </div>

    
    
 

  );
};

export default Dashboard;
