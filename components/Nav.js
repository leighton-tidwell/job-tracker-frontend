import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";
import {
  PushpinFilled,
  ContactsOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const logout = () => {
    axios
      .post("/api/auth/logout")
      .then((res) => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div
        style={{
          height: "32px",
          margin: "16px",
          color: "white",
          fontWeight: "bold",
          textAlign: collapsed ? "center" : "left",
          fontSize: collapsed ? "1.5rem" : "1rem",
          transition: "all 0.3s ease",
        }}
      >
        <PushpinFilled /> {!collapsed && "Job Tracker"}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Job Board
        </Menu.Item>
        <Menu.Item key="2" icon={<ContactsOutlined />}>
          Contacts
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          style={{
            fontWeight: "bold",
            position: "absolute",
            bottom: "calc(48px + 1em)",
          }}
          onClick={logout}
        >
          Log out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Nav;
