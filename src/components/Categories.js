import React, {Component} from 'react';
import Items from "../Items/Items";
import axios from 'axios'
import Item from "../Items/Item"
class Categories extends Component {
    state = {
        items:[]
    }
    componentDidMount() {
        console.log(this.props)
        let name = this.props.match.params.category_name;
        let url= "http://localhost:8080/category/"+name;
        axios.get(url).then( res => {
            this.setState({
                items : res.data
            })
        })
    }
    render() {
        return (
            <div>
                        <Item items={this.state.items} deleteItem={this.deleteItem} />
        <hr/>
            </div>
        );
    }
}

export default Categories;