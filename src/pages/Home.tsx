import React, { useState } from 'react';


import { SortFilters } from '../components/SortFilters' 
import { sortBooks } from '../helpers/sortBooks' 
import { useStorage } from '../helpers/useStorage'
import { BookCard } from '../components/BookCard';


export const Home: React.FC = () =>{
  const [books,bookIds,sortParams] = useStorage()
  const [sort, handleSort] = useState(0)
  console.log(sort)
   
  const sortedIds = [...bookIds].sort((a,b)=> sortBooks(a,b,sortParams.by,sortParams.order,books))

  return (
    <div>
      <SortFilters handleSort={handleSort}/>
      
      <div className="home__boolkist">
        {sortedIds.length > 0 && sortedIds.map((id:string,index)=><BookCard key={id} book={books[id]} />)}
        {sortedIds.length ? null : <p>Книг пока нет, но вы можете добавить нажав соответствующую кнопку</p> }
      </div>
    </div>
  );
}