import { http } from './http';
import { ui } from './ui';

//Get posts on page load event listener
document.addEventListener('DOMContentLoaded', getPosts);

//Add post event listener
document.querySelector('.post-submit').addEventListener('click', submitPost);

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
  http.post('http://localhost:3000/posts', data)
  .then(function(data) {
    ui.showAlert();
    return getPosts();
  })
  .catch(error => console.log(error));

  
}