
import { Books } from '../components/BookForm'
export const sortBooks = (a:string,b:string,sortBy:string,sortOrder:string,books:Books):number =>{
  if (sortBy === 'title' ) {
    if(sortOrder === 'asc') return books[a].title.localeCompare(books[b].title)
    else return books[b].title.localeCompare(books[a].title)
    
  }
  if (sortBy === 'publishingYear' ) {
    let newA = Number(books[a].publishingYear || 0) 
    let newB = Number(books[b].publishingYear || 0)
    if(sortOrder === 'asc') return newA-newB
    else return  newB-newA
  }
  return 0
}
