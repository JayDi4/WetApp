function addJogi() {
    const jogiInput = document.getElementById('jogiInput');
    const jogiName = jogiInput.value.trim();

    if (jogiName) {
        const jogiList = document.getElementById('jogiList');
        const newJogiLabel = document.createElement('label');
        newJogiLabel.textContent = jogiName;
        jogiList.appendChild(newJogiLabel);
        jogiInput.value = '';
    } else {
        alert('Bitte geben Sie einen Namen ein.');
    }
}

function createNewBet() {
    const betSection = document.getElementById('betSection');
    betSection.innerHTML = `
        <input type="text" id="betInput" placeholder="Wette eingeben" title="Wette eingeben">
        <button onclick="placeYesNoBet()">Ja/Nein</button>
        <button onclick="placeEstimateBet()">Schätzung</button>
    `;
}

function placeYesNoBet() {
    const betInput = document.getElementById('betInput');
    const bet = betInput.value.trim();
    
    if (bet) {
        alert(`Ja/Nein Wette: ${bet}`);
        // Hier kann der Code für die Ja/Nein-Wette hinzugefügt werden.
    } else {
        alert('Bitte geben Sie eine Wette ein.');
    }
}

function placeEstimateBet() {
    const betInput = document.getElementById('betInput');
    const bet = betInput.value.trim();
    
    if (bet) {
        alert(`Schätzungswette: ${bet}`);
        // Hier kann der Code für die Schätzungswette hinzugefügt werden.
    } else {
        alert('Bitte geben Sie eine Wette ein.');
    }
}
