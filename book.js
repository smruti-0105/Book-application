let loggedInUser = null;
const books = [
    { isbn: "12345", title: "Book One", author: "Author One", reviews: [] },
    { isbn: "67890", title: "Book Two", author: "Author Two", reviews: [] },
    { isbn: "11223", title: "Book Three", author: "Author One", reviews: [] },
];

const users = [];

function searchBooks() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const results = books.filter(book => 
        book.isbn.includes(query) || 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    displayBooks(results);
}

function displayBooks(bookList) {
    const bookListElement = document.getElementById("book-list");
    bookListElement.innerHTML = '';

    bookList.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.textContent = `${book.title} by ${book.author}`;
        bookItem.onclick = () => viewBookDetails(book);
        bookListElement.appendChild(bookItem);
    });
}

function viewBookDetails(book) {
    const bookInfoElement = document.getElementById("book-info");
    bookInfoElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>ISBN: ${book.isbn}</p>
    `;

    const reviewsListElement = document.getElementById("reviews-list");
    reviewsListElement.innerHTML = '';
    book.reviews.forEach((review, index) => {
        const reviewItem = document.createElement("li");
        reviewItem.textContent = review;
        if (loggedInUser) {
            const modifyButton = document.createElement("button");
            modifyButton.textContent = "Modify";
            modifyButton.onclick = () => modifyReview(book, index);
            reviewItem.appendChild(modifyButton);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteReview(book, index);
            reviewItem.appendChild(deleteButton);
        }
        reviewsListElement.appendChild(reviewItem);
    });

    document.getElementById("book-details").classList.remove("hidden");
}

function addReview() {
    if (!loggedInUser) {
        alert("You must be logged in to add a review.");
        return;
    }

    const reviewText = document.getElementById("new-review").value;
    if (reviewText.trim()) {
        const currentBook = getSelectedBook();
        currentBook.reviews.push(reviewText);
        document.getElementById("new-review").value = '';
        viewBookDetails(currentBook);
    }
}

function modifyReview(book, index) {
    const newReview = prompt("Modify your review:", book.reviews[index]);
    if (newReview !== null) {
        book.reviews[index] = newReview;
        viewBookDetails(book);
    }
}

function deleteReview(book, index) {
    if (confirm("Are you sure you want to delete this review?")) {
        book.reviews.splice(index, 1);
        viewBookDetails(book);
    }
}

function getSelectedBook() {
    // For demo purposes, assume the first book is selected
    return books[0];
}

function showLoginForm() {
    document.getElementById("login-form").classList.remove("hidden");
}

function hideLoginForm() {
    document.getElementById("login-form").classList.add("hidden");
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        loggedInUser = user;
        alert("Login successful");
        hideLoginForm();
        document.getElementById("logout-button").classList.remove("hidden");
    } else {
        alert("Invalid credentials");
    }
}

function showRegisterForm() {
    document.getElementById("register-form").classList.remove("hidden");
}

function hideRegisterForm() {
    document.getElementById("register-form").classList.add("hidden");
}

function registerUser() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const userExists = users.some(u => u.username === username);
    if (userExists) {
        alert("User already exists!");
    } else {
        users.push({ username, password });
        alert("Registration successful!");
        hideRegisterForm();
    }
}

function logoutUser() {
    loggedInUser = null;
    document.getElementById("logout-button").classList.add("hidden");
    alert("You have logged out.");
}
