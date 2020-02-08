const cartId = localStorage.getItem('cartId') !== null ? localStorage.getItem('cartId') : '';

// Ugly check on which environment we are, would be nice if we could use environment variables here.
const getCartUrl = window.location.hostname === 'localhost' ? 'http://localhost:9000/getcart' : 'https://wtjamstack-campaign.netlify.com/.netlify/functions/getcart/';

const getCart = async () =>
    await fetch(getCartUrl, {
        method: 'POST',
        body: JSON.stringify({
            'cartId': cartId
        })
    });

    getCart().then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        var cartContents = document.getElementById('cart-contents');
        data.lineItems.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product';
            li.appendChild(document.createTextNode(product.name.nl));
            li.appendChild(document.createTextNode(product.quantity));
            cartContents.appendChild(li);
        })
        
    });