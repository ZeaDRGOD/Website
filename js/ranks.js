document.getElementById('server').addEventListener('change', function() {
    const server = this.value;
    const rankSelect = document.getElementById('rank');
    const priceDisplay = document.getElementById('price-display');
    
    rankSelect.innerHTML = '';

    if (server === 'none') {
        alert('Please select a server.');
        rankSelect.disabled = true;
        priceDisplay.textContent = '';
        return;
    }

    rankSelect.disabled = false;

    // Add new rank options based on selected server
    let ranks;
    if (server === 'Economy') {
        ranks = [
            { value: 'VIP', text: 'VIP | $1', price: '$1' },
            { value: 'MVP', text: 'MVP | $2', price: '$2' },
            { value: 'ACE', text: 'ACE | $3', price: '$3' },
            { value: 'PREMIUM', text: 'PREMIUM | $10', price: '$10' },
            { value: 'CUSTOM', text: 'CUSTOM | $12', price: '$12' }
        ];
    } else if (server === 'Kingdom') {
        ranks = [
            { value: 'VIP', text: 'VIP | $2', price: '$2' },
            { value: 'MVP', text: 'MVP | $3', price: '$3' },
            { value: 'ACE', text: 'ACE | $5', price: '$5' },
            { value: 'PREMIUM', text: 'PREMIUM | $10', price: '$10' },
            { value: 'CUSTOM', text: 'CUSTOM | $12', price: '$12' }
        ];
    } else if (server === 'Lifesteal') {
        ranks = [
            { value: 'VIP', text: 'VIP | $1', price: '$1' },
            { value: 'MVP', text: 'MVP | $2', price: '$2' },
            { value: 'ACE', text: 'ACE | $3', price: '$3' },
            { value: 'PREMIUM', text: 'PREMIUM | $10', price: '$10' },
            { value: 'CUSTOM', text: 'CUSTOM | $12', price: '$12' }
        ];
    }

    ranks.forEach(rank => {
        const option = document.createElement('option');
        option.value = rank.value;
        option.textContent = rank.text;
        rankSelect.appendChild(option);
    });

    // Display the price of the first rank by default
    if (ranks.length > 0) {
        priceDisplay.textContent = `Total: ${ranks[0].price}`;
    } else {
        priceDisplay.textContent = ''; // Clear the price display if no ranks are available
    }
});

document.getElementById('rank').addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const priceDisplay = document.getElementById('price-display');
    priceDisplay.textContent = `Total: ${selectedOption.text.split('|')[1].trim()}`;
});
