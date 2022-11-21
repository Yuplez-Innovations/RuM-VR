var uniqid = require('uniqid');
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');

const { User, Folder } = require('../database/database')

exports.getFolders = async (req, res) => {
    const folders = await Folder.findAll({ raw: true })
    res.json(folders)
}

exports.getEachFolder = async (req, res) => {
    try {

        const { id_folder } = req.body
        const folder = await Folder.findOne({ id_folder, raw: true })
        try {

            const folders = await fs.readdirSync(path.join(__dirname, `../Resources/${folder.name}`))
            res.json({ ...folder, files: folders })
        } catch (error) {
            res.json({ ...folder, files: [] })

        }
        // console.log("🚀 ~ file: folder.controller.js ~ line 17 ~ exports.getEachFolder= ~ folders", folders)
    } catch (error) {
        console.log(error)
        res.json(error)

    }
}

exports.createFolder = async (req, res) => {
    const { name } = req.body

    const id_user = uniqid()
    const id_folder = uniqid()

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(name, salt);

    const user = await User.create({
        id_user,
        name: name,
        email: name.re + '@randm.com',
        password: hash
    })

    const folder = await Folder.create({
        id_folder,
        name: name,
    })

    res.json('ok')
}

exports.uploadFolder = async (req, res) => {
    res.json('ok')
}

exports.fetchFiles = async (req, res) => {
    const { name, file } = req.params
    const filePath = path.join(__dirname, `../Resources/${name}/${file}`)
    res.sendFile(filePath)
}