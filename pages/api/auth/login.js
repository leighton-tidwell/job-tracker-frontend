import axios from "axios";
import cookie from "cookie";

export default function handler(req, res) {
  const { email, password } = req.body;
  const { headers } = req;
  delete headers["host"];

  axios
    .post(`${process.env.API}/auth/login`, { email, password }, { headers })
    .then((response) => {
      const { data, headers: returnedHeaders } = response;

      Object.entries(returnedHeaders).forEach((keyArr) => {
        res.setHeader(keyArr[0], keyArr[1]);
      });

      const { accessToken } = data;
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth-token", accessToken, {
          httpOnly: true,
          maxAge: 86400000,
          path: "/",
          sameSite: "strict",
        })
      );

      res.status(200).json(data);
    })
    .catch((err) => {
      const { status, data } = err.response;
      if (data.includes("BadCredentialsException")) {
        res.status(status).json({ error: "Invalid email or password!" });
      } else {
        res.status(status).json({ error: "An error has occured!" });
      }
    });
}
