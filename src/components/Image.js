import React from 'react'
import axios from "axios"
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      imgUrl: ''

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
    let url = "http://localhost:8080/login";
    axios({
      url: url,
      method: "POST",
      headers:{
        authorization: "your token"
      },
      data: this.state

    }).then((res) =>{

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
        imgUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imgUrl} = this.state;
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

            <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={this.handleChange} />
          <br/>
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" onChange={this.handleChange} />
          <br/>
          <label htmlFor="belt">Belt:</label>
          <input type="text"id="belt" onChange={this.handleChange} />
          <br/>
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>submit</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default Image