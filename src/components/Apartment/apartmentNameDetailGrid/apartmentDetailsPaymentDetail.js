import React from "react";
import '../../../css/header.css';
import '../../../css/Productdetail.css';
// import { Input } from '@progress/kendo-react-inputs';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
// import { ImageUpload } from "../../imageUpload";
import products from './apartments.json';
import { Link } from "react-router-dom";
import { Input } from '@progress/kendo-react-inputs';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { DatePicker } from '@progress/kendo-react-dateinputs';
import apartment_Abi_address from '../../../lottery';
import web3 from '../../../web3';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      value: new Date()
    };
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
    if(this.props.location.pathname === "/tenant/apartment/detail/grid/details/Payment"){
        this.state.tenant = true;
    }else{
        this.state.tenant = false;
    }

    if(this.props.location.pathname === "/apartment/detail/lease/" + this.props.match.params.id + "/" + this.props.match.params.unit_id){
      this.state.lease = true;
    }else{
      this.state.lease = false;
    }
    
  }
  type=["Goods","Service"]
  inventory=["Finished goods","inventory asset","Work in progress"]
  purchase=["Advetising and marketing","Automobile expenses","Bad debt","bank fees and charges","Consult expenses","contract assets","salaries and employee wages","internet expenses","other expenses"]
  sizes = ["Discount", "income", "general income", "interest income","late fee income","other charges","sales","Shipping charge"];
  
  async componentDidMount(){

      const get_APartments =  await apartment_Abi_address.methods.getApartments().call();
      const APartments_owner =  await apartment_Abi_address.methods.getApartmentOwner(this.props.match.params.id).call();
      const APartments =  await apartment_Abi_address.methods.myUnits(APartments_owner).call();
      
      this.setState({
        apartmentName:get_APartments[this.props.match.params.id]['apartment_name'],
        unitName:APartments[this.props.match.params.unit_id]["unit_number"],
        unit_data:APartments[this.props.match.params.unit_id],
        monthly_rent:APartments[this.props.match.params.unit_id]["monthly_rent"],
        current_tenent_address:APartments[this.props.match.params.unit_id]["current_tenent_address"]
      })
     
  }

  onClickButton = (event) => {
    if(event === "cancel"){
      this.props.history.push("/apartment/detail/grid/details/" + this.props.match.params.id + "/" + this.props.match.params.unit_id);
    }
    if(event === "cancel-2"){
      this.props.history.push("/apartment/detail/grid/" + this.props.match.params.id);
    }
  }
  onChange = e => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    var url = "/apartment/detail/grid/" + this.props.match.params.id

    var url_lease = "/apartment/detail/lease/" + this.props.match.params.id + "/" + this.props.match.params.unit_id;
    var url2 = "/apartment/detail/grid/details/" + this.props.match.params.id + "/" + this.props.match.params.unit_id;
    var url3 = "/apartment/detail/grid/details/Payment/" + this.props.match.params.id + "/" + this.props.match.params.unit_id;
    var url4 = "/tenant/apartment/grid" + this.props.location.search
    var url5 = "/tenant/apartment/detail/grid" + this.props.location.search
    var url6 = "/tenant/apartment/detail/grid/details/Payment" + this.props.location.search
    
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
            <div style={{ textAlign: "left", fontSize: "12px", color: "black" }}>
                        <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link>
                        {this.state.tenant === false ? <Link className="link_tag_2" to="/apartment/grid"><span> My Apartments</span><span className="link_tag_2_curve"></span></Link>: 
                        <Link className="link_tag_2" to="/tenant/grid"><span> Tenants</span><span className="link_tag_2_curve"></span></Link>}
                        {this.state.tenant === false ? <Link className="link_tag_3" to={url}> <span>Apartment Units</span><span className="link_tag_3_curve"></span> </Link>: 
                        <Link className="link_tag_3" to={url4}><span> Tenants Name Grid</span><span className="link_tag_3_curve"></span></Link>}
                        {this.state.lease === false ? <span>
                        {this.state.tenant === false ? <Link className="link_tag_2" to={url2}><span> Payment History</span><span className="link_tag_2_curve"></span> </Link>: null}</span>:<Link className="link_tag_2" to={url_lease}><span> Lease Apartment Unit</span><span className="link_tag_2_curve"></span> </Link>}

                        {this.state.lease === false ? <span>
                        {this.state.tenant === false ? 
                        <Link className="link_tag_3" to={url3}> <span>Monthly Rent Payment </span><span className="link_tag_3_curve"></span> </Link> : <Link className="link_tag_2" to={url5}><span> Tenants Name Details Grid</span><span className="link_tag_2_curve"></span></Link>}</span>:null}

                        {this.state.tenant === false ? null: 
                        <Link className="link_tag_3" to={url6}><span> Tenants Name Payment Grid Detail</span><span className="link_tag_3_curve"></span></Link>}
                    </div>
                    <br/>
          </div>
        </div>
        <div className="row example-wrapper row_setting">
        <div className="col-sm">
            <div className="" style={{ textAlign:"left"}}>
              <div className="card-block">
                <form className="k-form apartment_payment_detail_form"  onSubmit={this.handleSubmit} style={{ color: "#333" }}>
                  <fieldset  className="fieldset_line">
                    <div className="section__header">
                    {this.state.lease === false ? <h2 className="section__title">
                    {this.state.apartmentName} - {this.state.unitName}
                      </h2>:<h2 className="section__title">
                        {this.state.apartmentName} - {this.state.unitName}
                      </h2>}
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      {this.state.lease === false ? <Input
                          className="input_field"
                          name="Year"
                          style={{ width: "100%" }}
                          label="Year"
                          value={this.state.Year}
                          onChange={this.onChange}
                        />: <Input
                        className="input_field"
                        name="start_date"
                        style={{ width: "100%" }}
                        label="Start date"
                        type="date"
                        value={this.state.start_date ? this.state.start_date:new Date()}
                        onChange={this.onChange}

                      />}
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      {this.state.lease === false ? <Input
                          className="input_field"
                          name="Month"
                          style={{ width: "100%" }}
                          label="Month"
                          value={this.state.Month}
                          onChange={this.onChange}

                        />: <Input
                        className="input_field"
                        name="end_date"
                        style={{ width: "100%" }}
                        label="End date"
                        type="date"
                        value={this.state.end_date ? this.state.end_date:new Date()}
                        onChange={this.onChange}
                      />}
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      {this.state.lease === true ? <Input
                          className="input_field"
                          name="advance_amount"
                          style={{ width: "100%" }}
                          label="Advance Amount"
                          value={this.state.advance_amount}
                          onChange={this.onChange}
                        />: null}
                      </div>
                    </div>
                    
                    
                  <div className="row">
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
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                        className="input_field"
                        name="paid_amount"
                        style={{ width: "100%" }}
                        label="Paid Amount"
                        value={this.state.paid_amount}
                        onChange={this.onChange}
                      />
                      </div>
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      <Input
                          className="input_field"
                          name="payment_date"
                          style={{ width: "100%" }}
                          label="Payment Date"
                          type="date"
                          value={this.state.payment_date? this.state.payment_date:new Date()}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ float: "right"}}>
                      <div className="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                      <div style={{ float: "right", marginTop:"10px"}}>
                        <Button className="button-save-details" >Pay</Button>
                        {this.state.lease === false ? <Button className="button-cancel-details" onClick={() => { this.onClickButton("cancel") }} >Cancel</Button>:<Button className="button-cancel-details" onClick={() => { this.onClickButton("cancel-2") }} >Cancel</Button>}
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
    // const contractor =  await apartment_Abi_address.options.address;
    if(this.props.location.pathname === "/apartment/detail/lease/" + this.props.match.params.id + "/" + this.props.match.params.unit_id){

      await apartment_Abi_address.methods.clickToRent(this.state.unit_data.unit_id,this.state.unit_data.unit_owner,this.state.advance_amount,this.state.start_date,this.state.end_date,this.state.payment_date).send({
        from:this.state.current_tenent_address, 
        gas:3000000
        // to:contractor  
      });
    }
    console.log(web3)
    if(this.props.location.pathname === "/apartment/detail/grid/details/Payment/" + this.props.match.params.id + "/" + this.props.match.params.unit_id){
      await apartment_Abi_address.methods.payRent(this.props.match.params.id, this.props.match.params.unit_id,this.state.Year,this.state.Month,this.state.monthly_rent,this.state.paid_amount,this.state.payment_date).send({
        from:this.state.current_tenent_address, 
        gas:3000000
      });
    }
    this.setState({ success: true });
    setTimeout(() => { this.setState({ success: false }); }, 3000);
  }
}
export default ProductDetail;