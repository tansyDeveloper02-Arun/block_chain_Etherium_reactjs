import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Link } from "react-router-dom";
export function MyCommandCell({ editField, tenant }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            var UPDATE_URL = "/apartment/detail/lease/" + tenant.match.params.id + "/" + this.props.dataItem.unit_id

            if(tenant.location.pathname ==="/tenant/apartment/detail/grid"){
                UPDATE_URL = "/tenant/apartment/detail/grid/details/Payment?id=" + this.props.dataItem.unit_id 
            }
            return inEdit ? null : (<td className="">
                <Link 
                    to={UPDATE_URL}
                    title="Edit"
                    className="anchor_tag"
                    style={{ padding: "0px" }}>
                    {this.props.dataItem.monthly_rent}
                </Link>
            </td >
            );
        }
    }
};
