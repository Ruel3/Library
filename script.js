document.addEventListener('DOMContentLoaded', () => {
    const bookListElement = document.getElementById('book-list');
    const bookIdInput = document.getElementById('book-id');
    const borrowBtn = document.getElementById('borrow-btn');
    const returnBtn = document.getElementById('return-btn');
    const messageDiv = document.getElementById('borrow-return-message');

    // Sample initial book data (in a real application, this would come from a server)
    let books = [
        { id: 'B001', title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', isBorrowed: false },
        { id: 'B002', title: 'Pride and Prejudice', author: 'Jane Austen', isBorrowed: true },
        { id: 'B003', title: 'To Kill a Mockingbird', author: 'Harper Lee', isBorrowed: false },
        { id: 'B004', title: '1984', author: 'George Orwell', isBorrowed: false }
    ];

    function displayBooks() {
        bookListElement.innerHTML = '';
        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="book-info">
                    <span>${book.title}</span> by ${book.author} (ID: ${book.id})
                    ${book.isBorrowed ? '<span class="borrowed"> - Borrowed</span>' : ''}
                </div>
            `;
            bookListElement.appendChild(listItem);
        });
    }

    function borrowBook() {
        const bookId = bookIdInput.value.trim();
        if (!bookId) {
            showMessage('Please enter a Book ID.', 'error');
            return;
        }

        const bookToBorrow = books.find(book => book.id === bookId);
        if (bookToBorrow) {
            if (!bookToBorrow.isBorrowed) {
                bookToBorrow.isBorrowed = true;
                displayBooks();
                showMessage(`Book with ID ${bookId} has been borrowed.`, 'success');
            } else {
                showMessage(`Book with ID ${bookId} is already borrowed.`, 'error');
            }
        } else {
            showMessage(`Book with ID ${bookId} not found.`, 'error');
        }
        bookIdInput.value = '';
    }

    function returnBook() {
        const bookId = bookIdInput.value.trim();
        if (!bookId) {
            showMessage('Please enter a Book ID.', 'error');
            return;
        }

        const bookToReturn = books.find(book => book.id === bookId);
        if (bookToReturn) {
            if (bookToReturn.isBorrowed) {
                bookToReturn.isBorrowed = false;
                displayBooks();
                showMessage(`Book with ID ${bookId} has been returned.`, 'success');
            } else {
                showMessage(`Book with ID ${bookId} is not currently borrowed.`, 'error');
            }
        } else {
            showMessage(`Book with ID ${bookId} not found.`, 'error');
        }
        bookIdInput.value = '';
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 3000); // Clear message after 3 seconds
    }

    borrowBtn.addEventListener('click', borrowBook);
    returnBtn.addEventListener('click', returnBook);

    // Initial display of books
    displayBooks();
});
