"use client";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function (item) {
      return (
        <ItemRow
          onItemizedItemEdit={onItemizedItemEdit}
          item={item}
          onDelEvent={rowDel.bind(this)}
          key={item.id}
          currency={currency}
        />
      );
    });

    return (
      <div className="container">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>ITEM</th>
              <th className="text-center">QTY</th>
              <th className="text-center">PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>{itemTable}</tbody>
        </Table>
        <Button className="fw-bold mt-3" onClick={this.props.onRowAdd}>
          Add Item
        </Button>
      </div>
    );
  }
}

class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{ width: "100%" }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Nama item/service",
              value: this.props.item.name,
              id: this.props.item.id,
            }}
          />
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "description",
              placeholder: "Deskripsi item/service",
              value: this.props.item.description,
              id: this.props.item.id,
            }}
          />
        </td>
        <td style={{ minWidth: "70px" }} className="text-center">
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }}
          />
        </td>
        <td style={{ minWidth: "100px" }} className="text-center">
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 1,
              step: "1",
              presicion: 2,
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }}
          />
        </td>
        <td className="text-center" style={{ minWidth: "50px" }}>
          <BiTrash
            onClick={this.onDelEvent.bind(this)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          />
        </td>
      </tr>
    );
  }
}

export default InvoiceItem;
