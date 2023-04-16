import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
export const uploadImage: (imageLoc: string) => Promise<string> = async (imageLoc) => {
    const file = fs.createReadStream(imageLoc)
    const form = new FormData()
    form.append('file', file)
    return axios.post('https://media.guilded.gg/media/upload', form, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`,
        },
        params: {dynamicMediaTypeId: 'ContentMedia'},
    }).then(function (response) {
        return response.data.url;
    }).catch(function () {
        return '';
    });
}