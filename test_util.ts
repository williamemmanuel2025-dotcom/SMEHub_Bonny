import { checkIsOpen } from './src/utils';

console.log(checkIsOpen('8:00 AM - 7:30 PM'));
console.log("Current time minutes:", new Date().getHours() * 60 + new Date().getMinutes());
