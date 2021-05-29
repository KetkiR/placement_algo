let lodash = require('lodash');

let totalCompanies = 3; // total number of companies visiting
let totalStudents = 5; // toatal number of students appearing for placement
/* 
Assuming there are three companies - c0,c1,c2 which are represented by name 0,1 and 2 in studentPreferences variable

Assuming there are five students - s0,s1,s2,s3 and s4 which are represented by name 0,1,2,3,4,5 in companyPreferences variable.

Assuming shortlist per company is 4 (shown in variable companyPreferences which has 4 elements in every inner array).


The variable companyPreferences is a 2d array which contains the list of students preferred by the company.
syntax of variable value - [['company 0's students preference list],['company 1's students preference list],['company 2 students preference list']]

The variable studentPreferences is a 2d array which contains the list of companies preferred by students.
syntax of variable value - [['Student o's preferred company list],['Student 1's preferred company list],['Student 2 preferred company list].....['Student 4 preferred company list']]

The variable priorityMatrix is a 2d array which stores the score(priority order) of the company and student priority list.
The rows in priorityMatrix are companies and columns are students.


NOTE- The highest score (priority order) is 0 and the lowest is 4 in the variable priorityMatrix.

*/

let companyPreferences = [[0, 1, 3,4],[0,2,1,4],[4,3,1,2]];
let studentPreferences =[[0,2,1],[1,2],[2,0,1],[0,2,1],[1,0]];

/*
    Generating a 2d array called priorityMatrix
*/
let priorityMatrix = new Array(totalCompanies);
for (let index = 0; index < priorityMatrix.length; index++) {
    priorityMatrix[index] = new Array(totalStudents);
}

/*
 Loop the companies shortlist for assigning the score in the  priorityMatrix variable by using the index value of the loop.
 Example - If company c0 has top priority for student s0 in the first iteration(1st element in the company preference list) then the value of priorityMatrix[c0][s0] = 0 (Considering its the 0th loop index).
*/
for (let companyIndex = 0; companyIndex < companyPreferences.length; companyIndex++) {
   
    for (let companyPrefenceIndex = 0; companyPrefenceIndex < companyPreferences[companyIndex].length; companyPrefenceIndex++) {
        priorityMatrix[companyIndex][companyPreferences[companyIndex][companyPrefenceIndex]] = companyPrefenceIndex;
    }
    
}

/*
 Loop to add score to the priorityMatrix if the company appears in the particular student's shortlist.
*/

for (let studentIndex = 0; studentIndex < studentPreferences.length; studentIndex++) {
   for (let studentPreferenceIndex = 0; studentPreferenceIndex < studentPreferences[studentIndex].length; studentPreferenceIndex++) {
    let rowvalue = studentPreferences[studentIndex][studentPreferenceIndex]; // calculating row index of priorityMatrix
    let columnvalue = studentIndex; // calculating column index of priorityMatrix
    let previousValue = priorityMatrix[rowvalue][columnvalue]; // checking the already existing value 
    let newValue; // store the new value by adding the score if the company exists in candidate list.
    if(previousValue == undefined) {
        newValue = studentPreferenceIndex;
    } else {
        newValue = previousValue + studentPreferenceIndex
    }
    priorityMatrix[rowvalue][columnvalue] = newValue; // updating the score
       
   }
    
}

/*
Function to sort the students for every company depending on score and displaying it.
*/
for (let companyIndex = 0; companyIndex < priorityMatrix.length; companyIndex++) {
    console.log(` ************ Priority Score for company ${companyIndex} ****************`);
    
    let preferenceList = [];
    let orderedPreferenceList;
    for (let studentPreferenceIndex = 0; studentPreferenceIndex < priorityMatrix[companyIndex].length; studentPreferenceIndex++) {
        preferenceList.push({
            student: `Student ${studentPreferenceIndex}`,
            score: priorityMatrix[companyIndex][studentPreferenceIndex]
        })
        
        
    }
    orderedPreferenceList = lodash.orderBy(preferenceList,['score'],['asc']); // sorting the list in ascending order
    console.log(orderedPreferenceList);
    
}
