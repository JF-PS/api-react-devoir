const userRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.post("/signin", controller.signIn);

  router.post("/signup", controller.signUp);

  router.put("/validate/:token", controller.validate);

  router.post("/forgotPassword", controller.forgotPassword); //Je rentre mon email, je valide, le mail s'envoie

  router.put("/newPassword/:token", controller.newPassword); //Après avoir cliqué sur le lien du mail je me recréee un mdp via un formulaire

  return router;
};

export default userRoute;
