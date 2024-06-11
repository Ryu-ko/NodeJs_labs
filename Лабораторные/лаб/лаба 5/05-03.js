const {send} = require('./m05_STS.js')

async function main() {
    let from = ' tanyaandsidney@gmail.com';
    let to = ' tanyaandsidney@gmail.com';
    let pass = 'gdyuzutclqshvgdt';
    let message = 'Hello from 05-03!';
  
    try {
      await send(from, to, pass, message);
      console.log('Функция send успешно выполнена');
    } catch (error) {
      console.error('Произошла ошибка при выполнении функции send:', error);
    }
}
  
main();