import {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/index.css'
import Card from '../components/cards/card'

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.log(error));
  }, []);



  const [values, setValues] = useState<any>();
  const [listGames, setListGames] = useState<any>()

  const handleClickButton = () => {
    axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      console.log("tudo certo por aqui!")
    })
  }
  

  useEffect(()=>{
    axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data)
    })
  },[])

  const handleChangeValues = (value:any) => {
    setValues((prevValue: any) => ({ 
      ...prevValue,
      [value.target.name]: value.target.value,

    }))
  }
  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title ">Scrim games</h1>
        <input className='register-input'type="text" placeholder="Nome" name="name" onChange={handleChangeValues}/>
        <input className='register-input' type="text" placeholder="Preço" name="cost"onChange={handleChangeValues}/> 
        <input className='register-input' type="text" placeholder="Categoria" name="category" onChange={handleChangeValues}/>   
        <button className="register-button" onClick={handleClickButton}>Cadastrar</button>
      </div>
      {typeof listGames !== "undefined" && listGames.map((value: string | any) => {
       return <Card 
            key={value.id} 
            listCard={listGames}
            setListCard={setListGames}
            id={value.id}
            name={value.name}
            cost={value.cost}
            category={value.category}
            ></Card>
      })}
    </div>
  )
}

export default App