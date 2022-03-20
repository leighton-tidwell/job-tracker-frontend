import { Divider, Card } from "antd";
import { Droppable } from "react-beautiful-dnd";
import { BoardItem, AddJobModal } from ".";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DraggableElement = ({ elements, prefix, category, handleAddJob }) => {
  return (
    <div>
      <Divider orientation="center">{category}</Divider>
      <Card
        style={{ minWidth: "300px" }}
        title={
          <div style={{ display: "flex" }}>
            <EditOutlined style={{ flexGrow: 1, textAlign: "left" }} />
            {!elements.length && <DeleteOutlined />}
          </div>
        }
      >
        <AddJobModal onAccept={handleAddJob} category={prefix} />
        <Droppable droppableId={`${prefix}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                minHeight: "5px",
                ...provided.droppableProps.style,
              }}
            >
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
