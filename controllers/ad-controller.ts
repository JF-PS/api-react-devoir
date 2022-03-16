import { Request, Response } from "express";

const adController = (service: any) => ({
  getAll(req: Request, res: Response) {
    const { limit, offset } = req.params;
    return service
      .getAll(limit, offset, req.query)
      .then((ad: any) => {
        res.status(200).send(ad);
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },
  getOne(req: Request, res: Response) {
    return service
      .getOne(req.params.id)
      .then((ad: any) => {
        if (ad) {
          res.status(200).send(ad);
        } else {
          res.status(404).json({ message: "Id not found" });
        }
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  },
});

export default adController;
