import Carousel from '../components/Carousel';
import '../carousel.css';

const slides = [
  (
          <div className="slider-contentMB flex">
            <div className="slider-textMB">
              <h1 className="font-white">Distinction without limits</h1>
        <h3 className="font-white">Melodic Nest</h3>
        <p className="font-white">Your sound system deserves more than just a chain cabinet, functionality and a custom style for you.</p>
        <a href="forniture1.html" className="button-1 bt-black" title="Product Details">SEE MORE</a>
      </div>
      <img className="product-picture-sliderMB" alt="Furniture Melodic Nest" src="img/furniture1.png" />
    </div>
  ),
  (
    <div className="slider-contentMB flex">
      <div className="slider-textMB">
        <h1 className="font-white">Modern Comfort</h1>
        <h3 className="font-white">Stockholm Sofa</h3>
        <p className="font-white">Experience the ultimate comfort with our Stockholm Sofa, crafted with premium fabric and solid wood legs.</p>
        <a href="forniture2.html" className="button-1 bt-black" title="Product Details">SEE MORE</a>
            </div>
      <img className="product-picture-sliderMB" alt="Stockholm Sofa" src="img/furniture2.png" />
          </div>
  ),
  (
    <div className="slider-contentMB flex">
      <div className="slider-textMB">
        <h1 className="font-white">Elegant Storage</h1>
        <h3 className="font-white">Berlin Cabinet</h3>
        <p className="font-white">Keep your space organized with the Berlin Cabinet, featuring minimalist design and ample storage.</p>
        <a href="forniture3.html" className="button-1 bt-black" title="Product Details">SEE MORE</a>
      </div>
      <img className="product-picture-sliderMB" alt="Berlin Cabinet" src="img/furniture3.png" />
    </div>
  ),
];

const Home = () => (
  <div className="content">
    <Carousel slides={slides} />
  </div>
);

export default Home;
