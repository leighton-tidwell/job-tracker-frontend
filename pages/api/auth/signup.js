import axios from "axios";

export default function handler(req, res) {
  const { email, password } = req.body;
  const { headers } = req;

  axios
    .post(`${process.env.API}/auth/signup`, { email, password }, { headers })
    .then((response) => {
      const { data, headers: returnedHeaders } = response;

      Object.entries(returnedHeaders).forEach((keyArr) =>
        res.setHeader(keyArr[0], keyArr[1])
      );

      res.status(200).json(data);
    })
    .catch((err) => {
      const { status, data } = err.response;
      console.log(status);
      if (status === 409) {
        res.status(status).json({ error: "Email already in use!" });
      } else {
        res.status(status).json({ error: "An error has occured!" });
      }
    });
}
