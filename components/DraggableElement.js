import { Divider, Card } from "antd";
import { Droppable } from "react-beautiful-dnd";
import { BoardItem } from ".";

const DraggableElement = ({ elements, prefix, category }) => {
  return (
    <div>
      <Divider orientation="center">{category}</Divider>
      <Card style={{ minWidth: "300px" }}>
        <Card
          style={{
            marginBottom: "1em",
            borderStyle: "dashed",
            textAlign: "center",
            cursor: "pointer",
          }}
          className="add-item"
        >
          Click to add
        </Card>
        <Droppable droppableId={`${prefix}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((item, index) => (
                <BoardItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
};

export default DraggableElement;
