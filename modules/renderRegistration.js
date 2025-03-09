import { registration, updateToken } from "./api.js";
import { renderComments } from "./renderComments.js";

export const renderRegistration = () => {
    const app = document.getElementById("app");

    app.innerHTML = `
    <section class="add-form">
        <h1>Форма регистрации</h1>
        <input 
        type="text"
        class="comment-header"
        placeholder="Введите логин"
        id="login"
        required/>
        <input 
        type="text"
        class="comment-header"
        placeholder="Введите имя"
        id="name"
        required/>
    <input
    type="text"
    class="add-form-name"
    placeholder="Введите пароль"
    id="password" required/>
    <fieldset class="add-form-registry">
    <button class="add-form-button-main button-main" type="submit" id="registration-button">
        Зарегистрироваться
    </button>
    </fieldset>
</section>`;

const button = document.getElementById("registration-button");
    const loginElement = document.getElementById("login");
    const nameElement = document.getElementById("name");
    const passwordElement = document.getElementById("password");

    button.addEventListener("click", () => {
        registration({
            login: loginElement.value,
            name: nameElement.value,
            password: passwordElement.value
        }).then((responseData) => {
            // console.log(responseData)
            updateToken(responseData.user.token)
            renderComments()
        })

    })
}