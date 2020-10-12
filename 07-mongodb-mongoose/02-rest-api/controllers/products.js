const mongoose = require('mongoose');
const Product = require('../models/Product');

// http://localhost:3000/api/products?subcategory=5f844355634c34396cdb7063
// http://localhost:3000/api/products
// http://localhost:3000/api/products/5f844d4804d21b35fc0d4116

function mapProduct(product) {
  const {
    id,
    title,
    images,
    category,
    subcategory,
    price,
    description
  } = product;
  
  return {
    id,
    title,
    images,
    category,
    subcategory,
    price,
    description
  };
}

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  // await Product.deleteMany();

  // await Product.create({
  //   title: 'Product1',
  //   images: ['image1', 'image2'],
  //   category: '5d20cf5bba02bff789f8e29d',
  //   subcategory: '5f844355634c34396cdb7063',
  //   price: 10,
  //   description: 'Description1'
  // });

  const { subcategory } = ctx.request.query;

  if (subcategory) {
    let result;

    if (mongoose.Types.ObjectId.isValid(subcategory)) {
      result = await Product.find({ subcategory });
    } else {
      result = [];
    }

    const products = result.map(mapProduct);

    ctx.body = {
      products
    };
  } else {
    await next();
  }
};

module.exports.productList = async function productList(ctx, next) {
  const result = await Product.find();
  const products = result.map(mapProduct);

  ctx.body = {
    products
  };
};

module.exports.productById = async function productById(ctx, next) {
  const { id } = ctx.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const result = await Product.findOne({ _id: id });
    if (result) {
      const product = mapProduct(result);
      ctx.body = {
        product
      };
    } else {
      ctx.response.status = 404;
    }
  } else {
    ctx.response.status = 400;
  }
};

