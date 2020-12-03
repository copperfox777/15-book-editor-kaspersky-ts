export const uniqId: (length:number) => string = (length = 10) => {
  const heyStack = '0123456789abcdefghijklmnopqrstuvwxyz';
  const randomInt = () => 
    Math.floor(Math.random() * Math.floor(heyStack.length));
  return Array.from({ length }, () => heyStack[randomInt()]).join('');
};