function handleSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const amount = formData.get('amount');
    const desc = formData.get('desc');
    const category = formData.get('category');
  
    const isEditing = form.dataset.editing === 'true';
    const editIndex = form.dataset.editIndex;
  
    let details = {
      amount: amount,
      desc: desc,
      category: category
    };
  
    let detailsArray = localStorage.getItem('details') ? JSON.parse(localStorage.getItem('details')) : [];
  
    if (isEditing && editIndex !== undefined) {
      detailsArray[editIndex] = details;
      form.dataset.editing = 'false';
      form.dataset.editIndex = '';
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
    form.elements['amount'].value = detail.amount;
    form.elements['desc'].value = detail.desc;
    form.elements['category'].value = detail.category;
    form.dataset.editing = 'true';
    form.dataset.editIndex = index;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderList();
  });
  