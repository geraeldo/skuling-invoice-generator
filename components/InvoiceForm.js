"use client";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: "Rp",
      invoiceNumber: new Date()
        .toISOString()
        .slice(2, 16)
        .replace(/[-T:]/g, ""),
      dateOfIssue: new Date().toISOString().split("T")[0],
      billTo: "PT Cerdaskan Penerus Bangsa (Skuling)",
      billToEmail: "finance@skuling.id",
      billToAddress:
        "Jl. Garuda Gg. Rajawali, No. 205, Tahunan, Umbulharjo, Yogyakarta, DI Yogyakarta, 55167",
      billFrom: "",
      billFromEmail: "",
      billFromAddress: "",
      nikNpwp: "",
      notes: "",
      nomorHp: "",
      total: "0",
      subTotal: "0",
      taxRate: "",
      taxAmmount: "0",
      discountRate: "",
      discountAmmount: "0",
      items: [
        {
          id: 0,
          name: "",
          description: "",
          price: "10000",
          quantity: 1,
        },
      ],
    };
  }

  componentDidMount() {
    this.handleCalculateTotal();
  }

  handleRowDel = (item) => {
    const items = this.state.items.filter((i) => i !== item);
    this.setState({ items }, this.handleCalculateTotal);
  };

  handleAddEvent = (evt) => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: "",
      price: "10000",
      description: "",
      quantity: 1,
    };
    const items = [...this.state.items, newItem];
    this.setState({ items }, this.handleCalculateTotal);
  };

  handleCalculateTotal = () => {
    const items = this.state.items;
    let subTotal = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
      0
    );

    subTotal = subTotal;

    const taxAmmount = subTotal * (this.state.taxRate / 100);
    const discountAmmount = subTotal * (this.state.discountRate / 100);

    const total = subTotal - discountAmmount + parseFloat(taxAmmount);

    this.setState({
      subTotal: subTotal,
      taxAmmount: taxAmmount,
      discountAmmount: discountAmmount,
      total: total,
    });
  };

  onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const updatedItems = this.state.items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    this.setState({ items: updatedItems }, this.handleCalculateTotal);
  };

  editField = (event) => {
    const { name, value } = event.target;
    // If the field is either 'nikNpwp' or 'nomorHp', ensure the value is numeric
    if (name === "nikNpwp" || name === "nomorHp") {
      if (!/^\d*$/.test(value)) {
        return; // Do not update state if the value contains non-numeric characters
      }
    }
    this.setState(
      {
        [name]: value,
      },
      this.handleCalculateTotal
    );
  };

  onCurrencyChange = (event) => {
    this.setState({ currency: event.target.value });
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };

  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <Form onSubmit={this.openModal}>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column mb-3 mb-md-0">
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">
                      Invoice&nbsp;Date:
                    </span>
                    <Form.Control
                      type="date"
                      value={this.state.dateOfIssue}
                      name="dateOfIssue"
                      onChange={this.editField}
                      style={{ maxWidth: "150px" }}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">
                    Invoice&nbsp;Number:&nbsp;
                  </span>
                  <Form.Control
                    value={this.state.invoiceNumber}
                    name="invoiceNumber"
                    onChange={this.editField}
                    min="1"
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5">
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder="Who is this invoice to?"
                    rows={3}
                    value={this.state.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder="Email address"
                    value={this.state.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder="Billing address"
                    value={this.state.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={this.editField}
                    required
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder="Nama sesuai KTP"
                    rows={3}
                    value={this.state.billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder="Alamat email"
                    value={this.state.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder="Alamat sesuai KTP"
                    value={this.state.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={this.editField}
                    required
                  />
                  <Form.Control
                    placeholder="Nomor NIK/NPWP"
                    value={this.state.nikNpwp}
                    type="text"
                    name="nikNpwp"
                    className="my-2"
                    onChange={this.editField}
                    required
                  />
                  <Form.Control
                    placeholder="Nomor HP"
                    value={this.state.nomorHp}
                    type="text"
                    name="nomorHp"
                    className="my-2"
                    onChange={this.editField}
                    required
                  />
                </Col>
              </Row>
              <InvoiceItem
                onItemizedItemEdit={this.onItemizedItemEdit}
                onRowAdd={this.handleAddEvent}
                onRowDel={this.handleRowDel}
                currency={this.state.currency}
                items={this.state.items}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6} className="col-12">
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {this.state.currency}
                      {this.state.subTotal}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">
                      {this.state.currency}
                      {this.state.total || 0}
                    </span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Row className="mt-4">
                <Col>
                  <div className="bg-light p-3 border rounded">
                    <p className="text-center fs-5 fw-bold">
                      Akan ditransfer sebesar{" "}
                      {this.state.currency.toLocaleString("id-ID")}
                      {Math.ceil(
                        parseFloat(this.state.total) * 0.975
                      ).toLocaleString("id-ID")}{" "}
                      setelah pemotongan pajak 2,5%
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={4} lg={3} className="col-12">
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="d-block w-100">
                Review Invoice
              </Button>
              <InvoiceModal
                showModal={this.state.isOpen}
                closeModal={this.closeModal}
                info={this.state}
                items={this.state.items}
                currency={this.state.currency}
                subTotal={this.state.subTotal}
                taxAmmount={this.state.taxAmmount}
                discountAmmount={this.state.discountAmmount}
                total={this.state.total}
              />
              <Form.Group className="mb-3 mt-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  value={this.state.currency}
                  onChange={this.onCurrencyChange}
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="Rp">Rupiah</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InvoiceForm;
