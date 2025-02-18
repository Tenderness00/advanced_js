import {renderComments} from "./modules/renderComments.js";
import {postComment} from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
import { sanitizeHtml } from "./modules/replace.js";
import {fetchComments} from "./modules/api.js";

document.querySelector(".comments").innerHTML =
 "Загружаю комментарии, пожалуйста, подождите..."

fetchComments().then((data) => {
  updateComments(data)
  renderComments()
})

const name = document.getElementById("name-input");
const text = document.getElementById("text-input");
  const addButton = document.querySelector(".add-form-button");
  
  addButton.addEventListener("click", () => {
    if (!name.value || !text.value) {
      console.error("Заполните форму");
      return
    }

    document.querySelector('.form-loading').style.display = 'block'
    document.querySelector(".add-form-button").style.display = 'none'

    text.value = sanitizeHtml(text.value);

    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
        (data) => {
          document.querySelector('.form-loading').style.display = 'none'
          document.querySelector(".add-form-button").style.display = 'flex'

          updateComments(data)
          renderComments()
          name.value = "";
          text.value = "";
        },
      ).catch((error) => {
          document.querySelector('.form-loading').style.display = 'none'
          document.querySelector(".add-form-button").style.display = 'flex'

          if (error.message === "Failed to fetch") {
            alert("Интернет не подключен, попробуйте снова")
          }

          if(error.message === "Ошибка сервера") {
            alert("Ошибка сервера")
          }

          if (error.message === "Неверный запрос") {
            alert("Имя и комментарий должны быть не короче 3-х символов")

            name.classList.add("-error")
            text.classList.add("-error")

            setTimeout(() => {
              name.classList.remove("-error")
              text.classList.remove("-error")  
            },2000)
          }
      })
  
  });


