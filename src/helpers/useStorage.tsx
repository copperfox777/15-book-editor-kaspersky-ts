import React from 'react'
import { Books } from '../components/BookForm';

type SortParams = {
  by:string,
  order:string
}
export const useStorage:()=>[Books,string[],any] = ()=>{
  const books: Books = JSON.parse(localStorage.getItem("books") || '{}');
  const bookIds: string[] = JSON.parse(localStorage.getItem("bookIds") || '[]');
  const sortParams: SortParams = JSON.parse(localStorage.getItem("sortParams") || '{"by":"title","order":"asc"}');
  return [books,bookIds,sortParams]
}