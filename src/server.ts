import express from "express";
import session from "express-session";
import passport from "./infrastructure/passport-config";
import RegisterController from "./interfaces/controllers/RegisterController";
import LoginController from "./interfaces/controllers/LoginController";
import AuthMiddleware from "./interfaces/middlewares/AuthMiddleware";

const app = express();

// Configuração da sessão
app.use(
  session({
    secret: "secreto", // Substitua por uma chave secreta forte
    resave: false,
    saveUninitialized: true,
  })
);

// Inicialize o Passport
app.use(passport.initialize());
app.use(passport.session());

// Rotas de autenticação com OAuth2 (Google)
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Rota protegida com OAuth2 (Google)
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).send("Não autenticado");
  }
});

// Rota de logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Erro ao fazer logout");
    }
    res.redirect("/");
  });
});

// Rotas de autenticação tradicional (e-mail e senha)
app.post("/register", RegisterController.register);
app.post("/login", LoginController.login);

// Rota protegida com JWT
app.get("/protected", AuthMiddleware.verifyToken, (req, res) => {
  res.json({ message: "You are authenticated!", userId: req.userId });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
