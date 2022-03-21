import { useEffect, useState } from "react";
import { Modal, Form, Select } from "antd";
import { DragOutlined } from "@ant-design/icons";

const { Option } = Select;

const MoveCategoryModal = ({ id, onAccept, categories }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      onAccept(id, values.position);
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setOptions(
      categories.map((category, i) => (
        <Option key={category.id} value={i}>
          {i + 1} - {category.category} {category.id === id ? "(current)" : ""}
        </Option>
      ))
    );
    setDefaultIndex(categories.findIndex((category) => category.id === id));

    form.resetFields();
  }, [categories, id, form, visible]);

  return (
    <>
      <DragOutlined onClick={showModal} />
      <Modal
        title="Move Category"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        <Form
          initialValues={{ position: defaultIndex }}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="position"
            label="Category Position"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Select>{options}</Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MoveCategoryModal;
