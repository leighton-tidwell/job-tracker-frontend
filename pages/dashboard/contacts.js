import axios from "axios";
import DefaultLayout from "../../layouts/Default";
import { Typography, Card, Button, Avatar } from "antd";
import {
  PlusOutlined,
  CompassOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text, Link: AntLink } = Typography;

const contacts = [
  {
    id: 1,
    name: "Jane Doe",
    position: "CEO",
    company: "Company",
    location: "New York",
    email: "testemail@temail.com",
    phone: "1234567890",
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "CEO",
    company: "Company",
    location: "New York",
    email: "testemail@temail.com",
    phone: "1234567890",
  },
  {
    id: 3,
    name: "Jane Doe",
    position: "CEO",
    company: "Company",
    location: "New York",
    email: "testemail@temail.com",
    phone: "1234567890",
  },
  {
    id: 4,
    name: "Jane Doe",
    position: "CEO",
    company: "Company",
    location: "New York",
    email: "testemail@temail.com",
    phone: "1234567890",
  },
  {
    id: 5,
    name: "Jane Doe",
    position: "CEO",
    company: "Company",
    location: "New York",
    email: "testemail@temail.com",
    phone: "1234567890",
  },
];

const ContactTitle = ({ contact }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
      <Avatar size={40}>{contact.name.slice(0, 1)}</Avatar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title style={{ margin: 0 }} level={4}>
          {contact.name}
        </Title>
        <Text style={{ fontWeight: "400" }}>{contact.position}</Text>
        <Text style={{ lineHeight: ".8em", fontWeight: "400" }}>
          {contact.company}
        </Text>
      </div>
    </div>
  );
};

const ContactBody = ({ contact }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text>
        <CompassOutlined /> {contact.location}
      </Text>
      <Text>
        <MailOutlined />{" "}
        <AntLink href={`mailto:${contact.email}`}>{contact.email}</AntLink>
      </Text>
      <Text>
        <PhoneOutlined />{" "}
        <AntLink href={`tel:${contact.phone}`}>{contact.phone}</AntLink>
      </Text>
    </div>
  );
};

const Contacts = ({ user }) => {
  return (
    <DefaultLayout>
      <div
        style={{ marginBottom: "1em", display: "flex", alignItems: "center" }}
      >
        <Title level={2} style={{ margin: 0, padding: 0, flexGrow: 1 }}>
          Contacts
        </Title>
        <div>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Contact
          </Button>
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
          {contacts.map((contact) => (
            <Card
              className="contact-item"
              title={<ContactTitle contact={contact} />}
              key={contact.id}
            >
              <ContactBody contact={contact} />
            </Card>
          ))}
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
