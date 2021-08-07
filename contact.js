const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const dirFolder = './data';
if (!fs.existsSync(dirFolder)) {
    fs.mkdirSync(dirFolder);
}

const dirFile = './data/data.json';
if (!fs.existsSync(dirFile)) {
    fs.writeFileSync(dirFile, '[]', 'utf8')
}

// const tulispertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama)
//         })
//     })
// }
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dirFile, 'utf8');
    const datas = JSON.parse(fileBuffer);
    return datas;
}

const simpanContact = (nama, number) => {
    const data = {
        nama: nama,
        number: number
    };
    const datas = loadContact();
    // const fileBuffer = fs.readFileSync(dirFile, 'utf8');
    // const datas = JSON.parse(fileBuffer);

    //cek duplikat
    const duplikat = datas.find((data) => data.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact yang dimasukkan sudah ada'));
        // rl.close();
        return false;
    }

    //cek nomor
    if (number) {
        if (!validator.isMobilePhone(number, ['id-ID'])) {
            console.log('Maaf kamu bukan orang indonesia');
            return false;
        }
    }


    datas.push(data);
    fs.writeFileSync(dirFile, JSON.stringify(datas))
    console.log("Terima Kasih" + nama + " nomor hp anda adalah " + number);
    // rl.close();
};

const lihatContact = () => {
    const datas = loadContact();
    console.log(chalk.inverse.red.bold('Daftar Kontak :'));
    datas.forEach((data, i) => {
        console.log(`${i + 1}. ${data.nama} - ${data.number}`);
    })

}

const detailContact = (nama) => {
    const datas = loadContact();
    const data = datas.find((data) => data.nama.toLowerCase() === nama.toLowerCase());
    if (!data) {
        console.log('Maaf data' + nama + ' tidak ditemukan');
        return false;
    }
    console.log(data.nama);
    console.log(data.number)
}

const hapusContact = (nama) => {
    const datas = loadContact();
    const data = datas.filter((data) => data.nama.toLowerCase() !== nama.toLowerCase());
    if (datas.length === data.length) {
        console.log(nama + ' tidak ditemukan');
        return false;
    }
    fs.writeFileSync(dirFile, JSON.stringify(data))
    console.log("data yang bernama " + nama + ' telah berhasil dihapus ');
}

module.exports = {
    // tulispertanyaan,
    simpanContact,
    lihatContact,
    detailContact,
    hapusContact
}
