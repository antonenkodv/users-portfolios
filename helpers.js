const path = require("path");
const uuid = require("uuid4");
const fs = require("fs");
const multer = require('multer')


const helpers = {
    checkLimitedAccessUrl(originalUrl) {

        const usersEndpoints = ['/users/refresh_tokens', '/users/logout', '/users/delete']
        const portfolioEndpoints = ['/portfolio/create', '/portfolio/get_user_portfolio', '/portfolio/delete']
        const imagesEndpoints = ['/images/upload', 'images/add_comment', '/images/delete_image']

        const allCloseEndpoints = [...usersEndpoints, ...portfolioEndpoints, ...imagesEndpoints]

        return allCloseEndpoints.find(item => item === originalUrl) ? true : false
    },
    multerHelper() {
        let storage = multer.diskStorage({
            destination: async function (req, file, cb) {
                try {
                    const filePath = path.join(__dirname, `./public/images`)
                    if (!fs.existsSync(filePath)) {
                        fs.mkdirSync(filePath, {recursive: true})
                    }
                    cb(null, filePath);
                } catch (err) {
                    console.log(err)
                }
            },
            filename: function (req, file, cb) {
                cb(null, uuid() + '-' + file.originalname);
            }
        })
        const upload = multer({storage: storage})
        return upload.single('image');
    },
    deleteFiles(files, callback) {
        let i = files.length;
        try {
            files.forEach(function (filename) {
                i--;
                const filepath = path.join(__dirname, `./public/images/${filename}`)
                fs.unlinkSync(filepath)
                if (i <= 0) callback(null)
            });
            return files
        } catch (err) {
            callback(err)
        }
    }
}

module.exports = helpers