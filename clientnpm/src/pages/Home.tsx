import Carousel from '../components/Carousel';
import '../carousel.css';

const slides = [
  (
          <div className="slider-contentMB flex">
            <div className="slider-textMB">
              <h1 className="font-white">Distinction without limits - MONOREPO TEST!</h1>
              <hr/>
              
        <h3 className="font-white">Oslo Media Stand</h3>
        <p className="font-white">A minimalist media stand built from solid ash wood with brushed aluminum handles.</p>
        <a href="/products/683350fc3ddcd2a82d2c1cb3" className="button-1 bt-black" title="Product Details">SEE MORE</a>
      </div>
      <img className="product-picture-sliderMB" alt="Furniture Melodic Nest" src="https://res.cloudinary.com/deqsrgxeu/image/upload/v1748193530/yrfxl2ggukafyfihbwvi.png" />
    </div>
  ),
  (
    <div className="slider-contentMB flex">
      <div className="slider-textMB">
        <h1 className="font-white">The Soul of the Table</h1>
        <hr/>
        <h3 className="font-white">Kyoto Dining Table</h3>
        <p className="font-white">Minimalist dining table inspired by Japanese design, made of rich walnut wood with a matte finish.</p>
        <a href="/products/68335748d886a4f7f4fff2a4" className="button-1 bt-black" title="Product Details">SEE MORE</a>
            </div>
      <img className="product-picture-sliderMB" alt="Stockholm Sofa" src="https://res.cloudinary.com/deqsrgxeu/image/upload/v1748195142/getqzoadjnphp8g3u0nn.png" />
          </div>
  ),
  (
    <div className="slider-contentMB flex">
      <div className="slider-textMB">
<h1 className="font-white">The Soul of the Table</h1>
        <hr/>
        <h3 className="font-white">Kyoto Dining Table</h3>
        <p className="font-white">Minimalist dining table inspired by Japanese design, made of rich walnut wood with a matte finish.</p>
        <a href="/products/6833579bd886a4f7f4fff2a7" className="button-1 bt-black" title="Product Details">SEE MORE</a>
      </div>
      <img className="product-picture-sliderMB" alt="Berlin Cabinet" src="https://res.cloudinary.com/deqsrgxeu/image/upload/v1748195225/tyjsefrtcmunwp7ubied.png" />
    </div>
  ),
];

const Home = () => (
  <div className="content">
    <Carousel slides={slides} />
  </div>
);

export default Home;
