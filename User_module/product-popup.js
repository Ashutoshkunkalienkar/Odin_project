// Product Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal container
    const modalHTML = `
        <div id="product-modal" class="product-modal">
            <div class="product-modal-content">
                <span class="product-modal-close">&times;</span>
                <img id="modal-product-image" src="" alt="Product Image">
                <h2 id="modal-product-title"></h2>
                <p id="modal-product-description"></p>
                <p id="modal-product-price"></p>
                <button id="modal-add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.product-modal-close');
    const modalImage = document.getElementById('modal-product-image');
    const modalTitle = document.getElementById('modal-product-title');
    const modalDescription = document.getElementById('modal-product-description');
    const modalPrice = document.getElementById('modal-product-price');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add click event to all "Buy Now" buttons
    const buyButtons = document.querySelectorAll('.card button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            modalImage.src = img;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = '$19.99'; // Example price
            modal.style.display = 'flex';
        });
    });
});
