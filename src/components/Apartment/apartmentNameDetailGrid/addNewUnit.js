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
import web3 from '../../../web3';
import apartment_Abi_address from '../../../lottery';

class NewUnit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      value: new Date(),
      tenant: false,
      label: "Add Unit",
      apartment_owner_address_data:[],
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
      this.state.label = "Update Unit"
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
  async componentDidMount(){
    const account = await web3.eth.personal.getAccounts();
    // const get_apartments = await apartment_Abi_address.methods.getApartments().call();
    var count = 0;
    var address_length = account.map(dataItem => Object.assign({id:count++, address:dataItem}))
    const address = account.filter(item => item.toLowerCase() !== web3.givenProvider.selectedAddress)
    var apartment_owner_address_length = [];
    address_length.map(item => {if(item.address.toLowerCase() === web3.givenProvider.selectedAddress){
      apartment_owner_address_length = item
    }})
    // item !== web3.givenProvider.selectedAddress
    // console.log(web3.givenProvider.selectedAddress)
    this.setState({
      apartment_owner_address_data:address,
      apartment_owner_address_length:apartment_owner_address_length.address
    })
  }
  onClickButton = (event) => {

    if(event === "cancel"){
      this.props.history.push('/apartment/detail/grid' + this.props.location.search);
    }
    
    if(event === "add_new_unit"){
      this.props.history.push('/apartment/new-unit/add');
    }
    
  }
  onChange = e => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value

    })
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
            {this.state.tenant === false ? <Link className="link_tag_2" to="/apartment/grid"><span> My Apartments</span><span className="link_tag_2_curve"></span></Link>: 
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
                        name="tenant_name"
                        style={{ width: "100%" }}
                        label="Tenant Name"
                        value={this.state.tenant_name}
                        onChange={this.onChange}
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
                        name="unit_number"
                        style={{ width: "100%" }}
                        label="Unit #"
                        value={this.state.unit_number}
                        onChange={this.onChange}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <DropDownList 
                          data={this.state.apartment_owner_address_data} 
                          name="tenant_address" 
                          label="Tenant Address" 
                          style={{ width: '100%' }} 
                          value={this.state.tenant_address}
                          onChange={this.onChange}
                          />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      
                      </div>
                    </div>
                    
                    <div className="row">
                    {this.state.assign_tenant === true ? <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                          className="input_field"
                          name="lease_start_data"
                          style={{ width: "100%" }}
                          label="Lease Start Date"
                          value={this.state.lease_start_data ? this.state.lease_start_data:new Date()}
                           onChange={this.onChange}
                          type="date"
                        />
                      </div>:<div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="Floor"
                        style={{ width: "100%" }}
                        label="Floor"
                        value={this.state.Floor}
                        onChange={this.onChange}
                      />
                      </div>}
                      {this.state.assign_tenant === true ? <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="lease_end_date"
                          style={{ width: "100%" }}
                          label="Lease End Date"
                          value={this.state.lease_end_date ? this.state.lease_end_date:new Date()}
                          onChange={this.onChange}
                          type="date"
                        />
                      </div>
                      :<div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <DropDownList data={this.inventory} name="Direction" label="Direction" style={{ width: '100%' }} value={this.state.Direction}
                        onChange={this.onChange}/>
                      </div>}
                      
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="monthly_rent"
                        style={{ width: "100%" }}
                        label="Monthly Rent"
                        value={this.state.monthly_rent}
                        onChange={this.onChange}
                      />
                      </div>
                    </div>
                    
                    {this.state.assign_tenant === true ? null:
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="Sqft"
                        style={{ width: "100%" }}
                        label="Sqft"
                        value={this.state.Sqft}
                        onChange={this.onChange}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="bed_rooms"
                        value={this.state.bed_rooms}
                        onChange={this.onChange}
                        style={{ width: "100%" }}
                        label="Bed rooms"
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="bath_rooms"
                        value={this.state.bath_rooms}
                        onChange={this.onChange}
                        style={{ width: "100%" }}
                        label="Bath rooms"
                      />
                      </div>
                    </div>}
                    <br/>
                    {this.state.assign_tenant === true ? null: 
                    <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Checkbox 
                          label={'Closed For Maintanence'} 
                          name="closed_for_maintanence"
                          value={this.state.closed_for_maintanence}
                          onChange={event => this.setState({ closed_for_maintanence: event.value})}
                          />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Checkbox 
                          label={'Already Rented'}
                          name="already_rented"
                          value={this.state.already_rented}
                          onChange={event => this.setState({ already_rented: event.value})}
                        />
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

  handleSubmit = async (event) => {
    event.preventDefault();
    // const account = await web3.eth.personal.getAccounts();
    const contractor =  await apartment_Abi_address.options.address;
    console.log(this.state) 
    console.log(this.state.apartment_owner_address_length)
    await apartment_Abi_address.methods.createUnit(0,this.state.unit_number,  this.state.Floor,   this.state.Direction, this.state.monthly_rent, this.state.Sqft, this.state.bed_rooms, this.state.bath_rooms, this.state.closed_for_maintanence, this.state.already_rented, this.state.tenant_address)
    .send({
        from:this.state.apartment_owner_address_length, 
        to:contractor  
      });
    this.setState({ success: true });
    setTimeout(() => { this.setState({ success: false }); if(this.props.location.pathname === "/apartment/assign-unit"){this.props.history.push("/unit-owner/grid")}}, 3000);
  }
}
export default NewUnit;