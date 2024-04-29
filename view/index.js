function handleFormSubmit(event){
    event.preventDefault();
    const name = event.target.book.value;
    function addHours(date, hours) {
        const dateCopy = new Date(date.getTime());
        const hoursToAdd = hours * 60 * 60 * 1000;
        dateCopy.setTime(date.getTime() + hoursToAdd);
        return dateCopy;
    }
    
    const takenOnDate = new Date();
    const returnOnDate = addHours(takenOnDate,1);
    let takenOn = takenOnDate.toISOString().split('T')[0] + ' '+ takenOnDate.toTimeString().split(' ')[0];
    let returnOn = returnOnDate.toISOString().split('T')[0] + ' '+ returnOnDate.toTimeString().split(' ')[0];
    
    const obj = {
        name,
        takenOn,
        returnOn
    };
    axios
        .post(
            "http://localhost:3000/add-book",
            obj
        )
        .then(response =>{
            displayBookOnScreen(response.data.newBookDetail)
        })
        .catch(err => {
            console.log(err);
    });

    document.querySelector("form").reset();
}

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
        await axios
            .get("http://localhost:3000/get-books")
            .then(response =>{
                for(let i=0; i<response.data.allBooks.length; i++){
                    displayBookOnScreen(response.data.allBooks[i]);
                }
            })
        
        await axios
            .get("http://localhost:3000/get-returnedBooks")
            .then(response =>{
                for(let i=0; i<response.data.allReturnedBooks.length; i++){
                    displayFines(response.data.allReturnedBooks[i]);
                }
            })
    }
    catch(err){
        console.log(err);
    }  
});

function displayBookOnScreen(bookDetails){
    
    const rows = document.querySelector("#addedBooks");
    const card = document.createElement("div");
    card.setAttribute('class','card');
    card.id = `card-${bookDetails.id}`;
        
    const takenOn = bookDetails.takenOn;
    const returnOn = bookDetails.returnOn;
    const pReturnOn = returnOn.replace(" ","T")+"Z";
    const mReturnOn = Date.parse(pReturnOn);

    const currentTime = new Date();
    const currentTimeIST = currentTime.toISOString().split('T')[0] + ' '+ currentTime.toTimeString().split(' ')[0];
    const pCurrentTimeIST = currentTimeIST.replace(" ","T")+"Z";
    const mCurrentTime = Date.parse(pCurrentTimeIST);
        
    let fine;
    if(pReturnOn > pCurrentTimeIST){
        fine = 0;
    }
    else{
        fine = Math.floor((Math.abs(mReturnOn-mCurrentTime))/(60*60*1000))*10;
    }

    card.innerHTML=`
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${bookDetails.name}</h5>
            <p class="card-text">Book Taken On:<br>${takenOn} IST</p>
            <p class="card-text">Book return time:<br>${returnOn} IST</p>
            <p class="card-text">current fine: Rs. ${fine}</p>
            <button type="button" id="return-${bookDetails.id}" class="btn btn-primary">Return Book</button>
        </div>
    </div>`
    card.setAttribute("class", "col-sm-3 mb-3 mb-sm-0");
    rows.appendChild(card);

    const returnButton = document.getElementById(`return-${bookDetails.id}`);

    returnButton.addEventListener("click", function(event){
        event.preventDefault();
        const card = document.getElementById(`card-${bookDetails.id}`);
        card.innerHTML = `
        <div class="card">
            <form class="card-body"  onsubmit="handlePayFine(event)">
                <input type="number" name="fine" value="${fine}" readonly>
                <input type="hidden" name="book" value="${bookDetails.name}">
                <input type="hidden" name="submitTime" value="${currentTimeIST}">
                <input type="hidden" name="id" value="${bookDetails.id}">
                <button type="submit" class="btn btn-primary">Pay Fine</button>
            </form>
        </div>`
    });      
};

async function handlePayFine(event){
    try{
        event.preventDefault();
        const name = event.target.book.value;
        const submitedOn = event.target.submitTime.value;
        const fine = event.target.fine.value;

        const obj ={
            name,
            submitedOn,
            fine
        }

        const id = event.target.id.value;
        const rows =  document.querySelector("#addedBooks");
        const card = document.getElementById(`card-${id}`);
        await axios
            .delete(`http://localhost:3000/delete-book/${id}`)
            .then(response =>{
                rows.removeChild(card);
            })
        await axios
            .post("http://localhost:3000/add-returnedBook",obj)
            .then(response =>{
                displayFines(response.data.newReturnedBookDetail);
            })   
    }
    catch(err){
        console.log(err);
    }
};

function displayFines(returnedBookDetail){
    const returnedBooks = document.getElementById("returnedBooks");
    const returnBook = document.createElement("div");
    returnBook.innerHTML = `
    <div class="w-100 p-3" style="background-color: #eee;">
        <p style="font-weight: bold;">Book Name: ${returnedBookDetail.name}</p>
        <p style="font-weight: bold;">Submited On: ${returnedBookDetail.submitedOn} IST</p>
        <p style="font-weight: bold;">Fine: ${returnedBookDetail.fine}</p>
        <br>
    </div>`
    returnedBooks.appendChild(returnBook);
}