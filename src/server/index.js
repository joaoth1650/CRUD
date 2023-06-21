import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "joao",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const {name} = req.body;
  const {cost} = req.body;
  const {category} = req.body;

  let SQL = "INSERT INTO games (name, cost, category) VALUES ( ?,?,? )";

  db.query(SQL,[name, cost, category], (err, result) => {
    console.log(err);
  })
})

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM games"

  db.query(SQL, (err, result) => {
    if(err) console.log(err);
    else res.send(result)
  })
})

app.listen(3001, () => {
  console.log(`Servidor está executando na porta`);
});
