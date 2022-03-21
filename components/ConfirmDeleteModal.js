import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const ConfirmDeleteModal = ({ id, onAccept }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOkay = () => {
    onAccept(id);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <DeleteOutlined onClick={showModal} style={{ marginLeft: "8px" }} />
      <Modal
        title="Delete Category"
        visible={visible}
        onOk={handleOkay}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this category?
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
