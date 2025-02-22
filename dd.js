


const grid = [
    ['1', '1', '1', 'S', 'X', 'X'],
    ['1', '1', 'X', '1', 'X', 'F'], 
    ['1', 'F', 'X', '1', '1', '1'],
    ['1', 'F', 'X', '1', '1', '1'],
    ['X', '1', 'X', '1', 'F', '1'],
    ['F', '1', '1', '1', '1', '1'],
]


function findStart(grid) {
    //expecting 0,3
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[0].length; j++){
            if(grid[i][j] === 'S'){
                return {i,j,distance:0};
            }
        }
    }
}

function findClosestDistance(grid) {
    // expecting 4
    const start  = findStart(grid);
    let minDistance = undefined;

    // could do in place, but create separate grid for solution
    const answerGrid = new Array(grid.length);
    for(let i=0; i<answerGrid.length; i++){
        answerGrid[i] = new Array(grid[0].length).fill('-');
    }

    const queue = [];
    queue.unshift(start);


    const isValid = (candidate) => {
        const inGrid = candidate.i >= 0 && candidate.i < grid.length && candidate.j >= 0 && candidate.j < grid[0].length;
        return inGrid && grid[candidate.i][candidate.j] !== 'X' && answerGrid[candidate.i][candidate.j] === '-';   
    } 

    while(queue.length > 0){
        const candidate = queue.pop();

        if(isValid(candidate)) {
            if(minDistance == null && grid[candidate.i][candidate.j] === 'F') {
                minDistance = candidate.distance;
            }
            const distance = candidate.distance + 1;
            answerGrid[candidate.i][candidate.j] = distance;
            queue.unshift({i: candidate.i + 1, j: candidate.j, distance});
            queue.unshift({i: candidate.i, j: candidate.j + 1, distance});
            queue.unshift({i: candidate.i - 1, j: candidate.j, distance});
            queue.unshift({i: candidate.i, j: candidate.j - 1, distance});
        }
    }

    return minDistance;
};

console.log(findClosestDistance(grid));


