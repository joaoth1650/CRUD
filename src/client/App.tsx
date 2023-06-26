import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';
import Card from '../components/cards/card';
import { Pagination } from '@mui/material';

const App = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [values, setValues] = useState<any>();
  const [listGames, setListGames] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listGames.slice(indexOfFirstItem, indexOfLastItem);



  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.log(error));
  }, []);

  const handleRegisterGame = () => {
    axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) => {
        setListGames([
          ...listGames,
          {
            id: response.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });
    });
  };

  const handleSearchGames = () => {
    axios.post("http://localhost:3001/search", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      setListGames([
        ...listGames,
        {
          id: response.data[0].id,
          name: values.name,
          cost: values.cost,
          category: values.category,
        },
      ]);
    });
  }

  useEffect(() => {
    axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data)
    })
  }, [])

  const handleChangeValues = (value: any) => {
    setValues((prevValue: any) => ({
      ...prevValue,
      [value.target.name]: value.target.value,

    }))
  }


  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title ">lojinha gamer</h1>
        <input className='register-input' type="text" placeholder="Nome" name="name" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Preço" name="cost" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Categoria" name="category" onChange={handleChangeValues} />
        <button className="register-button" onClick={handleRegisterGame}>Cadastrar</button>
      </div>
      
      <input type="text" onChange={handleChangeValues}/> <button onClick={handleSearchGames}>VAI</button>
     
      {currentItems.map((val: any) => (
        <Card
          listCard={listGames}
          setListCard={setListGames}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
      ))}
      <Pagination
        count={Math.ceil(listGames.length / itemsPerPage)}
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  )
}

export default App