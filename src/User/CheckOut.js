import React, {Component} from 'react';
import Items from "../Items/Items"
import SlideShow from "../Behivior/SlideShow"
import Left from "./Left"
import Address from "./Address"
import axios from "axios";
// import Userinfo from "./Userinfo"
import "./User.css"
import Carts from "./Carts"
import Cart from "./Cart";
import store from "storejs";
import qs from "qs"
class Home extends Component {
    state={
        products: [],
        profile: [],
        username: "",
        Payment: "Paypal",
        Shippers: "CanadaPost"

    }
    componentDidMount() {
        var temp = [];
        store.forEach((k, d) =>
            temp.push(JSON.parse(d))
        )

        this.setState({products: temp})

        // let url="http://localhost:8080/checkout/myprofile";
        // let temp=''
        let user=this.getCookie("user")
        this.setState({
            username: user
        })


        axios.get("http://localhost:8080/customer", {withCredentials: true})
            .then(
                res=> this.setState({profile:res.data.profile})
            )
            .catch(err => alert("userinfo error"))
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

    handlePurchase(){
        console.log (this.state);
        let url="http://localhost:8080/order/orderproducts";
        axios.post(url, qs.stringify({
            username:this.state.username,
            products: this.state.products,
            CompanyName:this.state.Shippers,
            PaymentMethod: this.state.Payment,
            orderPrice:this.total()}))
            .then(store.clear())
            .catch(err => alert("purchase err"))

        // if (this.state.nextPage ==="/checkout")

    }
    handleMethod= e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
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

    render() {
        return (
            <>
                <Left />

                <div >

                    <p>FirstName: {this.state.profile.FirstName}<br/></p>
                    <p>LastName: {this.state.profile.LastName}<br/></p>
                    <p>email: {this.state.profile.email}<br/></p>
                    <p>address: {this.state.profile.address}<br/></p>
                    <p> country: {this.state.profile.country}<br/></p>
                    <p>PostCode: {this.state.profile.PostCode}<br/></p>
                    <p>CreditCard: {this.state.profile.CreditCard}<br/></p>
                    <p>Birthday: {this.state.profile.Birthday}<br/></p>
                </div>
                <Carts method="checkout"/>

                <div>
                    <select name="Payment" onChange={(e) =>this.handleMethod(e)}>PamentMethod
                        <option>Paypal</option>
                        <option>MasterCard</option>
                        <option>Visa</option>
                    </select>
                    <select name="Shippers" onChange={(e) =>this.handleMethod(e)}>Shippers
                        <option>CanadaPost</option>
                        <option>FedEx</option>
                    </select>
                    <button onClick={()=>this.handlePurchase()}>Purchase</button>
                </div>


            </>
        );
    }
}

export default Home;