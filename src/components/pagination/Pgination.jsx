import React from 'react'

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const pagination = ({limit, total, offset, setOffset}) => {

  const currentPage = offset ? (offset / limit) + 1 : 1;
  // existe offset? (sim) = offset / limit(de item na pagina) + 1 ou 1
  const pages = Math.ceil(total / limit);
  //Math.ceil = teto; para nao dar numeros quebrados
  const frist = Math.max(currentPage - MAX_LEFT, 1);
  //pegar o maior numero, para não dar numero negativo na paginação

  return (
    <ul>
      {Array.from({ length: MAX_ITEMS }).map((_, index) => index + frist).map((page) => (
        <li>
          <button onclick={()=> setOffset((page - 1) * limit)}>{page}</button>
        </li>
      ))}
    </ul>
  )
}

export default pagination