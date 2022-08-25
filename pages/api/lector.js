import path from 'path';
import fs from 'fs';

let files = [
    '2022-08-08.json',
    '2022-08-09.json',
    '2022-08-10.json',
    '2022-08-12.json',
    '2022-08-13.json',
    '2022-08-14.json',
    '2022-08-15.json',
    '2022-08-16.json',
    '2022-08-17.json',
    '2022-08-18.json',
    '2022-08-19.json',
    '2022-08-20.json',
    '2022-08-21.json',
    '2022-08-22.json',
    '2022-08-23.json'
]

export default async function handler(req, res) {

    let acumulador = []

    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileContents = fs.readFileSync(jsonDirectory + "/" + file);
        const json = JSON.parse(fileContents);
        acumulador = acumulador.concat(json)
    }

    //Return the content of the data file in json format
    res.status(200).json(acumulador);
}