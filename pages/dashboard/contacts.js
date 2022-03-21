import { useEffect, useState } from "react";
import { Typography, Card, Button, Avatar, Spin } from "antd";
import {
  PlusOutlined,
  CompassOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { AddContactModal } from "../../components";
import axios from "axios";
import DefaultLayout from "../../layouts/Default";

const { Title, Text, Link: AntLink } = Typography;

const ContactTitle = ({ contact }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "1em", flexGrow: 1 }}
    >
      <Avatar size={40}>{contact.name.slice(0, 1)}</Avatar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title
          ellipsis={{ tooltip: contact.name }}
          style={{ margin: 0, width: 130 }}
          level={4}
        >
          {contact.name}
        </Title>
        <Text
          ellipsis={{ tooltip: contact.position }}
          style={{ fontWeight: "400", width: 130 }}
        >
          {contact.position || "none"}
        </Text>
        <Text
          ellipsis={{ tooltip: contact.company }}
          style={{ lineHeight: ".8em", fontWeight: "400", width: 130 }}
        >
          {contact.company || "none"}
        </Text>
      </div>
    </div>
  );
};

const ContactBody = ({ contact }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Text>
        <CompassOutlined /> {contact.location || "none"}
      </Text>
      <Text>
        <MailOutlined />{" "}
        <AntLink href={contact.email && `mailto:${contact.email}`}>
          {contact.email || "none"}
        </AntLink>
      </Text>
      <Text>
        <PhoneOutlined />{" "}
        <AntLink href={contact.phone && `tel:${contact.phone}`}>
          {contact.phone || "none"}
        </AntLink>
      </Text>
    </div>
  );
};

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddContact = (contact) =>
    new Promise((resolve, reject) => {
      axios
        .post("/api/users/contact", contact)
        .then((data) => {
          setContacts((prevContacts) => [data.data, ...prevContacts]);
          resolve();
        })
        .catch((error) => reject(error));
    });

  useEffect(() => {
    axios
      .get("/api/users/contacts")
      .then((data) => {
        setContacts(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <DefaultLayout>
      <div
        style={{ marginBottom: "1em", display: "flex", alignItems: "center" }}
      >
        <Title level={2} style={{ margin: 0, padding: 0, flexGrow: 1 }}>
          Contacts
        </Title>
        <div>
          <AddContactModal onAccept={handleAddContact} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <div
          className="contacts-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1em",
          }}
        >
          {loading ? (
            <div
              style={{
                gridColumn: "span 5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : contacts.length === 0 ? (
            <Card className="contact-item" title="No contacts">
              You currently have no contacts, click <b>add contact</b> to add
              one!
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card
                className="contact-item"
                title={<ContactTitle contact={contact} />}
                key={contact.id}
              >
                <ContactBody contact={contact} />
              </Card>
            ))
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Contacts;

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies["auth-token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const { data } = await axios.get(`${process.env.API}/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        user: {
          id: data.id,
          email: data.username,
        },
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
