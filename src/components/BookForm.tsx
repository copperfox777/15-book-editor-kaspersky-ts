import React, {useState} from 'react';
import { Form, Input, Button, Space, InputNumber, DatePicker, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { emptyBook, validation, formatValues } from '../helpers/formValidation';
import { uploadHelper, getBase64 } from '../helpers/uploadHelper';
import { uniqId} from '../helpers/uniqId';

export type BookType = {
  title: string;
  authors: {
      first: string;
      last: string;
  }[];
  isbn: string;
  numberOfPages: number | string;
  publishingHouse: string;
  publishingYear: number | string;
  releaseDate: string | undefined,
  image: string | undefined;
  id:string
}

export type Books = {
  [id:string]: BookType
}

interface BookFormProps {
  id?:string;
  add?:boolean;
  initialValues?:BookType;
}

const BookForm: React.FC<BookFormProps> = ({ initialValues = emptyBook, id }) => {
  const [loading, setLoading] = useState(false) 
  const [image, setImg] = useState<string>('')
  const history = useHistory()
  const books = JSON.parse(localStorage.getItem("books") || '{}');
  const bookIds = JSON.parse(localStorage.getItem("bookIds") || '[]');

  const handleUpload = (info:any): void => {
    if (info.file.status === 'uploading') {
      setLoading( true );
      return;
    } else {      
      getBase64(info.file.originFileObj, (image: 'string') =>{
        setImg(image)
        setLoading(false)
      });
    }
  };
 
  const handleSubmit = (values:any):void=> {
    if (!id) {
      const newId = uniqId(8)
      bookIds.push(newId)
      books[newId]={...values,image,id:newId}
    } else {
      if(initialValues.image && image==="") { 
        books[id]={...values,image:initialValues.image}
      } else {
        books[id]={...values,image}
      }
    }
    localStorage.setItem("books", JSON.stringify(books,(key,val)=>(val || "")));
    localStorage.setItem("bookIds", JSON.stringify(bookIds));
    const hide = message.info('Сохранено');
    setLoading( true );
    setTimeout(hide, 2000);
    setTimeout(()=>history.push('/'),2000)
  }

  const handleDelete = ()=>{

    const bookIds_ = bookIds.filter((x:string)=>x!==id)
    if(id) delete books[id]
    localStorage.setItem("books", JSON.stringify(books,(key,val)=>(val || "")));
    localStorage.setItem("bookIds", JSON.stringify(bookIds_)); 
    const hide = message.info('Книга удалена');
    setLoading( true );
    setTimeout(hide, 2000);
    setTimeout(()=>history.push('/'),2000)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form
      initialValues={formatValues(initialValues)}
      name="global_state"
      preserve={false}
      labelCol = {{'span': 8 }}
      wrapperCol= {{'span': 14}}
      // fields={fields}
      // onFieldsChange={(changedFields, allFields:any) => {
      //   console.log(allFields)
      //   // onChange(allFields);
      // }}
      // onValuesChange={(changedValues, allValues:any) => {
      //   console.log(allValues)
      // }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="title"
        label="Заголовок"
        rules={validation.title}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Имя, Фамилия" required={true} >   
        <Form.List name="authors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                    rules={validation.firstName}
                    required={true}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                    rules={validation.seccondName}
                    required={true}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => {
                      if(fields.length > 1) remove(field.name);}  
                    } />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add author
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>


      <Form.Item name="numberOfPages" label="Количество страниц" 
        rules={validation.numberOfPages} >
          <InputNumber />
      </Form.Item> 

      <Form.Item name="publishingHouse" label="Название издательства" 
        rules={validation.publishingHouse} >
          <Input />
      </Form.Item>

      <Form.Item name="publishingYear" label="Год публикации" 
        rules={validation.publishingYear} >
         <InputNumber/>
      </Form.Item>

      <Form.Item name="releaseDate" label="Дата выхода в тираж" >
          <DatePicker 
            format="DD.MM.YYYY"
            disabledDate={(current)=>current && current.isBefore('1800-01-01')}
          />
      </Form.Item>

      <Form.Item name="isbn" label="ISBN" 
        rules={validation.isbn} >
         <Input/>
      </Form.Item>

      <Form.Item
        name="image"
        label="Изображение"
        valuePropName="fileList"
        getValueFromEvent={uploadHelper}
      >
        <Upload 
          name="logo" 
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleUpload}
        >
          {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : initialValues.image ? <img src={initialValues.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      
      <Form.Item>
        <Space>
          <Button disabled={loading} type="primary" htmlType="submit">
            Сохранить
          </Button>
          { 
            id && <Button disabled={loading} danger onClick={handleDelete}>
                    Удалить
                  </Button>
          }
        </Space>
      </Form.Item>
    </Form>
  );
};

export default BookForm;