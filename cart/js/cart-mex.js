(function(){

    var cart = {items:[],total:''};

    document.addEventListener('DOMContentLoaded', function() {
        cart= getCart();
        updateCart(cart)
        console.log(cart)
    });

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
                    }
                });
            })();

            (function(){
                var currentIndex = i;
                $('#my-cart-remove'+currentIndex).on('click',function(){
                    removeFromCart(cart.items[currentIndex].id);
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
        //Update popup cart
        updateCart(cart);
    };

    //Remove from cart on id
    var removeFromCart = function(id){
        var cart = getCart();
        var cartIndex = cart.items.findIndex(x => x.id == id);

        cart.items.splice(cartIndex,1);
        //Update popup cart
        updateCart(cart);
    };

    //Get Cart
    var getCart = function(){
        const myArrayAsString = localStorage.getItem('myArray');
        var myCart = JSON.parse(myArrayAsString);
        return myCart;
    }

    //Update counter
    var updateCounter = function(val){
        $('.my-cart-counter').html(val);
    }

    //Update total
    var updateTotal = function(val){
        $('.my-cart-total').html(' '+val.toFixed(2)+'$');
    }

    //Checkout to sandbox payment gateway
    var checkout = function(){

    };

    //Listeners


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