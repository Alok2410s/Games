const container = document.getElementById("array-container");

let array = [];

let comparisons = 0;
let merges = 0;

function updateInfo(status = "Ready"){

    document.getElementById("comparisons").innerText = comparisons;

    document.getElementById("merges").innerText = merges;

    document.getElementById("status").innerText = status;
}

function generateRandomArray(){

    comparisons = 0;
    merges = 0;

    array = [];

    for(let i = 0; i < 12; i++){

        array.push(Math.floor(Math.random() * 90) + 10);
    }

    drawArray();

    updateInfo();
}

function setUserArray(){

    const input = document.getElementById("user-input").value;

    if(input === ""){
        alert("Please enter numbers");
        return;
    }

    array = input.split(",").map(num => parseInt(num.trim()));

    if(array.some(isNaN)){
        alert("Invalid input");
        return;
    }

    comparisons = 0;
    merges = 0;

    drawArray();

    updateInfo();
}

function drawArray(active1 = -1, active2 = -1, sorted = false){

    container.innerHTML = "";

    array.forEach((value,index)=>{

        const bar = document.createElement("div");

        bar.classList.add("bar");

        if(index === active1 || index === active2){
            bar.classList.add("active");
        }

        if(sorted){
            bar.classList.add("sorted");
        }

        bar.style.height = `${value * 4}px`;

        bar.innerText = value;

        container.appendChild(bar);
    });
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startMergeSort(){

    updateInfo("Sorting...");

    await mergeSort(0,array.length - 1);

    drawArray(-1,-1,true);

    updateInfo("Completed");
}

async function mergeSort(left,right){

    if(left >= right){
        return;
    }

    const mid = Math.floor((left + right)/2);

    await mergeSort(left,mid);

    await mergeSort(mid + 1,right);

    await merge(left,mid,right);
}

async function merge(left,mid,right){

    merges++;

    let leftArray = array.slice(left,mid + 1);

    let rightArray = array.slice(mid + 1,right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while(i < leftArray.length && j < rightArray.length){

        comparisons++;

        drawArray(left + i,mid + 1 + j);

        updateInfo("Merging");

        await sleep(350);

        if(leftArray[i] <= rightArray[j]){

            array[k] = leftArray[i];

            i++;

        }else{

            array[k] = rightArray[j];

            j++;
        }

        k++;

        drawArray();

        await sleep(250);
    }

    while(i < leftArray.length){

        array[k] = leftArray[i];

        i++;
        k++;

        drawArray();

        await sleep(250);
    }

    while(j < rightArray.length){

        array[k] = rightArray[j];

        j++;
        k++;

        drawArray();

        await sleep(250);
    }

    updateInfo("Sorting...");
}

generateRandomArray();