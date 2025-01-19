require("dotenv").config();
const OpenAI = require("openai");

const messageContent = `find the position of new task based on the comparison of Due Date and relative importance of task as per taskDetails of new task and tasks in json file.

                    After finding the position where new task is to be placed return an integer array containing two elements: [priorityStart, priorityEnd]. 
                    These two elements represent the priority numbers from the tasks in the JSON file where the new task should be placed, based on the following conditions:
                    
                    Conditions:
                        1. If the new task should be at the start:
                            1. Set the first element of the array to 0.
                            2. Set the second element to the priority of the first task in the JSON file.
                        2. If the new task should be at the end:
                            Set both elements of the array to the priority of the last task in the JSON file plus 1.
                        3. If the new task should be inserted between two existing tasks:
                            Set the first element of the array to the priority number of the task before the new task.
                            Set the second element of the array to the priority number of the task after the new task.`;

//----------------------------------------------openAI class----------------------------------------------
class ChatGpt {
  //function to get required output from openai api
  async chatGPT(oldToDoList, newEntry) {
    //create open ai connection
    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
    });

    const response = await openai.chat.completions.create({
      //ask openAI where new task is to be added
      messages: [
        {
          role: "system",
          content: `${oldToDoList} 
                    above is a a JSON file that contains multiple tasks. Each task includes taskDetails, dueDate, and a priority number. 
                    Additionally, a new task is taskDetails: ${newEntry.taskDetails} and dueDate: ${newEntry.dueDate} with its taskDetails and dueDate, but without a priority number.
                    ${messageContent} `,
        },
      ],
      model: "gpt-4o",
    });

    const finalResponse = await openai.chat.completions.create({
      //get priority number of new task from openAI
      messages: [
        {
          role: "system",
          content: ` ${response.choices[0].message.content}
            Read above explanation and return sum of both element of final resulted integer array only so that i can use that integer value in my javascript program 
            Return only the sum of the two elements in the resulting integer array as an integer (e.g., 3) without any explanation or additional text.`,
        },
      ],
      model: "gpt-4o",
    });

    return finalResponse.choices[0].message.content;
  }
}

module.exports = ChatGpt;
