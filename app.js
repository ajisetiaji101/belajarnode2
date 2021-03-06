// const { rejects } = require('assert');
// const fs = require('fs');
// const { resolve } = require('path');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const dirFolder = './data';
// if (!fs.existsSync(dirFolder)) {
//     fs.mkdirSync(dirFolder);
// }

// const dirFile = './data/data.json';
// if (!fs.existsSync(dirFile)) {
//     fs.writeFileSync(dirFile, '[]', 'utf8')
// }

// const tulispertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama)
//         })
//     })
// }
// const pertanyaan2 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('What is Your Number Phone :', (number) => {
//             resolve(number)
//         })
//     })
// }
// const { tulispertanyaan,simpanContact } = require('./contact')

// const main = async () => {
// const nama = await pertanyaan1();
// const number = await pertanyaan2();
// const nama = await tulispertanyaan('What is Your Name :');
// const number = await tulispertanyaan('What is Your Number Phone :');
// const data = {
//     nama: nama,
//     number: number
// };
// const fileBuffer = fs.readFileSync(dirFile, 'utf8');
// const datas = JSON.parse(fileBuffer);
// datas.push(data);
// fs.writeFileSync(dirFile, JSON.stringify(datas))
// console.log("Terima Kasih" + nama + " nomor hp anda adalah " + number);
// rl.close();
//     simpanContact(nama,number);
// }
// main();

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

//Mengambil argument dari command line
// console.log(process.argv[2]);

//Mengambil argument dari command line(yargs)
const yargs = require('yargs')
const contacts = require('./contact')

// console.log(yargs.argv._[1]);
yargs.command({
    command: 'add',
    describe:'Menambahkan contact baru',
    builder:{
        nama:{
            describe:'Nama Lengkap',
            demandOption:true,
            type:'string'
        },
        number:{
            describe:'Nomor Handphone',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        // const contact = {
        //     nama : argv.nama,
        //     number : argv.number 
        // };
        // console.log(contact);
        contacts.simpanContact(argv.nama,argv.number);
    }
})
yargs.command({
    command: 'list',
    describe:'Melihat daftar nama contact',
    handler(){
        contacts.lihatContact();
    }
})

// detail isi contact berdasarkan nama
yargs.command({
    command: 'detail',
    describe:'Melihat isi nama contact',
    builder:{
        nama:{
            describe:'Nama Lengkap',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
});


yargs.command({
    command: 'hapus',
    describe:'Menghapus contact',
    builder:{
        nama:{
            describe:'Nama Lengkap',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        contacts.hapusContact(argv.nama);
    }
}).demandCommand();

//menampilkan semua nama contact



yargs.parse();