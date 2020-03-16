import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import './css/telerikCssBootstrap/all.css';
import { Landing } from "./components/layouts/landing";
import apartmentGrid from "./components/Apartment/apartmentGrid/apartmentGrid";
import unitOwnerGrid from "./components/Apartment/unitOwnerGrid/unitOwnerGrid";
import rentPaidGrid from "./components/Apartment/myRentedPaid/myRentedPaid";
import apartmentDetailGrid from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailGrid";
import apartmentDetailGridDetail from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailsPaymentGrid";
import apartmentDetailPaymentDetail from "./components/Apartment/apartmentNameDetailGrid/apartmentDetailsPaymentDetail";
import addNewApartment from "./components/Apartment/apartmentNameDetailGrid/addNewApartment";
import addNewUnit from "./components/Apartment/apartmentNameDetailGrid/addNewUnit";
import tenantDetailGrid from "./components/Tenant/tenantGrid/tenantGrid";
import contract from "./smart_contract";
import 'bootstrap/dist/css/bootstrap.min.css';
// import store from "./store";

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
            <Route exact path='/all-apartment/grid' component={apartmentGrid} />
            <Route exact path='/all-apartment/grid/add' component={addNewApartment} />
            <Route exact path='/unit-owner/grid' component={unitOwnerGrid} />
            <Route exact path='/all-unit-owner/grid' component={unitOwnerGrid} />
            <Route exact path='/rented-paid/grid' component={rentPaidGrid} />
            <Route exact path='/apartment/detail/grid/:id' component={apartmentDetailGrid} />
            <Route exact path='/apartment/detail/grid/details/:id/:unit_id' component={apartmentDetailGridDetail} />
            <Route exact path='/apartment/detail/grid/details/Payment/:id/:unit_id' component={apartmentDetailPaymentDetail} />
            <Route exact path='/contract-code' component={contract} />
            <Route exact path='/apartment/grid/add' component={addNewApartment} />
            <Route exact path='/apartment/grid/edit' component={addNewApartment} />
            <Route exact path='/apartment/assign-unit/:id/:unit_id' component={addNewUnit} />
            <Route exact path='/apartment/assign-tenant/:id/:unit_id' component={addNewUnit} />
            <Route exact path='/apartment/new-unit/add/:id' component={addNewUnit} />
            <Route exact path='/apartment/unit/edit' component={addNewUnit} />
            {/* Tenant */}
            <Route exact path='/tenant/grid' component={tenantDetailGrid} />
            <Route exact path='/tenant/apartment/grid' component={apartmentGrid} />
            <Route exact path='/tenant/apartment/detail/grid' component={apartmentDetailGrid} />
            <Route exact path='/tenant/apartment/detail/grid/details/Payment' component={apartmentDetailPaymentDetail} />
            <Route exact path='/apartment/detail/lease/:id/:unit_id' component={apartmentDetailPaymentDetail} />
            
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
