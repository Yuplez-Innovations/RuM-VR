import axios from 'axios'

import { BASE_URL } from '../utils/constants.util'

export const getFolders = async () =>
    await axios.get(`${BASE_URL}/folder`)

export const getEachFolder = async (id_folder) =>
    await axios.post(`${BASE_URL}/folder/each`, { id_folder })

export const createFolder = async (name) =>
    await axios.post(`${BASE_URL}/folder/create`, { name })

export const uploadFiles = async (files) =>
    await axios.post(`${BASE_URL}/folder/upload`, files)

export const fetchFile = async (name, file) =>
    await axios.get(`${BASE_URL}/folder/fetch/${name}/${file}`)
