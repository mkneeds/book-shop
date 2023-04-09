document.addEventListener('DOMContentLoaded', function() {
    const buttonn = document.getElementById("reg-button");
    buttonn.addEventListener('click', function(event) {
        var modal_2 = document.getElementById("regForm");
        modal_2.style.display ="none";
    const fio = document.getElementById("fio").value;
    const email = document.getElementById("email").value;
    const reg_login = document.getElementById("reg-login").value;
    const reg_password = document.getElementById("reg-password").value;
    console.log(reg_login)
    event.preventDefault(); // предотвращаем переход по ссылке по умолчанию

    const data = { // объект с данными для отправки
    username: reg_login,
    password: reg_password,
        fullName:fio,
        email:email
};

    fetch('auth/registration', { // отправляем POST-запрос на URL '/my-api'
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify(data) // преобразуем данные в формат JSON и отправляем
})
    .then(response => response.json())
    .then(data => {
    alert(data.message); // выводим ответ сервера в консоль
})
    .catch(error => {
    console.error(error); // выводим ошибку в консоль, если что-то пошло не так
});
});
});

