import React from "react";
import '../../../css/header.css';
import '../../../css/Productdetail.css';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
// import { ImageUpload } from "../../imageUpload";
import products from './apartments.json';
import { Link } from "react-router-dom";
// import { DatePicker } from '@progress/kendo-react-dateinputs';
import web3 from '../../../web3';
import apartment_Abi_address from '../../../lottery';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      value: new Date(),
      apartment_owner_address_data:[],
      tenant: false,
      label:"New"
    };
    if(this.props.location.pathname === "/apartment/grid/edit"){
      this.state.label = "Update"
      this.state.Unit_Number = "101"
      this.state.Floor = "Ground"
    }
    if(this.props.location.pathname === "/all-apartment/grid/add"){
      this.state.apartment = "All Apartments";
      this.state.link = "/all-apartment/grid";
    }else{
      this.state.apartment = "My Apartments";
      this.state.link = "/apartment/grid";
    }
    for (let i = 0; i <= products.length; i++) {
      if(products[i] !== undefined){
          if(products[i]['ProductID'].toString() === this.props.location.search.slice(4)){
              this.state.apartmentName = products[i]['ProductName']
              this.state.unitName = products[i]['UnitsInStock']
              this.state.Amount = products[i]['Amount']
              this.state.Month = products[i]['Month']
              
          }
      }
  }
  }
  type=["Goods","Service"]
  inventory=["Finished goods","inventory asset","Work in progress"]
  purchase=["Advetising and marketing","Automobile expenses","Bad debt","bank fees and charges","Consult expenses","contract assets","salaries and employee wages","internet expenses","other expenses"]
  sizes = ["Discount", "income", "general income", "interest income","late fee income","other charges","sales","Shipping charge"];
  async componentDidMount(){
    const account = await web3.eth.personal.getAccounts();

    this.setState({
      apartment_owner_address_data:account
    })
  }
  onClickButton = (event) => {
    if(event === "cancel"){
      this.props.history.push('/apartment/grid');
    }
    
    if(event === "add_new_unit"){
      this.props.history.push("/apartment/new-unit/add");
    }
    
  }
  onChange = e => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value

    })
  }
  render() {
    var url = "/apartment/grid/add"
    if(this.props.location.pathname === "/all-apartment/grid/add"){
      url = "/all-apartment/grid/add"
    }else{
      url = "/apartment/grid/add"
    }
    if(this.props.location.pathname === "/apartment/grid/edit"){
      url = "/apartment/grid/edit"
    }
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
            {this.state.tenant === false ? <Link className="link_tag_2" to={this.state.link}><span> {this.state.apartment}</span><span className="link_tag_2_curve"></span></Link>: 
            <Link className="link_tag_2" to="/tenant/grid"><span> Tenants</span><span className="link_tag_2_curve"></span></Link>}
            {this.state.tenant === true ? null: 
            <Link className="link_tag_3" to={url}><span>  {this.state.label} Apartment Building</span><span className="link_tag_3_curve"></span></Link>}
          </div>
        </div>
        <div className="row example-wrapper row_setting">
        <div className="col-sm">
            <div className="" style={{ textAlign:"left"}}>
              <div className="card-block">
                <form className="k-form apartment_payment_detail_form"  onSubmit={this.handleSubmit} style={{ color: "#333", backgroundColor:"#FFFFFF" }}>
                  <fieldset  className="fieldset_line">
                    <div className="section__header">
                      <h2 className="section__title">
                        {this.state.label} Apartment 
                      </h2>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="apartment_name"
                          style={{ width: "100%" }}
                          label="Name"
                          value={this.state.apartment_name}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      {/* <Input
                        className="input_field"
                        name="Apartment_owner_address"
                        style={{ width: "100%" }}
                        label="Apartment Owner"
                        value={this.state.Apartment_owner_address}
                        onChange={this.onChange}
                      /> */}
                      <DropDownList data={this.state.apartment_owner_address_data} label="Apartment Owner" name="Apartment_owner_address" style={{ width: '100%' }} value={this.state.Apartment_owner_address}
                        onChange={this.onChange}/>
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                          className="input_field"
                          name="start_date"
                          style={{ width: "100%" }}
                          label="Start Date"
                          type="date"
                          value={this.state.start_date ? this.state.start_date:new Date()}
                          onChange={this.onChange}
                        />
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="door_number"
                          style={{ width: "100%" }}
                          label="Door #"
                          value={this.state.door_number}
                          onChange={this.onChange}
                          
                        />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="street"
                          style={{ width: "100%" }}
                          label="Street"
                          value={this.state.street}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="locality"
                          style={{ width: "100%" }}
                          label="Locality"
                          value={this.state.locality}
                          onChange={this.onChange}
                        />
                      </div>
                      
                    </div>
                    
                    <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="city"
                        style={{ width: "100%" }}
                        label="City"
                        value={this.state.city}
                        onChange={this.onChange}
                        
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <Input
                          className="input_field"
                          name="country"
                          style={{ width: "100%" }}
                          label="Country"
                          value={this.state.country}
                          onChange={this.onChange}
                        />
                        
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="postal_code"
                        style={{ width: "100%" }}
                        label="Postal Code"
                        value={this.state.postal_code}
                        onChange={this.onChange}
                      />
                      </div>
                    </div>
                    <br></br>
                    
                    <div className="row">
                      <div className="col-md-4 col-sm-12 col-xs-12 xol-lg-4">
                        <div style={{ marginTop:"10px"}}>
                          {/* <Button className="button-save-details" onClick={() => { this.onClickButton("add_new_unit") }}>Add Unit</Button> */}
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ float: "right"}}>
                      <div style={{ float: "right", marginTop:"10px"}}>
                        <Button className="button-save-details" >Save</Button>
                        <Button className="button-cancel-details" onClick={() => { this.onClickButton("cancel") }} >Cancel</Button>
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
                  <span class="k-icon k-i-check k-i-checkmark check_squre_icon"></span>
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
    // const contractor =  await apartment_Abi_address.options.address;
    await apartment_Abi_address.methods.createApartment(this.state.apartment_name,  this.state.door_number, this.state.street, this.state.locality, this.state.postal_code, this.state.start_date)
    .send({
        from:this.state.Apartment_owner_address,
        gas:3000000
        // to:contractor
      });
    this.setState({ success: true,  });
    setTimeout(() => { this.setState({ success: false }); this.props.history.push("/apartment/grid") }, 3000);
  }
}
export default ProductDetail;