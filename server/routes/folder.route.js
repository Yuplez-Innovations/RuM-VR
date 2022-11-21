const express = require('express')
const router = express.Router()

const { getFolders, createFolder, uploadFolder, getEachFolder, fetchFiles } = require('../controllers/folder.controller')
const { filesUpload } = require('../utils/multer.util')

router.route('/').get(getFolders)
router.route('/each').post(getEachFolder)
router.route('/create').post(createFolder)
router.route('/upload').post(filesUpload.array('files'), uploadFolder)
router.route('/fetch/:name/:file').get(fetchFiles)

module.exports = router 