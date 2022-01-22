let bookStatus; let bookNumber;

let library = [];


function Book(bookName, author, pages, bookStatus) {
  this.bookName = bookName
  this.author = author
  this.pages = pages
  this.bookStatus = bookStatus

}

const overlay = document.getElementById('overlay');
const submitButton = document.getElementById('submit');
const form = document.getElementById("addBookForm");
const bookSection = document.getElementById("bookSection");

const card = document.getElementById("bookCard");



submitButton.addEventListener('click', createNewBook);




function updateBookCount(){
  const booksRead = document.getElementById("booksRead");
  const booksUnread = document.getElementById("booksUnread");
  const booksTotal = document.getElementById("booksTotal");

  let booksReadCount = 0;
  let booksUnreadCount = 0;


  for (i=0; i <library.length; i++){
    if (library[i]['bookStatus'] === 'Read'){
      booksReadCount++
    } else{
      booksUnreadCount++
    }
  }

  booksRead.innerHTML = booksReadCount
  booksUnread.innerHTML = booksReadCount

  booksTotal.innerHTML = library.length

}



function openForm() {
  overlay.style.display = "block";
}

function createNewBook() {
  const bookName = document.getElementById('bookName').value;
  const author = document.getElementById('author').value;

  const pages = document.getElementById('pages').value;
  const readOrNot = document.getElementById('readOrNot').checked;

  // console.log(readOrNot)

  if (readOrNot === true){
    bookStatus = 'Read'
  } else{
    bookStatus = 'Not read'
  }


  // console.log(bookName,author, pages, bookStatus)
  overlay.style.display = "none";
  form.reset();

  const newBook = new Book(bookName,author, pages, bookStatus)


  library.push(newBook)
  // console.log(library)
  localStorage.setItem('library', JSON.stringify(library))

  location.reload()
  
  createLibrary()

  
}

function createLibrary(){

  for (i=0; i< library.length; i++){
    const bookCard = document.createElement("div");

    // console.log((bookCard.dataset.id))

    const nameCard = document.createElement("p");
    const authorCard = document.createElement("p");
    const pagesCard = document.createElement("p");
    const deleteButton = document.createElement("button");
    const deleteButtonContainer = document.createElement("div");
    const readButton = document.createElement("button");
    const readButtonContainer = document.createElement("div");


    // const bookStatusCard = document.createElement("p");
  
    nameCard.innerHTML = library[i].bookName
    authorCard.innerHTML = library[i].author
    pagesCard.innerHTML = library[i].pages
    deleteButton.innerHTML = 'Delete'
    readButton.innerHTML = library[i].bookStatus

    deleteButton.id = 'deleteButton'
    deleteButton.dataset.id = i

    readButton.id = 'readButton'
    readButton.dataset.id = i

  
    bookCard.classList.add("book-card")
    nameCard.classList.add("bookName")

    deleteButtonContainer.classList.add('deleteButtonContainer')
    deleteButton.classList.add('deleteButton')

    readButtonContainer.classList.add('readButtonContainer')
    readButton.classList.add('readButton')

  
    deleteButtonContainer.appendChild(deleteButton)

    readButtonContainer.appendChild(readButton)

    // console.log(deleteButtonContainer)


    bookCard.appendChild(nameCard)
    bookCard.appendChild(authorCard)
    bookCard.appendChild(pagesCard)
    bookCard.appendChild(deleteButtonContainer)
    bookCard.appendChild(readButtonContainer)
  
    bookSection.appendChild(bookCard)
    
    deleteButton.addEventListener('click', deleteBookStep);

    function deleteBookStep(){
      let index = deleteButton.dataset.id
      deleteBook(index)

    }
  
  }
  updateBookCount()


}


function deleteBook(index){

  library.splice(index,1)

  localStorage.setItem('library', JSON.stringify(library))

  location.reload()



}



function closeBookForm(){
  overlay.style.display = "none";
  form.reset();
}


window.onload = () => {
  library = JSON.parse(localStorage.getItem('library'))

  createLibrary()

}

 
 
 
 
 
 
 
 















