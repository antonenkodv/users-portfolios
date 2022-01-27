const {models: {Portfolio, Image}, sequelize} = require('../db/init_db')
const helpers = require('../helpers')
const uuid = require('uuid4')
const {errorHandler} = require("../validation");

const portfolioRepositories = {
    create({name, description ,user}) {
        const newPortfolio = {id: uuid(), name, description, owner_id: user.id}
        return Portfolio.create(newPortfolio)
            .catch(() =>errorHandler('Something went wrong',500))
    },
    getUserPortfolio({id}) {
        return Portfolio.findAll({
                where: {owner_id: id},
                required : false,
                include: {
                    model: Image,
                    attributes: []
                },
                attributes: ['id', 'name', 'owner_id',
                    [sequelize.fn('array_agg', sequelize.col('images.filename')), 'images']
                ],
                group : ['portfolio.id'],
                order: [['createdAt', 'DESC']],
                subQuery: false,
                raw: true
            }
        ).catch(()=>errorHandler('Something went wrong', 500))
    },
    deletePortfolio({portfolio_id}) {
        return Image.findAndCountAll({where: {portfolio_id}, raw: true})
            .then(images => {
                const files = []
                images.rows.forEach(item => files.push(item.filename))
                helpers.deleteFiles(files, function (err) {
                    if (err) {
                        errorHandler('Something went wrong',500)
                    } else {
                        console.log('all files were deleted')
                    }
                })
                return files
            })
            .catch(()=>errorHandler('Something went wrong',500))
            .then((files) => Image.destroy({where: {filename: files}}).then(data => data))
            .catch(() => errorHandler('Something went wrong',500))
            .then( () => Portfolio.destroy({where : {id : portfolio_id}}))
            .catch(() => errorHandler('Something went wrong',500))
    }
}

module.exports = portfolioRepositories