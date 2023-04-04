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
