import { useState } from "react";
import { Modal, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const AddJobModal = ({ onAccept, category }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onAccept({
        ...values,
        category,
        id: uuidv4(),
      });
      setVisible(false);
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
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input job title name!" },
            ]}
          >
            <Input placeholder="Job title" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddJobModal;
