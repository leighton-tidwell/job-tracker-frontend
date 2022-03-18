import axios from "axios";
import DefaultLayout from "../../layouts/Default";
import { useState } from "react";
import { Typography } from "antd";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import { DraggableElement } from "../../components";

const { Title } = Typography;

const data = [
  {
    id: "applied",
    category: "Applied",
    items: [
      {
        id: 1,
        title: "Item 1",
        description: "Item 1 description",
      },
      {
        id: 2,
        title: "Item 2",
        description: "Item 2 description",
      },
    ],
  },
  {
    id: "interview",
    category: "Interview",
    items: [
      {
        id: 3,
        title: "Item 3",
        description: "Item 3 description",
      },
      {
        id: 4,
        title: "Item 4",
        description: "Item 4 description",
      },
    ],
  },
];

const Dashboard = ({ user }) => {
  const [columns, setColumns] = useState(data);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumnIndex = columns.findIndex(
        (column) => column.id === source.droppableId
      );
      const sourceColumn = columns.find(
        (column) => column.id === source.droppableId
      );
      const destColumnIndex = columns.findIndex(
        (column) => column.id === destination.droppableId
      );
      const destColumn = columns.find(
        (column) => column.id === destination.droppableId
      );
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
    }
  };

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
              />
            ))}
          </DragDropContext>
        )}
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

    resetServerContext();

    return {
      props: {
        user: {
          id: data.id,
          email: data.username,
        },
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
