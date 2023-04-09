
var modal = document.getElementById("loginForm");
var modal_2 = document.getElementById("regForm");
var modal_3 = document.getElementById("reset-password-form")
modal_2.style.display="none";
modal.style.display ="none";
modal_3.style.display = "none";
var btn = document.querySelector("button");
var span = document.getElementsByClassName("close")[0];

// Функция для открытия модального окна
function openLoginForm() {
    modal.style.display = "block";
    modal_3.style.display = "none";

}
function closeLoginForm() {
    modal.style.display = "none";
    modal_2.style.display = "none";
}
function openRegForm(){

    modal_2.style.display="block";
    modal.style.display="none";
}
function openZabForm() {
    modal.style.display = "none";
    modal_3.style.display = "block";
}
function closeZabForm() {
    modal.style.display = "none";
    modal_3.style.display = "none";
}