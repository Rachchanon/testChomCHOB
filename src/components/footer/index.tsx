import React, { CSSProperties } from "react";
import { Space } from "antd";

export const Footer: React.FC = () => {
  const iconStyle: CSSProperties = {
    fontSize: 12,
    color: "#fff",
  };
  return (
    <footer
      style={{
        backgroundColor: "#1A586A",
        color: "#fff",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <Space direction="vertical" size="large">
        <Space align="center" size="middle">
          Copyright © 2021 ChomCHOB. All Rights Reserved.
        </Space>
      </Space>
    </footer>
  );
};
