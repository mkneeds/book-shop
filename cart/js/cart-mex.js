(function(){

    var cart = {items:[],total:''};

    document.addEventListener('DOMContentLoaded', function() {
        cart= getCartFromLocalStorage();
        updateCart(cart)
        console.log(cart)
    });

    function getCartFromLocalStorage(){
        const myArray = localStorage.getItem('myCart');
        if(myArray) {
            return JSON.parse(myArray);
        } else {
            return {items:[], total:''};
        }
    }

    var addToCart = function(product,qty){
        qty = qty || 1;
        var cart = getCart();
        var indexOfId = cart.items.findIndex(x => x.id == product.id);

        if(indexOfId === -1){
            cart.items.push(
                {
                    id: product.id,
                    name:product.name,
                    price:product.price,
                    qty: qty
                });
        }else{
            cart.items[indexOfId].qty++;
        }
        localStorage.setItem('myCart', JSON.stringify(cart));
        updateCart(cart);
    }

    var getProductValues = function(element){
        var productId = $(element).parent().find('.my-cart-id').attr('id');
        var productName = $(element).parent().find('.my-cart-name').html();
        var productPrice = $(element).parent().find('.my-cart-price').html();
        return {id:productId,name:productName,price:productPrice};
    }

    $('.my-cart-add').on('click',function(){
        var product = getProductValues(this);
        addToCart({id:product.id,name:product.name,price:product.price});
    });

    //Update cart html to reflect changes
    var updateCart = function(cart){
        var totalCost = 0;
        var totalCount = 0;

        //Add to shopping cart dropdown
        $('.shopping-cart-items').html('');
        for(var i =0; i < cart.items.length; i++){
            totalCost += (cart.items[i].qty * parseFloat(cart.items[i].price));
            totalCount += cart.items[i].qty;

            $('.shopping-cart-items').append(
                '<li class="clearfix" style="border-bottom: 1px solid #504343;padding-bottom: 10px;  margin-bottom: 10px;">'+
                '<div class="my-cart-item">'+
                '<div><span><b>Наименование: </span></b>'+cart.items[i].name+'</div>'+
                '<div><span><b>Цена: </span></b>  '+cart.items[i].price+'</div>'+
                '<div><b>Количество: </span></b>'+
                '<i id="subtract-qty'+i+'" class="fa fa-minus-square update-qty subtract-qty" aria-hidden="true"></i><span> '+
                cart.items[i].qty+
                ' <i id="add-qty'+i+'" class="fa fa-plus-square update-qty add-qty" aria-hidden="true"></i></div>'+
                '</div>'+
                '<div class="my-cart-remove-container">'+
                '<i id="my-cart-remove'+i+'" class="fa fa-times my-cart-remove" aria-hidden="true">'+
                '</div>'+
                '</i>'
            );

            (function(){
                var currentIndex = i;
                $('#add-qty'+currentIndex).on('click',function(){
                    updateQuantity(cart.items[currentIndex].id,++cart.items[currentIndex].qty);
                })
            })();

            (function(){
                var currentIndex = i;
                $('#subtract-qty'+currentIndex).on('click',function(){
                    if(cart.items[currentIndex].qty != 1){
                        updateQuantity(cart.items[currentIndex].id,--cart.items[currentIndex].qty);
                        localStorage.setItem('myArray', myArrayAsString);
                    }
                });
            })();

            (function(){
                var currentIndex = i;
                $('#my-cart-remove'+currentIndex).on('click',function(){
                    removeFromCart(cart.items[currentIndex].id);
                    localStorage.setItem('myArray', myArrayAsString);
                });
            })();
        }
        //Update Counter
        updateCounter(totalCount);

        //Update Total
        updateTotal(totalCost);
        const myArrayAsString = JSON.stringify(cart);
        localStorage.setItem('myArray', myArrayAsString);
    }

    //Update cart quantity by id
    var updateQuantity = function(id,qty){
        var cart = getCart();
        var cartIndex = cart.items.findIndex(x => x.id == id);
        cart.items[cartIndex].qty = qty;
        localStorage.setItem('myCart', JSON.stringify(cart));
        updateCart(cart);
    };

    //Remove from cart on id
    var removeFromCart = function(id){
        var cart = getCart();
        var cartIndex = cart.items.findIndex(x => x.id == id);

        cart.items.splice(cartIndex,1);
        localStorage.setItem('myCart', JSON.stringify(cart));
        updateCart(cart);
    };

    //Get Cart
    var getCart = function(){
        var myCart = cart;
        return myCart;
    }

    //Update counter
    var updateCounter = function(val){

        $('.my-cart-counter').html(val);
        localStorage.setItem('myCart', JSON.stringify(cart));
    }

    //Update total
    var updateTotal = function(val){
        $('.my-cart-total').html(' '+val.toFixed(2)+'$');
        localStorage.setItem('myCart', JSON.stringify(cart));
    }

    //Checkout to sandbox payment gateway
    var checkout = function(){

    };


    //Toggle cart on icon click
    $(".my-cart-icon").on("click", function(e) {
        e.stopPropagation();
        $(".shopping-cart").fadeToggle( "fast");
    });

    //Prevent close on popup click
    $('.my-cart-popup').on('click', function(e){
        e.stopPropagation();
    });
})();

const payButton = document.getElementById('my-card')
payButton.addEventListener('click', async () => {
    try {
        // Получаем массив из LocalStorage
        const car = JSON.parse(localStorage.getItem('myCart'));
        const cart = car.items
        // Извлекаем необходимые данные из массива
        const orders = cart.map(item => ({ name: item.name, price: item.price, quantity: item.qty }));
        console.log(orders)
        // Отправляем POST-запрос на сервер для сохранения заказов в базе данных
        const response = await fetch('/products/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orders })
        });

        // Проверяем ответ от сервера
        if (response.ok) {
            console.log('Заказы успешно сохранены в базе данных');
            // Очищаем корзину
            localStorage.removeItem('myCart');

            window.location.href = '/products/all';
        } else {
            throw new Error('Ошибка сохранения заказов в базе данных');
        }
    } catch (error) {
        console.error(error);
    }
});

const searchForm = document.querySelector('.search-box');
const searchInput = searchForm.querySelector('.search-input');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const searchResults = document.querySelectorAll('*:not(script):not(style)');
    let found = false;

    searchResults.forEach((el) => {
        if (el.innerText.toLowerCase().includes(searchTerm)) {
            el.classList.add('search-result');
            found = true;
        } else {
            el.classList.remove('search-result');
        }
    });

    if (!found) {
        alert('No results found.');
    }
});
