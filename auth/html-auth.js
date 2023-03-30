window.onload = () => {
    const username = getCookie('username');
    if (username) {
        const profileLink = document.createElement('a');
        profileLink.innerText = ` Профиль(${username})`;
        profileLink.style.position = 'relative';
        profileLink.style.textDecoration = 'none';
        profileLink.style.color = '#645252';
        const profileList = document.createElement('ul');
        profileList.classList.add('profile-list');
        const logoutItem = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.innerText = 'К профилю';
        logoutLink.href = 'auth/profile';
        logoutItem.appendChild(logoutLink);
        profileList.appendChild(logoutItem);

        const editProfileItem = document.createElement('li');
        const editProfileLink = document.createElement('a');
        editProfileLink.innerText = 'Выйти';
        editProfileLink.href = 'auth/logout';
        editProfileItem.appendChild(editProfileLink);
        profileList.appendChild(editProfileItem);

        profileLink.addEventListener('mouseover', () => {
            profileList.style.display = 'block';
        });

        profileLink.addEventListener('mouseout', () => {
            profileList.style.display = 'none';
        });

        profileLink.appendChild(profileList);

        const loginButton = document.getElementById('auth-button');
        loginButton.replaceWith(profileLink);
    }
};



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('login-button');
    button.addEventListener('click', function() {
        const login = document.getElementById("username-login").value;
        const pass = document.getElementById("password-login").value;
        console.log(login)
        event.preventDefault(); // предотвращаем переход по ссылке по умолчанию

        const data = { // объект с данными для отправки
            username: login,
            password: pass
        };
        let ts = null;
        fetch('auth/login', { // отправляем POST-запрос на URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // преобразуем данные в формат JSON и отправляем
        })
            .then(response => {
                if(response.status === 200) {
                    // успешный ответ с кодом 200
                    // перезагрузка страницы
                    location.reload();
                } else {
                    // обработка других кодов ответа
                    return response.json();
                }
            })
            .then(data => {

                if(data.message===`Пользователь не найден`){
                    const myInput = document.getElementById("username-login");
                    myInput.value = "";
                    myInput.setAttribute('placeholder',data.message)
                }
                if(data.message===`Введен неверный пароль`){
                    const myInput = document.getElementById("password-login");
                    myInput.value = "";
                    myInput.setAttribute('placeholder',data.message)
                }

            })
            .catch(error => {
                console.error(error); // выводим ошибку в консоль, если что-то пошло не так
            });

    });

});