//You are given an array containing ‘n’ distinct numbers taken from the range 0 to ‘n’. 
// Since the array has only ‘n’ numbers out of the total ‘n+1’ numbers, find the missing number.


function find(input) {
    const n = input.length + 1;
    let expectedSum = (n -1) * (n / 2);

    let actualSum = 0;
    for(let i=0; i<input.length; i++){
        actualSum += input[i];
    }

    return expectedSum - actualSum;
}



const input1 = [0,3,2,1,6,5,7]; //4
const input2 = [0,3,2,1,6,5,7,4,9,10]; //8
console.log(find(input1));
console.log(find(input2));