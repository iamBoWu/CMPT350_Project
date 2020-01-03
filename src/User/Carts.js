import React, {Component} from 'react';
import store from "storejs"
import Cart from "./Cart"
import Item from "../Items/Item"
import {Link} from "react-router-dom"
import axios from "axios"
import qs from "qs"
class Carts extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        var temp = [];
        store.forEach((k, d) =>
                temp.push(JSON.parse(d))
        )

        this.setState({products: temp})

        let url="http://localhost:8080/checkout/myprofile";
        // let temp=''
        let user=this.getCookie("user")
        axios.get(url,qs.stringify({ username:user}))
            .then(res=> res.data ?
            this.setState({
                nextPage : "/checkout"
            })
            :
            this.setState({
                nextPage: "/userinfo"
            }))

            .catch(function (error) {
                alert("Cart checkouterr")
            });

    }

    total() {


        let total = 0
        store.forEach((k, d) =>{
            let value = JSON.parse(d);
            let price = value.price
            let count = value.count
            console.log("price");
            console.log(price)
            total = total + price*count

        })

            console.log(total)
        return total
    }

    getCookie(key) {
        const name = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // handlePurchase(){
    //     console.log(typeof this.state)
    //     let url="http://localhost:8080/order/orderproducts"
    //     axios.post(url, qs.stringify(this.state))
    //         .catch(err => alert("purchase err"))
    //     // if (this.state.nextPage ==="/checkout")
    //
    // }
    handleMethod= e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClear = ()=>{
        store.clear()
    }
    render() {

        // let nextPage=this.nextPage()
        // console.log("nextpage: " +nextPage)
        return (
            <div>
                <h1>My Cart</h1>
    {/*<Cart/>*/}<Cart items={this.state.products}/>
                <br/>
                <br/>
                <h1>Total: {this.total()}</h1>
                {this.props.method === "checkout" ?

            null

                    :
                    <div>
                    <a href="/cart">
                        <button>Update</button>
                    </a>
                    < Link to = {this.state.nextPage
                    } > < button >Check Out</button></Link>
                        <button onClick={()=> store.clear()}>Clear your cart</button>
                    </div>

                        }
            </div>
        );
    }
}

export default Carts;