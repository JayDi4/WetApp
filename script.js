let bets = [];
let users = [];
let currentBetType = null;
let pendingResultAction = null;

function addJogi() {
    const jogiInput = document.getElementById('jogiInput');
    const jogiName = jogiInput.value.trim();

    if (jogiName) {
        if (users.some(user => user.name === jogiName)) {
            alert('Benutzername bereits vorhanden.');
            return;
        }

        users.push({ name: jogiName, score: 0 });
        const jogiList = document.getElementById('jogiList');
        const newItem = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = jogiName;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const editButton = document.createElement('button');
        editButton.textContent = '🖉';
        editButton.className = 'edit-button';
        editButton.onclick = () => {
            const newName = prompt('Neuer Name für ' + jogiName, jogiName);
            if (newName && newName.trim() && !users.some(user => user.name === newName.trim())) {
                updateUserNames(jogiName, newName.trim());
                nameSpan.textContent = newName.trim();
            } else {
                alert('Ungültiger oder bereits vorhandener Name.');
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            jogiList.removeChild(newItem);
            users = users.filter(user => user.name !== jogiName);
            updateResultsTable();
        };

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        newItem.appendChild(nameSpan);
        newItem.appendChild(buttonContainer);
        jogiList.appendChild(newItem);
        jogiInput.value = '';

        document.getElementById('betSection').style.display = 'block';
    } else {
        alert('Bitte geben Sie einen Namen ein.');
    }
}

function updateUserNames(oldName, newName) {
    users = users.map(user => {
        if (user.name === oldName) {
            user.name = newName;
        }
        return user;
    });
    updateResultsTable();
    updateUserList();
}

function updateUserList() {
    const jogiList = document.getElementById('jogiList');
    jogiList.innerHTML = '';

    users.forEach(user => {
        const newItem = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = user.name;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const editButton = document.createElement('button');
        editButton.textContent = '🖉';
        editButton.className = 'edit-button';
        editButton.onclick = () => {
            const newName = prompt('Neuer Name für ' + user.name, user.name);
            if (newName && newName.trim() && !users.some(u => u.name === newName.trim())) {
                updateUserNames(user.name, newName.trim());
                nameSpan.textContent = newName.trim();
            } else {
                alert('Ungültiger oder bereits vorhandener Name.');
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            jogiList.removeChild(newItem);
            users = users.filter(u => u.name !== user.name);
            updateResultsTable();
        };

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        newItem.appendChild(nameSpan);
        newItem.appendChild(buttonContainer);
        jogiList.appendChild(newItem);
    });
}

function createNewBet() {
    document.getElementById('betInput').style.display = 'inline';
    document.getElementById('yesNoButton').style.display = 'inline';
    document.getElementById('estimateButton').style.display = 'inline';
    document.getElementById('userBetActions').innerHTML = '';
    document.getElementById('resultActions').innerHTML = '';
    document.getElementById('resultSection').style.display = 'none';
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
        bets.push({ text: bet, isYesNo: isYesNo, results: {} });

        const betDropdownContainer = document.getElementById('betDropdownContainer');
        const betDropdown = document.getElementById('betDropdown');
        const newOption = document.createElement('option');
        newOption.textContent = bet;
        betDropdown.appendChild(newOption);

        if (betDropdown.options.length > 0) {
            betDropdownContainer.style.display = 'block';
        }
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

    for (let item of jogiList.querySelectorAll('li')) {
        const userName = item.querySelector('span').textContent;
        const userActionDiv = document.createElement('div');
        userActionDiv.textContent = userName + ': ';

        if (currentBetType === 'yesNo') {
            const yesButton = document.createElement('button');
            yesButton.textContent = 'Ja';
            yesButton.style.marginRight = '5px';
            yesButton.onclick = () => handleYesNoClick(userName, 'Ja', yesButton, noButton);

            const noButton = document.createElement('button');
            noButton.textContent = 'Nein';
            noButton.style.marginLeft = '5px';
            noButton.onclick = () => handleYesNoClick(userName, 'Nein', yesButton, noButton);

            userActionDiv.appendChild(yesButton);
            userActionDiv.appendChild(noButton);
        } else if (currentBetType === 'estimate') {
            const estimateInput = document.createElement('input');
            estimateInput.type = 'text';
            estimateInput.placeholder = 'Schätzung';
            const confirmButton = document.createElement('button');
            confirmButton.textContent = '✓';
            confirmButton.onclick = () => handleEstimateClick(userName, estimateInput, confirmButton);

            userActionDiv.appendChild(estimateInput);
            userActionDiv.appendChild(confirmButton);
        }

        userBetActions.appendChild(userActionDiv);
    }
}

function handleYesNoClick(userName, value, yesButton, noButton) {
    users = users.map(user => {
        if (user.name === userName) {
            user.lastYesNo = value;
        }
        return user;
    });

    yesButton.disabled = true;
    noButton.disabled = true;
}

function handleEstimateClick(userName, estimateInput, confirmButton) {
    const estimateValue = estimateInput.value.trim();
    users = users.map(user => {
        if (user.name === userName) {
            user.lastEstimate = parseFloat(estimateValue);
        }
        return user;
    });

    estimateInput.disabled = true;
    confirmButton.disabled = true;
}

function displayResultActions() {
    document.getElementById('resultSection').style.display = 'block';
    const resultActions = document.getElementById('resultActions');
    resultActions.innerHTML = '';

    if (currentBetType === 'yesNo') {
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Ja';
        yesButton.onclick = () => {
            checkPendingVotes('Ja', yesButton);
            disableResultButtons();
        };

        const noButton = document.createElement('button');
        noButton.textContent = 'Nein';
        noButton.onclick = () => {
            checkPendingVotes('Nein', noButton);
            disableResultButtons();
        };

        resultActions.appendChild(yesButton);
        resultActions.appendChild(noButton);
    } else if (currentBetType === 'estimate') {
        const resultInput = document.createElement('input');
        resultInput.type = 'text';
        resultInput.placeholder = 'Ergebnis eingeben';
        resultInput.oninput = () => {
            confirmButton.disabled = resultInput.value.trim() === '';
        };
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '✓';
        confirmButton.disabled = true;
        confirmButton.onclick = () => {
            checkPendingVotes(resultInput, confirmButton);
            disableResultButtons();
        };

        resultActions.appendChild(resultInput);
        resultActions.appendChild(confirmButton);
    }
}

function disableResultButtons() {
    const buttons = document.querySelectorAll('#resultActions button');
    buttons.forEach(button => button.disabled = true);
}

function checkPendingVotes(result, confirmButton) {
    const pendingVotes = users.some(user => (currentBetType === 'yesNo' && !user.lastYesNo) || (currentBetType === 'estimate' && user.lastEstimate === undefined));

    if (pendingVotes) {
        pendingResultAction = { result, confirmButton };
        showWarningModal();
    } else {
        handleResultClick(result, confirmButton);
    }
}

function showWarningModal() {
    document.getElementById('warningModal').style.display = 'block';
}

function closeWarningModal(continueAction) {
    document.getElementById('warningModal').style.display = 'none';

    if (continueAction && pendingResultAction) {
        handleResultClick(pendingResultAction.result, pendingResultAction.confirmButton);
    }

    pendingResultAction = null;
}

function handleResultClick(result, confirmButton) {
    if (currentBetType === 'yesNo') {
        users = users.map(user => {
            if (user.lastYesNo) {
                const betResult = result === 'Ja' ? 'Nein' : 'Ja';
                if (user.lastYesNo === betResult) {
                    user.score += 10;
                }
                delete user.lastYesNo;
            }
            return user;
        });
    } else if (currentBetType === 'estimate') {
        const resultValue = parseFloat(result.value.trim());

        let closestUser = null;
        let closestDifference = Infinity;

        users.forEach(user => {
            if (user.lastEstimate !== undefined) {
                const difference = Math.abs(user.lastEstimate - resultValue);
                if (difference < closestDifference) {
                    closestDifference = difference;
                    closestUser = user;
                }
            }
        });

        users = users.map(user => {
            if (user !== closestUser) {
                user.score += 10;
            }
            delete user.lastEstimate;
            return user;
        });

        result.disabled = true;
        confirmButton.disabled = true;
    }

    confirmButton.disabled = true;
    updateResultsTable();
}

function updateResultsTable() {
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '<h3>Ergebnisse</h3>';
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Spende an die Kasse';
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);

    users.forEach(user => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = (user.score * 0.01).toFixed(2) + ' €';
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    });

    resultsTable.appendChild(table);

    if (users.length > 0) {
        document.getElementById('resetScoresButton').style.display = 'block';
    } else {
        document.getElementById('resetScoresButton').style.display = 'none';
    }
}

function resetScores() {
    users = users.map(user => {
        user.score = 0;
        return user;
    });

    updateResultsTable();
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
