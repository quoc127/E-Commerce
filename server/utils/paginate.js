  module.exports.paginate = async (model, page, limit, query = {}, sort) => {
    const skip = (page - 1) * limit;
    const items = await model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const totalItems = await model.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  };
