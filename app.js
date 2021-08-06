const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirFolder = './data';
if (!fs.existsSync(dirFolder)) {
    fs.mkdirSync(dirFolder);
}

const dirFile = './data/data.json';
if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile, '[]', 'utf8')
}

const tulispertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        })
    })
}
// const pertanyaan2 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('What is Your Number Phone :', (number) => {
//             resolve(number)
//         })
//     })
// }

const main = async () => {
    // const nama = await pertanyaan1();
    // const number = await pertanyaan2();
    const nama = await tulispertanyaan('What is Your Name :');
    const number = await tulispertanyaan('What is Your Number Phone :');
    const data = {
        nama: nama,
        number: number
    };
    const fileBuffer = fs.readFileSync(dirFile, 'utf8');
    const datas = JSON.parse(fileBuffer);
    datas.push(data);
    fs.writeFileSync(dirFile, JSON.stringify(datas))
    console.log("Terima Kasih" + nama + " nomor hp anda adalah " + number);
    rl.close();
}
main();

// rl.question('What is Your Name :', (nama) => {
//     rl.question('What is your number phone :', (number) => {
//         const data = {
//             nama: nama,
//             number: number
//         };
//         const fileBuffer = fs.readFileSync(dirFile, 'utf8');
//         const datas = JSON.parse(fileBuffer);
//         datas.push(data);
//         fs.writeFileSync(dirFile,JSON.stringify(datas))
//         console.log("Terima Kasih" + nama + " nomor hp anda adalah " + number);
//         rl.close();
//     })
// })