import { useEffect, useState } from "react";
import { Typography } from "antd";
import { AddContactModal, ContactsGrid, SEO } from "../../components";
import axios from "axios";
import DefaultLayout from "../../layouts/Default";

const { Title } = Typography;

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddContact = (contact, edit = false) =>
    new Promise((resolve, reject) => {
      axios
        .post("/api/users/contact", contact)
        .then((data) => {
          if (!edit) {
            setContacts((prevContacts) => [data.data, ...prevContacts]);
          } else {
            setContacts((prevContacts) =>
              prevContacts.map((c) => {
                if (c.id === contact.id) {
                  return data.data;
                }
                return c;
              })
            );
          }
          resolve();
        })
        .catch((error) => reject(error));
    });

  const handleDeleteContact = (contact) =>
    new Promise((resolve, reject) => {
      axios
        .delete("/api/users/contact", { data: contact })
        .then(() => {
          setContacts((prevContacts) =>
            prevContacts.filter((c) => c.id !== contact.id)
          );
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
    <>
      <SEO title="Contacts" />
      <DefaultLayout>
        <div
          style={{ marginBottom: "1em", display: "flex", alignItems: "center" }}
        >
          <Title level={2} style={{ margin: 0, padding: 0, flexGrow: 1 }}>
            Contacts
          </Title>
          <div>
            <AddContactModal jobs={user.jobs} onAccept={handleAddContact} />
          </div>
        </div>
        <ContactsGrid
          contacts={contacts}
          loading={loading}
          jobs={user.jobs}
          handleAddContact={handleAddContact}
          handleDeleteContact={handleDeleteContact}
        />
      </DefaultLayout>
    </>
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

    const {
      data: { lists },
    } = await axios.get(`${process.env.API}/users/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const listOfJobs = lists.map((list) => list.items).flat(2);

    return {
      props: {
        user: {
          id: data.id,
          email: data.username,
          jobs: listOfJobs,
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
