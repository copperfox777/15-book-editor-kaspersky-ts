import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm'


export const EditBook: React.FC = () => {
    const {id} = useParams<{id:string}>();
    if(id==='new') return <BookForm  id={undefined}/>
    
    const books = JSON.parse(localStorage.getItem("books") || '{}');
    if(id in books) return  <BookForm id={id} initialValues = {books[id]} /> ;
    return <div>Some error</div>
};