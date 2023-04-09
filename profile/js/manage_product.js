document.addEventListener('DOMContentLoaded', function() {
    const modal4 = document.getElementById("product_modal");
    const btn4 = document.getElementById("admin-but-1");
    const span4 = document.getElementsByClassName("close")[5];


    btn4.onclick = function () {
        modal4.style.display = "block";
    };


    span4.onclick = function () {
        modal4.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal4) {
            modal4.style.display = "none";
        }

    };

    const modal5 = document.getElementById("add_product_modal");
    const btn5 = document.getElementById("add-product");
    const span5 = document.getElementsByClassName("close")[6];


    btn5.onclick = function () {
        modal5.style.display = "block";

    };


    span5.onclick = function () {
        modal5.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal5) {
            modal5.style.display = "none";
        }

    };

    const modal6 = document.getElementById("delete_product_modal");
    const btn6 = document.getElementById("delete-product");
    const span6 = document.getElementsByClassName("close")[7];


    btn6.onclick = function () {
        modal6.style.display = "block";

    };


    span6.onclick = function () {
        modal6.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal6) {
            modal6.style.display = "none";
        }

    };

    const modal7 = document.getElementById("statistic_modal");
    const btn7 = document.getElementById("admin-but-3");
    const span7= document.getElementsByClassName("close")[8];


    btn7.onclick = function () {
        modal7.style.display = "block";

    };


    span7.onclick = function () {
        modal7.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal7) {
            modal7.style.display = "none";
        }

    };
    const modal8 = document.getElementById("news_modal");
    const btn8 = document.getElementById("admin-but-4");
    const span8= document.getElementsByClassName("close")[9];


    btn8.onclick = function () {
        modal8.style.display = "block";

    };


    span8.onclick = function () {
        modal8.style.display = "none";
    };


    window.onclick = function (event) {
        if (event.target == modal8) {
            modal8.style.display = "none";
        }

    };
    const form = document.querySelector('#message-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const subject = document.querySelector('#subject').value;
        const message = document.querySelector('#message').value;

        fetch('/auth/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subject, message})
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});