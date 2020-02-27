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

products.forEach(o => {    o.orderDate = formatDate(new Date(o.orderDate), { date: "long" });
    o.expiryDate = formatDate(new Date(o.expiryDate), { date: "long" });
    o.shippedDate = o.shippedDate === 'NULL' ? undefined : new Date(o.shippedDate);
});
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.state.searchButton= false;
        this.state.data= products.map(dataItem => Object.assign({ selected: false }, dataItem));
        this.pageChange = this.pageChange.bind(this);
        this.state.tenant = false;
        if(this.props.location.pathname === "/all-apartment/grid"){
            this.state.apartment = "All Apartments";
        }else{
            this.state.apartment = "My Apartments";
        }
        if(this.props.location.pathname === "/tenant/apartment/grid"){
            this.state.tenant = true;
            for (let i = 0; i <= products.length; i++) {
                if(products[i] !== undefined){
                    if(products[i]['ProductID'].toString() === this.props.location.search.slice(4)){
                        this.state.buildingName = products[i]['ProductName']
                    }
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
    }
    AnchorTag = MyInventoryAnchorTag("inEdit");
    createState(skip, take) {
        return {
            data: products.slice(skip, skip + take),
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
    // state = {
    //     skip: 0, take: 10,
    //     sort: [
    //         { field: '', dir: 'asc' }
    //     ],
    //     search: false,
    //     deleteButton: false,
    //     tenant: this.props,
    //     count: 0,
    //     flagdisabled: ""
    // }
    pageChange(event) {
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    
    CommandCell = MyCommandCell({
        editField: this.editField,
        tenant:this.props
    });
    selectionChange = (event) => {
        event.dataItem.selected = !event.dataItem.selected;
        this.forceUpdate();
        const countingData = []
        for (let i = 0; i <= this.state.data.length; i++) {
            if (this.state.data[i] !== undefined) {
                if (this.state.data[i]['selected'] === true) {
                    countingData.push(this.state.data[i])
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
                count: this.state.data.length
            })
        } else {
            this.setState({
                deleteButton: false,
                count: 0
            })
        }
        this.state.data.forEach(item => item.selected = checked);
        this.forceUpdate();
    }
    handleChange = (event) => {
        this.setState({
            data: filterBy(products.map(dataItem => Object.assign({ selected: false }, dataItem)), {
                logic: "or",
                filters: [{ field: "ProductName", operator: "contains", value: event.target.value },
                { field: "city", operator: "contains", value: event.target.value },
                { field: "Country", operator: "contains", value: event.target.value },
                { field: "orderDate", operator: "contains", value: event.target.value },
                { field: "Opened_units", operator: "contains", value: event.target.value },
                { field: "Rented_units", operator: "contains", value: event.target.value },
                ]
                
            })
        });
    };
    onClickButton = (event) => {
        if (event === "cancel") {
            this.setState({
                searchButton: false
            })
        }
        if (event === "search") {
            console.log("search ")
            this.setState({
                searchButton: true
            })

        }
        if (event === "add_new_apartment") {
            this.props.history.push("/apartment/grid/add")
        }
    }
    onClickEditButton = () => {
        this.setState({
            flagdisabled: true
        })
    }
    render() {
        var url = "/tenant/apartment/grid" + this.props.location.search
        console.log(this.state)
        return (
            <div>
                <div className="" style={{ margin:"16px" }}>
                    <div style={{ textAlign: "left", fontSize: "12px", color: "black" }}>
                        <Link className="link_tag" to=""><span className="k-icon k-i-pencils">H</span></Link>
                        {this.state.tenant === false ? <Link className="link_tag_2" to="/apartment/grid"><span> {this.state.apartment}</span><span className="link_tag_2_curve"></span></Link>: 
                        <Link className="link_tag_2" to="/tenant/grid"><span> Tenants</span><span className="link_tag_2_curve"></span></Link>}
                        {this.state.tenant === false ? null: 
                        <Link className="link_tag_3" to={url}><span> Tenants Name Grid</span><span className="link_tag_3_curve"></span></Link>}
                    </div>
                    <br/>
                    <div className="apartment_grid_toolbar_div">
                    <div
                                    style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", float: "left", marginBottom:"10px", fontSize: "20px", fontWeight: "500", color: "rgba (0,0,0,0.87)" }}
                                >
                                    {this.state.tenant=== true ? 
                                    <span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.buildingName}- Apartment</span> : <span className="Grid-header" style={{color:"#4285F4 !important"}}>{this.state.apartment}</span> }
                                {this.state.deleteButton === true ? 
                                    <label style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", marginLeft: "10px", color: "rgba (0,0,0,0.87)" }}>{this.state.count} row(s) selected</label>
                                    : null}
                                </div>
                                {this.state.searchButton === true ? 
                                            
                                            <Input
                                                className="search-input2"
                                                onChange={this.handleChange}
                                                placeholder="search"
                                                style={{ float: "center", marginLeft: "20px" }}
                                            />
                                        : null}
                                    {this.state.searchButton === true ? 
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
                                    </div> :
                                    <div>
                                    <Link
                                        className="k-button"
                                        style={{ float: "right", boxShadow: "none", color: "#fff", backgroundColor:"#215CA0" }}
                                        to="/apartment/grid/edit"
                                    >
                                        <span className="k-icon k-i-pencil"></span>
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
                                >
                                    <span
                                        className="k-icon k-i-plus"
                                        style={{ marginLeft: "0px" }}>
                                    </span>
                                </button>
                                </div>
            <ExcelExport
                data={products}
                ref={exporter => this._export = exporter}
            >
                    <GridToolbar  className="Grid_excel_button">
                               
                    </GridToolbar>
                    <Grid className="apartment_grid_data"
                                style={{ fontFamily: "Roboto ,Helvetica, Arial, sans-serif ", fontSize: "14px", fontWeight: "400" }}
                                data={this.state.data}
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
                                }}>
                                <Column
                                    className="check-box-color"
                                    field="selected"
                                    width="50px"
                                    marginLeft="100px"
                                    headerSelectionValue={
                                        this.state.data.findIndex(dataItem => dataItem.selected === false) === -1
                                    }
                                />
                                <Column filterable={false} cell={this.CommandCell} title="Name"/>

                                <Column field="city" title="City" />
                                <Column field="Country" title="Country" />
                                <Column field="orderDate" title="Created Date" />
                                <Column field="Opened_units" title="Opened Units" />
                                <Column field="Rented_units" title="Rented Units" />
                    
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
export default App;