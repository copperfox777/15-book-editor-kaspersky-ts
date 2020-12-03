import {Rule } from '../../node_modules/rc-field-form/lib/interface'
import {BookType} from '../components/BookForm'
import moment from 'moment'

type RuleObject = { [prop:string]: Rule[] }

export const validation: RuleObject = {
  title: [
    {required: true, message: 'Поле не может быть пустым' },
    {min:1,message: 'Заголовок слишком короткий'},
    {max:30, message: 'Не более 30 символов'}
  ],
  // credentials:[{ required: true, message: 'Поле не может быть пустым' },
  // {max:20, type:'string', message: 'Не более 20 символов'}],
  firstName: [
    { required: true, message: 'Поле не может быть пустым' },
    {max:20, type:'string', message: 'Не более 20 символов'}
  ],
  seccondName: [
    { required: true, message: 'Поле не может быть пустым' },
    {max:20, type:'string', message: 'Не более 20 символов'}
  ],
  lastName: [
    { required: true, message: 'Поле не может быть пустым' },
    {max:20, type:'string', message: 'Не более 20 символов'}
  ],
  numberOfPages:[
    {required: true, message: 'Поле не может быть пустым' },
    {min:1, max:10000, type:'number', message: 'Число от 1 до 10000'},
  ],
  publishingHouse: [
    {required: true, message: 'Поле не может быть пустым' },
    {max:30, type:'string', message: 'Не более 30 символов'}
  ],
  publishingYear: [ 
    {min:1800, type:'number', message: 'Число не менее 1800'}, 
  ],
  isbn:[
    {pattern:/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, message: 'Только цифры и тире. 10 либо 13 символов' }, 
  ],
}

export const formatValues = (values:BookType) =>{
  const date = values.releaseDate ? moment(values.releaseDate) : undefined
  const image = undefined
  return {...values,releaseDate:date,image}
}

export const emptyBook:BookType = {
  authors: [{ first: "", last: "" }],
  id: "",
  image: "",
  isbn: "",
  numberOfPages: "",
  publishingHouse: "",
  publishingYear: "",
  releaseDate: "",
  title: "",
};