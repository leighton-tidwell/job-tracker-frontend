import { useState } from "react";
import { Modal, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AddJobModal = ({ onAccept, category }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      form.resetFields();
      const jobId = uuidv4();
      onAccept({
        ...values,
        category,
        postUrl: "",
        color: "white",
        location: "",
        id: jobId,
      });

      axios
        .post(`/api/users/activities/job`, {
          jobId,
          activities: [],
        })
        .then(() => {
          axios
            .post(`/api/users/notes/job`, { jobId, notes: [] })
            .then(() => {
              setLoading(false);
              setVisible(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Card className="add-item" onClick={showModal}>
        <PlusOutlined /> Click to add
      </Card>
      <Modal
        confirmLoading={loading}
        title="Add Job"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please input company name!" }]}
          >
            <Input placeholder="Company" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input job title name!" },
            ]}
          >
            <Input placeholder="Job title" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddJobModal;
