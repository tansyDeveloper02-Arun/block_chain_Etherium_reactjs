import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Link } from "react-router-dom";
export function MyCommandCell({ editField, tenant }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            var UPDATE_URL = "/apartment/detail/grid/" + this.props.dataItem.id
            if(tenant.location.pathname ==="/tenant/apartment/grid"){
                UPDATE_URL = "/tenant/apartment/detail/grid?id=" + this.props.dataItem.id
            }
            if(tenant.location.pathname ==="/all-apartment/grid"){
                UPDATE_URL = "/all-unit-owner/grid?id=" + this.props.dataItem.id
            }
            return inEdit ? null : (<td className="">
                <Link 
                    to={UPDATE_URL}
                    title="Edit"
                    className="anchor_tag"
                    style={{ padding: "0px" }}>
                    {this.props.dataItem.apartment_name}
                </Link>
            </td >
            );
        }
    }
};
