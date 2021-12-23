const express = require('express')
const app = express()
const mysql = require("mysql")
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "banco"
})

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
   const email = req.body.email
   const password = req.body.password;

   db.query("SELECT * FROM usuarios WHERE email = ?", [email],
    (err, result) => {
        if(err) {
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)",
                [email, hash], (err, result) => {
                    if(err){
                        res.send(err)
                    } 
                    res.send({msg: "Cadastrado com sucesso!"})
                }
               )
            })
        } else {
            res.send({msg: "Usuário já cadastrado"})
        }
   })
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email],
    (err,result) => {
        if(err) {
            req.send(err)
        }
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password,
                (err, result) => {
                   if(result) {
                       res.send("Usuário está logado")
                   } else {
                       res.send("A senha está incorreta")
                   }
                });
        } else {
            res.send({msg: "Usuário não encontrado"})
        }
    })
})

app.listen(3001, () => {
    console.log("Servidor ligado")
})
