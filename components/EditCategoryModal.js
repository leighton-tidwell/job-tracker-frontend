import { useState } from "react";
import { Modal, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditCategoryModal = ({ id, onAccept, defaultValue }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      onAccept(id, values.category);
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <EditOutlined onClick={showModal} />
      </div>
      <Modal
        title="Edit Category"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ category: defaultValue }}
        >
          <Form.Item
            name="category"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input placeholder="Category" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCategoryModal;
