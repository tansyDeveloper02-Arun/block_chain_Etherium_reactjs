import React from 'react'
// import { Link } from "react-router-dom";
import logo from "../../../img/12c_Inventory_Products_Sort_down.jpg";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="bg-light">
        <div className="home_container">
          <img style={{width:"100%"}} src={logo} alt="Uploaded images"/>
        </div>
      </div>
    )
  }
}