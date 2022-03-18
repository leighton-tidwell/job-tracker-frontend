import { useState } from "react";
import { Layout } from "antd";
import { Nav, Footer, ContentWrapper } from "../components";

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Nav collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          width: collapsed ? "calc(100vw - 80px)" : "calc(100vw - 200px)",
          overflow: "auto",
        }}
      >
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
