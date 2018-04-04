const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
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
    
    Products.find({category: req.params.id})
    .populate('category')
    .exec((err, Products)=>{
        Product.count({category:req.params.id}, (err, totalProducts)=>{
            res.json({
                success: true,
                message: 'category',
                categoryName: products[0].category.name,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage)
            });
        });
    }
)

});



module.exports = router;

