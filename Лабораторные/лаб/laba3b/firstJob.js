function firstJobFun() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello World"), 2000);
  });
}

firstJobFun()
  .then((result) => console.log("success promise"))
  .catch((err) => console.log("error promise"));

async function getPromise() {
  try {
    let asyncAwaitVariable = await firstJobFun();
    console.log("success async await");
  } catch {
    console.log("error async await");
    
  }
}

getPromise();
