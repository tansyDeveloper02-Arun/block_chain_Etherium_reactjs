import React from 'react'
import '../../css/header.css';
import { Link } from "react-router-dom";
import logo from "../../img/stackExchange.png";
// import { DropDownButton } from '@progress/kendo-react-buttons'

export class Navbar extends React.Component {
  render() {
    // const itemRender = (props) => {
    //   return (
    //     <div style={{ width: "80px" }} >
    //       <span role="presentation" />
    //       {`${props.item.text}`}
    //     </div >
    //   );
    // };
    // const items = [
    //   { text: 'Email', value: 'Email' },
    //   { text: 'SMS', value: 'SMS' }
    // ];
    return (
      <div >
        <div>
          <nav className="navbar navbar-style navbar-primary-header-change" >
            <div></div>
            <Link to="/">
              <div className="">
                <div className="">
                  <span className="">
                  {/* <Link to="#"> */}
                    <img src={logo} alt="Empty" style={{height: "52px", margin: "-12px 0px"}} />
                  {/* </Link> */}
                    {/* <i className="fa fa-stack-exchange" style={{ color: "rgba(70, 162, 217)", fontSize: "25px", marginLeft: "10px" }}>  TSS</i>  */}
                  </span>
                </div>
              </div>
            </Link>
            {/* <div className="topnav2">
              <div className="topnav-right">
                <span className="button5"><span className="k-icon k-i-plus"></span></span>
              </div>
            </div>
            <div className="topnav">
              <div className="topnav-right">
                <span className="button5"><span className="k-icon k-i-email"></span></span>
              </div>
            </div> */}
            <div className="topnav-bell">
              <div className="topnav-right">
               <span className="k-icon k-i-notification" style={{color:"#fff"}}></span>
              </div>
            </div>
            {/* <div className="topnav-user">
              <div className="topnav-right">
                <span className="button5">
                  <DropDownButton
                    className="setting_icon"
                    icon="k-icon k-i-gear" dir="rtl"
                    itemRender={itemRender}
                    items={items}
                    title="more"
                  />
                </span>
              </div>
            </div> */}
            <div className="topnav-user">
              <div className="topnav-right">
                <span className="k-icon k-i-gear"  style={{color:"#fff"}}
                  >
                </span>
              </div>
            </div>
            <div className="topnav">
              <div className="topnav-right">
                  <span className="k-icon k-i-user" style={{color:"#fff"}}></span>
              </div>
            </div>
          </nav>
          <nav className="navbar navbar-default navbar-primary-change" style={{ backgroundColor: "#33344a", borderColor: "#242425", width: "60px" }}>
            <ul className="nav navbar-nav nav-pills navbar-primary-list list-group navbar_ul_list">

              {/* <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/links"> */}

              {/* <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/detail">

                  <i className="fa fa-calendar font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/Inventor">
                  <i className="fa fa-user font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/Inventor/grid">
                  <i className="far fa-user font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fa fa-university font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fa fa-usd font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">

                  <i className="fa fa-cog font_size" aria-hidden="true"></i>
                </Link>
              </li> */}
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/links">
                  <i className="fa fa-calendar font_size" aria-hidden="true"></i>
                </Link>
              </li> 
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/detail">
                  <i className="fas fa-cogs font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/Inventor">
                  <i className="fas fa-tachometer-alt font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/Inventor/grid">
                  <i className="far fa-building font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="far fa-comment font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/api-links">
                  <i className="fas fa-money-check-alt font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fas fa-tasks font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fas fa-boxes font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fas fa-truck-moving font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fa fa-university font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fas fa-shopping-cart font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="fas fa-chart-line font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="/home/accounts/home">
                  <i className="fas fa-file-invoice-dollar font_size" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-group-item-action">
                <Link className="navbar-primary-item-link-anchor-tag" to="#">
                  <i className="far fa-handshake font_size" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
