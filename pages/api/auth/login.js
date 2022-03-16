import axios from "axios";

export default function handler(req, res) {
  const { email, password } = req.body;
  axios
    .post(`${process.env.API}/auth/login`, { email, password })
    .then((response) => {
      const { data } = response;
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(err.response.status || 500).json(err?.response?.data);
    });
}
