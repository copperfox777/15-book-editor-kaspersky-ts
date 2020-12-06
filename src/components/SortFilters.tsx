import React, { useState } from 'react'
import { Select, Space } from 'antd';

const { Option } = Select;
type SortFilterProps = {
  handleSort:React.Dispatch<number>
}

export const SortFilters: React.FC<SortFilterProps> = ({handleSort}) => {
  const sortParams = JSON.parse(localStorage.getItem("sortParams") || '{"by":"title","order":"asc"}')
  const [sortBy, setSortBy] = useState(sortParams.by)
  const [sortOrder, setSortOrder] = useState(sortParams.order)
  
  const handleChange = (value:string,name:string) => {
    console.log(`selected ${value}`);
    if(name === 'sortBy') {
      setSortBy(value)
      localStorage.setItem("sortParams", JSON.stringify({by:value, order: sortOrder}))
    }
    if(name === 'order') { 
      setSortOrder(value)
      localStorage.setItem("sortParams", JSON.stringify({by:sortBy, order: value}))
    }
    handleSort(Math.random())
  }
  return (
    <Space>
      <span>Сортировка по:</span>
      <Select defaultValue={sortBy} style={{ width: 160 }}
        onChange={(value) => handleChange(value, "sortBy")}
      >
        <Option value="title">Заголовок</Option>
        <Option value="publishingYear">Год публикации</Option>
      </Select>
      <span>Напраление:</span>
      <Select defaultValue={sortOrder} style={{ width: 120 }}
        onChange={(value) => handleChange(value, "order")}
      >
        <Option value="asc">По возрастанию</Option>
        <Option value="desc">По убыванию</Option>
      </Select>
    </Space>
  );
}
 