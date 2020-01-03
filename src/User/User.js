import React, {Component} from 'react';
import Items from "../Items/Items"
import SlideShow from "../Behivior/SlideShow"
import Left from "./Left"
import Address from "./Address"
import axios from "axios";
// import Userinfo from "./Userinfo"
import "./User.css"
class Home extends Component {
    state={


    }
     componentDidMount() {

         axios.get("http://localhost:8080/customer", {withCredentials: true})
             .then(
                 res=> this.setState(res.data.profile)
             )
             .catch(err => alert("userinfo error"))
    }

    render() {
        return (
            <>
                <Left />
                <div className="userinfo">

                    <p>FirstName: {this.state.FirstName}<br/></p>
                    <p>LastName: {this.state.LastName}<br/></p>
                    <p>email: {this.state.email}<br/></p>
                    <p>address: {this.state.address}<br/></p>
                    <p> country: {this.state.country}<br/></p>
                    <p>PostCode: {this.state.PostCode}<br/></p>
                    <p>CreditCard: {this.state.CreditCard}<br/></p>
                    <p>Birthday: {this.state.Birthday}<br/></p>

                </div>
            </>
        );
    }
}

export default Home;