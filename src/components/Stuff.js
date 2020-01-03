import "./Stuff.css"
import React, {Component} from 'react';
// import tom from './tom.jpeg'
// import Col from 'react-bootstrap/Col'
import Contacts from "../Navbar/Contacts";


const Stuff = ({stuffs}) =>{


          return (
    <>
        {/*<Row>*/}
      {
        stuffs.map(stuff => {
          return (

            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img clsssName= "abcPic" src={stuff.pic} alt="Avatar"  />
                    </div>
                    <div className="flip-card-back">
                        <h1>{stuff.name}</h1>
                        <p>{stuff.position}</p>
                        <p>{stuff.phoneNumber}</p>
                    </div>
                </div>
            </div>

          )
        })
      }
        {/*</Row>*/}
    </>
  );
    }


export default Stuff;
