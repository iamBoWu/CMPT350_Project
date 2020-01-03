import React, {Component} from 'react';
import axios from "axios";

class Search extends Component {
    state = {
        search:""
    }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  }
    // handleSubmit = e => {
    //     e.preventDefault()
    //     let url = "http://localhost:8080/products/"+ this.state.name;
    //     axios.get(url)
    //         .then(res=>this.setState({
    //             items: res.data
    //         }))
    //
    //       .catch(function (error) {
    //         alert(error)
    //       });
    // }
    render() {

        return (
            <div className="search-container">
                    {/*<form >*/}
                        <input type="text" placeholder="Search.." name="search" onChange={ this.handleChange(e)}/>
                        {/*<a href={"/products/"+this.state.search}>Search</a>*/}
                        <button onClick={this.props.handler(this.state.search)}></button>
                    {/*</form>*/}
            </div>
        );
    }
}

export default Search;