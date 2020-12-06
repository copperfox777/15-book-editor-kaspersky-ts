import React from 'react'
import { Card, Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { BookType } from './BookForm';
import { EditOutlined, ReadOutlined, AntDesignOutlined  } from '@ant-design/icons';

type BookCardProps = {
  book:BookType
}

export const BookCard: React.FC<BookCardProps> = ({book}) => {

  const history = useHistory()
  return(
    <Card
    style={{ width: 300 }}
    cover={<Avatar className="home__bookimg" src={book.image} shape="square" size={300} icon={<AntDesignOutlined/>}/>}
    actions={[
      <ReadOutlined key="read" alt="Read book" />,
      <EditOutlined key="edit" alt="Edit book" onClick={()=>{history.push(`/editbook/${book.id}`)}} />
    ]}
  >
  <Card.Meta 
  title={`${book.title}`}
  description={
    <>
      <p>{`${book.authors[0].first} ${book.authors[0].last}`}</p>
      <p> {`Издательство: ${book.publishingHouse}`}</p>
      <p> {`Год публикации: ${book.publishingYear || "Не указан"}`}</p>
    </>
  } 
  />
</Card>
  )
}