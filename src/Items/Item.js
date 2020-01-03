
import React from 'react';
import Slider from "react-slick";
import store from 'storejs'

class Item extends React.Component {

    handleClick(k,d){
        store(k,d)
        console.log("pppp"+JSON.parse(d).price)
        // var list = [...this.state.pruducts]
        //  list.push(d)
        //  this.setstate({
        //     products: list
        //  })
        //  store("products",JSON.stringify(list))
        //  console.log(this.state)
        // alert(k)
        // store.clear()
    }
    render(){
        return (
            <div className="item-list">
                {
                    this.props.items.map(item => {
                        // var settings = {
                        //   dots: true,s
                        //   infinite: true,
                        //   speed: 500,
                        //   slidesToShow: 1,
                        //   slidesToScroll: 1
                        // };
                        return (

                            <a  className="flip-card" key={item.ProductName} >
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img  src={item.Picture} alt={item.ProductName} width={"200px"} height={"200px"}  />
                                    </div>


                                    {/*console.log({item.pictures})*/}
                                    <div className="flip-card-back">
                                        <div>ProductName: { item.ProductName }</div>
                                        <div>Brand: { item.Brand }</div>
                                        <div>Weight: { item.Weight }</div>
                                        <div>price: { item.price }</div>
                                        <a href={"/products/"+item.ProductName}>View Product</a>
                                        <br/>
                                        <button onClick={ () =>this.handleClick(item.ProductName, JSON.stringify({describtion: item.describtion,ProductName: item.ProductName, price: item.Price, count:1}))
                                        }>Add To Cart</button>
                                        {/*<div>{item.pic}</div>*/}
                                        {/*<a  onClick={*/}
                                            {/*// console.log(store.keys())*/}
                                            {/*this.handleClick(item.ProductName, JSON.stringify({ProductName: item.ProductName, price: item.price, count:1}))*/}
                                        {/*}*/}
                                        {/*>AddToCart</a>*/}

                                    </div>
                                    {/*<hr />*/}
                                </div>
                            </a>

                        )
                    })
                }
            </div>
        );}
};

function saveCart(cart) {
    // localStorage.clear()
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    console.log(localStorage.getItem("shoppingCart"))
};

// function loadCart() {
//     var cart = JSON.parse(localStorage.getItem("shoppingCart"));
//     if (cart == null)
//         cart = [];
// };
export default Item