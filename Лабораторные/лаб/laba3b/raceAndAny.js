function square(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof x === "number") resolve(Math.pow(x, 2));

      reject("Invalid data");
    }, Math.random * 12000);
  });
}

function cube(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof x === "number") resolve(Math.pow(x, 3));

      reject("Invalid data");
    }, Math.random * 6000);
  });
}

function fourthPower(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof x === "number") resolve(Math.pow(x, 4));

      reject("Invalid data");
    }, Math.random * 3000);
  });
}

const invalidValue = "3";
const validValue = 3;

Promise.race([square("1"), cube(2), fourthPower(5)])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

Promise.any([square("1"), cube(2), fourthPower(5)])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
