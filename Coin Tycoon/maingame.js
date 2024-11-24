// Function to generate a unique key for each user's data based on their username
const getUserKey = (key) => `user_${user.username}_${key}`;

// Simulate user data (you can replace with actual user data from registration/login)
const user = {
    username: localStorage.getItem('username') || "Player1", // Default to "Player1" if no user is logged in
    avatar: localStorage.getItem('avatar') || "avatar.png", // Default avatar if no avatar saved
    lastUsernameChange: localStorage.getItem('lastUsernameChange') ? new Date(localStorage.getItem('lastUsernameChange')) : null,
};

// Initialize user data (load user data from localStorage if available, otherwise set defaults)
let balance = parseFloat(localStorage.getItem(getUserKey('balance'))) || 0.0;

// Update the balance display
const balanceDisplay = document.getElementById('balance');
balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

// Coin click event to increase balance
const coin = document.getElementById('tap-coin');
coin.addEventListener('click', () => {
    balance += 0.001;

    // Update the balance display
    balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

    // Save the new balance to localStorage for the current user
    localStorage.setItem(getUserKey('balance'), balance.toFixed(3));
});

// DOM Elements
const usernameElement = document.getElementById('username');
const avatarElement = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const newUsernameInput = document.getElementById('newUsername');
const saveUsernameButton = document.getElementById('saveUsername');
const timeOnlineElement = document.getElementById('time-online');
const logoutButton = document.getElementById('logout');
const logoutContainer = document.getElementById('logoutContainer');
const logoutMessage = document.getElementById('logoutMessage');
const loButton = document.getElementById('loButton');
const userChangeLimit = document.getElementById('userChangeLimit');
const limitMessage = document.getElementById('limitMessage');
const daysButton = document.getElementById('daysButton');
const usernameUpdated = document.getElementById('usernameUpdated');
const userUpdateMessage = document.getElementById('userUpdateMessage');
const userUpdateButton = document.getElementById('userUpdateButton');
const validUsername = document.getElementById('validUsername');
const validMessage = document.getElementById('validMessage');
const validButton = document.getElementById('validButton');

// Display user data
usernameElement.textContent = user.username;
avatarElement.src = user.avatar;

// Handle Avatar Change
avatarElement.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const newAvatar = reader.result;
            avatarElement.src = newAvatar;
            localStorage.setItem(getUserKey('avatar'), newAvatar); // Save the new avatar for the current user
        };
        reader.readAsDataURL(file);
    }
});

// Handle Username Change
saveUsernameButton.addEventListener('click', () => {
    const newUsername = newUsernameInput.value.trim();
    const currentDate = new Date();

    // Check if username can be changed
    if (user.lastUsernameChange) {
        const daysSinceChange = Math.floor((currentDate - user.lastUsernameChange) / (1000 * 60 * 60 * 24));

        if (daysSinceChange < 60) {
            // alert(`You can only change your username every 60 days. Please try again in ${60 - daysSinceChange} days.`);
            // Pop up username change limit
            limitMessage.textContent = `You can only change your username every 60 days. Please try again in ${60 - daysSinceChange} days.`;
            userChangeLimit.style.display = 'flex';

            daysButton.removeEventListener('click', dayslimitClickHandler);
            daysButton.addEventListener('click', dayslimitClickHandler);
            return;
        }
    }

    if (newUsername) {
        // Save the new username
        usernameElement.textContent = newUsername;
        localStorage.setItem('username', newUsername);
        localStorage.setItem('lastUsernameChange', currentDate.toISOString());
        user.username = newUsername;
        user.lastUsernameChange = currentDate;

        // Update balance and other data for the new username
        balance = parseFloat(localStorage.getItem(getUserKey('balance'))) || 0.0;
        balanceDisplay.innerHTML = `Balance: $${balance.toFixed(3)}`;

        // alert('Username successfully updated!');
        // Pop up update message
        userUpdateMessage.textContent = 'Username successfully updated!';
        usernameUpdated.style.display = 'flex';

        daysButton.removeEventListener('click', userupdateClickHandler);
        daysButton.addEventListener('click', userupdateClickHandler);
    } else {
        alert('Please enter a valid username');
        // Pop up the valid username
        validMessage.textContent = 'Please enter a valid username';
        validUsername.style.display = 'flex';

        validButton.removeEventListener('click', validusernameClickHandler);
        validButton.addEventListener('click', validusernameClickHandler);
    }
});

// Time Online Tracking
let secondsOnline = parseInt(localStorage.getItem(getUserKey('timeOnline'))) || 0;

const updateTimer = () => {
    secondsOnline++;
    timeOnlineElement.textContent = `Time online: ${secondsOnline} seconds`;
    localStorage.setItem(getUserKey('timeOnline'), secondsOnline); // Save the time online for the current user
};
const timerInterval = setInterval(updateTimer, 1000);

// Log out Button Functionality
logoutButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    // alert('You have logged out!');
    logoutMessage.textContent = 'You have logged out!';
    logoutContainer.style.display = 'flex';

    loButton.removeEventListener('click', logoutClickHandler);
    loButton.addEventListener('click', logoutClickHandler);
});

// Profile Button Functionality
const profileButton = document.getElementById('profileButton');
const profileMode = document.getElementById('profileMode');

// Open Profile Mode
profileButton.addEventListener('click', () => {
    profileMode.style.display = 'flex';
});

// Close Profile Mode when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === profileMode) profileMode.style.display = 'none';
});

// Define the click handler
const logoutClickHandler = () => {
    logoutContainer.style.display = 'none';
    window.location.href = 'CoinGame.html';
};

const dayslimitClickHandler = () => {
    userChangeLimit.style.display = 'none';
};

const userupdateClickHandler = () => {
    usernameUpdated.style.display = 'none';
};

const validusernameClickHandler = () => {
    validUsername.style.display = 'none';
};
