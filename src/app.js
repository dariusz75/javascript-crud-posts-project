import { http } from './http';
import { ui } from './ui';

//Get posts on page load event listener
document.addEventListener('DOMContentLoaded', getPosts);

//Add post event listener
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Edit state post event listener
document.querySelector('#posts').addEventListener('click', enableEdit);

//Delete post event listener
document.querySelector('#posts').addEventListener('click', deletePost);

//Cancel event listener
document.querySelector('.card-form').addEventListener('click', cancelEdit);


//Get posts function
function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(function(data) {
    return ui.showPosts(data)
  })
  .catch(error => console.log(error));
}

//Submit post function
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if(title === '' || body === '') {
    ui.showAlert('Please fill all fields');
  } else {
    const data = {
      title: title,
      body: body
    }
  
    //Create post
    if(title === '' || body === '') {
      ui.validateInputs();
    } else {
    http.post('http://localhost:3000/posts', data)
    .then(function(data) {
      ui.showAlert('Post Added');
      return getPosts();
    })
    .then(function(){
      ui.clearInputs();
      ui.clearValidation();
    })
    .then(function(){
      setTimeout(ui.clearAlert, 1500);
    })
    .catch(error => console.log(error));
    }
  }

 
  
}

// Delete Post
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Deleted');
          getPosts();
        })
        .then(function(){
          setTimeout(ui.clearAlert, 1500);
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

//Enable edit post state
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title= e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }
    // Fill the form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

//Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}