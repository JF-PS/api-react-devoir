const vehicleRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.get("/", controller.getAll);

  return router;
};

export default vehicleRoute;
