import { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Card, Typography, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    const { email, password } = values;
    setLoading(true);

    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        router.push("/dashboard");
      })
      .catch((res) => {
        const { response } = res;
        const {
          data: { error },
        } = response;
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const { query } = router;
    if (query.signup) setSignup(true);
  }, [router]);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Title>Job Tracker</Title>
        <Card
          title="Login"
          style={{ minWidth: "350px" }}
          extra={
            <Link href="/signup">
              <a>or signup</a>
            </Link>
          }
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            {error ? (
              <Form.Item>
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setError("")}
                />
              </Form.Item>
            ) : null}

            {signup ? (
              <Form.Item>
                <Alert
                  message="Successfully signed up! Please login."
                  type="success"
                  showIcon
                />
              </Form.Item>
            ) : null}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
