// import "./Category.css"
import React from 'react';
import {NavLink} from "react-router-dom";

// import {NavLink} from "react-router-dom";

const Category = ({categories}) =>{


          return (
    <>
      {
        categories.map(category => {
          return (

              <a href = {"/category/"+ category.CategoryName} key={category.CategoryName}>{category.CategoryName}></a>

          )})
      }
    </>
  );
    };


export default Category;
