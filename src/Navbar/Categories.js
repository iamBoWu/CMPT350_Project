import React, {Component} from 'react';
import Category from './Category'
import {NavLink} from "react-router-dom";
import tom from "../components/tom.jpeg";
import Stuff from "./Contacts";
import axios from "axios"
class Categories extends Component {
    state = {
        categories :[]
    };
    componentDidMount() {
        let url= "http://localhost:8080/category";
        axios.get(url)
            .then(res => {
            this.setState({
                categories: res.data
            })
        })
            // .then(error => alert("categories mount error"))
    }

    render() {
        return (

            <div className="dropdown">
                <button className="dropbtn" >
                    {/*<NavLink to="/categories">*/}
                        Categories~
                    {/*</NavLink>*/}

                </button>

                    <div className="dropdown-content">
                        {/*<NavLink to="/categories/drinks">Drinks</NavLink>*/}
                        {/*<NavLink to="/categories/chips">Chips</NavLink>*/}
                        <li><Category categories={this.state.categories} /></li>
                    </div>
                </div>

        );
    }
}

export default Categories;