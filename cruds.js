let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit');
let tmp;
let mood = 'create';
console.log(title,price,taxes,ads, category, discount, total, count, submit)

//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background = 'green';
    }else{
        total.innerHTML='';
        total.style.innerHTML = 'red'; 
    }
}

// create product
let dataPro;
// save in localstorage
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    //count times
    if(mood === 'create'){
    if(newPro.count > 1){
        for(let i = 0; i < newPro.count ; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
     }
   }
   else{

      dataPro[ tmp ] = newPro;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';

   }
   //save in localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}


// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//read

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td><button onclick="updateData(${i})" id="update${i}">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete${i}">delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delete All( ${dataPro.length})</button>
        `
    }else{
        btnDelete = '';
    }
}
showData()

//delete

function deleteData(i){
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

//delete All

function deleteAll(){

    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update

function updateData(i){
    mood = 'update';
 title.value = dataPro[i].title;
 price.value = dataPro[i].parice;
 taxes.value = dataPro[i].taxes;
 discount.value = dataPro[i].discount;
 ads.value = dataPro[i].ads;
 getTotal();
 count.style.display = 'none';
 category.value = dataPro[i].category;
 submit.innerHTML = 'Update';
 tmp = i;
 scroll({
    top:0,
    behavior: 'smooth' 
 });

}

//search
//clean data