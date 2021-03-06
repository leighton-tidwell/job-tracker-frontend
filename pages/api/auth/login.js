import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const { headers } = req;
  delete headers["host"];

  await axios
    .post(`${process.env.API}/auth/login`, { email, password }, { ...headers })
    .then((response) => {
      const { data, headers: returnedHeaders } = response;

      Object.entries(returnedHeaders).forEach((keyArr) => {
        if (keyArr[0] !== "transfer-encoding")
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

      return res.status(200).json({ success: "true" });
    })
    .catch((err) => {
      const { status, data } = err.response;
      if (data.includes("BadCredentialsException")) {
        return res.status(status).json({ error: "Invalid email or password!" });
      } else {
        return res.status(status).json({ error: "An error has occured!" });
      }
    });
}
