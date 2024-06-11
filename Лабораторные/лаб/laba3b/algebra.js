function square(x) {
  return new Promise((resolve, reject) => {
    if (typeof x === "number") resolve(Math.pow(x, 2));

    reject("Invalid data");
  });
}

function cube(x) {
  return new Promise((resolve, reject) => {
    if (typeof x === "number") resolve(Math.pow(x, 3));

    reject("Invalid data");
  });
}

function fourthPower(x) {
  return new Promise((resolve, reject) => {
    if (typeof x === "number") resolve(Math.pow(x, 4));

    reject("Invalid data");
  });
}

const invalidValue = "3";
const validValue = 3;

Promise.all([
  square(invalidValue),
  cube(invalidValue),
  fourthPower(invalidValue),
])
  .then((result) => {
    console.log("Square:", result[0]);
    console.log("Cube:", result[1]);
    console.log("Fourth Power:", result[2]);
  })
  .catch((error) => {
    console.error(error);
  });

Promise.all([square(validValue), cube(validValue), fourthPower(validValue)])
  .then((result) => {
    console.log("Square:", result[0]);
    console.log("Cube:", result[1]);
    console.log("Fourth Power:", result[2]);
  })
  .catch((error) => {
    console.error(error);
  });
