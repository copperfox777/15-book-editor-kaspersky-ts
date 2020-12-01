import React, {useState} from 'react';
import { Form, Input, Button, Space, InputNumber, DatePicker, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadHelper, getBase64 } from '../helpers/uploadHelper'
import { validation } from '../helpers/formValidation';

export interface FieldData {
  name: string|number []
  value: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface BookFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}

const BookForm: React.FC<BookFormProps> = ({ fields }) => {
  const [loading, setLoading] = useState(false) 
  const [imageUrl, setImgUrl] = useState()

  const handleUpload = (info:any): void => {
    if (info.file.status === 'uploading') {
      setLoading( true );
      return;
    } else {      
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>{
        console.log(imageUrl)
        setImgUrl(imageUrl)
        setLoading(false)
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form
      name="global_state"
      preserve={false}
      labelCol = {{'span': 6 }}
      wrapperCol= {{'span': 14}}
      // layout="inline"
      fields={fields}
      onFieldsChange={(changedFields, allFields:any) => {
        console.log(allFields)
        // onChange(allFields);
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={validation.title}
      >
        <Input />
      </Form.Item>
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
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'seccond']}
                  fieldKey={[field.fieldKey, 'seccond']}
                  rules={validation.seccondName}
                >
                  <Input placeholder="Seccond Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'last']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={validation.lastName}
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

      <Form.Item name="numberOfPages" label="Number of pages" 
        rules={validation.numberOfPages}
      >
          <InputNumber />
      </Form.Item> 

      <Form.Item name="publishingHouse" label="Publishing house" 
        rules={validation.publishingHouse}
      >
          <Input />
      </Form.Item>

      <Form.Item name="publishingYear" label="Publishing year" 
        rules={validation.publishingYear}
      >
         <InputNumber/>
      </Form.Item>

      <Form.Item name="releaseDate" label="Releas date" >
          <DatePicker 
            format="DD.MM.YYYY"
            disabledDate={(current)=>current && current.isBefore('1800-01-01')}
          />
      </Form.Item>

      <Form.Item name="isbn" label="isbn" 
        rules={validation.isbn}
      >
         <Input/>
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={uploadHelper}
      >
        <Upload name="logo" 
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleUpload}
        //action=''
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;