"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);    
      break;
    case 'no':
      // TODO: search by traits
      searchReasults = searchOptions(people)
      break;
      default:
        alert("Invalid input. Please try again!");
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  let personName = `${person[0].firstName} ${person[0].lastName}`;
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt(`Found ${personName}. Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'`);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    searchForFamily(people,person, personName);
    break;
    case "descendants":
    // TODO: get person's descendants
    searchForDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchForFamily(people,person,personName){
 
  let descendantsArray = [];
  let spouse = getSpouse(people, person,personName);
  let parentsArray = getParents(people, person, personName);
  let siblingsArray = getSiblings(people, person,  personName);
  descendantsArray = getChildren(people, person, personName, descendantsArray);
  displayFamily(spouse, parentsArray, siblingsArray, descendantsArray);
}
function getSpouse(people, person,personName){  
  let spouse;
  for (var i = 0; i < people.length; i++){
    if(people[i].id === person[0].currentSpouse){
    alert(`${personName} is married to ${people[i].firstName} ${people[i].lastName}.`);
    return spouse;
      
    }
     
    
  } alert(`${personName} is not married.`)
  return false;
}
function getParents(people, person,personName){ 
 let parentsArray = [];
  parentsArray =  people.filter(function(el){
    if(person[0].parents[0] ===el.id || person[0].parents[1] === el.id){
      parentsArray.push(el);
      return true;
    }else{
      return false;
    }
  });  if(parentsArray.length > 1){
    alert(`${parentsArray[0].firstName} ${parentsArray[0].lastName} & ${parentsArray[1].firstName} ${parentsArray[1].lastName} are the parents of ${personName}.`); 
  
  }else if(parentsArray.length === 1){
    alert(`${parentsArray[0].firstName} ${parentsArray[0].lastName} is the parent of ${personName}.`); 
  }else{
    alert(`${personName} was created from thin air! It's jsut an app..don't hurt yourself trying to understand..you won't!`); 
  }
 
  return parentsArray;
}
   


  

function getSiblings(people, person){  
  let siblingsArray = [];
  siblingsArray = people.filter(function(el){
    for (var i = 0; i < people.length; i++)
    if(el.parents.length == 0 || person[0].id === el.id){
      return false
    }else if(el.parents[0] == person[0].parents[0] || el.parents[1] == person[0].parents[1] ){
      siblingsArray.push(el);
      return true;
    }           
         
         else{
           return false;
         }     
    });   
  
  return siblingsArray;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if((person.firstName).toLowerCase() === firstName && (person.lastName).toLowerCase() === lastName){ 
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  if(foundPerson === null|| foundPerson.length === 0){
    alert("Sorry that person is not in the database.")
    return app(people);
  }else{
    return foundPerson;
  }
 
}
function searchOptions(){
  let input = promptFor("Which trait would you like to search by?" + "\n" + "1: Gender" + "\n" + "2: Height" + "\n" + "3: Weight" + "4: Eye Color" + "\n" + "5: Occupation" + "\n" + "Please Select a number or restart to start over.").toLowerCase();
  return input;

}
function runSearch(people) {
  let peopleFound = people;
  let input = searchOptions();
  peopleFound = searchBySingleTrait(foundPeople,input,people);
  if(!peopleFound)
      {
        alert("Let's try a new search.");
        runSearch(people); //start over
      }else{
        displayPeople(foundPeople);
      }
  runSearch(people);
}
// function searchBySingleTrait(foundPeople,input,people){ 
//   let = trait;
//   let = userChoice;
//   let peopleFound;
// switch(input){
//   case"1":
//       trait = "gender";
//       userChoice = promptFor("Is the person male or female?").toLowerCase();
//       peopleFound = getPeople(trait,userChoice,foundPeople);
//   break;
//   case "2":
//       trait = "height";
//       userChoice = parseInt(promptFor("What is the persons" + trait + "in inches?"));
//       peopleFound = getPeople(trait,userChoice,foundPeople);
//     break;
//     case "3":
//       trait = "weight";
//       userChoice = parseInt(promptFor("What is the persons" + trait + "in inches?"));
//       peopleFound = getPeople(trait,userChoice,foundPeople);
//     break;
//     case "4":
//       trait = "eyecolor";
//       userChoice = promptFor("What is the persons eye color?", chars);
//       peopleFound = getPeople(trait,userChoice,foundPeople);
//       break;
//       case "5":
//       trait = "occupation";
//       userChoice = promptFor("What is the persons" + trait + "?", chars);
//       peopleFound = getPeople(trait,userChoice,foundPeople);
//       break;
//   case "restart":
//     app(people);
//     break;
//     default:
//       return runSearch(people);
//   }
// return peopleFound;
// }

function getPeople(trait,userChoice,foundPeople) {
  foundPeople = foundPeople.filter(function(person){
    if(person[trait] === userChoice){
      return true;
    }else {
      return false;
    }
  })
  return foundPeople;
}


function searchForByMultipleTraits(people){
  let searchfor = promptFor("What would you like to  search for 'firstName', 'lastName', 'gender', 'dob', 'height', 'weight', 'eyeColor', 'occupation', 'parents', 'currentSpouse'", chars);
  let searchResults;
  switch(searchfor){
      case 'firstName':
      searchResults = searchByFirstName(people)
      break;
      case 'lastName':
        searchResults = searchByLastName(people)
        break;
        case 'gender':
          searchResults = searchByGender(people)
          break;
          case 'dob':
            searchResults = searchByDob(people)
            break;
            case 'height':
              searchResults = searchByHeight(people)
              break;
              case 'weight':
                searchResults = searchByWeight(people)
                break;
                case 'eyeColor':
                  searchResults = searchByEyeColor(people)
                  break;
                  case 'occupation':
                    searchResults = searchByOccupation(people)
                    break;
                    case 'parents':
                      searchResults = searchByParents(people)
                      break;
                      case 'currentSpouse':
                        searchResults = searchByCurrentSpouse(people)
                        break;
                        default:
                          app(people); // restart app
                            break;

  }
}



// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  personInfo += "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "gender: " + person[0].gender + "\n";
  personInfo += "DOB: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyecolor + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";
  personInfo += "Parents: " + person[0].parents + "\n";
  personInfo += "Current Spouse: " + person[0].currentSpouse + "\n"
  
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}
// function displayFamilyMembers(familyMember){
//   let familyMember = "First Name" + familyMember.firstName + " " + familyMember.lastName + "\n"
// alert(familyMember)
// }

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
