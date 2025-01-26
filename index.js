import {renderComments} from "./modules/renderComments.js";
import { comments, updateComments } from "./modules/comments.js";
import { sanitizeHtml } from "./modules/replace.js";
import {fetchComments} from "./modules/api.js";

fetchComments().then((data) => {
  updateComments(data)
  renderComments()
})

renderComments();
const name = document.getElementById("name-input");
const text = document.getElementById("text-input");
  const addButton = document.querySelector(".add-form-button");
  
  addButton.addEventListener("click", () => {
    if (!name.value || !text.value) {
      console.error("Заполните форму");
      return;
    }
    
    const newComment = {
      name: sanitizeHtml(name.value),
      date: new Date(),
      text: sanitizeHtml(text.value),
      likes: 0,
      isLiked: false,
    }
  
    comments.push(newComment);
  
    renderComments();
  
    name.value = "";
    text.value = "";
  });


