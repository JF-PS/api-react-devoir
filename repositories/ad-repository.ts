import { Op } from "@sequelize/core";

import Ad from "../models";
import IAd from "../interfaces/i-ad";
import AdType from "../models";
import Vehicle from "../models";
import Horsepower from "../models";
import SerialNumber from "../models";
import Brand from "../models";
import Category from "../models";
import SubCategory from "../models";
import AdPicture from "../models";

const Ads = Ad.Ad;
const AdsTypes = AdType.AdType;
const AdsPictures = AdPicture.AdPicture;
const Vehicles = Vehicle.Vehicle;
const Horsepowers = Horsepower.Horsepower;
const SerialNumbers = SerialNumber.SerialNumber;
const Brands = Brand.Brand;
const Categories = Category.Category;
const SubCategories = SubCategory.SubCategory;

const attributesAd: Array<string> = [
  "id",
  "title",
  "description",
  "vehicle_id",
  "picture_id",
  "user_id",
  "type_id",
  "address",
  "price",
];

const baseAttribute: Array<string> = ["id", "name"];
const attributesVehicle: Array<string> = [
  "id",
  "kilometers",
  "date_circulation",
];

const vehiculeAttr = [
  "id",
  "category_id",
  "sub_category_id",
  "brand_id",
  "serial_number_id",
  "gas_id",
  "horsepower_id",
  "year",
  "date_circulation",
  "kilometers",
];

class AdRepository {
  getAll(limit: number, offset: number, query: any = null): Promise<IAd> {
    const { title = "" } = query;
    return new Promise((resolve, reject) => {
      Ads.findAndCountAll({
        limit,
        offset,
        attributes: attributesAd,
        where: {
          title: { [Op.substring]: title },
        },
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: baseAttribute,
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: vehiculeAttr,
            include: [
              {
                model: Horsepowers,
                as: "horsepower",
                attributes: baseAttribute,
              },
            ],
          },
          // TODO: Attention ligne 66-70 à commenter
          // La gestion d'image contient des bugs qui détruise la pagination
          {
            model: AdsPictures,
            as: "AdPictures",
            attributes: ["id", "ad_id", "source"],
          },
        ],
      })
        .then((ad: IAd) => {
          resolve(ad);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getOne(id: number): any {
    return new Promise((resolve, reject) => {
      Ads.findByPk(id, {
        attributes: attributesAd,
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: baseAttribute,
          },
          {
            model: AdsPictures,
            as: "AdPictures",
            attributes: ["id", "ad_id", "source"],
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: vehiculeAttr,
            include: [
              {
                model: Horsepowers,
                as: "horsepower",
                attributes: baseAttribute,
              },
              {
                model: SerialNumbers,
                as: "serialNumber",
                attributes: baseAttribute,
              },
              {
                model: Brands,
                as: "brand",
                attributes: baseAttribute,
              },
              {
                model: Categories,
                as: "category",
                attributes: baseAttribute,
              },
              {
                model: SubCategories,
                as: "subCategory",
                attributes: baseAttribute,
              },
            ],
          },
        ],
      })
        .then((ad: IAd) => {
          resolve(ad);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default AdRepository;
