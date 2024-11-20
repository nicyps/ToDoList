const button = document.querySelector('.add-btn')
const input = document.querySelector('.input-text')
const completeList = document.querySelector('.list-itens')

let list = []

function addItem(){
    // console.log(*then it will show on console when you inspect on the browser*)
    list.push({  //push: add something to the array []
        task: input.value,
        checked: false
    })
    input.value = ''

    addItemToList()
}

function addItemToList(){
    let newItem = ''

    list.forEach((item, index) => {
        newItem = newItem + `
            <li  class="item ${item.checked && "check"}">
                <img src="img/check.png" alt="check" onclick="checkItem(${index})">
                <p>${item.task}</p>
                <img src="img/trash.png" class="delete" alt="delete" onclick="deleteItem(${index})">
            </li>`
    })

    completeList.innerHTML = newItem

    //this part is for save the content on the local storage of the browser so we dont lose when the page refresh itself
    localStorage.setItem('listSave', JSON.stringify(list)) //PS.: JSON.stringify make the object turn into a string
}

function checkItem(index){
    list[index].checked = !list[index].checked
    addItemToList()
}

function deleteItem(index){
    list.splice(index, 1)
    addItemToList()
}

function refreshPage(){
    const itenStorage = localStorage.getItem('listSave')

    if(itenStorage){
        list = JSON.parse(itenStorage) //PS.: JSON.parse make the string turn into an object
    }
    addItemToList()
}

refreshPage()
button.addEventListener('click', addItem)