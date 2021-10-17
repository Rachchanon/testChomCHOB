import React from "react";
import { Layout, Container, ProductLists } from "@components";

const Home: React.FC = () => {
  return (
    <Layout>
      <Container>
        <ProductLists />
      </Container>
    </Layout>
  );
};

export default Home;
