import { productModel as productsModel } from "./models/products.model.js";

class ProductManagerMongo {
  getAll = async () => {
    try {
      return await productsModel.find({}).lean();
    } catch (error) {
      return error;
    }
  };

  getView = async ({ limit = 10, numPage = 1, sortOrder, query }) => {
    try {
      if (query) {
        query = JSON.parse(decodeURIComponent(query));
        return await productsModel.paginate(query, {
          limit,
          page: numPage,
          lean: true,
        });
      }

      sortOrder = parseInt(sortOrder);

      if (!sortOrder) {
        return await productsModel.paginate(
          {},
          { limit, page: numPage, lean: true }
        );
      } else {
        if (sortOrder === -1)
          return await productsModel.paginate(
            {},
            { limit, page: numPage, lean: true, sort: { price: -1 } }
          );
        return await productsModel.paginate(
          {},
          { limit, page: numPage, lean: true, sort: { price: 1 } }
        );
      }
    } catch (error) {
      return error;
    }
  };

  /**
   *
   * @param {String} id
   * @returns
   */
  getBy= async (id) => {
    try {
      return await productsModel.findById(id);
    } catch (error) {
      return { error: error.message };
    }
  };

  create = async (product) => {
    if (await productsModel.find({ code: product.code })) {
      console.log("Error el código ya existe");
    }
    try {
      await productsModel.create(product);
      return await productsModel.findOne({ title: product.title });
    } catch (error) {
      return error;
    }
  };

  update = async (id, product) => {
    try {
      return await productsModel.findByIdAndUpdate(id, { $set: product });
    } catch (error) {
      return error;
    }
  };

  delete = async (value) => {
    try {
      return await productsModel.findByIdAndDelete(value);
    } catch (error) {
      return error;
    }
  };
}

export default ProductManagerMongo;
