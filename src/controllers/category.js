import CategoryModel from '../models/category';


export const getById = (req, res, next) => {
  const { type } = req.query;
  const filter = Object.assign({}, type ? { type } : {});

  CategoryModel.find(filter, (err, category) => {
    if (err) {
      next(err);
    }

    if (category.length) {
      res.json({
        success: true,
        message: 'Categories Found',
        data: category,
      });
    } else {
      res.json({
        success: false,
        message: 'Categories not found',
      });
    }
  });
};


export const create = (req, res, next) => {
  const categoryMod = new CategoryModel({
    type: req.body.type,
    value: req.body.value,
  });

  categoryMod.save((err, category) => {
    if (err) {
      next(err);
    }

    res.json({
      success: true,
      message: 'Category added',
      data: category,
    });
  });
};
