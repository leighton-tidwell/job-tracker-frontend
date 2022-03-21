import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ConfirmDeleteJob = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);

  const showModal = (e) => {
    setVisible(true);
    e.stopPropagation();
  };

  const handleOkay = (e) => {
    onAccept(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  return (
    <>
      <DeleteOutlined onClick={showModal} style={{ marginLeft: "8px" }} />
      <Modal
        title="Delete Job"
        visible={visible}
        onOk={(e) => handleOkay(e)}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this job?
      </Modal>
    </>
  );
};

export default ConfirmDeleteJob;
