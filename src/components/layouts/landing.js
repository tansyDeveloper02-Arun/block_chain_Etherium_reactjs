import React from 'react'
import { Link } from "react-router-dom";

export class Landing extends React.Component {
  render() {
    return (
      <div className="site-section bg-light">
        <div className="home_container">
          <div className="row mb-5">
            <div className="col-md-7 mx-auto text-center">
              <h2 className="heading-29190">Modules</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
              <span className="d-block wrap-icon">
                <div className="row" style={{marginTop: "20px"}}>
                  <div className="col-md-2 offset-2">
                  <i className="fas fa-chart-line fa-2x" 
                    style={{color: "#3c416b"}}></i>
                  </div>
                  <div className="col-md-6">
                  <span style={{fontSize: "20px", marginTop: "0px"}}><b><Link to="/apartment/grid">Apartment Admin</Link></b></span>
                  </div>
                </div>
                </span>
                
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
              <span className="d-block wrap-icon">
                <div className="row" style={{marginTop: "20px"}}>
                  <div className="col-md-2 offset-2">
                  <i className="fas fa-file-invoice-dollar fa-2x" 
                    style={{color: "#3c416b"}}></i>
                  </div>
                  <div className="col-md-4">
                  <span style={{fontSize: "20px", marginTop: "0px"}}><b><Link to="/tenant_admin">Tenant Admin</Link></b></span>
                  </div>
                </div>
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-29128 text-center">
              <span className="d-block wrap-icon">
                <div className="row" style={{marginTop: "20px"}}>
                  <div className="col-md-2 offset-2">
                  <i className="fas fa-file-invoice-dollar fa-2x" 
                    style={{color: "#3c416b"}}></i>
                  </div>
                  <div className="col-md-4">
                  <span style={{fontSize: "20px", marginTop: "0px"}}><b><Link to="/contract-code">Block chain contract code</Link></b></span>
                  </div>
                </div>
                </span>
              </div>
            </div>
            </div>
        </div>
        </div>
    )
  }
}