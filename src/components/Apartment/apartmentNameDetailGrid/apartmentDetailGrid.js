import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import products from './apartments.json';
import { MyCommandCell } from './actioneditbutton.js';
import { MyCommandCell2 } from './actionAnchorTagButton';
import { filterBy } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import MyInventoryAnchorTag from './GridAnchorTag.js';
import { formatDate } from '@telerik/kendo-intl';
// import '../../css/inventerGrid.css'
import '../../../css/inventerGrid.css'
import { Link } from "react-router-dom";
import web3 from '../../../web3';
import apartment_Abi_address from '../../../lottery';

products.forEach(o => {
    o.orderDate = formatDate(new Date(o.orderDate), { date: "long" });
    o.expiryDate = formatDate(new Date(o.expiryDate), { date: "long" });
    o.shippedDate = o.shippedDate === 'NULL' ? undefined : new Date(o.shippedDate);
});
class Apartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.state.search= false;
        this.state.selected_unit_id = [];
        this.pageChange = this.pageChange.bind(this);

        if(this.props.location.pathname === "/tenant/apartment/detail/grid"){
            this.state.tenant = true;
        }else{
            this.state.tenant = false;
        }
       
    }

    lastSelectedIndex = 0;
    CommandCell;
    CommandCell2;
    AnchorTag;
    _export;
    export = () => {
        this._export.save();
        this.setState({
            search: false
        })
    }
    AnchorTag = MyInventoryAnchorTag("inEdit");
    state = {
        data: products.map(dataItem => Object.assign({ selected: false }, dataItem)),
        skip: 0, take: 10,
        sort: [
            { field: '', dir: 'asc' }
        ],
        search: false,
        deleteButton: false,
        count: 0,
        flagdisabled: ""
    }
    CommandCell = MyCommandCell({
        editField: this.editField,
        tenant:this.props
    });
    CommandCell2 = MyCommandCell2({
        editField: this.editField,
        tenant:this.props
    });
    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }
    createState(skip, take) {
        return {
            // items: products.slice(skip, skip + take),
            items: [],
            total: products.length,
            skip: skip,
            pageSize: take,
            take:take,
            pageable: {
                buttonCount: 0,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            }
        };
    }
    async componentDidMount(){
        const account = await web3.eth.personal.getAccounts();
        const contractor =  apartment_Abi_address.options.address;
        const manager =  await apartment_Abi_address.methods.contractOwnerAddress().call()
        const get_APartments =  await apartment_Abi_address.methods.getApartments().call();
       
        const APartments_owner =  await apartment_Abi_address.methods.getApartmentOwner(this.props.match.params.id).call();
        const APartments =  await apartment_Abi_address.methods.myUnits(APartments_owner).call();
        this.state.all_accounts= account;
        this.state.apartment_owner=manager;
        this.state.contractor=contractor;
        
        this.setState({
            items: APartments.map(dataItem => Object.assign({ selected: false }, dataItem)).slice(this.state.skip, this.state.skip + this.state.take),
            all_accounts:account,
            apartment_owner:manager,
            contractor:contractor,
            total: APartments.length,
            pageSize: this.state.take,
            pageable: {
                buttonCount: 0,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            },
            apartmentName:get_APartments[this.props.match.params.id]['apartment_name']
        })
    }
    selectionChange = (event) => {
        event.dataItem.selected = !event.dataItem.selected;
        
        this.forceUpdate();
        const countingData = []
        const Unit_id = []
        for (let i = 0; i <= this.state.items.length; i++) {
            if (this.state.items[i] !== undefined) {
                if (this.state.items[i]['selected'] === true) {
                    countingData.push(this.state.items[i])
                    Unit_id.push(this.state.items[i]['unit_id'])
                }
            }
        }


        var counting = countingData.length;
        if (counting !== 0) {
            this.setState({
                deleteButton: true,
                count: countingData.length,
                selected_unit_id:Unit_id[0],
                unit_owner_address:countingData[0]['unit_owner']
            })
        } else {
            this.setState({
                deleteButton: false,
                count: 0,
                selected_unit_id:[],
                unit_owner_address:[]
            })
        }
    }

    rowClick = (event) => {
        let last = this.lastSelectedIndex;
        
        const current = this.state.data.findIndex(dataItem => dataItem === event.dataItem);
        
        if (!event.nativeEvent.shiftKey) {
            this.lastSelectedIndex = last = current;
        }

        if (!event.nativeEvent.ctrlKey) {
            this.state.data.forEach(item => item.selected = false);
        }
        const select = !event.dataItem.selected;
        for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
            const productData = this.state.data[i]
            productData.selected = select;
        }
        this.forceUpdate();
    }
    enterEdit = (dataItem) => {
        this.setState({
            data: this.state.data.map(item =>
                item._id === dataItem._id ?
                    { ...item, inEdit: true } : item
            )
        });
    }
    headerSelectionChange = (event) => {
        const checked = event.syntheticEvent.target.checked;
        
        if (checked === true) {
            this.setState({
                deleteButton: true,
                count: this.state.items.length
            })
        } else {
            this.setState({
                deleteButton: false,
                count: 0
            })
        }
        this.state.items.forEach(item => item.selected = checked);
        
        this.forceUpdate();
    }
    handleChange = (event) => {
        this.setState({
            items: filterBy(products.map(dataItem => Object.assign({ selected: false }, dataItem)), {
                logic: "or",
                filters: [{ field: "Payment_status", operator: "contains", value: event.target.value },
                { field: "floor", operator: "contains", value: event.target.value },
                { field: "Discontinued", operator: "contains", value: event.target.value },
                { field: "Amount", operator: "contains", value: event.target.value }
                ]
                
            })
        });
    };
    onClickButton = (event) => {
        if (event === "cancel") {
            this.setState({
                search: false
            })
        }
        if (event === "search") {
            this.setState({
                search: true
            })

        }
    }
    onClickEditButton = () => {
        this.setState({
            flagdisabled: true
        })
    }
    
    vacateSubmit = async (event) => {
        
        await apartment_Abi_address.methods.vacateTenant(this.props.match.params.id,this.state.selected_unit_id[0])
        .send({
            from:this.state.unit_owner_address, 
            gas:3000000
          });
        const APartments_owner_after_vacate_submit =  await apartment_Abi_address.methods.getApartmentOwner(this.props.match.params.id).call();
        const APartments_after_vacate_submit =  await apartment_Abi_address.methods.myUnits(APartments_owner_after_vacate_submit).call();
        this.setState({
            items: APartments_after_vacate_submit.map(dataItem => Object.assign({ selected: false }, dataItem)).slice(this.state.skip, this.state.skip + this.state.take)
        })
    }
    render() {
        var url1 = "/apartment/detail/grid/" + this.props.match.params.id
        var url = "/tenant/apartment/grid" + this.props.location.search
        var url2 = "/tenant/apartment/detail/grid" + this.props.location.search
        var url3 = "/apartment/unit/edit" + this.props.location.search
        var url4 = "/apartment/assign-unit/" + this.props.match.params.id+"/"+ this.state.selected_unit_id
        var url5 = "/apartment/assign-tenant/" + this.props.match.params.id+"/"+ this.state.selected_unit_id
        var url6 = "/apartment/new-unit/add/" + this.props.match.params.id

        return (
            <div>
                <div className="" style={{ margin:"16px" }}>
                <div style={{ textAlign: "left", fontSize: "12px", color: "black" }}>
                        <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link>
                        
                        {this.state.tenant === false ? <Link className="link_tag_2" to="/apartment/grid"><span> My Apartments</span><span className="link_tag_2_curve"></span></Link>: 
                        <Link className="link_tag_2" to="/tenant/grid"><span> Tenants</span><span className="link_tag_2_curve"></span></Link>}
                        
                        {this.state.tenant === false ? null: 
                        <Link className="link_tag_3" to={url}><span> Tenants Name Grid</span><span className="link_tag_3_curve"></span></Link>}
                        
                        {this.state.tenant === false ? <Link className="link_tag_3" to={url1}> <span>Apartment Units</span><span className="link_tag_3_curve"></span> </Link>: 
                        <Link className="link_tag_2" to={url2}><span> Tenants Name Details Grid</span><span className="link_tag_2_curve"></span></Link>}
                    </div>
                    <br/>
                    <div className="apartment_grid_toolbar_div">
                        <ExcelExport
                            data={this.state.data}
                            ref={exporter => this._export = exporter}
                        >
                            <div
                                    style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", float: "left", marginBottom:"10px", fontSize: "20px", fontWeight: "500", color: "rgba (0,0,0,0.87)" }}
        ><span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.apartmentName}- Apartment</span> 
                                {this.state.deleteButton === true ? 
                                    <label style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", marginLeft: "10px", color: "rgba (0,0,0,0.87)" }}>{this.state.count} row(s) selected</label>
                                    : null}
                                </div>
                            

                            <GridToolbar className="Grid_excel_button">
                            {this.state.search === true ? 
                                    
                                    <Input
                                        className="search-input2"
                                        onChange={this.handleChange}
                                        placeholder="search"
                                        style={{ float: "center", marginLeft: "20px" }}
                                    />
                                 : null}
                            {this.state.search === true ? 
                                <button
                                className="k-button"
                                name="hello"
                                onClick={() => { this.onClickButton("cancel") }}
                                style={{ float: "center", boxShadow: "none", color: "#586069",position: "relative", padding: '0px',
                                backgroundColor: "#efefef", border: "none", marginLeft:"-25px" }}
                            >X
                            </button> : null}
                            <div style={{display:"flex", float: "right"}}>
                                
                                
                                
                                 {this.state.deleteButton === true ? 
                                 <div>
                                {this.state.count > 1 ? 
                                    <div className="editDiv">
                                        <button
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                            disabled

                                        ><span className="k-icon k-i-pencil"></span>
                                        </button>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            disabled
                                            to="#"
                                        >Assign Unit
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            disabled
                                            to="#"
                                        >Assign Tenant
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            to="#"
                                            disabled
                                        >Vacate Tenant
                                        </Link>
                                    </div> :
                                    <div>
                                    <Link
                                        className="k-button"
                                        style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                        to={url3}
                                    >
                                        <span className="k-icon k-i-pencil"></span>
                                    </Link>
                                    <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            to={url4}
                                        >Assign Unit
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            to={url5}
                                        >Assign Tenant
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            to="#"
                                            onClick={this.vacateSubmit}
                                        >Vacate Tenant
                                        </Link>
                                    </div>
                                    
                            }</div> : null}
                                {this.state.deleteButton === true ?
                                <button
                                    className="k-button" style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                >
                                    <span className="k-icon k-i-delete " ></span>
                                </button>
                                
                                : null
                                }
                                 <button
                                    title="Search"
                                    className="k-button"
                                    onClick={() => { this.onClickButton("search") }}
                                    style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                >
                                    <span className="k-icon k-i-zoom k-i-search"></span>
                                </button>
                                <button
                                    title="Export PDF"
                                    className="k-button"
                                    onClick={this.export}
                                    style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                >
                                    <span className="k-icon k-i-download"></span>
                                </button>
                                <button
                                    title="Print"
                                    className="k-button"
                                    onClick={this.export}
                                    style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                >
                                    <span className="k-icon k-i-print "></span>
                                </button>
                                
                                
                            <Link
                                    title="Add"
                                    type="button"
                                    to={url6}
                                    className="k-button role-main-Link-plus-button"
                                    style={{ float: "right",color: "#fff", backgroundColor:"#215CA0" }}
                                >
                                    <span
                                        className="k-icon k-i-plus"
                                        style={{ marginLeft: "0px" }}>
                                    </span>
                                </Link>
                            </div>
                            </GridToolbar>

                            <Grid
                                className="apartment_grid_data"
                                style={{ fontFamily: "Lato ,Arial, Franklin Gothic Book", fontSize: "14px", fontWeight: "400" }}
                                data={this.state.items}
                                // data={orderBy(this.state.data.slice(this.state.skip, this.state.take + this.state.skip), this.state.sort)}
                                skip={this.state.skip}
                                selectedField="selected"
                                onSelectionChange={this.selectionChange}
                                onHeaderSelectionChange={this.headerSelectionChange}
                                take={this.state.take}
                                total={this.state.total}
                                // total={this.state.data.length}
                                // pageable={true}
                                pageable={this.state.pageable}
                                pageSize={this.state.pageSize}
                                onPageChange={this.pageChange}
                                sortable={true}
                                sort={this.state.sort}
                                onSortChange={(e) => {
                                    this.setState({
                                        sort: e.sort
                                    });
                                }}
                            >   
                                <Column
                                    className="check-box-color"
                                    field="selected"
                                    width="50px"
                                    marginLeft="100px"
                                    headerSelectionValue={
                                        this.state.items.findIndex(dataItem => dataItem.selected === false) === -1
                                    }
                                />
                                <Column filterable={false} cell={this.CommandCell2} title="Unit #"/>
                                <Column field="floor" title="Floor" />
                                <Column field="rented" title="Occupied" />
                                {/* <Column field="address" title="Tenant Address" /> */}
                                <Column filterable={false} cell={this.CommandCell} title="Monthly Rent"/>
                                {/* <Column field="Inventory" title="Inventory" /> */}
                                 
                            </Grid>
                        </ExcelExport>

                    </div>
                    <footer className="footer-grid" style={{ textAlign: "center" }}>
                        <hr />
                        &copy; Copyright  {new Date().getFullYear()} All rights reserved
    </footer>

                </div >

            </div>
        );
    }
}
export default Apartment;