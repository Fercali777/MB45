import ProfileInfo from "../components/ProfileInfo";
import ProductForm from "../components/ProductForm";

const Dashboard = () => {
  return (


    <div className="container">
        <div className="row">
              <div className="col-lg-3 col-sm-12">
                <div className="flex flex-colum ">
                <button className="buttonDash bt-cream">Settings</button>
                <button className="buttonDash bt-cream">Favorites</button>
                <button className="buttonDash bt-cream">My Store</button>
                <button className="buttonDash bt-orange">Add New Product</button>
                </div>
              </div>
              <div className="col-lg-9 col-sm-12">

              <h2>New Product Entry</h2>
               <ProfileInfo />
              <ProductForm />
              </div>
        </div>
    </div>

    
    
 

  );
};

export default Dashboard;
