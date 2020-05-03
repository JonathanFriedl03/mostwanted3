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
      searchByTraits(people);
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
    displayFamily
    break;
    case "descendants":
    // TODO: get person's descendants
    getDescendants(person, people);    
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
 
  
  let spouse = getSpouse(people, person,personName);
  let parentsArray = getParents(people, person, personName);
  let siblingsArray = getSiblings(people, person,  personName);  
  let childrenArray = getChildren(people, person, personName);
  displayFamily(spouse,childrenArray, parentsArray, siblingsArray, personName,person);
}
function getSpouse(people, person,personName){    
  for (var i = 0; i < people.length; i++){
    if(people[i].id === person[0].currentSpouse){
    alert(`${personName} is married to ${people[i].firstName} ${people[i].lastName}.`);
    return people[i];      
    }     
    
  } alert(`${personName} is not married.`)
  
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
    alert(`${personName} was created from thin air! It's just an app..don't hurt yourself trying to understand..you won't!`); 
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

function getChildren(people, person, personName){
  let childrenArray = [];
  childrenArray = people.filter(function(el){
    for(let i = 0; i < people.length; i++){
      if(person[0].id == el.parents[0]  || person[0].id == el.parents[1] ){
        childrenArray.push(el);
        return true;
      }else{
            return false;
        }             
    }
  });  if(childrenArray.length === 0){
          alert(`${personName} has no children`);
        }else{
              for(let i = 0; i < childrenArray.length; i++){
              alert(`${childrenArray[i].firstName} ${childrenArray[i].lastName} `);
              }
         }return childrenArray;
}

function displayFamily(spouse,childrenArray, parentsArray, siblingsArray, personName,person){
//print persons info
personName +=` Family info: \nCurrent Spouse: `;
if(spouse === undefined){
  personName+= ` Not Married\n`;
 } else{  
    personName += `${spouse.firstName} ${spouse.lastName} \n`;
  }
  
  personName+=`Parent(s): `;
  if( person[0].id === 159819275  ){
    personName += `${parentsArray[0].firstName} ${parentsArray[0].lastName} & ${parentsArray[1].firstName} ${parentsArray[1].lastName} two men ..impossible.. I get it.\n`;
  }else if( parentsArray.length > 1 ){
    personName += `${parentsArray[0].firstName} ${parentsArray[0].lastName} & ${parentsArray[1].firstName} ${parentsArray[1].lastName} \n`;
  }
  else if(parentsArray.length === 1){
    personName += `${parentsArray[0].firstName} ${parentsArray[0].lastName}.\n`; 
  }else{
    personName += `${person[0].firstName} was created from thin air! It's just an app..don't hurt yourself trying to understand..you won't!\n`; 
  }
  personName += `Siblings: `;
  if(siblingsArray.length === 0){
    personName += `None\n`;
  }else{
    for(let i = 0; i < siblingsArray.length; i++){
      personName += `${siblingsArray[i].firstName} ${siblingsArray[i].lastName} `;      
    }personName += `\n`;
  }
  personName += `Children: `;
  if(childrenArray.length === 0){
    personName += `None`
  }else{
    for(let i = 0; i < childrenArray.length; i++){
      personName += `${childrenArray[i].firstName} ${childrenArray[i].lastName} `
    }
  }
    alert(personName);
  
}

function getDescendants(person, people){  
  let descendants = people.filter(function(el){    
      if(el.parents.includes(person.id)){
        return true;
       } else{
          return false;
        }         
    });  
    for(let i = 0; i < descendants.length; i++){
      var results = getDescendants(descendants[i],people);     
      if(results.length > 0){          
      descendants.push(results[0]);
      }
    }
    return descendants;
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

function searchByTraits(people){   
  let input = promptFor(`Which trait would you like to search by?\n1: Gender\n2: Height\n3: Weight\n4: Eye Color\n5: Occupation\n6: DOB\nPlease Select a number or restart to start over.`,integers);
 
  let foundPeople = [];
  let peopleFound;
switch(input){
  case"1"://gender           
      foundPeople = genderSearch(people);     
  break;
  case "2"://height      
      foundPeople = getHeight(people);      
    break;
    case "3"://weight     
      foundPeople = getWeight(people);      
    break;
    case "4"://eye color      
      foundPeople = getEyes(people);      
      break;
      case "5"://occupation      
      foundPeople = getOccupation(people);      
      break;
      case "6"://DOB      
      foundPeople = getAge(people);      
      break;
  case "restart":
    app(people);
    break;
    default:
      alert(`Something went wrong let's try again.`);
      return runSearch(people);
  }
  if (foundPeople.length > 1) {
    displayPeople(foundPeople);
    searchByTraits(foundPeople);
  } else if (foundPeople.length === 1) {
    let foundPerson = foundPeople[0];
    mainMenu(foundPerson, people);
  } else {
    app(data);
  }
}
function genderSearch(people){
 let userChoice = promptFor("Is the person male or female?", validateGender);
    let foundPeople = people.filter(function(el){
    if(el.gender === userChoice) {      
      return true;
    }
  });
   if(foundPeople === undefined|| foundPeople.length === 0){
     noCriteria();
     return app(data);
   }
  return foundPeople;
}
function getHeight(people){
  let userChoice = promptFor(`What is the persons height in inches?`,integers);

  let foundPeople = people.filter(function(el){
    if(el.height == userChoice){
      return true;
    }
  });
  if(foundPeople=== undefined || foundPeople.length ===0){
    noCriteria();
    return app(people);
  }
  return foundPeople;
}
function getWeight(people){
  let userChoice = promptFor(`What is the persons weight in inches?`,integers);

  let foundPeople = people.filter(function(el){
    if(el.weight == userChoice){
      return true;
    }
  });
  if(foundPeople=== undefined || foundPeople.length ===0){
    noCriteria();
    return app(people);
  }
  return foundPeople;
}
function getEyes(people){
  let userChoice = promptFor("What is the persons eye color?", chars);

  let foundPeople = people.filter(function(el){
    if(el.eyeColor == userChoice){
      return true;
    }
  });
  if(foundPeople=== undefined || foundPeople.length ===0){
    noCriteria();
    return app(people);
  }
  return foundPeople;
}
function getOccupation(people){
  let userChoice = promptFor("What is the persons occupation?", chars);

  let foundPeople = people.filter(function(el){
    if(el.occupation == userChoice){
      return true;
    }
  });
  if(foundPeople=== undefined || foundPeople.length ===0){
    noCriteria();
    return app(people);
  }
  return foundPeople;
}
function getAge(people){
  let userChoice = promptFor(`What is the persons date of birth?\nFormat: MM/DD/YYYY`,integers);
     userChoice = actualAge(userChoice);
  let foundPeople = people.filter(function(el){
    if(actualAge(el.dob) == userChoice){
      return true;
    }
  });
  if(foundPeople=== undefined || foundPeople.length ===0){
    noCriteria();
    return app(people);
  }
  return foundPeople;
}
function actualAge(dob){
let birth = new Date(dob);
let check = new Date();
let milliDay = 1000 * 60 * 60 * 24; // a day in milliseconds;
let ageInDays = (check - birth) / milliDay;
let ageInYears =  Math.floor(ageInDays / 365 );


//alert( 'Whole years : ' + ageInYears  );
return ageInYears;
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

function integers(input){
  if(parseInt(input)){
    return true;
  }
  else{
    return false;
  }
}

// helper function, ensures input is a whole number
function integer(input)
{
   var result = (input - Math.floor(input)) !== 0; 
   
  if (result)
      
    return true;
   else return false;//finish logic here
   
    
  }
function numInRange(input){
  if(input > 5 < 1)
  return `Please enter a number 1 - 5`;
}
function noCriteria(){
  alert(`Could not find a trait match!`);
}
function validateGender(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}
