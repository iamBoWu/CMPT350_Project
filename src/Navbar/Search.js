import React, {Component} from 'react';
import axios from "axios";
import {Redirect, Link } from "react-router-dom"
class Search extends Component {
    constructor() {
        super();

        this.state = {
            name:"",
            items: [],
            search:""
        }
        this.handleChange = (e) => {
            this.setState({
                search: e.target.value
            });
        }

        this.handleSubmit = () => {
            alert('Searching');
            this.props.history.push('/search/' + this.state.search);
        }
    }

    render() {

        return (
            <div className="search-container">
                    {/*<form >*/}
                        {/*<input type="text" placeholder="Search.." name="search"  onChange={(e)=> this.handleChange(e)}/>*/}
                            {/*<button onClick={()  => this.handleSubmit*/}
                                {/*// <Rdi to={"/search/"+this.state.search}/>*/}
                            {/*}> <i className="fa fa-search">Search</i></button>*/}
                    {/*</form>*/}

                    <input type="text" placeholder="Search.." name="search"  onChange={this.handleChange}/>
                    <a href={"/search/" + this.state.search}>Search</a>
            </div>
        );
    }
}

export default Search;