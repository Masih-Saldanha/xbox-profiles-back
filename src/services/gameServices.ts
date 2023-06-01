import accountServices from "./accountServices.js";

async function findGame() {
  const id1 = "1667881927";
  const id2 = "724369121";

  const xl = await accountServices.xboxRequester();
  const request = await xl.title.get(id1);
  console.log(request);
  return request;
}

const gameServices = {
  findGame,
};

export default gameServices;