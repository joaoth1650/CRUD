import {useState} from 'react'


const App = () => {
  const [values, setValues] = useState();

  const handleClickButton = () => {
    console.log(values)
  }

  const handleChangeValues = (value:any) => {
    setValues((prevValue: any) => ({ 
      ...prevValue,
      [value.target.name]: value.target.value,

    }))
  }
  return (
    <div className="container">
      <div className="container">
        <h1>Scrim games</h1>
        <input type="text" placeholder="Nome" name="name" onChange={handleChangeValues}/>
        <input type="text" placeholder="Preço" name="cost"onChange={handleChangeValues}/> 
        <input type="text" placeholder="Categoria" name="category" onChange={handleChangeValues}/>   
        <button onClick={handleClickButton}>Cadastrar</button>
      </div> 
    </div>
  )
}

export default App