import React from "react";
import '../../../css/header.css';
import '../../../css/Productdetail.css';
import { Input, Checkbox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
// import { ImageUpload } from "../../imageUpload";
import products from './apartments.json';
import { Link } from "react-router-dom";

class NewUnit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      value: new Date(),
      tenant: false,
      label: "New",
      assign_tenant : false
    };
    for (let i = 0; i <= products.length; i++) {
      if(products[i] !== undefined){
          if(products[i]['ProductID'].toString() === this.props.location.search.slice(4)){
              this.state.apartmentName = products[i]['ProductName']
              this.state.unitName = products[i]['UnitsInStock']
              this.state.Amount = products[i]['Amount']
              this.state.Month = products[i]['Month']
              this.state.Unit_Number = products[i]['UnitsInStock']
              this.state.Floor = products[i]['floor']
              this.state.direction="East"
              this.state.Sqft = "250Sqft"
              this.state.bed_rooms = "4"
              this.state.bath_rooms = "5"
          }
      }
  }
    if(this.props.location.pathname === "/apartment/unit/edit"){
      this.state.label = "Update"
    }
    if(this.props.location.pathname === "/apartment/assign-unit"){
      this.state.label = "Assign Unit Owner"
    }
    if(this.props.location.pathname === "/apartment/assign-tenant"){
      this.state.label = "Assign Tenant"
      this.state.unit_owner = "Rich"
      this.state.assign_tenant = true
      
      
    }
    console.log(this.state.label)
    
  
  }
  type=["Goods","Service"]
  inventory=["East","West","North","South"]
  purchase=["Advetising and marketing","Automobile expenses","Bad debt","bank fees and charges","Consult expenses","contract assets","salaries and employee wages","internet expenses","other expenses"]
  sizes = ["Discount", "income", "general income", "interest income","late fee income","other charges","sales","Shipping charge"];
  onClickButton = (event) => {
    if(event === "cancel"){
      this.props.history.push('/apartment/grid/add');
    }
    
    if(event === "add_new_unit"){
      this.props.history.push('/apartment/new-unit/add');
    }
    
  }
  
  render() {
    var url = "/apartment/detail/grid"  + this.props.location.search;
    var url2 = "/apartment/new-unit/add";
    
    
    return (
      <div>
        <div>
          <br />
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginLeft: "45px",
              color: "black"
            }}> 
            <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link>
            {this.state.tenant === false ? <Link className="link_tag_2" to="/apartment/grid"><span> Apartments</span><span className="link_tag_2_curve"></span></Link>: 
            <Link className="link_tag_2" to="/tenant/grid"><span> Tenants</span><span className="link_tag_2_curve"></span></Link>}
            {this.state.tenant === true ? null: 
            <Link className="link_tag_3" to={url}><span> Apartment Units</span><span className="link_tag_3_curve"></span></Link>}
            {this.state.tenant === true ? null: 
            <Link className="link_tag_2" to={url2}><span> {this.state.label}</span><span className="link_tag_2_curve"></span></Link>}
          </div>
        </div>
        <div className="row example-wrapper row_setting">
        <div className="col-sm">
            <div className="" style={{ textAlign:"left"}}>
              <div className="card-block">
                <form className="k-form apartment_payment_detail_form"  onSubmit={this.handleSubmit} style={{ color: "#333" }}>
                  <fieldset  className="fieldset_line">
                    <div className="section__header">
                      <h2 className="section__title">
                        {this.state.label}
                      </h2>
                    </div>
                    {this.state.assign_tenant === true ? <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Tenant Name"
                        value={this.state.tenant_name}
                        onChange={event => this.setState({ tenant_name: event.target.value})}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      
                      </div>
                    </div>:null}
                    
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Unit #"
                        value={this.state.Unit_Number}
                        onChange={event => this.setState({ Unit_Number: event.target.value})}
                        // placeholder="First Name"
                        // pattern={"[A-Za-z]+"}
                        // minLength={1}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Unit Owner"
                        value={this.state.unit_owner}
                        onChange={event => this.setState({ unit_owner: event.target.value})}
                        // placeholder="First Name"
                        pattern={"[A-Za-z]+"}
                        // minLength={2}
                        // required
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      
                      </div>
                    </div>
                    
                    <div className="row">
                    {this.state.assign_tenant === true ? <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                          className="input_field"
                          name="username"
                          style={{ width: "100%" }}
                          label="Lease Start Date"
                          value={new Date()}
                          onChange={event => this.setState({ Floor: event.target.value})}
                          type="date"
                        />
                      </div>:<div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Floor"
                        value={this.state.Floor}
                        onChange={event => this.setState({ Floor: event.target.value})}
                        // placeholder="First Name"
                        // pattern={"[A-Za-z]+"}
                        // minLength={2}
                        // required
                      />
                      </div>}
                      {this.state.assign_tenant === true ? <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="username"
                          style={{ width: "100%" }}
                          label="Lease End Date"
                          value={new Date()}
                          onChange={event => this.setState({ Floor: event.target.value})}
                          type="date"
                          // placeholder="First Name"
                          // pattern={"[A-Za-z]+"}
                          // minLength={2}
                          // required
                        />
                      </div>
                      :<div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <DropDownList data={this.inventory} label="Direction" style={{ width: '100%' }} value={this.state.direction}  onChange={event => this.setState({ direction: event.target.value})}/>
                      </div>}
                      
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Monthly Rent"
                        value={this.state.Amount}  onChange={event => this.setState({ Amount: event.target.value})}
                        // placeholder="First Name"
                        // pattern={"[A-Za-z]+"}
                        // minLength={2}
                        // required
                      />
                      </div>
                    </div>
                    
                    {this.state.assign_tenant === true ? null:
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        style={{ width: "100%" }}
                        label="Sqft"
                        value={this.state.Sqft}  onChange={event => this.setState({ Sqft: event.target.value})}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        value={this.state.bed_rooms}  onChange={event => this.setState({ bed_rooms: event.target.value})}
                        style={{ width: "100%" }}
                        label="Bed rooms"
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="username"
                        value={this.state.bath_rooms}  onChange={event => this.setState({ bath_rooms: event.target.value})}
                        style={{ width: "100%" }}
                        label="Bath rooms"
                      />
                      </div>
                    </div>}
                    <br/>
                    {this.state.assign_tenant === true ? null: 
                    <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Checkbox label={'Closed For Maintanence'}/>
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Checkbox label={'Already Rented'}/>
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      </div>
                    </div>}
                    {/* <br/> */}
                    <div className="row" style={{ float: "right"}}>
                      <div className="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                      <div style={{ float: "right", marginTop:"10px"}}>
                        <Button className="button-save-details" >Save</Button>
                        <Button className="button-cancel-details" onClick={() => { this.onClickButton("cancel") }} >Cancel</Button>
                      </div>
                      </div>
                    </div>
                  </fieldset>
                  
                </form>
              </div>
            </div>

          </div>

          {
            this.state.success && (<div className="k-loading-mask">
              <span className="k-loading-text">Loading</span>
              <div className="k-loading-image"></div>
              <div className="k-loading-color"></div>
            </div>)
          }

          {this.state.success && (
            <div
              className="alert alert-success"
              style={{
                position: 'absolute', bottom: 0,
                right: 0, zIndex: 1000,
                backgroundColor: '#fff', width: "300px",
                boxShadow: "2px 5px 15px #999999",
                marginRight: "10px"
              }}
            >
              <div style={{ display: "flex" }}>
                <div className="success_message_circle">
                  <i className="fa fa-check-square-o check_squre_icon" aria-hidden="true"></i>
                </div>
                <div className="success_message_content_div">
                  <h6 className="success_message_h6">SUCCESS!</h6>
                  <p className="success_message_paragraph">Form Submitted Succesfully</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ success: true });
    setTimeout(() => { this.setState({ success: false }); if(this.props.location.pathname === "/apartment/assign-unit"){this.props.history.push("/unit-owner/grid")}}, 3000);
  }
}
export default NewUnit;