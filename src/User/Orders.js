import React, {Component} from 'react';
import axios from "axios"
import Order from "./Order"
import qs from "qs"
class Orders extends Component {
    state ={
        items:[]

    }
    componentDidMount() {
        let user = this.getCookie("user")
        let url = 'http://localhost:8080/customer/myorders';
        axios.get(url,qs.stringify({username: user}))
            .then(res=>console.log("sfds"+res.data))
            .then (res => this.setState({items:res.data}))
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
    render() {
        return (
            <div className="orders">
                <Order items={this.state.items}/>
            </div>
        );
    }
}

export default Orders;