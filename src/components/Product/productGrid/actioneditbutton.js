import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Link } from "react-router-dom";
export function MyCommandCell({ editField }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;

            const inEdit = dataItem[editField];
            const UPDATE_URL = "/home/update-role?id=" + this.props.dataItem.ProductID
            return inEdit ? null : (<td className="">
                <Link 
                    to={UPDATE_URL}
                    title="Edit"
                    className=""
                    style={{ padding: "0px" }}>
                    {this.props.dataItem.Amount}
                </Link>
            </td >
            );
        }
    }
};
