import { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Form,
  Modal,
  Input,
  Select,
  Space,
  Button,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const { Option } = Select;
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
        <CompassOutlined />
        &nbsp;{contact.location || "none"}
      </Text>
      <Text>
        <MailOutlined />
        &nbsp;
        {contact.email ? (
          <AntLink
            onClick={(e) => e.stopPropagation()}
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </AntLink>
        ) : (
          " none"
        )}
      </Text>
      <Text>
        <PhoneOutlined />
        &nbsp;
        {contact.phone ? (
          <AntLink
            onClick={(e) => e.stopPropagation()}
            href={`tel:${contact.phone}`}
          >
            {contact.phone}
          </AntLink>
        ) : (
          "none"
        )}
      </Text>
    </div>
  );
};

const ContactCard = ({
  contact,
  jobs,
  handleEditContact,
  handleDeleteContact,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      handleEditContact({ ...contact, ...values }, true)
        .then(() => {
          form.resetFields();
          setVisible(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    handleDeleteContact(contact)
      .then(() => {
        setDeleteLoading(false);
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
        setDeleteLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Card
        onClick={showModal}
        className="contact-item"
        title={<ContactTitle contact={contact} />}
        key={contact.id}
        style={{ cursor: "pointer" }}
      >
        <ContactBody contact={contact} />
      </Card>
      <Modal
        title="Edit Contact"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              onClick={handleDelete}
              loading={deleteLoading}
              type="danger"
            >
              Delete
            </Button>
            <Button onClick={handleOkay} loading={loading} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" initialValues={contact}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input a name!" }]}
          >
            <Input placeholder="Name" autoComplete="off" />
          </Form.Item>
          <Form.Item name="position" label="Position">
            <Input placeholder="Position" autoComplete="off" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input placeholder="Company" autoComplete="off" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input placeholder="Location" autoComplete="off" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" autoComplete="off" />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="Phone" autoComplete="off" />
          </Form.Item>
          <Form.Item name="jobId" label="Link to Job">
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Link to Job"
              allowClear
            >
              {jobs.map((job) => (
                <Option key={job.id} value={job.id}>
                  {job.company} - {job.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ContactCard;
