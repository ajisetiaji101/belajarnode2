const fs = require('fs');
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

const simpanContact = (nama,number) => {
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

module.exports = {
    tulispertanyaan,
    simpanContact
}
