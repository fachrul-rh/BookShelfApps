let todos = [];

function makeTodo(makeTodo) {
    makeTodo.preventDefault();
    const inputTitle = document.querySelector("#inputBookTitle"),
    inputAuthor = document.querySelector("#inputBookAuthor"),
    inputYear = document.querySelector("#inputBookYear"),
    inputIC = document.querySelector("#inputBookIsComplete"),
    data = {
        id:+new Date,
        title:inputTitle.value,
        author:inputAuthor.value,
        year:inputYear.value,
        isComplete:inputIC.checked
        };
    console.log(data),
    todos.push(data),
    document.dispatchEvent(new Event("bookShelf"))
}

function addTodo(todos) {
    const inComplete = document.querySelector("#incompleteBookshelfList"),
    complete = document.querySelector("#completeBookshelfList");

    inComplete.innerHTML = "",
    complete.innerHTML = "";

    for (const data of todos) {
        const todos = document.createElement("article");
        todos.classList.add("book_item");
        const textTitle = document.createElement("h2");
        textTitle.innerText = data.title;
        const textAuthor = document.createElement("p");
        textAuthor.innerText = "Penulis: " +data.author;
        const textYear = document.createElement("p");

        if (
            textYear.innerText = "Tahun: "+data.year,
            todos.appendChild(textTitle),
            todos.appendChild(textAuthor),
            todos.appendChild(textYear),
            data.isComplete) {
                const act = document.createElement("div");
                act.classList.add("action");
                const btn = document.createElement("button");
                btn.id = data.id,
                btn.innerText = "Belum Selesai dibaca",
                btn.classList.add("green"),
                btn.addEventListener("click", unChecked);
                const btnRemove = document.createElement("button");
                btnRemove.id = data.id,
                btnRemove.innerText = "Hapus buku",
                btnRemove.classList.add("red"),
                btnRemove.addEventListener("click", removeFromComplete),
                act.appendChild(btn),
                act.appendChild(btnRemove),
                todos.appendChild(act),
                complete.appendChild(todos)
        } else {
                const divAct = document.createElement("div");
                divAct.classList.add("action");

                const divBtn = document.createElement("button");
                divBtn.id = data.id,
                divBtn.innerText = "Selesai dibaca",
                divBtn.classList.add("green"),
                divBtn.addEventListener("click", checkedBtn);

                const divBtnA = document.createElement("button");
                divBtnA.id = data.id,
                divBtnA.innerText = "Hapus buku",
                divBtnA.classList.add("red"),
                divBtnA.addEventListener("click", removeFromComplete),
                divAct.appendChild(divBtn),
                divAct.appendChild(divBtnA),
                todos.appendChild(divAct),
                inComplete.appendChild(todos)
        }
    }
}


function searchBook(makeTodo) {
    makeTodo.preventDefault();

    const searchTitle = document.querySelector("#searchBookTitle");
    query = searchTitle.value,
    query?addTodo(todos.filter((function(todos) {
        return todos.title.toLowerCase().includes(query.toLowerCase())
    }))): addTodo(todos)
}

function checkedBtn(makeTodo) {
    const check = Number(makeTodo.target.id),
    inputAuthor = todos.findIndex((function (todos) {
        return todos.id===check
    }));
    -1!==inputAuthor&&(todos[inputAuthor] = {
        ...todos[inputAuthor],
        isComplete:!0
        },
    document.dispatchEvent(new Event("bookShelf"))
    )
}

function unChecked(makeTodo) {
    const check = Number(makeTodo.target.id),
    inputAuthor = todos.findIndex((function(todos) {
        return todos.id==check
    }));
    -1!==inputAuthor&&(todos[inputAuthor] = {
        ...todos[inputAuthor],
        isComplete:!1
    },
    document.dispatchEvent(new Event("bookShelf"))
    )
}

function removeFromComplete(makeTodo) {
    const check = Number(makeTodo.target.id),
    inputAuthor = todos.findIndex((function(todos) {
        return todos.id==check
    }));
    -1!==inputAuthor&&(todos.splice(inputAuthor,1),
    document.dispatchEvent(new Event("bookShelf"))
    )
    alert("Selamat Kamu berhasil Menghapus buku!")
}


function reverse() {
    !function(todos) {
        localStorage.setItem("books",JSON.stringify(todos))
    }
    (todos),addTodo(todos)
}

window.addEventListener("load", (function() {
    todos = JSON.parse(localStorage.getItem("books"))||[],addTodo(todos);
    const inputBook = document.querySelector("#inputBook"),
    search = document.querySelector("#searchBook");

    inputBook.addEventListener("submit", makeTodo),
    search.addEventListener("submit", searchBook),
    document.addEventListener("bookShelf", reverse)
}))