import axios from "axios";
import DefaultLayout from "../../layouts/Default";
import debounce from "lodash.debounce";
import { useEffect, useState, useCallback } from "react";
import { Typography } from "antd";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import { DraggableElement, AddCategoryModal } from "../../components";

const { Title } = Typography;

const Dashboard = ({ user }) => {
  const [columns, setColumns] = useState(user.category.lists);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumnIndex = columns.findIndex(
        (c) => c.id === source.droppableId
      );
      const sourceColumn = columns.find((c) => c.id === source.droppableId);
      const destColumnIndex = columns.findIndex(
        (c) => c.id === destination.droppableId
      );
      const destColumn = columns.find((c) => c.id === destination.droppableId);
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) =>
        prevColumns.map((column, index) => {
          if (index === sourceColumnIndex)
            return { ...column, items: sourceItems };
          else if (index === destColumnIndex)
            return { ...column, items: destItems };
          return column;
        })
      );
    } else if (source.droppableId === destination.droppableId) {
      const columnIndex = columns.findIndex((c) => c.id === source.droppableId);
      const column = columns.find((c) => c.id === source.droppableId);
      const items = [...column.items];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setColumns((prevColumns) =>
        prevColumns.map((column, index) => {
          if (index === columnIndex) return { ...column, items };
          return column;
        })
      );
    }
  };

  const handleAddCategory = (category) => {
    console.log(category);
    setColumns((prevColumns) => [
      ...prevColumns,
      {
        id: category.id,
        category: category.category,
        items: [],
      },
    ]);
  };

  const handleAddJob = (job) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === job.category) {
          return {
            ...column,
            items: [job, ...column.items],
          };
        }
        return column;
      })
    );
  };

  const updateColumns = useCallback(
    debounce((columns) => {
      axios
        .post("/api/users/categories", {
          ...user.category,
          lists: [...columns],
        })
        .catch((error) => console.log(error));
    }, 1000),
    []
  );

  useEffect(() => {
    updateColumns(columns);
  }, [columns, updateColumns]);

  return (
    <DefaultLayout>
      <Title level={2} style={{ margin: 0, padding: 0 }}>
        My Job Board
      </Title>
      <div style={{ display: "flex", gap: "1em" }}>
        {typeof window !== undefined && (
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((column) => (
              <DraggableElement
                elements={column.items}
                key={column.id}
                prefix={column.id}
                category={column.category}
                handleAddJob={handleAddJob}
              />
            ))}
          </DragDropContext>
        )}
        <AddCategoryModal onAccept={handleAddCategory} />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies["auth-token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const { data } = await axios.get(`${process.env.API}/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: lists } = await axios.get(
      `${process.env.API}/users/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    resetServerContext();

    return {
      props: {
        user: {
          id: data.id,
          email: data.username,
          category: lists,
        },
      },
    };
  } catch (err) {
    console.log(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
