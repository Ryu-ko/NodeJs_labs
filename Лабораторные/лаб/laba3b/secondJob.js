function secondJobFun() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Error"), 3000);
  });
}

secondJobFun()
  .then((result) => console.log("success promise"))
  .catch((err) => console.log("error promise"));

async function getPromise() {
  try {
    let asyncAwaitVariable = await secondJobFun();
    console.log("success async await");
  } catch {
    console.log("error async await");
  }
}

getPromise();
