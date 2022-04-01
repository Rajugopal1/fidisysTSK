const { check, validationResult } = require('express-validator');
const Game = require('../model/gameModel');

const validationInput = async (req) => {

    await check('name')
        .trim()
        .notEmpty()
        .isLength({ min: 4, max: 20 })
        .withMessage('name should be 3 to 20 characters').run(req);
    await check('description')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage('type should be 3 to 20 characters').run(req); 
    await check('playersCount.min')
        .trim()
        .isNumeric()
        .withMessage('playersCount min should be Number').run(req); 
    await check('playersCount.max')
        .trim()
        .isNumeric()
        .withMessage('playersCount max should be Number').run(req); 

}

module.exports = {
    async createGame(req, res, next){
        const fileName = req?.file?.filename;
        const CreatedBy = req.user?._id;
        console.log(fileName);
        try {
            await validationInput(req);
            const errors = validationResult(req)

            if (!errors.isEmpty()) return res.status(400).send(errors)
            let game = req.body;
            gameData = await Game.create({...game, image: fileName, createdBy: CreatedBy})
            return res.send(gameData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },

    async getAllGames(req, res) {
        try {
            const gameData = await Game.find()
            res.send(gameData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },
    async getGames(req, res) {
        try {
            const id = req.params.id;
            const gameData = await Game.findOne({_id :id})
            res.send(gameData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    },
    async getGamesByCategory(req, res) {
        try {
            const id = req.params.id;
            const gameData = await Game.find({categoryId:id})
            res.send(gameData)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    async updateGame(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const gameData = await Game.findByIdAndUpdate(id,updateData)
            res.send(gameData)
        } catch (error) {
            console.log(error)
            res.status(400).send({message: error.message})
        }
    },
    async deleteGame(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const gameData = await Game.findByIdAndDelete(id)
            res.send(gameData)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}