const { v4: uuidv4 } = require("uuid");

function createOrder(card) {
  return new Promise((resolve, reject) => {
    const isValid = validateCard(card);
    if (!isValid) reject("Card is not valid");

    const id = uuidv4();
    setTimeout(() => resolve(id), 5000);
  });
}

function validateCard(cardNumber) {
  console.log("Card number: " + cardNumber);
  return Math.random() < 0.5;
}

function proceedToPayment(orderNumb) {
  console.log("Order ID:" + orderNumb);
  const rand = Math.random() < 0.5;

  return new Promise((resolve, reject) => {
    if (rand) resolve("Payment successfull");

    reject("Payment failed");
  });
}

createOrder("5454 0300 3828 7098")
  .then((result) => proceedToPayment(result))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

async function getPromise(card) {
  try {
    let asyncAwaitId = await createOrder(card);
    const result = await proceedToPayment(asyncAwaitId);
    console.log(result + " async await");
  } catch (err) {
    console.log(err + " async await");
  }
}

getPromise("2121 6333 8030 3859");
