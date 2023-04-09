document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("user_modal");
    const btn = document.getElementById("admin-but-2");
    const span = document.getElementsByClassName("close")[1];


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
    const modal1 = document.getElementById("list_user_modal");
    const btn1 = document.getElementById("list-user");
    const span1 = document.getElementsByClassName("close")[2];


    btn1.onclick = function () {
        modal1.style.display = "block";
    };


    span1.onclick = function () {
        modal1.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    };

    const modal2 = document.getElementById("delete_modal");
    const btn2 = document.getElementById("delete-user");
    const span2 = document.getElementsByClassName("close")[3];


    btn2.onclick = function () {
        modal2.style.display = "block";
    };


    span2.onclick = function () {
        modal2.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    };
    const modal3 = document.getElementById("role-modal");
    const btn3 = document.getElementById("role-user");
    const span3 = document.getElementsByClassName("close")[4];


    btn3.onclick = function () {
        modal3.style.display = "block";
    };


    span3.onclick = function () {
        modal3.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal3) {
            modal3.style.display = "none";
        }
    };


});