import { Draggable } from "react-beautiful-dnd";
import { Card, Avatar, Typography } from "antd";

const { Text } = Typography;

const BoardItem = ({ item, index }) => {
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
          <Card
            style={{ minHeight: 75 }}
            className="board-item"
            bodyStyle={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar size="large" style={{}}>
              {item.title.slice(0, 1)}
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
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
