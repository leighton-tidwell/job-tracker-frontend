import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Job Tracker ©{new Date().getFullYear()} Created by{" "}
      <a href="https://tdwl.dev">TDWL Development</a>
    </AntFooter>
  );
};

export default Footer;
