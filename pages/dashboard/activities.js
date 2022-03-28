import { useState } from "react";
import { Typography, List, Card, Tag, Checkbox, Tooltip } from "antd";
import { SEO } from "../../components";
import axios from "axios";
import DefaultLayout from "../../layouts/Default";
import moment from "moment";

const { Title, Text } = Typography;

const Activities = ({ user }) => {
  const [activities, setActivities] = useState(user.activities);

  const generateColor = (date) => {
    const untilString = new moment().to(date);

    if (untilString.includes("ago")) return "red";

    if (untilString.includes("hours")) return "orange";

    if (untilString.includes("days")) return "green";

    return "blue";
  };

  const toggleCompleted = (e, activityId, jobId) => {
    axios
      .get("/api/users/activities/job/id/" + jobId)
      .then((data) => {
        const newActivities = {
          ...data.data,
          activities: data.data.activities.map((activity) => {
            if (activity.id === activityId) {
              return {
                ...activity,
                completed: e.target.checked,
              };
            }
            return activity;
          }),
        };
        axios
          .post(`/api/users/activities/job`, newActivities)
          .then(() => {
            setActivities((prevActivities) =>
              prevActivities
                .map((activity) => {
                  if (activity.id === activityId) {
                    return {
                      ...activity,
                      completed: e.target.checked,
                    };
                  }
                  return activity;
                })
                .sort((a, b) => a.startDate.localeCompare(b.startDate))
                .sort((a, b) =>
                  b.completed === false || b.completed === null ? 1 : -1
                )
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <SEO title="Activities" />
      <DefaultLayout>
        <div
          style={{ marginBottom: "1em", display: "flex", alignItems: "center" }}
        >
          <Title level={2} style={{ margin: 0, padding: 0, flexGrow: 1 }}>
            Activities
          </Title>
        </div>
        <Card title="Activity Log">
          <List size="small" itemLayout="horizontal">
            {activities.map((activity) => (
              <List.Item
                style={{
                  background: activity.completed ? "rgba(0, 0, 0, 0.06)" : "",
                }}
                key={activity.id}
              >
                <List.Item.Meta
                  avatar={
                    <Tag
                      style={{
                        marginTop: "25%",
                        width: "100px",
                        textAlign: "center",
                      }}
                      color={
                        activity.completed
                          ? "green"
                          : generateColor(activity.startDate)
                      }
                      size="large"
                    >
                      {new moment().to(activity.startDate)}
                    </Tag>
                  }
                  title={<Text>{activity.title}</Text>}
                  description={
                    <>
                      <Text>{activity.note}</Text>
                      <Text style={{ display: "block", fontSize: ".8em" }}>
                        {moment(activity.startDate).format("MM/DD hh:mm A")} -{" "}
                        {moment(activity.endDate).format("MM/DD hh:mm A")}
                      </Text>
                    </>
                  }
                />
                <Tooltip
                  title={
                    activity.completed ? "Mark uncompleted" : "Mark completed"
                  }
                >
                  <Checkbox
                    checked={activity?.completed}
                    onChange={(e) =>
                      toggleCompleted(e, activity.id, activity.job.id)
                    }
                  />
                </Tooltip>
              </List.Item>
            ))}
          </List>
        </Card>
      </DefaultLayout>
    </>
  );
};

export default Activities;

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

    const {
      data: { lists },
    } = await axios.get(`${process.env.API}/users/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const listOfJobs = lists.map((list) => list.items).flat(2);

    const { data: activityList } = await axios.get(
      `${process.env.API}/users/activities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const consolidatedActivityList = activityList
      .map((activity) => {
        return activity.activities.map((single) => {
          return {
            ...single,
            job: listOfJobs.find((job) => job.id === activity.jobId),
          };
        });
      })
      .flat(2)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .sort((a, b) => (b.completed === false || b.completed === null ? 1 : -1));

    return {
      props: {
        user: {
          id: data.id,
          email: data.username,
          activities: consolidatedActivityList,
        },
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
