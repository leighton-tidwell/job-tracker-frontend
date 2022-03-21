import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { EditJobModal } from ".";

const BoardItem = ({
  item,
  index,
  handleDeleteJob,
  handleUpdateJob,
  category,
}) => {
  const [showDelete, setShowDelete] = useState(false);

  const toggleDelete = () => {
    setShowDelete((prevState) => !prevState);
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    handleDeleteJob(category, item.id);
  };

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            cursor: "pointer",
            marginBottom: "1em",
            ...provided.draggableProps.style,
          }}
        >
          <EditJobModal
            item={item}
            onDeleteClick={onDeleteClick}
            showDelete={showDelete}
            toggleDelete={toggleDelete}
            handleUpdateJob={handleUpdateJob}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
