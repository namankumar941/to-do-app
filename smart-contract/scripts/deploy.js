async function main() {
    const TaskManager = await ethers.getContractFactory("TaskManager");
    const taskManager = await TaskManager.deploy();
    await taskManager.deployed();
    console.log("TaskManager deployed to:", taskManager.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
