import { useState } from "react";
import { Modal, Divider, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddCategoryModal = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onAccept({ ...values, id: values.category.split(" ").join("-") });
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <Divider orientation="center">New Category</Divider>
        <Card className="add-category" onClick={showModal}>
          <PlusOutlined /> Add
        </Card>
      </div>
      <Modal
        title="Add Category"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input placeholder="Category" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
