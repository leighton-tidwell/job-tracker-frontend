import { Draggable } from "react-beautiful-dnd";
import { Card } from "antd";

const BoardItem = ({ item, index }) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ marginBottom: "1em", ...provided.draggableProps.style }}
        >
          <Card style={{ minHeight: 75 }}>
            {item.title}
            {item.description}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
