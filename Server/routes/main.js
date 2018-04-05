const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const async = require('async');

router.route('/categories')
.get((req, res, next)=>{
    Category.find({}, (err, Categories)=>{
        res.json({
            success:true,
            message: "Successful",
            categories: Categories
        });
    })
})
.post((res, req, next)=>{
    let category = new Category();
    category.name = req.body.name;

    category.save();
    res.json({
        success: true,
        message: "Successful"
    });
});

router.get('/categories/:id',(req, res, next)=>{
  const perPage = 10;
  const page = req.query.page
  async.waterfall([
    function(callback)
    {
        Product.count({category: req.params.id}, (err, count)=>{
            var totalProducts = count;
            callback(err, totalProducts);
        });
    }
  ])
});




module.exports = router;

