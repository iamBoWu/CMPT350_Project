import React, { Component } from 'react';
// import logo from './logo.svg';
import '../Containers/Leftbar.css';
import { Link, NavLink, withRouter } from 'react-router-dom'
import Toggle from "../Behivior/Toggle"
class App extends Component {
    state = {
        show: false
    }
    handleClick=e=> {
        this.setState({
            show: !this.state.show
        })
    }

  render() {
    return (
        <>
            { this.state.show?
                <div id="mySidepanel" className="sidepanel" clasName="openbtn">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.handleClick}>&times;</a>
                    <NavLink to="/userinfo" >update Info</NavLink>
                    <a href="/services">Change Password</a>
                    <a href="/orders">My Orders</a>
                    <NavLink to="/cart">My Cart</NavLink>
                    <NavLink to="/checkout">Check Out</NavLink>
                </div>
            :
        < button className="openbtn" onClick={this.handleClick}>&#9776; </button>
                }
        </>
    );
  }
}


export default Toggle(App);