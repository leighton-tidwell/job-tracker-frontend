import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";
import {
  PushpinFilled,
  ContactsOutlined,
  DashboardOutlined,
  LogoutOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const nav = [
  {
    id: "job-board",
    title: "Job Board",
    icon: <DashboardOutlined />,
    href: "/dashboard",
  },
  {
    id: "contacts",
    title: "Contacts",
    icon: <ContactsOutlined />,
    href: "/dashboard/contacts",
  },
  {
    id: "activities",
    title: "Activities",
    icon: <FieldTimeOutlined />,
    href: "/dashboard/activities",
  },
];

const Nav = ({ collapsed, setCollapsed }) => {
  const [defaultKey, setDefaultKey] = useState("job-board");
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

  useEffect(() => {
    const { pathname } = router;
    const navItem = nav.find((item) => item.href === pathname);
    setDefaultKey(navItem.id);
  }, [router]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 2,
      }}
    >
      <div
        style={{
          height: "32px",
          margin: "16px",
          color: "white",
          fontWeight: "bold",
          textAlign: collapsed ? "center" : "left",
          fontSize: "1rem",
          transition: "all 0.3s ease",
        }}
      >
        <PushpinFilled /> {!collapsed && "Job Tracker"}
      </div>
      <Menu theme="dark" selectedKeys={[defaultKey]} mode="inline">
        {nav.map((item) => (
          <Menu.Item key={item.id} icon={item.icon}>
            <Link href={item.href} passHref>
              {item.title}
            </Link>
          </Menu.Item>
        ))}
        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          style={{
            fontWeight: "bold",
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
