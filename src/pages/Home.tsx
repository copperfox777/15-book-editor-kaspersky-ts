import React, { useState } from 'react';
import { Card, Avatar,Select, Space } from 'antd';
import { EditOutlined, ReadOutlined, AntDesignOutlined  } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { sortBooks } from '../helpers/sortBooks' 

const { Option } = Select;


export const Home: React.FC = () =>{
  const books = JSON.parse(localStorage.getItem("books") || '{}');
  const bookIds: string[] = JSON.parse(localStorage.getItem("bookIds") || '[]');
  const sortParams = JSON.parse(localStorage.getItem("sortParams") || '{"by":"title","order":"asc"}')
  const history = useHistory()
  const [sortBy, setSortBy] = useState(sortParams.by)
  const [sortOrder, setSortOrder] = useState(sortParams.order)
   
  const sortedIds = [...bookIds].sort((a,b)=> sortBooks(a,b,sortBy,sortOrder,books))

  function handleChange(value:string,name:string) {
    console.log(`selected ${value}`);
    if(name === 'sortBy') {
      setSortBy(value)
      localStorage.setItem("sortParams", JSON.stringify({by:value, order: sortOrder}))
    }
    if(name === 'order') { 
      setSortOrder(value)
      localStorage.setItem("sortParams", JSON.stringify({by:sortBy, order: value}))
    }
  }

  return (
    <div>
      <Space>
        <span>Сортировка по:</span>
        <Select defaultValue={sortBy} style={{ width: 160 }}onChange={(value)=>handleChange(value,'sortBy')}>
          <Option value="title">Заголовок</Option>
          <Option value="publishingYear">Год публикации</Option>
        </Select>
        <span>Напраление:</span>
        <Select defaultValue={sortOrder} style={{ width: 120 }} onChange={(value)=>handleChange(value,'order')}>
            <Option value="asc">По возрастанию</Option>
            <Option value="desc">По убыванию</Option>
        </Select>
      </Space>    
      <div className="home__boolkist">
        {sortedIds.length > 0 && sortedIds.map((id:string,index)=>{
          return( 
            <Card
              key={id}
              // hoverable
              style={{ width: 300 }}
              cover={<Avatar className="home__bookimg" src={books[id].image} shape="square" size={300} icon={<AntDesignOutlined/>}/>}
              actions={[
                <ReadOutlined key="read" alt="Read book" />,
                <EditOutlined key="edit" alt="Edit book" onClick={()=>{history.push(`/editbook/${id}`)}} />
              ]}
            >
            <Card.Meta 
            title={`${books[id].title}`}
            description={
              <>
                <p>{`${books[id].authors[0].first} ${books[id].authors[0].last}`}</p>
                <p> {`Издательство: ${books[id].publishingHouse}`}</p>
                <p> {`Год публикации: ${books[id].publishingYear || "Не указан"}`}</p>
              </>
            } 
            />
          </Card>
          )
        })}
        {sortedIds.length ? null : <p>Книг пока нет, но вы можете добавить нажав соответствующую кнопку</p> }
      </div>
    </div>
  );
}