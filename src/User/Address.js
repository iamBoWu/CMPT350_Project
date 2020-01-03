import React from 'react'
// import {Button, Form, InputGroup} from 'react-bootstrap'
// import {Col} from "react-bootstrap/es";
import qs from "qs"
import Left from "./Left"
import axios from "axios"
import "./User.css"
import {Link} from "react-router-dom";

class FormExample extends React.Component {
    state={};

    componentDidMount() {
        this.setState({username:this.getCookie("user")})
    }

    handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
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

_handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log(this.state)
    let url = "http://localhost:8080/customer/updateprofile";
    axios.post(url,qs.stringify(this.state),{withCredentials:true},
).then((res) =>{
alert("you have successfully updated your information")
    }).catch(function (error) {
    alert("1234")
  });}

  render() {
    return (
        <div className = "addressForm">
            <Left/>
          <form onSubmit={(e)=>this._handleSubmit(e)}>

              <h2>Please finish your user information</h2>
              <div className="nameDiv">
                  <label htmlFor="name">FirstName:</label>
            <input type="text" id="FirstName" onChange={this.handleChange} />
            <br/>
              </div>

            <div className="name1Div">
                <label htmlFor="age">LastName:</label>
            <input type="text" id="LastName" onChange={this.handleChange} />
            <br/>
            </div>

              <div className="emailDiv">
            <label htmlFor="belt">email:</label>
            <input type="text"id="email" onChange={this.handleChange} />
            <br/>
              </div>

              <div className="addressDiv">
                      <label htmlFor="belt">address:</label>
            <input type="text"id="address" onChange={this.handleChange} />
            <br/>
              </div>

              <div className="psotCodeDiv">
                      <label htmlFor="belt">PostCode:</label>
            <input type="text"id="PostCode" onChange={this.handleChange} />
            <br/>
              </div>

              <div className="countryDiv">
                      <label htmlFor="belt">country:</label>
            <input type="text"id="country" onChange={this.handleChange} />
            <br/>
              </div>

              <div className="creditCardDiv">
                      <label htmlFor="belt">CreditCard:</label>
            <input type="text"id="CreditCard" onChange={this.handleChange} />
            <br/>
              </div>

              <div className="birthdayDiv">
                         <label htmlFor="belt">Birthday:</label>
            <input type="text"id="Birthday" onChange={this.handleChange} />
            <br/>
              </div>

            <button className="submitButton"
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>submit</button>
              <Link to="/checkout">go to check out page</Link>
          </form>
        </div>
    )

  }
}

export default FormExample;