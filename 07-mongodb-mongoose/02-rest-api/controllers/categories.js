const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  // await Category.create({
  //   title: 'Category1',
  //   subcategories: [
  //     {
  //       title: 'Subcategory1'
  //     }
  //   ]
  // });

  const result = await Category.find();
  
  const categories = result.map(item => ({
    id: item.id,
    title: item.title,
    subcategories: item.subcategories.map(item => ({
      id: item.id,
      title: item.title
    }))
  }));
  
  ctx.body = {
    categories
  };
};
