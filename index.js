import {renderComments} from "./modules/renderComments.js";
import {postComment} from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
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
      return
    }

    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
        (data) => {
          updateComments(data)
          renderComments()
          name.value = "";
          text.value = "";
        },
      )
  
  });


