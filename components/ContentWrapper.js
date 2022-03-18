import { Layout } from "antd";
const { Content } = Layout;

const ContentWrapper = ({ children }) => {
  return (
    <Content style={{ margin: "0 16px", padding: "2em" }}>{children}</Content>
  );
};

export default ContentWrapper;
