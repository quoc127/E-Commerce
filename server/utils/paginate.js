  module.exports.paginate = async (model, page, limit, query = {}) => {
    const skip = (page - 1) * limit;
    const items = await model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalItems = await model.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  };
