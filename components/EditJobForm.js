import { Form, Row, Col, Input, Button, Select } from "antd";

const { Option } = Select;

const EditJobForm = ({ updateJob, job }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      updateJob(job.id, { ...values, id: job.id });
    });
  };

  return (
    <Form
      initialValues={{ ...job, color: job.color || "white" }}
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
                message: "Please input company name!",
              },
            ]}
          >
            <Input placeholder="Company" autoComplete="off" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Job Title"
            rules={[
              {
                required: true,
                message: "Please input job title name!",
              },
            ]}
          >
            <Input placeholder="Job title" autoComplete="off" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Form.Item
            name="postUrl"
            label="Post URL"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              placeholder="https://example.com/job-listing"
              autoComplete="off"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="New York" autoComplete="off" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="color"
            label="Color"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select>
              <Option value="white">White</Option>
              <Option value="#69c0ff">Blue</Option>
              <Option value="#95de64">Green</Option>
              <Option value="#fff566">Yellow</Option>
              <Option value="#ff7875">Red</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button onClick={() => form.resetFields()}>Cancel</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditJobForm;
