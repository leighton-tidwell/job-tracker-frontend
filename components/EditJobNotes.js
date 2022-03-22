import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Spin,
  Button,
  Space,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const { TextArea } = Input;
const { Text } = Typography;

const EditJobNotes = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      setNotes((prevNotes) => ({
        ...prevNotes,
        notes: [
          {
            ...values,
            id: uuidv4(),
          },
          ...prevNotes.notes,
        ],
      }));

      form.resetFields();
    });
  };

  useEffect(() => {
    axios.get("/api/users/notes/job/id/" + job.id).then((data) => {
      setNotes(data.data);
      setNotesLoading(false);
    });
  }, [job.id]);

  useEffect(() => {
    if (notes)
      axios
        .post(`/api/users/notes/job`, notes)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [notes]);

  return notesLoading ? (
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
        <Form.Item
          name="text"
          label="Note"
          rules={[{ required: true, message: "Please input note!" }]}
        >
          <TextArea placeholder="Note" autoComplete="off" autoSize />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button loading={loading} type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => form.resetFields()}>Clear</Button>
          </Space>
        </Form.Item>
      </Form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "10px",
        }}
      >
        {notes.notes.length > 0 &&
          notes.notes.map((note, i) => (
            <Card
              title={
                <Text style={{ width: 100 }} ellipsis>
                  {note.text}
                </Text>
              }
              style={{ wordBreak: "break-word" }}
              key={notes.id + "-" + i}
            >
              {note.text}
            </Card>
          ))}
      </div>
    </>
  );
};

export default EditJobNotes;
