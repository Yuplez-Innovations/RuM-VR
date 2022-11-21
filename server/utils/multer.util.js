const fs = require('fs');
const path = require('path');
const multer = require('multer')

exports.filesUpload = multer({
    storage: multer.diskStorage({
        destination: async function (req, file, cb) {
            const { name } = req.body
            const dir = `../Resources/${name}`
            await fs.access(path.join(__dirname, `../Resources/${name}`), async (error) => {
                if (error) {
                    await fs.mkdir(path.join(__dirname, `../Resources/${name}`), (e) => {
                        cb(null, `Resources/${req.body.name}`)
                    })
                }
                else {
                    cb(null, `Resources/${req.body.name}`)

                }
            })
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        },
    }), limits: { fieldSize: 25 * 1024 * 1024 }
})