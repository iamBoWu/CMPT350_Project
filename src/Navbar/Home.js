import React, {Component} from 'react';
import Item from "../Items/Item"
import SlideShow from "../Behivior/SlideShow"
import axios from "axios"
class Home extends Component {
    state = {
        newarrival: [],
        hotproducts: []

    }
    componentDidMount() {
        axios.get("http://localhost:8080/newarrival")
            // .then(res=>console.log(res.data))
            .then(res=> this.setState({
                newarrival: res.data
            }))
            .then (console.log(this.state.newarrival))

        axios.get("http://localhost:8080/hotproducts")
            .then(res=>this.setState({
                hotproducts:res.data
            }))
        // console.log(this.state.newarrival)
    }

    render() {
        return (
            <div className="home">

                <h1>New Arrivals</h1>
                <Item items={this.state.newarrival} width="100%"/>
                <hr/>
                <h1>Most Popular</h1>
                <hr/>
                <Item items={this.state.hotproducts}/>

                </div>

        );
    }
}

export default Home;