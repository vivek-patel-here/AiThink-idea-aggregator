const jwt =require("jsonwebtoken");
const cookie =require("cookie");
const signature =require("cookie-signature");


const isSocketAuthenticated = async (socket, next) => {
  try {
    const rawcookie = socket.handshake.headers.cookie;
    const parsedCookie = cookie.parse(rawcookie || "");
    let signedToken = parsedCookie.auth;
    if(!signedToken || !signedToken.startsWith("s:")) {
      return next(new Error("Unauthorized!"));
    }
    signedToken=signedToken.slice(2);
    const unsignedToken = signature.unsign(signedToken, process.env.COOKIE_SECRET);
    if (!unsignedToken) {
      return next(new Error("Unauthorized!"));
    }
    const decode = jwt.verify(unsignedToken, process.env.JWT_SECRET);
    socket.user = decode;
    next();
  } catch (err) {
    console.log(err)
    next(new Error("Unauthorized!"));
  }
};


module.exports={isSocketAuthenticated}