import React, { Component } from 'react';
// import logo from './logo.svg';
import './Leftbar.css';
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
                <div id="mySidepanel" className="sidepanel" >
                    <a href="javascript:void(0)" className="closebtn" onClick={this.handleClick}>&times;</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/clients">Clients</a>
                    <NavLink to="/contacts">Contacts</NavLink>
                </div>
            :
        < button className="openbtn" onClick={this.handleClick}>&#9776; </button>
                }
        </>
    );
  }
}


export default Toggle(App);