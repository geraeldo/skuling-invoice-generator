"use client";
import React from "react";

class EditableField extends React.Component {
  handleChange = (event) => {
    const { onItemizedItemEdit, cellData } = this.props;
    onItemizedItemEdit({
      target: {
        id: cellData.id,
        name: cellData.name,
        value: event.target.value,
      },
    });
  };

  render() {
    const { cellData } = this.props;
    return (
      <input
        type={cellData.type}
        name={cellData.name}
        placeholder={cellData.placeholder}
        value={cellData.value}
        id={cellData.id}
        min={cellData.min}
        step={cellData.step}
        precision={cellData.precision}
        style={{ textAlign: cellData.textAlign || "" }}
        onChange={this.handleChange}
        className="form-control"
      />
    );
  }
}

export default EditableField;
