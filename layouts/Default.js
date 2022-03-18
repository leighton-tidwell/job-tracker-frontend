import { Layout } from "antd";
import { Nav, Footer, ContentWrapper } from "../components";

const DefaultLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Nav />
      <Layout className="site-layout">
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
