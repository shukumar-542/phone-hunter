const loadPhones=async(search, dataLimit)=>{
    const urls = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch (urls)
    const data = await res.json()
    displayPhones(data.data,dataLimit);
}

const displayPhones=(phones,dataLimit)=>{
    const phoneContainer =  document.getElementById('phone-container');
    phoneContainer.innerHTML = ''
    const showAllBtn = document.getElementById('showAllProduct')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,2)
        showAllBtn.classList.remove('d-none')
    }else{
        showAllBtn.classList.add('d-none')
    }

    const notFoundMessage =  document.getElementById('not-found-message')
    if(phones.length === 0){
        notFoundMessage.classList.remove('d-none')
    }else{
        notFoundMessage.classList.add('d-none')
    }
    phones.forEach(phone =>{
        const phoneDiv =  document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-2">
        <img src="${phone.image}" class="card-img-top " alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
 
          <button  onclick="showPhoneDetails('${phone.slug}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
        // console.log(phone);
    })
    loadingSpinner(false)
}

document.getElementById('search-btn').addEventListener('click',()=>{
   processData(10);
})

const processData = (dataLimit)=>{
    const searchTextField = document.getElementById('search-field');
    const searchText = searchTextField.value
    loadPhones(searchText, dataLimit);
    // searchTextField.value = ''
    loadingSpinner(true)
}

// search input field using enter key handler
document.getElementById('search-field').addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        processData(10)
    }
})


// show all phones
document.getElementById('show-all-btn').addEventListener('click',()=>{
    processData()
})

// loader spinner
const loadingSpinner = (isLoading) =>{
    const loadingSpinner =  document.getElementById('spinner')
    if(isLoading){
        loadingSpinner.classList.remove('d-none')
    }else{
        loadingSpinner.classList.add('d-none')
    }
}

// details all products

const showPhoneDetails = async(id)=>{
    const urls = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(urls)
    const data = await res.json()
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (data) =>{

    const brandName =  document.getElementById('exampleModalLabel');
    const storage =  document.getElementById('storage');
    const display =  document.getElementById('display')
    brandName.innerText = data.name;
    
    document.getElementById('modal-body').innerHTML = `
    <p>${data.mainFeatures.storage}</p>
    <p>${data.mainFeatures.displaySize}</p>
    `
    console.log(data.mainFeatures);
}
