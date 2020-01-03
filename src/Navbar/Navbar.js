import './Navbar.css'
import React from 'react'
// import cartlogo from './60992.svg'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Categories from './Categories'
import Search from "./Search";
import axios from "axios";
class Navbar extends React.Component {
    setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
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
    handleLogout(){
        this.setCookie("user","")
        // alert(this.getCookie("user"))
    }
    handleSearch(name) {

    }

    render(){
        return(
            <div className="navbar">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/products">All products</NavLink>
                <NavLink to="/whychooseus">Why Choose Us</NavLink>

                {/*<div className="dropdown">*/}
                    {/*<button className="dropbtn">More*/}
                        {/*<i className="fa fa-caret-down">~</i>*/}
                    {/*</button>*/}
                    {/*/!*<div className="dropdown-content">*!/*/}
                        {/*/!*<NavLink to="Link1">Link 1</NavLink>*!/*/}
                        {/*/!*<NavLink to="#">Link 2</NavLink>*!/*/}
                        {/*/!*<NavLink to="#">Link 3</NavLink>*!/*/}
                    {/*/!*</div>*!/*/}
                {/*</div>*/}
                <Categories />


                {this.props.user ?
                    <>
                    <NavLink className='Navbar-right' to="/cart">My Cart</NavLink>
                    <a href="http://localhost:8080/auth/logout" className='Navbar-right'  onClick={()=>this.handleLogout()
                        }>Log out</a>
                        <NavLink className="Navbar-right" to="/user">{this.props.user}</NavLink>
                        {this.props.user === "Bo Wu" ?
                            <NavLink className="Navbar-right" to="/admin">Manage</NavLink>
                            : null
                        }

                    </>
                    :
                    <div>
                    <NavLink className='Navbar-right' to="/cart">My Cart</NavLink>
                    < NavLink className = 'Navbar-right' to="/login" >Login</NavLink>
                    <NavLink className='Navbar-right' to="/signup">Sign Up</NavLink>
                    </div>

                }

                <Search handler={this.handleSearch} />

            </div>

        )
    }

    handleLogin() {

    }
}

export default Navbar
