
import { Link } from "react-router";

const Home = () => {




  return (
    <>
      <div className="content">

      
        <section className="slider flex">
         <nav className="slider-nar"><img src="img/slider-nar-L.png"  ></img></nav>
         <div className="slider-content flex">
            <div className="slider-text">
              <h1 className="font-white">Distinction without limits</h1>
              
               <h3 className="font-white">Oslo Media Stand</h3>
               <p className="font-white">A minimalist media stand built from solid ash wood with brushed aluminum handles.</p>
               <Link className="button-1 bt-black" to={`/products/683350fc3ddcd2a82d2c1cb3`}>
  See more
</Link>
               
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
