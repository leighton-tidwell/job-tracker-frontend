import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth-token", false, {
      httpOnly: true,
      maxAge: 1,
      path: "/",
      sameSite: "strict",
    })
  );

  res.status(200).json({ success: "true" });
}
