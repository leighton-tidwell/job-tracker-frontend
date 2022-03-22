import { useEffect, useState } from "react";
import { ContactsGrid, AddContactModal } from ".";
import axios from "axios";

const JobContactsForm = ({ job, categories }) => {
  const [contacts, setContacts] = useState([]);
  const [jobs, setJobs] = useState(
    categories.map((list) => list.items).flat(2)
  );
  const [loading, setLoading] = useState(true);

  const handleAddContact = (contact, edit = false) =>
    new Promise((resolve, reject) => {
      axios
        .post("/api/users/contact", contact)
        .then((data) => {
          if (!edit) {
            setContacts((prevContacts) => [data.data, ...prevContacts]);
          } else {
            if (contact.jobId !== job.id) {
              setContacts((prevContacts) =>
                prevContacts.filter((c) => c.id !== data.data.id)
              );
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
    setLoading(true);
    axios
      .get(`/api/users/contacts/job/id/${job.id}`)
      .then((data) => {
        setContacts(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [job.id]);

  return (
    <>
      <div
        style={{ display: "flex", marginBottom: 8, justifyContent: "flex-end" }}
      >
        <AddContactModal
          onAccept={handleAddContact}
          jobs={jobs}
          currentJob={job.id}
        />
      </div>
      <ContactsGrid
        className="job-contacts-form"
        handleAddContact={handleAddContact}
        handleDeleteContact={handleDeleteContact}
        contacts={contacts}
        jobs={jobs}
        loading={loading}
      />
    </>
  );
};

export default JobContactsForm;
