import React from 'react'
import axios from "axios"
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    let url = "http://localhost:8080/manager/addproduct";
    axios({
      url: url,
      method: "POST",
      headers:{
        authorization: "your token"
      },
      data: this.state

    }).then((res) =>{
      alert("updated")

    }).catch(function (error) {
    alert(error)
  });
    console.log('handle uploading-', this.state.imgUrl);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        // file: file,
        Picture: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let imgUrl = this.state.Picture;
    let $imagePreview = null;
    if (imgUrl) {
      $imagePreview = (<img src={imgUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input  type="file" onChange={(e)=>this._handleImageChange(e)} />
            <br/>

            <label htmlFor="name">ProductName:</label>
          <input type="text" id="ProductName" onChange={this.handleChange} />
          <br/>
          <label htmlFor="age">Brand:</label>
          <input type="text" id="Brand" onChange={this.handleChange} />
          <br/>
          <label htmlFor="belt">weight:</label>
          <input type="text"id="weight" onChange={this.handleChange} />
          <br/>

                    <label htmlFor="belt">price:</label>
          <input type="text"id="price" onChange={this.handleChange} />
          <br/>
                    <label htmlFor="belt">stock:</label>
          <input type="text"id="stock" onChange={this.handleChange} />
          <br/>
                    <label htmlFor="belt">CategoryName:</label>
          <input type="text"id="CategoryName" onChange={this.handleChange} />
          <br/>
                    <label htmlFor="belt">ManagerID:</label>
          <input type="text"id="ManagerID" onChange={this.handleChange} />
          <br/>

          <label htmlFor="belt">Description:</label>
          <input type="text"id="description" onChange={this.handleChange} />
          <br/>

          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Add</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default Image