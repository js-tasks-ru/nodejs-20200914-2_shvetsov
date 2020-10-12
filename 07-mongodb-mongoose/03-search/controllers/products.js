const Product = require('../models/Product');

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

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  // await Product.deleteMany();

  // await Product.create({
  //   title: 'Product1',
  //   images: ['image1', 'image2'],
  //   category: '5d20cf5bba02bff789f8e29d',
  //   subcategory: '5f844355634c34396cdb7063',
  //   price: 10,
  //   description: 'Description1 Product2'
  // });

  // await Product.create({
  //   title: 'Product2',
  //   images: ['image1', 'image2'],
  //   category: '5d20cf5bba02bff789f8e29d',
  //   subcategory: '5f844355634c34396cdb7063',
  //   price: 10,
  //   description: 'Description1 Product3'
  // });

  // await Product.syncIndexes();

  const { query } = ctx.request.query;
  let products;

  if (query) {
    const result = await Product.find({
      $text: { $search: query }
    });
    products = result.map(mapProduct);
  } else {
    products = [];
  }

  ctx.body = {
    products
  };
};
