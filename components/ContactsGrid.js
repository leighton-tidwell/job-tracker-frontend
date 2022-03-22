import { Spin, Card } from "antd";
import { ContactCard } from ".";

const ContactsGrid = ({
  contacts,
  className = "contacts-list",
  loading,
  jobs,
  handleAddContact,
  handleDeleteContact,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <div className={className}>
        {loading ? (
          <div className={`${className}-loading`}>
            <Spin size="large" />
          </div>
        ) : contacts.length === 0 ? (
          <Card className="contact-item" title="No contacts">
            You currently have no contacts, click <b>add contact</b> to add one!
          </Card>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              handleDeleteContact={handleDeleteContact}
              handleEditContact={handleAddContact}
              key={contact.id}
              contact={contact}
              jobs={jobs}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsGrid;
