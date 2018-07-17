class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add'
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
            <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
          </div>
        </div>
      `

      this.post.innerHTML = output;
    });
  }

  validateInputs() {
    document.querySelector('#title').placeholder='Please enter Post Title';
    document.querySelector('#body').placeholder='Please enter Body Title';
  }

  clearValidation() {
    document.querySelector('#title').placeholder='Post Title';
    document.querySelector('#body').placeholder='Body Title';
  }

  showAlert(message) {
    document.getElementById('alerts').textContent = message;
  }

  clearAlert() {
    document.getElementById('alerts').textContent = '';
  }
  
  clearInputs() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
  }
  
}


export const ui = new UI();