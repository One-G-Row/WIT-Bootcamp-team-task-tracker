document.addEventListener("DOMContentLoaded", function(){


/* create object teamMembers with sampe data*/
let initialMembers = [
    {
       id: 1, 
       name: "Elizabeth Nyambura",
       email: "nyambura@gmail.com",
       role: "Front-End Developer"  
    },
    {
       id: 2, 
       name: "Mary Wanjiku",
       email: "marywan@mail.delware.co.ke",
       role: "Back-End Developer"  
    },
    {
       id: 3, 
       name: "James Juma",
       email: "humajames@yahoo.com",
       role: "ML Engineer"  
    },
    {
       id: 4, 
       name: "Milly Njenga",
       email: "nyambura@gmail.com",
       role: "Content Creator"  
    },
       {
       id: 5, 
       name: "Collins Njau",
       email: "njaucollins@gmail.com",
       role: "Front-End Developer"  
    },
]

/* create object tasks with sample data */
let initialTasks =  [
    { 
    id: 1,
    description: "Fix broken blog links",
    assignedTo: 1,
    completed: false 
    }, 
    { 
    id: 2,
    description: "Create events api",
    assignedTo: 2,
    completed: true
    },
    { 
    id: 3,
    description: "Deploy AI model",
    assignedTo: 3,
    completed: false 
    },
    { 
    id: 4,
    description: "Create a thought provoking post on the benefits of Tech",
    assignedTo: 4,
    completed: false 
    },
    { 
    id: 5,
    description: "Make events page responsive",
    assignedTo: 5,
    completed: true 
    },
]


/* •	Use JSON.stringify and JSON.parse to simulate local storage  */

/* get the data out of our browser local storage using localStorage.getItem("key") - retrieve json data using the key used in saving the data to local storage*/   
//get members from local storage
let storedMembers = localStorage.getItem("members")
//if there are stored members parse to object or else use the initialMembers array
let teamMembers = storedMembers ? JSON.parse(storedMembers) : initialMembers
//save to localStorage
localStorage.setItem("members", JSON.stringify(teamMembers))


//get tasks from local storage
let storedTasks = localStorage.getItem("tasks")
//if there are stored tasks parse to object or else use the initialTasks array
let teamTasks = storedTasks ? JSON.parse(storedTasks) : initialTasks
//save to localStorage
localStorage.setItem("tasks", JSON.stringify(teamTasks))


/* fetch the tasks section element */
const taskCards = document.querySelector(".task-list-cards")

   /* 2. UI COMPONENTS */
//fetch team member card elements
const teamCards = document.querySelector(".team-member-cards")

const renderMembers = () => {
//loop through each parsed team member data and append to team members container
let renderedTeam = teamMembers.forEach((member) => {
   //create element div to hold team member data
   let teamDiv = document.createElement("div")
   teamDiv.className ="members"

   //create list elements to hold member data
   let fName = document.createElement("li")
   let email = document.createElement("li")
   let role = document.createElement("li")

    //assign member names, emails and roles to each list item
    fName.textContent = member.name
    email.textContent = member.email
    role.textContent = member.role

    //append list items to teamDiv
   teamDiv.append(fName, email, role)

   //create clear button container
   let clearDiv = document.createElement("div")
   clearDiv.className = "clear-container"

   //create create filter button and reload webpage when clearButton is clicked
   let clearButton = document.createElement("button")
   clearButton.className = "clear-button"
   clearButton.textContent ="X"
   clearButton.addEventListener("click", function(){
      window.location.reload();
   })

   //append clearButton to clearDiv container
   clearDiv.appendChild(clearButton)

   //create an empty div to occupy team cards section when filtering to display results
   //let emptyDiv = document.createElement("div")
   //emptyDiv.className = "empty-div"
   //filter tasks when teamDiv is clicked to check if the team member id matches assigned to task
   teamDiv.addEventListener("click", function(){
      // Clear existing task cards
      taskCards.innerHTML = ''
       //taskCards.textContent = ''
      let filterTasks = teamTasks.forEach((task) => {
          //create div and li elements to append task content that will be displayed when filtered
         let card = document.createElement("div")
         card.className = "task-card"
         card.style.listStyle = "none"
         let description = document.createElement("li")
         let assignedTo = document.createElement("li")
         let completed = document.createElement("li")

         //create a delete button to delete a task card and its contents
         let deleteButton = document.createElement("button")
         deleteButton.className = "delete-button"
         deleteButton.textContent = "X"

         //add an eventListener to delete task when button is clicked
         deleteButton.addEventListener("click", function(){
         deleteTask(task.id)
         })

         //if assignedTo matches member.id then assign the appropriate content
         if(task.assignedTo === member.id){
            description.textContent = task.description
            assignedTo.textContent = task.assignedTo === member.id ? member.name : ''
            completed.textContent = task.completed
            card.append(deleteButton, description, assignedTo, completed)
            taskCards.append(clearDiv, card)
         }else{
            console.log("This team member cannot be found.")
         }
      })

   })
   

   teamCards.append(teamDiv)

   //click on event cards
   teamDiv.addEventListener("click", function(){
        //include functionality/interactivity you want to happen when button is clicked
    }) 
})

}
renderMembers()

/* fetch the tasks section element */
//const taskCards = document.querySelector(".task-list-cards")

const renderTasks = (task) => {
   //console.log(parsedTasks)

   const renderedTasks = teamTasks.forEach((task) => {
      //create div container to act as task card
      const taskDiv = document.createElement("div")
      //create className for task card
      taskDiv.className = "task-card"

      //create a delete button to delete a task card and its contents
      let deleteButton = document.createElement("button")
      deleteButton.className = "delete-button"
      deleteButton.textContent = "X"

      //add an eventListener to delete task when button is clicked
      deleteButton.addEventListener("click", function(){
         deleteTask(task.id)
      })

      //create list elements for destription and assignee and checkbox for completion status
      let description = document.createElement("li")
      //remove bullet points
      description.style.listStyle = "none"

      let assignee = document.createElement("li")
       //remove bullet points
      assignee.style.listStyle = "none"

      //create a complete container to hold the complete label and the checkbox for completed status
      let completedContainer = document.createElement("li")
      //create complete label
      let completeLabel = document.createElement("label")
      completeLabel.textContent = 'Complete Status:'
      //create checkbox element
      let completed = document.createElement("input")
      completed.type = "checkbox"
      completed.className ="complete-task"
      completed.checked = task.completed

      //add an eventListener to the checkbox to toggle completion status
      completed.addEventListener("change", function(){
         task.completed = completed.checked
         localStorage.setItem("tasks", JSON.stringify(teamTasks))
         toggleCompletion(task.id)
      })

      //remove bullet points
      completedContainer.style.listStyle = "none"

      //append the completeLabel and check box to the li container
      completedContainer.append(completeLabel, completed)
      

      description.textContent = `Description: ${task.description}`
      
      //filter teamMembers to match the member.id to the task.assignedTo id and display team member name
      let assignedMember = teamMembers.find((member) => member.id === task.assignedTo)
      assignedMember ? assignee.textContent = `Assigned: ${assignedMember.name}`: assignee.textContent = 'Assign'

      
      taskDiv.append(deleteButton, description, assignee, completedContainer)
   
      
      //console.log(assignee)
      //append description, assignee text and checkbox to the task div card
      

      //append taskDiv card to the task-list-cards div
      taskCards.append(taskDiv)
      
    
   }) 
   
} 


function appendSelectValues(){
/* Form Element */
/* map teamMembers and append them to the asignee option values in the Task Form */
//fetch select element task assignee
const select = document.querySelector("#task-assignee")
//use forEach to update a teamMember to the select element
const members = teamMembers.forEach((member) => {
   //create an option element
   let option = document.createElement("option")
   option.className = "assignee-options"

   //assign member name to each option element
   option.textContent= member.name

   //append option element and values to the select element
   select.appendChild(option)
})
}
appendSelectValues()

/* Filter Section */
/* Filter Tasks by team members-create button element, map team members and append to button, filter task by team member  */

//fetch filter tasks section to append buttons
/* const filterSection = document.querySelector(".filter-tasks")

const filterTasks = () => {
   //use forEach method to map teammmbers and create button element for each member trim to use initials
   teamMembers.forEach((member) => {
      let filterButtons = document.createElement("button")
      filterButtons.className = "filter-button"

      filterButtons.textContent = member.name.charAt(0)
   
      //create a div element to hold filtered tasks
      let filteredContainer = document.createElement("div")
      filteredContainer.className = "filtered-elements"

      //useAddEventListener click to filter tasks based on member id
      filterButtons.addEventListener("click", function(){
          //filter tasks based on member id
         const filteredTasks = teamTasks.filter((task) => {
            console.log(task)
            if (task.assignedTo === member.id){
               filteredContainer.innerHTML = `<li>Task Description: ${task.description}</li>  <li>Completion Status: ${task.completed}</li>`
               return "none"
            }
         })

         console.log(filteredContainer)
         filterSection.appendChild(filteredContainer)
      })

      //append buttons to filter section
      filterSection.appendChild(filterButtons)
   })
   clearFilter()
   }
filterTasks()
 */

/* clear the filter */
function clearFilter() {
//create clearFilter button and append to filter section
const clear = document.createElement("button")
clear.className = "clear-button"

clear.textContent ="Clear"
filterSection.appendChild(clear)

//fetch filteredContainer once filterSection is clicked
filterSection.addEventListener("click", () => {
   let filteredElements = document.querySelector(".filtered-elements")
  
   //remove the fiteredContainer or filteredElements once the clear button is clicked
   clear.addEventListener("click", () => {
      filterSection.removeChild(filteredElements)
   })
})

}

function createTask() {
   //fetch task description and task assignee
   let taskDescription = document.querySelector('#task-description')
   let taskAssignee = document.querySelector("#task-assignee")

   //fetch form button to submit new task
   let submitButton = document.querySelector('#task-button')

   
   //use addEventListener to listen for change in the either of the inputs/select elements and append values to teamTasks Array
   taskDescription.addEventListener("input", () => {
      //add new key value pair description to addTask object using bracket notation when an input is added to the desription input field
      //addTask['description'] = taskDescription.value
   
   })

   taskAssignee.addEventListener("change", (e) => {
      //add new key value pair assignedTo to the addTask object using dot notation
      //addTask.assignedTo = taskAssignee.value
      return e.target.value
      
   })

   //***think about using a form instead of button and preventing the default behaviour of the form
/*    let taskForm = document.querySelector(".task-form")
   taskForm.addEventListener('submit', (e) => {
      e.preventDefault() */

   //add an eventListener to button so when submit button is clicked append new task to the team tasks array
  submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      //fetch the selected member object from the teamMembers array of objects
      let selectedMember = teamMembers.find(mem => mem.name === taskAssignee.value)
      console.log(selectedMember)
      //create a new task object every time the button is clicked
      let addTask = {
         id: teamTasks.length + 1,
         description: taskDescription.value,
         assignedTo: selectedMember ? selectedMember.id : null ,
         completed: false
      }

      console.log

      //append addTask object to teamTasks array of objects
      //ensure that both the description and assignee fields are filled
      if (addTask.description !== '' && addTask.assignedTo !== null){
         teamTasks.unshift(addTask)
      }else{
         alert("Please fill in both the description and assignee fields")
      }


      //save to localStorage
      localStorage.setItem("tasks", JSON.stringify(teamTasks))

      // Clear existing task cards
      taskCards.innerHTML = ''

      // Clear form inputs
      taskDescription.value = ''
      taskAssignee.value = ''

      renderTasks()
      console.log(teamTasks)
   })
  //make the new additions persistent to the localStorage
}
renderTasks()

createTask()

console.log(teamTasks)

//delete a rendered task
function deleteTask(id){
//fetch teamTasks
teamTasks = teamTasks.filter((task) => task.id !== id)

//update to localStorege  
localStorage.setItem("tasks", JSON.stringify(teamTasks)) 
      
//clear and re-render the task cards
taskCards.innerHTML = ''
renderTasks()
}

//toggle completeion and update localStorage
function toggleCompletion(id){
   //use find method to find the task with the matching id
   teamTasks.find((task) => {
      return task.id === id
   })

   task = teamTasks.find((task) => task.id === id)
   
   //toggle the completed status if completed is true make it false and vice versa  
   if (task){
      task.completed === !task.completed;
      localStorage.setItem("tasks", JSON.stringify(teamTasks))
      //renderTasks()
   }
}
})

