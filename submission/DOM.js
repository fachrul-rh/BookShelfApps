// data inputan
let book = [];

// UI element
const inputBook = document.querySelector('#formInputBook');
const searchBook = document.querySelector('#searchBookTitle');

// akan terload ketika file js ini di run
immediateLoadEventListener();

// Event
function immediateLoadEventListener() {
  inputBook.addEventListener('submit', dataInput);
  searchBook.addEventListener('keyup', filterBook);
  document.addEventListener('bookShelf', addBookToLocalStorage);
  document.addEventListener('DOMContentLoaded', getBookFromLocalStorage);
}

function dataInput(e) {
  e.preventDefault();

  const inputTitle = document.querySelector('#inputBookTitle'),
    inputAuthor = document.querySelector('#inputBookAuthor'),
    inputYear = document.querySelector('#inputBookYear'),
    inputIC = document.querySelector('#inputBookIsComplete'),
    data = {
      id: +new Date(),
      title: inputTitle.value,
      author: inputAuthor.value,
      year: inputYear.value,
      isComplete: inputIC.checked,
    };

  console.log(data);
  book.push(data);
  document.dispatchEvent(new Event('bookShelf'));
  inputTitle.value = '';
  inputAuthor.value = '';
  inputYear.value = '';
  inputIC.checked = false;
}

// membuat element daftar buku
function addBook() {
  const unComplete = document.querySelector('#incompleteBook'),
    complete = document.querySelector('#completeBook');

  unComplete.innerHTML = '';
  complete.innerHTML = '';

  for (const data of book) {
    const article = document.createElement('article');
    article.className = 'book-item';
    const textTitle = document.createElement('h2');
    textTitle.id = 'item-header';
    textTitle.innerText = data.title;
    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis : ' + data.author;
    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun : ' + data.year;

    article.appendChild(textTitle);
    article.appendChild(textYear);
    article.appendChild(textAuthor);

    if (data.isComplete) {
      const btn = document.createElement('button');
      btn.id = data.id;
      btn.innerText = 'Belum Selesai Dibaca';
      btn.className = 'green';
      btn.addEventListener('click', changeIsCompleteTrueToFalse);

      const btnRemove = document.createElement('button');
      btnRemove.id = data.id;
      btnRemove.innerText = 'Hapus Buku';
      btnRemove.className = 'red';
      btnRemove.addEventListener('click', deleteBook);

      article.appendChild(btn);
      article.appendChild(btnRemove);
      complete.appendChild(article);
    } else {
      const btn = document.createElement('button');
      btn.id = data.id;
      btn.innerText = 'Selesai Dibaca';
      btn.className = 'green';
      btn.addEventListener('click', changeIsCompleteFalseToTrue);

      const btnRemove = document.createElement('button');
      btnRemove.id = data.id;
      btnRemove.innerText = 'Hapus Buku';
      btnRemove.className = 'red';
      btnRemove.addEventListener('click', deleteBook);

      article.appendChild(btn);
      article.appendChild(btnRemove);
      unComplete.appendChild(article);
    }
  }
}

function deleteBook(value) {
  const books = Number(value.target.id),
    idBooks = book.findIndex(function (book) {
      return book.id == books;
    });
  if (confirm('Apakah anda ingin menghapus buku ini ?')) {
    -1 !== idBooks && (book.splice(idBooks, 1), document.dispatchEvent(new Event('bookShelf')));
    alert('Selamat anda telah menghapus buku');
  }
}

function addBookToLocalStorage() {
  !(function (books) {
    localStorage.setItem('books', JSON.stringify(books));
  })(book),
    addBook(book);
}

function getBookFromLocalStorage() {
  book = JSON.parse(localStorage.getItem('books')) || [];
  addBook(book);
}

function deleteAllBook() {}

function changeIsCompleteFalseToTrue(value) {
  const books = Number(value.target.id);
  const idBooks = Number(
    book.findIndex(function (value) {
      return value.id === books;
    })
  );
  -1 !== idBooks &&
    ((book[idBooks] = {
      ...book[idBooks],
      isComplete: true,
    }),
    document.dispatchEvent(new Event('bookShelf')));
}

function changeIsCompleteTrueToFalse(value) {
  const books = Number(value.target.id);
  const idBooks = Number(
    book.findIndex(function (value) {
      return value.id === books;
    })
  );
  -1 !== idBooks &&
    ((book[idBooks] = {
      ...book[idBooks],
      isComplete: false,
    }),
    document.dispatchEvent(new Event('bookShelf')));
}

function filterBook(e) {
  const text = e.target.value.toLowerCase();
  const headerTitle = document.querySelectorAll('#item-header');

  headerTitle.forEach((item) => {
    const titleText = item.firstChild.textContent.toLowerCase();

    if (titleText.indexOf(text) !== -1) {
      item.parentElement.setAttribute('style', 'display: display');
    } else {
      item.parentElement.setAttribute('style', 'display: none !important');
    }
  });
}
