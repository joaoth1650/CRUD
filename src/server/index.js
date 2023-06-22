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
    if(err)console.log(err);
    else res.send(result)
  })
})

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM games"

  db.query(SQL, (err, result) => {
    if(err) console.log(err);
    else res.send(result)
  })
})

app.put("/edit", (req, res) => {
  const {id} = req.body
  const {name} = req.body
  const {cost} = req.body
  const {category} = req.body

  let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?"

  db.query(SQL,[name, cost, category, id], (err, results) => {
    if(err) console.log(err);
    else res.send(results);
  })
})

app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;

  const SQL = "DELETE FROM games WHERE id = ?";

  db.query(SQL,[id], (err, results) => {
    if(err) console.log(err);
    else res.send(results);
  })
})

app.listen(3001, () => {
  console.log(`Servidor está executando na porta`);
});
