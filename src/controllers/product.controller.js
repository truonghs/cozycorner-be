const Product = require("../models/product.model");
const { generateSlug } = require("../utils");

const bucket = require("../configs/firebase");
class ProductController {
  async index(req, res, next) {}

  async store(req, res) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }
    const product = req.body;
    const slug = generateSlug(product.name);
    let newProduct = new Product();
    const uploadPromises = req.files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const blob = bucket.file(slug + "-" + index);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on("error", (err) => {
          reject(err);
        });

        blobStream.on("finish", async () => {
          try {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

            resolve(publicUrl);
          } catch (error) {
            reject(error);
          }
        });

        blobStream.end(file.buffer);
      });
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      newProduct.name = product.name;
      newProduct.size_prices = product.size_prices;
      newProduct.description = product.description;
      newProduct.category = product.category;
      newProduct.sub_category = product.subCategory;
      newProduct.preparation = product.preparation;
      newProduct.slug = slug;
      newProduct.discount = product.discount;
      newProduct.images = imageUrls;
      await newProduct.save();
      res.status(200).send({ imageUrls });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new ProductController();
