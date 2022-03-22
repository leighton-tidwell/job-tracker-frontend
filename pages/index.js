import { Layout, Button, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { SEO } from "../components/";
import Link from "next/link";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <>
      <SEO />
      <Layout>
        <Header style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              padding: "0 1em",
            }}
          >
            Job Tracker
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/login" passHref>
              <Button
                type="primary"
                size="large"
                style={{ fontWeight: "bold" }}
                icon={<LoginOutlined />}
              >
                Login
              </Button>
            </Link>
          </div>
        </Header>
        <Content
          style={{
            minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 64px - 70px)",
              background: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "2em 0",
              background: "url(/images/hero.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
            }}
          >
            <div
              style={{
                padding: "2rem",
                width: "50%",
              }}
            >
              <Title
                style={{ fontSize: "4em", margin: 0, lineHeight: "1.2em" }}
              >
                A basic job tracker
              </Title>
              <Title level={3} style={{ margin: 0 }}>
                free to use, inspired by{" "}
                <a href="https://huntr.co/">huntr.co</a>
              </Title>
            </div>
            <div style={{ padding: "2rem", fontSize: "2em", width: "50%" }}>
              Click the{" "}
              <Link href="/login" passHref>
                <Button
                  type="primary"
                  size="large"
                  style={{ fontWeight: "bold", padding: "0 2em" }}
                  icon={<LoginOutlined />}
                >
                  Login
                </Button>
              </Link>{" "}
              button to get started
            </div>
          </div>
        </Content>
        <Footer
          style={{ textAlign: "center", background: "#001529", color: "white" }}
        >
          Job Tracker ©©{new Date().getFullYear()} Created by{" "}
          <a href="https://tdwl.dev">TDWL Development</a>
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
