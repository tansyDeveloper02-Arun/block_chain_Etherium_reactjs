import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import products from './apartments.json';
import { MyCommandCell } from './actionEditPaymentStatusbutton.js';
import { filterBy } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import MyInventoryAnchorTag from './GridAnchorTag.js';
import { formatDate } from '@telerik/kendo-intl';
// import '../../css/inventerGrid.css'
import '../../../css/inventerGrid.css'
import { Link } from "react-router-dom";
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
        for (let i = 0; i <= products.length; i++) {
            if(products[i] !== undefined){
                if(products[i]['ProductID'].toString() === this.props.location.search.slice(4)){
                    this.state.apartmentName = products[i]['ProductName']
                    this.state.unitName = products[i]['UnitsInStock']
                }
            }
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
        count: 0,
        flagdisabled: ""
    }
    CommandCell = MyCommandCell({
        editField: this.editField,
        tenant: this.props
    });
    async componentDidMount(){
        const get_APartments =  await apartment_Abi_address.methods.getApartments().call();
        const APartments_owner =  await apartment_Abi_address.methods.getApartmentOwner(this.props.match.params.id).call();
        const APartments =  await apartment_Abi_address.methods.myUnits(APartments_owner).call();

        this.setState({
            apartmentName:get_APartments[this.props.match.params.id]['apartment_name'],
            unitName:APartments[this.props.match.params.unit_id]["unit_number"]
        })
      }

    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        return {
            items: products.slice(skip, skip + take),
            total: products.length,
            skip: skip,
            pageSize: take,
            pageable: {
                buttonCount: 0,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            }
        };
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
                filters: [{ field: "Year", operator: "contains", value: event.target.value },
                { field: "Month", operator: "contains", value: event.target.value },
                { field: "Amount", operator: "contains", value: event.target.value },
                { field: "Payment_status", operator: "contains", value: event.target.value },
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
    render() {
        var url = "/apartment/detail/grid/" +this.props.match.params.id
        var url2 = "/apartment/detail/grid/details/"+this.props.match.params.id+'/' + this.props.match.params.unit_id
        return (
            <div>
                
                <div className="" style={{ margin:"16px" }}>
                    <div style={{ textAlign: "left", fontSize: "12px", color: "black" }}>
                            <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link><Link className="link_tag_2" to="/apartment/grid"><span> My Apartments</span><span className="link_tag_2_curve"></span> </Link> <Link className="link_tag_3" to={url}> <span>Apartment Units</span><span className="link_tag_3_curve"></span> </Link>
                            <Link className="link_tag_2" to={url2}><span> Payment History</span><span className="link_tag_2_curve"></span> </Link>
                        </div>
                        <br/>
                    <div className="apartment_grid_toolbar_div">
                        <ExcelExport
                            data={this.state.data}
                            ref={exporter => this._export = exporter}
                        >
                            <div
                                    style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", float: "left", marginBottom:"10px", fontSize: "20px", fontWeight: "500", color: "rgba (0,0,0,0.87)" }}
        ><span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.apartmentName}- Apartment, Unit - {this.state.unitName}</span> 
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
                                            className="k-button deleteButton"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                            disabled

                                        ><span className="k-icon k-i-pencil"></span>
                                        </button>
                                        <Link
                                            className="k-button deleteButton"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            disabled

                                        >Add Unit
                                        </Link>
                                    </div> :
                                    <div>
                                    <Link
                                        className="k-button deleteButton"
                                        style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                        to="/apartment/edit"
                                    >
                                        <span className="k-icon k-i-pencil"></span>
                                    </Link>
                                    <Link
                                            className="k-button deleteButton"
                                            style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0", padding:"2px", marginRight:"5px" }}
                                            to="/apartment/add-unit"
                                        >Add Unit
                                        </Link>
                                    </div>
                                    
                            }</div> : null}
                                {this.state.deleteButton === true ?
                                <button
                                    className="k-button deleteButton" style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
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
                                    to="#"
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
                                style={{ fontFamily: "Lato ,Arial, Franklin Gothic Book", fontSize: "14px", fontWeight: "400", boxShadow:"rgba(0, 0, 0, 0.3) 0px 0px 0px, rgba(0, 0, 0, 0.22) 0px 0px 4px"}}
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
                                <Column field="Year" title="Year" />
                                <Column field="Month" title="Month" />
                                <Column field="Amount" title="Amount" />
                                <Column field="Amount" title="Paid Amount" />
                                
                                <Column filterable={false} cell={this.CommandCell} title="Balance Amount"/>
                               
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