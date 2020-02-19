import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Link } from "react-router-dom";


export default function MyRoleAnchorTag(editField) {
  return class extends GridCell {
    render() {

      const ANCHOR_TAG_URL = "/detail"
      return !this.props.dataItem[editField]
        ? (
          <td>
            <Link type="text" to={ANCHOR_TAG_URL}  >
              {this.props.dataItem["ProductName"]}</Link>
          </td>
        )
        : null;
    }
  }
};
