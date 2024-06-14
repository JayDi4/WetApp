let bets = [];

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
    document.getElementById('betInput').style.display = 'inline';
    document.getElementById('yesNoButton').style.display = 'inline';
    document.getElementById('estimateButton').style.display = 'inline';
}

function placeYesNoBet() {
    const betInput = document.getElementById('betInput');
    const bet = betInput.value.trim();

    if (bet) {
        addBetToDropdown(bet, true);
        betInput.value = '';
        hideBetInput();
    } else {
        alert('Bitte geben Sie eine Wette ein.');
    }
}

function placeEstimateBet() {
    const betInput = document.getElementById('betInput');
    const bet = betInput.value.trim();

    if (bet) {
        addBetToDropdown(bet, false);
        betInput.value = '';
        hideBetInput();
    } else {
        alert('Bitte geben Sie eine Wette ein.');
    }
}

function addBetToDropdown(bet, isYesNo) {
    if (!bets.some(b => b.text === bet)) {
        bets.push({ text: bet, isYesNo: isYesNo });

        const betDropdown = document.getElementById('betDropdown');
        const newOption = document.createElement('option');
        newOption.textContent = bet;
        betDropdown.appendChild(newOption);
    }
}

function hideBetInput() {
    document.getElementById('betInput').style.display = 'none';
    document.getElementById('yesNoButton').style.display = 'none';
    document.getElementById('estimateButton').style.display = 'none';
}
