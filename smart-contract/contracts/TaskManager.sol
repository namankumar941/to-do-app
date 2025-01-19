// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//contract to store completed task
contract TaskManager {

    struct Task {
        string taskHash; // Unique hash of the task details
        uint256 completionDate; // Timestamp of task completion
    }

    mapping(uint256 => Task) public tasks;
    
    uint256 public taskCount;

    event TaskCompleted(uint256 taskId, string taskHash, uint256 completionDate);

    // Function to store completed task details
    function storeTask(string memory _taskHash, uint256 _completionDate) public payable {
        tasks[taskCount] = Task(_taskHash, _completionDate);
        emit TaskCompleted(taskCount, _taskHash, _completionDate);
        taskCount++;
    }

    // Function to verify if a task hash exists
    function verifyTask(string memory _taskHash,uint256 _completionDate ) public view returns (bool) {
        for (uint256 i = 0; i < taskCount; i++) {
            if (keccak256(abi.encodePacked(tasks[i].taskHash)) == keccak256(abi.encodePacked(_taskHash)) && _completionDate == tasks[i].completionDate ) {
                return true;
            }
        }
        return false;
    }
}