function thirdJobFun(data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== "number") reject("error");

    if (data % 2 === 1) setTimeout(() => resolve("odd"), 1000);

    if (data % 2 === 0) setTimeout(() => reject("even"), 2000);
  });
}

thirdJobFun("not a number")
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

thirdJobFun(1)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

thirdJobFun(2)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

async function getPromise(arg) {
  try {
    let asyncAwaitVariable = await thirdJobFun(arg);
    console.log("success async await");
  } catch {
    console.log("error async await");
  }
}

getPromise("not a number");
getPromise(1);
getPromise(2);
