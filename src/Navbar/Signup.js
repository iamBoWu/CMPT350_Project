import React from 'react'
import "./Signup.css"
import axios from "axios";
import qs from "qs";
class Signup extends React.Component {

    state = {
        //message: null

    };


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
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
    handleSubmit = event => {
        event.preventDefault();

        console.log(this.state);
        this.state.password !== this.state.pr?
            this.setState({
                message:"password did not match"
            })
            :


        axios.post("http://localhost:8080/auth/signup", qs.stringify(this.state),{withCredentials:true})
            // .then(res=> alert("signup"))
            .then(res=> res.data ? this.setCookie("user",res.data.username)
                : this.setState({message: "wrong password"}
                ))

            .then(console.log(this.getCookie("user") ))
            .then(this.getCookie("user")? this.props.history.push("/"): {})

            .catch(function (error) {
                alert("username already exist")
            });
    };

    render() {
        return(
            <form className="form-signin" onSubmit={this.handleSubmit} >
                <p style={{backgroundColor: "red"}}>{this.state.message}</p>
                <div className="container">
                    <h1>Sign Up</h1>
                    {/*<label htmlFor="email"><b>Email</b></label>*/}
                    {/*<br/>*/}
                    {/*<input type="text" placeholder="Enter Email" name="email" required/>*/}
                    <br/>
                    <label htmlFor="inputUsername" ><b>Username</b></label>
                    <br/>
                    <input type="text" id="inputUsername" onChange={e => this.handleChange(e)} name="username" className="form-control" placeholder="Username"
                    />
                    <br/>
                    <label htmlFor="psw"><b>Password</b></label>
                    <br/>
                    <input type="password" onChange={e => this.handleChange(e)} placeholder="Enter Password" name="password" required/>
                    <br/>
                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <br/>
                    <input type="password" onChange={e => this.handleChange(e)} placeholder="Repeat Password" name="pr" required/>

                    {/*<label>*/}
                    {/*<input type="checkbox" checked="checked" name="remember"*/}
                    {/*style="margin-bottom:15px"> Remember me</input>*/}
                    {/*</label>*/}



                    <div className="clearfix">
                        <button type="submit" className="signupbtn">Sign Up</button>
                        <button type="button" className="cancelbtn">Cancel</button>

                    </div>
                </div>
            </form>
        )
    }
}
export default Signup