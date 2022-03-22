import { Divider, Card } from "antd";
import { Droppable } from "react-beautiful-dnd";
import {
  BoardItem,
  AddJobModal,
  ConfirmDeleteModal,
  EditCategoryModal,
  MoveCategoryModal,
} from ".";

const DraggableElement = ({
  elements,
  prefix,
  category,
  categories,
  handleAddJob,
  handleDeleteCategory,
  handleEditCategory,
  handleMoveCategory,
  handleDeleteJob,
  handleUpdateJob,
}) => {
  return (
    <div>
      <Divider orientation="center">{category}</Divider>
      <Card
        style={{ minWidth: "300px" }}
        title={
          <div style={{ display: "flex" }}>
            <EditCategoryModal
              onAccept={handleEditCategory}
              defaultValue={category}
              id={prefix}
              style={{ flexGrow: 1, textAlign: "left" }}
            />
            <MoveCategoryModal
              categories={categories}
              onAccept={handleMoveCategory}
              id={prefix}
            />
            {!elements.length && (
              <ConfirmDeleteModal id={prefix} onAccept={handleDeleteCategory} />
            )}
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
                <BoardItem
                  handleUpdateJob={handleUpdateJob}
                  handleDeleteJob={handleDeleteJob}
                  key={item.id}
                  item={item}
                  index={index}
                  category={prefix}
                  categories={categories}
                />
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
