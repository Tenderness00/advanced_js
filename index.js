import {renderComments} from "./modules/renderComments.js";
import { comments } from "./modules/comments.js";

renderComments();

const sanitizeHtml = (value) => {
    return value.replaceAll("<", "&lt;").replaceAll(">","&gt;");
  }
  
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


