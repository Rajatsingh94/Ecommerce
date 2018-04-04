const router = require('@anguler/router');
const Category = require('../models/category');

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

module.exports = router;

