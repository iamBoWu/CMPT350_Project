import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from "./Navbar/Home"
import Leftbar from './Containers/Leftbar'
import Navbar from './Navbar/Navbar'
import Items from './Items/Items'
import Contacts from "./Navbar/Contacts"
import Category from "./components/Categories"
// import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
// import Home from './components/Home'
import About from './components/About'
// import Contact from './components/Contact'
import Products from './Product/Products'
import Product from "./Product/Product"
import Login from './Navbar/Login'
import Signup from './Navbar/Signup'
import Manage from "./Manager/Manage"
import axios from "axios";
import Cart from "./User/Carts"
import User from "./User/User"
import Address from "./User/Address"
import Search from "./components/Search"
import CheckOut from "./User/CheckOut"
import Orders from "./User/Orders"
// import {getCookie, setCookie} from "../Behivior/Cookie"
class App extends Component {
    state={
        user:null,
        // position:null
    };

      componentDidMount() {
      let url = "http://localhost:8080/";
      axios.get(url,{withCredentials:true})
          .then(res=> {
                  this.setState({
                      user: res.data.profile.username
                  })
              this.setCookie("user", res.data.profile.username)
              }
          )
          // .then(res=> console.log(this.state))
    .catch(function (error) {
      // alert(error)
    });
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
    setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    }
    // componentWillUnmount() {
    //     this.setCookie("user", null)
    // }

   // componentDidMount() {
    //     // console.log(this.getCookie("user"));
    //     // this.getCookie("user")?
    //     // this.setState({
    //     //     user : this.getCookie("user")
    //     // }):
    //
    //         axios.get("http://localhost:8080", {withCredentials:true})
    //             .then(res=>this.setState({
    //                 user: res.data.profile.username }
    //
    //         )).then(console.log(this.state))
    //           .catch(function (error) {
    //             alert(error)
    //           });
    // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user}/>
          {/*<Leftbar/>*/}
          {/*<Items/>*/}
          {/*<Stuff/>*/}
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About} />
          {/*<Route path='/'/>*/}
            <Route exact path='/products' component={Products}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
          <Route path='/contacts' component={Contacts} />
          <Route path="/category/:category_name" component={Category}/>
          <Route path="/products/:product_name" component={Product}/>
          <Route path='/user' component={User} />
          <Route path='/admin' component={Manage}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/userinfo" component={Address}/>
          <Route path={"/search/:search"} component={Search}/>
          <Route path="/checkout" component={CheckOut}/>
          <Route path="/orders" component={Orders}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


// export default App;