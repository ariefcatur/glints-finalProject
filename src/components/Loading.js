import React from "react";
import { Container, Spinner } from "reactstrap";

export default function Loading() {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Spinner
        type="grow"
        style={{ width: "4rem", height: "4rem", color: "#8F48EA" }}
      />
    </Container>
  );
}
