import React from "react";
import '../../../css/header.css';
import '../../../css/Productdetail.css';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList, ComboBox } from '@progress/kendo-react-dropdowns';
// import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';
// import { Upload } from '@progress/kendo-react-upload';
import { ImageUpload } from "../../imageUpload";

import { Link } from "react-router-dom";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      value: new Date()
    };
  }
  type=["Goods","Service"]
  inventory=["Finished goods","inventory asset","Work in progress"]
  purchase=["Advetising and marketing","Automobile expenses","Bad debt","bank fees and charges","Consult expenses","contract assets","salaries and employee wages","internet expenses","other expenses"]
  sizes = ["Discount", "income", "general income", "interest income","late fee income","other charges","sales","Shipping charge"];
  render() {
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
            <Link>Inventory</Link> > <Link>Product</Link> > <Link to="/home/product/grid">Grid</Link> > Detail
          </div>
        </div>

        <div className="row example-wrapper row_setting">
        <div className="col-xs-1 col-sm-1 col-md-1">

        </div>
        <div className="col-xs-10 col-sm-10 col-md-6">
            <div className="" style={{ textAlign:"left"}}>
              <div className="card-block">
                <form className="k-form detail_form" autocomplete="off" onSubmit={this.handleSubmit} style={{ color: "#333" }}>

                  <fieldset autocomplete="off" className="fieldset_line">
                    
                    <div class="section__header">
                      <h2 class="section__title">
                        Product
                      </h2>
                    </div>
                    {/* <ImageUpload /> */}
                    <div className="col-xs-12 col-sm-12 example-col" style={{ paddingLeft:"0px"}}>
                      <p style={{ lineHeight: '2.5em' }}>
                        <input type="checkbox" id="c1" className="k-checkbox" />
                        <label className="k-checkbox-label" htmlFor="c1">Active</label><br />
                      </p>
                    </div>
                    <div className="mb-3" >
                      <DropDownList data={this.type} required label="Type" style={{ width: '100%' }} />
                    </div>

                    <div className="mb-3">
                      <Input
                        name="username"
                        style={{ width: "100%" }}
                        label="Name"
                        // placeholder="First Name"
                        pattern={"[A-Za-z]+"}
                        minLength={2}
                        required
                      />
                    </div>
                    <div className="mb-3" >
                      <ComboBox  label="Manufacturer" style={{ width: '100%' }} required/>
                    </div>

                    <div className="mb-3" >
                      <DropDownList label="Brand" style={{ width: '100%' }} required/>
                    </div>
                    <div class="section__header">
                      <h2 class="section__title">
                        Measure
                      </h2>
                    </div>
                    <div className="mb-3" >
                      <DropDownList label="Unit of Measure" style={{ width: '100%' }} />
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Weight (kg)"
                        style={{ width: '100%' }}
                        label="Weight (kg)"
                        autocomplete="nope"
                      />
                    </div>
                    {/* <div className="mb-3">
                      <Input
                        name="SKU"
                        style={{ width: '100%' }}
                        label="SKU"
                        autocomplete="nope"
                        
                      />
                    </div> */}
                    {/* <div className="mb-3">
                      <Input
                        name="UNIT"
                        style={{ width: '100%' }}
                        label="UNIT"
                        
                        autocomplete="nope"
                      />
                    </div> */}
                    {/* <div className="col-xs-12 col-sm-12 example-col">
                      <p style={{ lineHeight: '2.5em' }}>
                        <input type="checkbox" id="c1" className="k-checkbox" />
                        <label className="k-checkbox-label" htmlFor="c1">Returnable Item</label><br />
                      </p>
                    </div> */}
                          
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Dimensions (cm) (Length X Width X Height)"
                        autocomplete="nope"
                      />
                    </div>
                    <div class="section__header">
                      <h2 class="section__title">
                       Sales
                      </h2>
                    </div>
                    <div className="col-xs-12 col-sm-12 example-col" style={{ paddingLeft:"0px"}}>
                      <p style={{ lineHeight: '2.5em' }}>
                        <input type="checkbox" id="c1" className="k-checkbox" />
                        <label className="k-checkbox-label" htmlFor="c1">Returnable Item</label><br />
                      </p>
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Selling Price"
                        autocomplete="nope"
                      />
                    </div>
                    
                    <div className="mb-3" >
                      <DropDownList data={this.sizes} label="Sales Account" style={{ width: '100%' }} />
                    </div>
                    
                    <div class="section__header">
                      <h2 class="section__title">
                       Inventory
                      </h2>
                    </div>
                    <div className="col-xs-12 col-sm-12 example-col" style={{ paddingLeft:"0px"}}>
                            <p style={{ lineHeight: '2.5em' }}>
                              <input type="checkbox" id="c2" className="k-checkbox" />
                              <label className="k-checkbox-label" htmlFor="c2">Track Inventory for this item</label><br />
                            </p>
                          </div>
                          <div className="mb-3" >
                      <DropDownList data={this.inventory} label="Inventory Account" style={{ width: '100%' }} />
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Opening Stock"
                        autocomplete="nope"
                      />
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Reorder Point"
                        autocomplete="nope"
                      />
                    </div>
                    <div class="section__header">
                      <h2 class="section__title">
                       Service Reminder
                      </h2>
                    </div>
                    <div className="row" style={{paddingLeft:"0px"}}>
                    <div className="col-md-6">
 
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Start Reminder After"
                        autocomplete="nope"
                      /> 
               </div>
                      
                 <span className="col-md-2"style={{marginTop:"20px"}}>Months</span><br />
                    </div>
                    <div className="row" style={{paddingLeft:"0px"}}>
                    <div className="col-md-6">
 
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Stop Reminder After"
                        autocomplete="nope"
                      /> 
               </div>
                      
                 <span className="col-md-2" style={{marginTop:"20px"}}>Months</span><br />
                    </div>

                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="Count"
                        autocomplete="nope"
                      />
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="SMS Text"
                        autocomplete="nope"
                      />
                    </div>
                    <div className="mb-3">
                      <Input
                        name="Dimensions"
                        style={{ width: '100%' }}
                        label="EMAIL Text"
                        autocomplete="nope"
                      />
                    </div>


                    <div class="section__header">
                      <h2 class="section__title">
                       Custom Fields
                      </h2>
                    </div>
                  </fieldset>
                  <div style={{ display: "flex", float: "right", width: "100px" }}>
                    <Button class="button-save-details" >Save</Button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div className="col-xs-12 col-sm-12 col-md-5"style={{ textAlign:'center'}}>
                  <ImageUpload/>
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