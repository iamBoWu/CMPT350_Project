import React, {Component} from 'react';
import axios from "axios"
import qs from "qs"
class Delete extends Component {
      constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
      console.log(this.state)
          let url = "http://localhost:8080/manager/deleteproduct";
          axios.delete(url, { data: this.state })

              .then(res=> alert("deleted"))
  };
    render() {
        return (
            <div>
                <form >
                   Product Name: <input type="text" name="ProductName" onChange={this.handleChange}/><br/>
                   CategoryName: <input type="text" name="CategoryName" onChange={this.handleChange}/><br/>
                    Brand: <input type="text" name="Brand" onChange={this.handleChange}/>


                     <button className="submitButton"
                    type="submit"
                    onClick={this.handleSubmit}>Delete</button>
                </form>
            </div>
        );
    }
}

export default Delete;