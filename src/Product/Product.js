import axios from "axios"
import React from 'react';
import Slider from "react-slick";
import store from "storejs";
class Product extends React.Component {
    state = {
        products : []
    }
    // componentDidMount() {
    //     console.log(this.props)
    //     let name = this.props.match.params.category_name;
    //     let url= "http://localhost:8080/category/"+name;
    //     axios.get(url).then( res => {
    //         this.setState({
    //             this.states : res.data
    //         })
    //     })
    // }
    // compo
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
    componentDidMount(){


        let name = this.props.match.params.product_name;
        // console.log(url)
        let url = "http://localhost:8080/products/"+ name;
        console.log(url);
        axios.get(url)
            // .then(res=> {console.log(res.data[0])})
            .then(
            res => this.setState( res.data[0])
        ).catch(err => alert("product err"))

        // let l = store.get("products")
        // this.setState({
        //     products: JSON.parse(l)
        // })
    }
    render() {

        return (

            <>

                <img src={this.state.Picture} alt="Avatar" width={"200px"} height={"200px"}/>

                <h1>ProductName : {this.state.ProductName}</h1>
                <div>Brand: {this.state.Brand}</div>
                <div>Weight: {this.state.Weight}</div>
                <div>Price: {this.state.Price}</div>
                <div>discount: {this.state.discount}</div>
                <div>description: {this.state.describtion}</div>
                <div>stock: {this.state.stock}</div>
                <div>CategoryID: {this.state.CategoryID}</div>
                <div>arrivalTime: {this.state.arrivalTime}</div>
<button onClick={ () =>this.handleClick(this.state.ProductName, JSON.stringify({describtion: this.state.describtion,ProductName: this.state.ProductName, price: this.state.Price, count:1}))
}>Add To Cart</button>
                {/*<div>{this.state.pic}</div>*/}
                {/*<button onClick={() => {deletethis.state(this.state.name)}}>Delete this.state</button>*/}

            </>
        );
    };
}

export default Product;