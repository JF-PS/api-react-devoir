import { Request, Response } from "express";

const vehicleController = (service: any) => ({
  getAll(req: Request, res: Response) {
    return service
      .getAll()
      .then((vehicles: any) => {
        res.status(200).send(vehicles);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },
});
export default vehicleController;
