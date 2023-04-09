const editProfileButton = document.getElementById('edit-profile-button');
const editProfileForm = document.getElementById('edit-profile-form');
const overlay = document.getElementsByClassName('overlay')
editProfileButton.addEventListener('click', () => {
    editProfileForm.style.display = 'block';
    overlay.style.display = 'block'
});

var closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", function() {
    editProfileForm.style.display = "none";
});

const modal = document.getElementById("myModal");
const btn = document.getElementById("history-order");
const span = document.getElementsByClassName("close")[0];


btn.onclick = function () {
    modal.style.display = "block";
};


span.onclick = function () {
    modal.style.display = "none";
};


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

};
