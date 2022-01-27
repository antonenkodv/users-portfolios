const {models: {Image, Portfolio}} = require('../db/init_db')
const {errorHandler, validateParams} = require("../validation");
module.exports = async (req, res, next) => {
    try {
        if (req.originalUrl.includes('images/delete_image')) {

            if (!validateParams([req.body.filename], "string")) {
                errorHandler('Something went wrong', 500)
            }

            const image = await Image.findOne({
                where: {
                    filename: req.body.filename
                },
                raw: true
            })
            if (!image) errorHandler('No such image',400)
            return image.owner_id === req.user.id ? next() : res.status(503).json({ok: false, message: 'Forbidden'})
        }
        if (req.originalUrl.includes('portfolio/delete')) {

            if (!validateParams([req.body.portfolio_id], "string")) {
                errorHandler('Something went wrong', 500)
            }
            const portfolio = await Portfolio.findOne({
                where: {
                    id: req.body.portfolio_id
                },
                raw: true
            })

            if(!portfolio) errorHandler('No such portfolio',400)

            return portfolio.owner_id === req.user.id ? next() : res.status(503).json({ok: false, message: 'Forbidden'})
        }
    } catch (err) {
        res.status(err.code).json({ok: false, message: err.message})
    }

}
