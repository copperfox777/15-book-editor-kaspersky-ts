import React from 'react';
import { Form, Input, Button, Space, InputNumber, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
//TODO: import momentjs type
function disabledDate(current:any) {
  // Can not select days before today and today
  return current && current.isBefore('1800-01-01');
}


const BookForm: React.FC<BookFormProps> = ({ onChange, fields }) => {
  return (
    <Form
      name="global_state"
      preserve={false}
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
        rules={[
          {required: true, message: 'Username is required!' },
          {min:1,message: 'Title is too short'},
          {max:30, message: 'Title is too long'}
        ]}
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
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'seccond']}
                  fieldKey={[field.fieldKey, 'seccond']}
                  rules={[{ required: true, message: 'Missing seccond name' }]}
                >
                  <Input placeholder="Seccond Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'last']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => {
                  console.log(field.name);
                  console.log(fields);
                  if(fields.length > 1)
                  remove(field.name);
                  console.log(fields)}} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item name="numberOfPages" label="Number of pages" 
        rules={[
          {required: true, message: 'Field is required!' },
          {min:1, max:10000, type:'number', message: 'Number of pages must be from 1 to 10000'},
          // {max:30, type:'number', message: 'Number of pages is too big'}
        ]}
      >
          <InputNumber />
      </Form.Item> 

      <Form.Item name="publishingHouse" label="Publishing house" 
        rules={[
          {required: true, message: 'Field is required!' },
          {max:30, type:'string', message: 'Field is too long'}
        ]}
      >
          <Input />
      </Form.Item>

      <Form.Item name="publishingYear" label="Publishing year" 
        rules={[ {min:1800, type:'number', message: 'Year must be more then 1799'}, ]}
      >
         <Input/>
      </Form.Item>

      <Form.Item name="releaseDate" label="Releas date" 
        rules={[ {min:1800, type:'number', message: 'Year must be more then 1799'}, ]}
      >
          <DatePicker 
            format="DD.MM.YYYY"
            disabledDate={disabledDate}
          />
      </Form.Item>

      <Form.Item name="isbn" label="isbn" 
        rules={[
          {required: true, message: 'Field is required!' },
          {pattern:/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, message: 'Only digits and dashes are allowed. 10 or 13 digits.' }, 
        ]}
      >
         <Input/>
      </Form.Item>
      
      <Form.Item name="image" label="Image" 
        rules={[ {min:1800, type:'number', message: 'Year must be more then 1799'}, ]}
      >
         <Input/>
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