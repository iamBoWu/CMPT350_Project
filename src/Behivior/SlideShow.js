import React from "react";
import Slider from "react-slick";
import Items from "../Items/Items"
import g from "../Navbar/c67e7cf232503dc70e49dfe766af62b3.jpg"
import tom from "../components/tom.jpeg"
class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <img src={tom}/>
        <img src={g} />
        {/*<Items/>*/}
      </Slider>
    );
  }
}

export default SimpleSlider