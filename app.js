
const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 9000;

// vuew engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'guntur',
    password: '0000',
    database: 'data_penduduk'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM data_penduduk', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'DATA-PENDUDUK',
            data: hasil
        });
    });
});

app.post('/penduduk', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var ALAMAT = req.body.inputALAMAT;
    var TTL = req.body.inputTTL;
    var GOLONGAN_DARAH = req.body.inputGOLONGAN_DARAH;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO data_penduduk(NAMA, ALAMAT, TTL, GOLONGAN_DARAH, telepon)values(?,?,?,?,?)',
    [NAMA, ALAMAT, TTL, GOLONGAN_DARAH, telepon],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

app.get('/hapus-NAMA/:NAMA', (req, res) => {
    var NAMA = req.params.NAMA; 
    koneksi.query("DELETE FROM data_penduduk WHERE NAMA=?", 
    [NAMA], (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
)
});

app.listen(port, () => {
    console.log(`app berjalan pada port ${port}`);
});
