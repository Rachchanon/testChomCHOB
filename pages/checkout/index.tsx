import React from "react";
import { Layout, Container, ProductCheckout } from "@components";

const Checkout: React.FC = () => {

  return (
    <Layout>
      <Container>
        <ProductCheckout />
      </Container>
    </Layout>
  );
};

export default Checkout;