const { check, validationResult } = require('express-validator');
const Category = require('../model/categoryModel');

const validationInput = async (req) => {

    await check('name')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('name should be 3 to 20 characters')
        .custom(async name => {
            const category = await Category.findOne({ name });
            if (category) throw new Error('name is already register');
        }).run(req);
    

}

module.exports = {
    async createCategories(req, res, next){
        const createdBy = req.user._id;
        try {
            await validationInput(req);
            const errors = validationResult(req)

            if (!errors.isEmpty()) return res.status(400).send(errors)
            let category = req.body;
            categoryData = await Category.create({...category, createdBy: createdBy})
            return res.send(categoryData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },

    async getAllCategories(req, res) {
        try {
            const categoryData = await Category.find()
            res.send(categoryData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },
    async getCategories(req, res) {
        try {
            const id = req.params.id;
            const categoryData = await Category.findById(id)
            res.send(categoryData)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    async updateCategories(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const categoryData = await Category.findByIdAndUpdate(id,updateData)
            res.send(categoryData)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    // async deleteCategories(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const categoryData = await Category.findByIdAndDelete(id)
    //         res.send(categoryData)
    //     } catch (error) {
    //         res.status(400).send({message: error.message})
    //     }
    // }
}