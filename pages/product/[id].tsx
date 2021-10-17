import React from "react";
import { Layout, Container, ProductDetail } from "@components";

const Product: React.FC = () => {

  return (
    <Layout>
      <Container>
        <ProductDetail />
      </Container>
    </Layout>
  );
};

export default Product;