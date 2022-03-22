import { useEffect, useState } from "react";
import { Card, Avatar, Typography, Modal, Tabs } from "antd";
import {
  ConfirmDeleteJob,
  EditJobForm,
  EditJobActivities,
  EditJobNotes,
  JobContactsForm,
} from ".";
import {
  InfoCircleOutlined,
  ContactsOutlined,
  FieldTimeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TabPane } = Tabs;

const EditJobModal = ({
  item,
  onDeleteClick,
  showDelete,
  toggleDelete,
  handleUpdateJob,
  categories,
}) => {
  const [visible, setVisible] = useState(false);
  const [colorClass, setColorClass] = useState("board-item-white");
  const [avatarColor, setAvatarColor] = useState(null);

  const showModal = (e) => {
    setVisible(true);
  };

  const handleOkay = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (item?.color === "#69c0ff") {
      setColorClass("board-item-blue");
      setAvatarColor("#0050b3");
    } else if (item?.color === "#95de64") {
      setColorClass("board-item-green");
      setAvatarColor("#237804");
    } else if (item?.color === "#ff7875") {
      setColorClass("board-item-red");
      setAvatarColor("#a8071a");
    } else if (item?.color === "#fff566") {
      setColorClass("board-item-yellow");
      setAvatarColor("#ad8b00");
    } else {
      setColorClass("board-item-white");
      setAvatarColor(null);
    }
  }, [item]);

  return (
    <>
      <Card
        style={{ minHeight: 75 }}
        className={`board-item ${colorClass}`}
        bodyStyle={{
          display: "flex",
          alignItems: "center",
        }}
        onMouseEnter={toggleDelete}
        onMouseLeave={toggleDelete}
        onClick={showModal}
      >
        <Avatar
          style={avatarColor ? { backgroundColor: avatarColor } : {}}
          size="large"
        >
          {item.company.slice(0, 1)}
        </Avatar>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            marginLeft: "8px",
          }}
        >
          <Text strong>{item.title}</Text>
          <Text>{item.company}</Text>
        </div>
        {showDelete && (
          <div
            style={{
              position: "absolute",
              top: "1em",
              right: "1em",
            }}
          >
            <ConfirmDeleteJob onAccept={onDeleteClick} />
          </div>
        )}
      </Card>
      <Modal
        title={
          <>
            <b>{item.title}</b> - {item.company}
          </>
        }
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
        footer={null}
        className="edit-job-modal"
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <InfoCircleOutlined /> Job Info
              </span>
            }
            key="1"
          >
            <EditJobForm updateJob={handleUpdateJob} job={item} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FieldTimeOutlined /> Activities
              </span>
            }
            key="2"
          >
            <EditJobActivities job={item} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <OrderedListOutlined /> Notes
              </span>
            }
            key="3"
          >
            <EditJobNotes job={item} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <ContactsOutlined /> Contacts
              </span>
            }
            key="4"
          >
            <JobContactsForm categories={categories} job={item} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default EditJobModal;
