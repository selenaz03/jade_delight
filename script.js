$(document).ready(function() {
    var pickup = true;
    // hide address by default
    $('.address').hide();
  
    // listen for radio button changes
    $('input[name="p_or_d"]').click(function() {
      if ($(this).val() === 'delivery') {
        // show address if delivery is selected
        $('.address').show();
        pickup = false;
      } else {
        // hide address if pickup is selected
        $('.address').hide();
        pickup = true;
      }
    });

    var subtotal = 0;
    var tax = 0;
    var total = 0;
    
    $('.selectQuantity').change(function() {
        var quan1 = document.getElementsByName("quan0")[0].value;
        var quan2 = document.getElementsByName("quan1")[0].value;
        var quan3 = document.getElementsByName("quan2")[0].value;
        var quan4 = document.getElementsByName("quan3")[0].value;
        var quan5 = document.getElementsByName("quan4")[0].value;
        var itemQuan = [quan1, quan2, quan3, quan4, quan5];
        var cost = document.getElementsByName("cost");
    
        subtotal = 0;
    
        for (var i = 0; i < itemQuan.length; i++) {
            var itemCost = (itemQuan[i] * menuItems[i].cost).toFixed(2);
            cost[i].value = itemCost;
            subtotal = parseFloat(subtotal) + parseFloat(itemCost);
        }
    
        $('input[name="subtotal"]').val(subtotal.toFixed(2));
        tax = (subtotal * 0.0625).toFixed(2);
        $('input[name="tax"]').val(tax);
        total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
        $('input[name="total"]').val(total);
    });    

    $('input[type="button"]').click(function() {
        var now = new Date();
        console.log(now);
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var pickupTime;
        var deliveryTime;
        var validAddress;
        var validName;
        var validPhone;
        var validOrder;

        if (pickup) {
            pickupTime = calcTime(hours, minutes, 15);
            validAddress = true;
        } else {
            deliveryTime = calcTime(hours, minutes, 45);
            validAddress = validateAddress();
        }
        
        validName = validateName();
        validPhone = validatePhoneNumber();
        validOrder = validateOrder(total);

        if (validAddress && validName && validPhone && validOrder) {
            alert("Thanks for your order!");
            var newWindow = window.open("");
            newWindow.document.write("<h1> Your Order </h1>");
            if (document.querySelector('input[value=pickup]').checked) {
                newWindow.document.write("Your order will be ready at: " + pickupTime);
            } else {
                newWindow.document.write("Your order will be delivered at: " + deliveryTime);
            }
            newWindow.document.write("<h3>Receipt</h3>");

            var quantity1 = document.getElementsByName("quan0")[0].value;
            var quantity2 = document.getElementsByName("quan1")[0].value;
            var quantity3 = document.getElementsByName("quan2")[0].value;
            var quantity4 = document.getElementsByName("quan3")[0].value;
            var quantity5 = document.getElementsByName("quan4")[0].value;
            var itemQuantities = [quantity1, quantity2, quantity3, quantity4, quantity5];

            var cost = document.getElementsByName("cost");
            for (var j = 0; j < itemQuantities.length; j++) {
                var itemPrice = (itemQuantities[j] * menuItems[j].cost).toFixed(2);
                if (itemPrice != 0) {
                    newWindow.document.write(menuItems[j].name + " (" + itemQuantities[j] + "): " + itemPrice + "</br>");
                }
            }
            newWindow.document.write("</br>Subtotal: " + subtotal + "</br>");
            newWindow.document.write("Tax: " + tax + "</br>");
            newWindow.document.write("Total: " + total + "</br>");
        }
    });
});

function calcTime(hours, minutes, addMin) {
    var minCalc = 60 - addMin;
    var amPm = "AM";
    if (minutes >= (minCalc) && hours == 23) {
        minutes = minutes - minCalc;
        hours = "00"
    } else if (minutes >= minCalc) {
        minutes = minutes - minCalc;
        hours = hours + 1;
    } else {
        minutes = minutes + addMin;
    }

    if (hours > 12) {
        amPm = "PM";
        hours = hours - 12;
    }

    if (minutes < 10) {
        time = hours + ":0" + minutes + amPm;
    } else {
        time = hours + ":" + minutes + amPm;
    }

    return time;
}

function validateAddress() {
    if (document.querySelector('input[name="street"]').value.length == 0
        || document.querySelector('input[name="city"]').value.length == 0) {
            alert("Please input a valid address.");
            return false;
    }
    return true;
}

function validateName() {
    if (document.querySelector('input[name="fname"]').value.length == 0
        || document.querySelector('input[name="lname"]').value.length == 0) {
            console.log(document.getElementsByClassName("fname").length);
            alert("Please input your full name.");
            return false;
        }
    return true;
}

function validatePhoneNumber() {
    if (document.querySelector('input[name="phone"]').value.length != 7
        && document.querySelector('input[name="phone"]').value.length != 10) {
            alert("Please input a valid phone number.");
            return false;
    }
    return true;
}

function validateOrder(total) {
    if (total == 0) {
        alert("Please choose at least one item.");
        return false;
    }

    return true;
}