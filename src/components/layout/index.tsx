import React from "react";
import { Header, Footer } from "@components";

export const Layout: React.FC = ({children}) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", minWidth: '1186px', overflow: 'hidden'}} >
      <Header />
      <main style={{ minHeight: "calc(100vh - 130px)" }}>
      {children}
      </main>
      <Footer />
    </div>
  );
};