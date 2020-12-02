import React, {useState} from 'react';
import BookForm, { FieldData } from '../components/BookForm'


export const EditBook: React.FC = () => {
    const initialValues = {
      title: "Идиот",
      authors: [{ first: "Фёдор", last: "Достоевский" }],
      isbn: "111-1111-111",
      numberOfPages: 4095,
      publishingHouse: "AST",
      publishingYear: 2000,
      upload: undefined,
    };

  return (
    <>
      <BookForm
        initialValues = {initialValues}
        // fields={fields}
        // onChange={
        //   newFields => {
        //     console.log(newFields)
        //     setFields(newFields);
        //   }
        // }
      />
    </>
  );
};