import { useState } from "react";
import { Button, Form, Modal, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddContactModal = ({ onAccept, jobs, currentJob }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      onAccept(values)
        .then(() => {
          form.resetFields();
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setConfirmLoading(false);
        });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Contact
      </Button>
      <Modal
        confirmLoading={confirmLoading}
        title="Add Contact"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ jobId: currentJob }}
        >
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

export default AddContactModal;
