const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

function adminAuth(req, res, next) {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return next();
  } else {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
}

module.exports = adminAuth;