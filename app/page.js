import React from "react";
import Container from "react-bootstrap/Container";
import InvoiceForm from "../components/InvoiceForm";

export default function Home() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceForm />
      </Container>
    </div>
  );
}
