async function main() {
  const MessageBoard = await ethers.getContractFactory("MessageBoard");
  const messageBoard = await MessageBoard.deploy();

  await messageBoard.waitForDeployment();

  const address = await messageBoard.getAddress();
  console.log("MessageBoard deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
