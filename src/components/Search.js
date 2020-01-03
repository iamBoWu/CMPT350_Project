import React, {Component} from 'react';
import axios from "axios"
import Item from "../Items/Item"
import Items from "../Items/Items";
class Search extends Component {
    state = {items:[]}
    componentDidMount() {
        let name = this.props.match.params.search;
        // console.log(url)
        // let url = "http://localhost:8080/products/"+ name;
        let url ='http://localhost:8080/search/' +name;
        axios.get(url)
            .then (res => this.setState({
                items: res.data
            }))
    }

    render() {
        return (
            <div>
                <Item items={this.state.items}/>
            </div>
        );
    }
}

export default Search;