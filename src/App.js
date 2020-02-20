import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
// import web3 from './web3';
// import lottery from './lottery';
import './css/telerikCssBootstrap/all.css';
import { Landing } from "./components/layouts/landing";
import apartmentGrid from "./components/Apartment/apartmentGrid/apartmentGrid";
import apartmentDetailGrid from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailGrid";
import apartmentDetailGridDetail from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailsPaymentGrid";
import apartmentDetailPaymentDetail from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailsPaymentDetail";
import contract from "./smart_contract";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ApartmentDetails from './'
class App extends Component{

  render(){
    
    return (
      <div className="App">
      <Router>
        <div className="landing">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/apartment/grid' component={apartmentGrid} />
            <Route exact path='/apartment/detail/grid' component={apartmentDetailGrid} />
            <Route exact path='/apartment/detail/grid/details' component={apartmentDetailGridDetail} />
            <Route exact path='/apartment/detail/grid/details/Payment' component={apartmentDetailPaymentDetail} />
            <Route exact path='/contract-code' component={contract} />
            {/* <Route exact path='/login' component={Login} />
            <Route exact path='/forgot-password' component={forgotPassword} />
            <Route exact path='/home/homepage' component={HomePage} /> */}
          </Switch>
        </div>
      </Router>
    </div >
  );
  }
}

export default App;
