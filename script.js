let bets = [];
let currentBetType = null;

function addJogi() {
    const jogiInput = document.getElementById('jogiInput');
    const jogiName = jogiInput.value.trim();

    if (jogiName) {
        const jogiList = document.getElementById('jogiList');
        const newJogiDiv = document.createElement('div');
        newJogiDiv.textContent = jogiName;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            jogiList.removeChild(newJogiDiv);
        };

        newJogiDiv.appendChild(deleteButton);
        jogiList.appendChild(newJogiDiv);
        jogiInput.value = '';
    } else {
        alert('Bitte geben Sie einen Namen ein.');
    }
}

function createNewBet() {
    document.getElementById('betInput').style.display = 'inline';
    document.getElementById('yesNoButton').style.display = 'inline';
    document.getElementById('estimateButton').style.display = 'inline';
    document.getElementById('userBetActions').innerHTML = '';
    document.getElementById('resultActions').innerHTML = '';
}

function placeYesNoBet() {
    const betInput = document.getElementById('betInput');
    const bet = betInput.value.trim();

    if (bet) {
        addBetToDropdown(bet, true);
        currentBetType = 'yesNo';
        displayUserBetActions();
        displayResultActions();
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
        currentBetType = 'estimate';
        displayUserBetActions();
        displayResultActions();
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

function displayUserBetActions() {
    const jogiList = document.getElementById('jogiList');
    const userBetActions = document.getElementById('userBetActions');
    userBetActions.innerHTML = '';

    for (let jogiDiv of jogiList.children) {
        const userActionDiv = document.createElement('div');
        userActionDiv.textContent = jogiDiv.firstChild.textContent + ': ';

        if (currentBetType === 'yesNo') {
            const yesButton = document.createElement('button');
            yesButton.textContent = 'Ja';
            const noButton = document.createElement('button');
            noButton.textContent = 'Nein';
            userActionDiv.appendChild(yesButton);
            userActionDiv.appendChild(noButton);
        } else if (currentBetType === 'estimate') {
            const estimateInput = document.createElement('input');
            estimateInput.type = 'text';
            estimateInput.placeholder = 'Schätzung';
            const confirmButton = document.createElement('button');
            confirmButton.textContent = '✓';
            userActionDiv.appendChild(estimateInput);
            userActionDiv.appendChild(confirmButton);
        }

        userBetActions.appendChild(userActionDiv);
    }
}

function displayResultActions() {
    const resultActions = document.getElementById('resultActions');
    resultActions.innerHTML = '';

    if (currentBetType === 'yesNo') {
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Ja';
        const noButton = document.createElement('button');
        noButton.textContent = 'Nein';
        resultActions.appendChild(yesButton);
        resultActions.appendChild(noButton);
    } else if (currentBetType === 'estimate') {
        const resultInput = document.createElement('input');
        resultInput.type = 'text';
        resultInput.placeholder = 'Ergebnis eingeben';
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '✓';
        resultActions.appendChild(resultInput);
        resultActions.appendChild(confirmButton);
    }
}

function selectBet() {
    const betDropdown = document.getElementById('betDropdown');
    const selectedBet = betDropdown.options[betDropdown.selectedIndex].text;
    const bet = bets.find(b => b.text === selectedBet);

    if (bet) {
        currentBetType = bet.isYesNo ? 'yesNo' : 'estimate';
        displayUserBetActions();
        displayResultActions();
    }
}
