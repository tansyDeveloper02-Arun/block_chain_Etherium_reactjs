import React from 'react'
// import { Link } from "react-router-dom";
import logo from "../../../img/12f_Inventory_Products_Details_1.png";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="">
        <div className="home_container">
          <img style={{width:"100%"}} src={logo} alt="Uploaded images"/>
        </div>
      </div>
    )
  }
}