module.exports.paginate = async (model, page, limit) => {
  const skip = (page - 1) * limit;
  const items = await model
    .find({ deleted: false })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const totalItems = await model.countDocuments({ deleted: false });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    totalItems,
    totalPages,
    currentPage: page,
  };
};
