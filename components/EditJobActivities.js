import { useState, useEffect } from "react";
import { Spin, Form, Input, Row, Col, Button, DatePicker, List } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import axios from "axios";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const EditJobActivities = ({ job }) => {
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [loadingSaveActivity, setLoadingSaveActivity] = useState(false);
  const [activities, setActivities] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((fieldValues) => {
      const timeRange = fieldValues["date"];
      const values = {
        ...fieldValues,
        id: uuidv4(),
        startDate: timeRange[0].toISOString(),
        endDate: timeRange[1].toISOString(),
      };

      setLoadingSaveActivity(true);
      setActivities((prevActivities) => ({
        ...prevActivities,
        activities: [
          {
            ...values,
          },
          ...prevActivities.activities,
        ],
      }));

      form.resetFields();
    });
  };

  useEffect(() => {
    axios.get("/api/users/activities/job/id/" + job.id).then((data) => {
      setActivitiesLoading(false);
      setActivities(data.data);
    });
  }, [job.id]);

  useEffect(() => {
    if (activities)
      axios
        .post(`/api/users/activities/job`, activities)
        .then(() => {
          setLoadingSaveActivity(false);
        })
        .catch((error) => console.log(error));
  }, [activities]);

  return activitiesLoading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <>
      <Form onFinish={handleSubmit} form={form} layout="horizontal">
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input an activity title!",
                },
              ]}
            >
              <Input placeholder="Job Interview" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                placeholder="Interview, Reach Out, etc.."
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select a time range!",
                },
              ]}
            >
              <RangePicker showTime format="YYYY-MM-DD hh:mm A" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item
              name="note"
              label="Note"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <TextArea autoSize />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Add Activity
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                loading={loadingSaveActivity}
                onClick={() => form.resetFields()}
              >
                Clear
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {activities?.activities?.length > 0 && (
        <List
          bordered
          dataSource={activities.activities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    {item.title}
                    {item.type ? ` - ${item.type}` : ""}
                  </>
                }
                description={
                  <>
                    {item.note}
                    <br />
                    {moment(item.startDate).format("MM/DD hh:mm A")} -{" "}
                    {moment(item.endDate).format("MM/DD hh:mm A")}
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default EditJobActivities;
