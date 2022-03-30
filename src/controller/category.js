const Category = require("../models/category")
const slugify = require('slugify')



exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj)
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) {
            return res.status(200).json({ category })
        }
    })
}

function createCategories(categories, parentId = null) {
    let categoryList = []
    let category;
    console.log(parentId);
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
        console.log(category);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })

    }
    return categoryList;

}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) return res.status(400).json({ error })
            if (categories) {
                const categoryList = createCategories(categories)
                return res.status(200).json({ categoryList })
            }
        })
}