import axios from "axios";

export default async function handler(req, res) {
  const { headers, cookies, body } = req;
  delete headers["host"];

  await axios
    .post(`${process.env.API}/users/notes/job`, body, {
      headers: {
        ...headers,
        Authorization: `Bearer ${cookies["auth-token"]}`,
      },
    })
    .then((response) => {
      const { data, headers: returnedHeaders } = response;

      Object.entries(returnedHeaders).forEach((keyArr) => {
        if (keyArr[0] !== "transfer-encoding")
          res.setHeader(keyArr[0], keyArr[1]);
      });

      return res.status(200).json(data);
    })
    .catch((err) => {
      const { status, data } = err.response;
      return res.status(status).json(data);
    });
}
