import { login, updateToken } from "./api.js";
import { renderComments } from "./renderComments.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
    const app = document.getElementById("app");

    app.innerHTML = `
    <section class="add-form">
        <h1>Форма входа</h1>
        <input 
        type="text"
        class="comment-header"
        placeholder="Введите логин"
        id="login"
        required/>
    <input
    type="text"
    class="add-form-name"
    placeholder="Введите пароль"
    id="password" required/>
    <fieldset class="add-form-registry">
    <button class="add-form-button-main button-main" type="submit" id="login-button">
        Войти
    </button>
    <button class="add-form-button-main button-main" type="submit" id="registration-button">
        Регистрация
    </button>
    </fieldset>
</section>`

    // app.innerHTML = `
    // <div>
    //   <h2>Login</h2>
    //   <form>
    //     <input type="text" placeholder="Username">
    //     <input type="password" placeholder="Password">
    //     <button id="login-button">Login</button>
    //   </form>
    // </div>
    // `

    const loginButton = document.getElementById("login-button");
    const registrationButton = document.getElementById("registration-button");
    const loginElement = document.getElementById("login");
    const passwordElement = document.getElementById("password")

    loginButton.addEventListener("click", () => {
        login({
            login: loginElement.value,
            password: passwordElement.value
        }).then((responseData) => {
            updateToken(responseData.user.token)
            renderComments()
        })
    })

    registrationButton.addEventListener("click", () => {
        renderRegistration()
    })
}