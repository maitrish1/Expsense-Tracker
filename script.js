let isEditing = false;
let editIndex = null;

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const amount = form.querySelector('input[name="amount"]').value;
    const desc = form.querySelector('input[name="desc"]').value;
    const category = form.querySelector('select[name="category"]').value;

    let detailsArray = JSON.parse(localStorage.getItem('details')) || [];

    let details = {
        amount: amount,
        desc: desc,
        category: category
    };

    if (isEditing) {
        detailsArray[editIndex] = details;
        isEditing = false;
        editIndex = null;
    } else {
        detailsArray.push(details);
    }

    localStorage.setItem('details', JSON.stringify(detailsArray));

    renderList();
    form.reset();
}

function renderList() {
    const detailsArray = JSON.parse(localStorage.getItem('details')) || [];
    const ul = document.getElementById('expense-list');
    ul.innerHTML = '';

    detailsArray.forEach((detail, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>Amount: ${detail.amount}, Description: ${detail.desc}, Category: ${detail.category}</span>
            <div>
                <button class="btn btn-sm btn-warning me-2">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
            </div>
        `;

        const deleteButton = li.querySelector('.btn-danger');
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });

        const editButton = li.querySelector('.btn-warning');
        editButton.addEventListener('click', () => {
            editItem(index, detail);
        });

        ul.appendChild(li);
    });
}

function deleteItem(index) {
    let detailsArray = JSON.parse(localStorage.getItem('details')) || [];
    detailsArray.splice(index, 1);
    localStorage.setItem('details', JSON.stringify(detailsArray));
    renderList();
}

function editItem(index, detail) {
    const form = document.getElementById('form');
    form.querySelector('input[name="amount"]').value = detail.amount;
    form.querySelector('input[name="desc"]').value = detail.desc;
    form.querySelector('select[name="category"]').value = detail.category;
    isEditing = true;
    editIndex = index;
}

document.addEventListener('DOMContentLoaded', () => {
    renderList();
});
