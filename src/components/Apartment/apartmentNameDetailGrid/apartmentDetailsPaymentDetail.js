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
  }
  type=["Goods","Service"]
  inventory=["Finished goods","inventory asset","Work in progress"]
  purchase=["Advetising and marketing","Automobile expenses","Bad debt","bank fees and charges","Consult expenses","contract assets","salaries and employee wages","internet expenses","other expenses"]
  sizes = ["Discount", "income", "general income", "interest income","late fee income","other charges","sales","Shipping charge"];
  onClickButton = (event) => {
    this.props.history.push('/apartment/detail/grid/details'+ this.props.location.search);
  }
  render() {
    var url = "/apartment/detail/grid" + this.props.location.search
    var url2 = "/apartment/detail/grid/details" + this.props.location.search
    var url3 = "/apartment/detail/grid/details/Payment" + this.props.location.search
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
                        <Link className="link_tag" to=""><span className="k-icon k-i-pencil"></span></Link><Link className="link_tag_2" to="/apartment/grid"><span> Apartments</span><span className="link_tag_2_curve"></span> </Link> <Link className="link_tag_3" to={url}> <span>Apartment Details Grid</span><span className="link_tag_3_curve"></span> </Link>
                        <Link className="link_tag_2" to={url2}><span> Apartment Details Grid Details</span><span className="link_tag_2_curve"></span> </Link>
                        <Link className="link_tag_3" to={url3}> <span>Apartment Payment Pending Details</span><span className="link_tag_3_curve"></span> </Link>
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
                      <h2 className="section__title">
                        Payment 
                      </h2>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        Name<span style={{paddingLeft:"40px"}}>:</span> <span style={{paddingLeft:"18px"}}> {this.state.apartmentName}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                      Unit<span style={{paddingLeft:"54px"}}>:</span> <span style={{paddingLeft:"18px"}}>{this.state.unitName}</span>
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        Amount<span style={{paddingLeft:"28px"}}>:</span><span style={{paddingLeft:"20px"}}>{this.state.Amount}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        Month<span style={{paddingLeft:"38px"}}>:</span> <span style={{paddingLeft:"18px"}}>{this.state.Month}</span>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        Balance<span style={{paddingLeft:"24px"}}>:</span> <span style={{paddingLeft:"18px"}}>1500</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", float: "right", width: "100px" }}>
                    {/* <Button className="button-cancel-details"  >Save</Button> */}
                    <Button className="button-cancel-details" onClick={() => { this.onClickButton("cancel") }} >Cancel</Button>
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
    setTimeout(() => { this.setState({ success: false }); }, 3000);
  }
}
export default ProductDetail;