
import RegisterForm from "../components/RegisterForm";


const Home = () => {




  return (
    <>
      <div className="content">

      
        <section className="slider flex">
         <nav className="slider-nar"><img src="img/slider-nar-L.png"  ></img></nav>
         <div className="slider-content flex">
            <div className="slider-text">
              <h1 className="font-white">Distinction without limits</h1>
              
               <h3 className="font-white">Melodic Nest</h3>
               <p className="font-white">Your sound system deserves more than just a chain cabinet, functionality and a custom style for you.</p>
               <a href="forniture1.html" className="button-1 bt-black" title="Product Details">SEE MORE</a>
            </div>
            <img className="product-picture-slider" alt="Furniture Melodic Nest" src="img/furniture1.png"></img>
         </div>
         <nav className="slider-nar" ><img src="img/slider-nar-R.png" ></img></nav>
        </section>
      
       
              
     
      </div>
    </>
  );
};

export default Home;
