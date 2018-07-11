import { http } from './http';
import { ui } from './ui';

//Get posts on page load event listener
document.addEventListener('DOMContentLoaded', getPosts);

//Add post event listener
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Delete post event listener
document.querySelector('#posts').addEventListener('click', deletePost);


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
    ui.showAlert();
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

// Delete Post
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          //ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}