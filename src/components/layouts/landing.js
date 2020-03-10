import React from 'react'
import { Link } from "react-router-dom";

export class Landing extends React.Component {
  render() {
    return (
      <div className="site-section">
        <div className="home_container">
          <div className="row mb-5">
            <div className="col-md-7 mx-auto text-center">
              <h2 className="heading-29190">Modules</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-lg-2">
              {/* <div className="service-29128 text-center">
               <b><Link to="/apartment/grid">Apartment Admin</Link></b>
              </div> */}
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="service-29128 text-center">
              <b><Link to="/contract-code">Block chain contract code</Link></b>
              </div>
            </div>
            <div className="col-md-2 col-lg-2">
              {/* <div className="service-29128 text-center">
              <b><Link to="/contract-code">Block chain contract code</Link></b>
              </div> */}
            </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
               <b><Link to="/apartment/grid">My Apartments</Link></b>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
               <b><Link to="/unit-owner/grid">My Units</Link></b>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
              <b><Link to="/rented-paid/grid">My Rented Place</Link></b>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
              <b><Link to="/all-apartment/grid">Search for All Apartments</Link></b>
              </div>
            </div>
            </div>
            
        
        </div>
        </div>
    )
  }
}