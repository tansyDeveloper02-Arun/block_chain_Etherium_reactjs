import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import products from './apartments.json';
import { MyCommandCell } from './actioneditbutton.js';
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
        this.pageChange = this.pageChange.bind(this);
        this.state.tenant = false;
        if(this.props.location.pathname === "/all-unit-owner/grid"){
            this.state.units = "All Units";
            this.state.all_units = true
        }else{
            this.state.units = "My Units";
            this.state.all_units = false
        }

            if(this.props.location.pathname === "/tenant/apartment/grid"){
                this.state.tenant = true;
            }
    }

    lastSelectedIndex = 0;
    CommandCell;
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
        tenant: this.props,
        count: 0,
        flagdisabled: ""
    }
    CommandCell = MyCommandCell({
        editField: this.editField,
        tenant:this.state.tenant
    });


    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        return {
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
        
        const APartments_owner =  await apartment_Abi_address.methods.getApartmentOwner(this.props.location.search.slice(4)).call();
        const APartments =  await apartment_Abi_address.methods.myUnits(APartments_owner).call();
        this.state.all_accounts= account;
        this.state.apartment_owner=manager;
        this.state.contractor=contractor;
        
        this.setState({
            items: APartments.map(dataItem => Object.assign({ selected: false,city:get_APartments[this.props.location.search.slice(4)]["street"] }, dataItem)).slice(this.state.skip, this.state.skip + this.state.take),
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
            buildingName:get_APartments[this.props.location.search.slice(4)]['apartment_name']
        })
    }
    selectionChange = (event) => {
        event.dataItem.selected = !event.dataItem.selected;
        this.forceUpdate();
        const countingData = []
        for (let i = 0; i <= this.state.items.length; i++) {
            if (this.state.items[i] !== undefined) {
                if (this.state.items[i]['selected'] === true) {
                    countingData.push(this.state.items[i])
                }
            }
        }
        var counting = countingData.length;
        if (counting !== 0) {
            this.setState({
                deleteButton: true,
                count: countingData.length
            })
        } else {
            this.setState({
                deleteButton: false,
                count: 0
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
                filters: [{ field: "product", operator: "contains", value: event.target.value },
                { field: "city", operator: "contains", value: event.target.value },
                { field: "UnitsInStock", operator: "contains", value: event.target.value },
                { field: "Amount", operator: "contains", value: event.target.value },
                { field: "MaintainInventory", operator: "contains", value: event.target.value },
                { field: "Occupied", operator: "contains", value: event.target.value },
                ]
                
            })
        });
    };
    onClickButton = async (event) => {
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
        if (event === "add_new_apartment") {
            this.props.history.push("/apartment/new-unit/add")
        }
        if (event === "maintenance_close") {
            await apartment_Abi_address.methods.unitMaintainanceClose(this.state.count).call()
        }
        if (event === "maintenance_open") {
            await apartment_Abi_address.methods.unitMaintainanceOpen(this.state.count).call()
        }
    }
    onClickEditButton = () => {

        this.setState({
            flagdisabled: true
        })


    }
    render() {
        var url = "/tenant/apartment/grid" + this.props.location.search
        var url3 = "/apartment/unit/edit" + this.props.location.search

        return (
            <div>
                <div className="" style={{ margin:"16px" }}>
                    <div style={{ textAlign: "left", fontSize: "12px", color: "black" }}>
                        <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link>
                        {this.state.all_units === false ? null: 
                        <Link className="link_tag_2" to="/all-apartment/grid"><span> All Apartments</span><span className="link_tag_2_curve"></span></Link>}

                        {this.state.all_units === false ? <Link className="link_tag_2" to="/unit-owner/grid"><span> {this.state.units}</span><span className="link_tag_2_curve"></span></Link>: 
                        <Link className="link_tag_3" to="/tenant/grid"><span> {this.state.units}</span><span className="link_tag_3_curve"></span></Link>}
                        
                        {this.state.tenant === false ? null: 
                        <Link className="link_tag_3" to={url}><span> Tenants Name Grid</span><span className="link_tag_3_curve"></span></Link>}
                    </div>
                    <br/>
                    <div className="apartment_grid_toolbar_div">
                        <ExcelExport
                            data={this.state.data}
                            ref={exporter => this._export = exporter}
                        >
                            <div
                                    style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", float: "left", marginBottom:"10px", fontSize: "20px", fontWeight: "500", color: "rgba (0,0,0,0.87)" }}
                                >
                                    {this.state.all_units=== true ? 
                                    <span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.buildingName}- Apartment</span> : <span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.units}</span> }
                                {this.state.deleteButton === true ? 
                                    <label style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", marginLeft: "10px", color: "rgba (0,0,0,0.87)" }}>{this.state.count} row(s) selected</label>
                                    : null}
                                </div>
                            

                            <GridToolbar className="Grid_excel_button">
                            {this.state.search === true ? 
                            <Input
                                    className="k-textbox"
                                    onChange={this.handleChange}
                                    placeholder="search"
                                    style={{ float: "center", marginLeft: "20px",  width:"20%" }}
                                /> : null}
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

                                        >Maintenance Close
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            disabled

                                        >Maintenance Open
                                        </Link>
                                    </div> :
                                    <div>
                                    <Link
                                        className="k-button"
                                        style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                        to={url3}
                                        disabled
                                    >
                                        <span className="k-icon k-i-pencil"></span>
                                    </Link>
                                    <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            onClick={() => { this.onClickButton("maintenance_close") }}
                                            to={this.props.location.pathname + this.props.location.search}
                                        >Maintenance Close
                                        </Link>
                                        <Link
                                            className="k-button"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            onClick={() => { this.onClickButton("maintenance_open") }}
                                            to={this.props.location.pathname + this.props.location.search}
                                        >Maintenance Open
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
                                
                                
                            <button
                                    title="Add"
                                    type="button"
                                    onClick={() => { this.onClickButton("add_new_apartment") }}
                                    
                                    className="k-button role-main-Link-plus-button"
                                    style={{ float: "right",color: "#fff", backgroundColor:"#215CA0" }}
                                    disabled
                                >
                                    <span
                                        className="k-icon k-i-plus"
                                        style={{ marginLeft: "0px" }}>
                                    </span>
                                </button>
                            </div>
                            </GridToolbar>

                            <Grid
                                className="apartment_grid_data"
                                style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", fontSize: "14px", fontWeight: "400" }}
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
                                {this.state.all_units === false ? <Column field="product" title="Apartment Name" /> :null}
                                <Column field="unit_number" title="Unit #" />
                                <Column field="city" title="City" />
                                
                                <Column field="monthly_rent" title="Monthly Rent" />
                                <Column field="rented" title="Rented" />
                                <Column field="maintainance" title="Undermaintainance" />

                                 
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