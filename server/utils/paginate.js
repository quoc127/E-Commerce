module.exports.paginate = async (model, page, limit) => {
  const skip = (page - 1) * limit;
  const product = await model.find().skip(skip).limit(limit);
  const totalProducts = await model.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    product,
    totalProducts,
    totalPages,
    currentPage: page,
  };
};
