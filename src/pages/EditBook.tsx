import React, {useState} from 'react';
import BookForm, { FieldData } from '../components/BookForm'


export const EditBook: React.FC = () => {
  const [fields, setFields] = useState(
    [
      { "touched": true, "validating": false, "errors": [], "name": [ "title" ], "value": "Идиот" },
      { "touched": true, "validating": false, "errors": [], "name": [ "authors" ], "value": [ { "first": "Фёдор", "seccond": "Михайлович", "last": "Достоевский" } ] }, { "touched": true, "validating": false, "errors": [], "name": [ "authors", 0, "first" ], "value": "Фёдор" }, { "touched": true, "validating": false, "errors": [], "name": [ "authors", 0, "seccond" ], "value": "Михайлович" }, { "touched": true, "validating": false, "errors": [], "name": [ "authors", 0, "last" ], "value": "Достоевский" }
    ] as FieldData[]); 

  return (
    <>
      <BookForm
        fields={fields}
        onChange={newFields => {
          console.log(newFields)
          setFields(newFields);
        }}
      />
      <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
    </>
  );
};