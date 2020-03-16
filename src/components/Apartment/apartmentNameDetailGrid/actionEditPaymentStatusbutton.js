import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Link } from "react-router-dom";
export function MyCommandCell({ editField,tenant }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            const UPDATE_URL = "/apartment/detail/grid/details/Payment/" + tenant.match.params.id + "/" + tenant.match.params.unit_id
            return inEdit ? null : (<td className="">
                {this.props.dataItem.Payment_status !== "Paid" ? <Link 
                    to={UPDATE_URL}
                    title="Edit"
                    className="anchor_tag"
                    style={{ padding: "0px", textDecoration:"none" }}>
                    {this.props.dataItem.Payment_status}
                </Link>
                :
                <label 
                    to={UPDATE_URL}
                    title="Edit"
                    // className="anchor_tag"
                    style={{ padding: "0px" }}>
                    {this.props.dataItem.Payment_status}
                </label>}
                
            </td >
            );
        }
    }
};
