import {Rule } from '../../node_modules/rc-field-form/lib/interface'

type RuleObject = { [prop:string]: Rule[] }

export const validation: RuleObject = {
  title: [
    {required: true, message: 'Username is required!' },
    {min:1,message: 'Title is too short'},
    {max:30, message: 'Title is too long'}
  ],
  firstName: [
    { required: true, message: 'Field is required!' },
    {max:20, type:'string', message: 'Field is too long'}
  ],
  seccondName: [
    { required: true, message: 'Missing seccond name' },
    {max:20, type:'string', message: 'Field is too long'}
  ],
  lastName: [
    { required: true, message: 'Missing last name' },
    {max:20, type:'string', message: 'Field is too long'}
  ],
  numberOfPages:[
    {required: true, message: 'Field is required!' },
    {min:1, max:10000, type:'number', message: 'Number of pages must be from 1 to 10000'},
  ],
  publishingHouse: [
    {required: true, message: 'Field is required!' },
    {max:30, type:'string', message: 'Field is too long'}
  ],
  publishingYear: [ 
    {min:1800, type:'number', message: 'Year must be more then 1799'}, 
  ],
  isbn:[
    {required: true, message: 'Field is required!' },
    {pattern:/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, message: 'Only digits and dashes are allowed. 10 or 13 digits.' }, 
  ],

} 