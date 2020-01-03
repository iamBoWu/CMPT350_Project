
import React from 'react'
import './Login.css'
import './Signup.css'
import axios from 'axios'
import qs from 'qs'

import Home from './Home'
class Signup extends React.Component {
  state = {
    //message: null

  };


  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
    setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    }
  // handleSubmit = event => {
  //   event.preventDefault();
  //
  //   let url = "http://localhost:8080/auth/login";
  //   axios.post(url, qs.stringify(this.state))
  //       .then(res=>
  //           res.data.username ? console.log(res.data)
  //                   // this.setCookie("profile", res.data)
  //               :
  //           this.setState({
  //           message: "wrong password"
  //       }
  //   ))
  //
  //       // .then(res=> console.log(this.state.message[0].lastName))
  // .catch(function (error) {
  //   alert("WRONG")
  // });
  // }
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
    handleSubmit = event => {
        event.preventDefault();

        let url = "http://localhost:8080/auth/login";
        axios.post(url, qs.stringify(this.state),{withCredentials:true})
            .then(res=> res.data ? this.setCookie("user",res.data.username)
                    : this.setState({message: "wrong password"}
                    ))

            .then(console.log(this.getCookie("user") ))
            .then(this.getCookie("user")? this.props.history.push("/"): {})

            .catch(function (error) {
                alert("login error")
            });
    };

    // googleLogin(){
    //     axios.get("http://localhost:8080/auth/google",{withCredentials:true})
    //         .then(res=>this.setCookie("user", res.data.username))
    //         .then(this.props.history.push("/"))
    // }

    render () {
        return(
            <body className="text-center">
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <p style={{backgroundColor: "red"}}>{this.state.message}</p>
                {/*<img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />*/}
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in with Email or Username</h1>

                    <label htmlFor="inputUsername" className="sr-only">Username</label>
                <br/>
                    <input type="text" id="inputUsername" id="username" className="form-control" placeholder="Username" onChange={this.handleChange}
                           />
                <br/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                <br/>
                        <input type="password" id="inputPassword" id="password" className="form-control" placeholder="Password" onChange={this.handleChange}
                               required />
                            <div className="checkbox mb-3">
                                <label>
                                    {/*<input type="checkbox" value="remember-me"> Remember me</input>*/}
                                </label>
                            </div>
                <br/>
                <a href="http://localhost:3000/">  <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button></a>
                <br/>
                <a href="http://localhost:8080/auth/google" >Login with your google account</a>
                            <p className="mt-5 mb-3 text-muted">&copy; 2019-9012</p>

            </form>
            </body>
        )
    }
}


export default Signup