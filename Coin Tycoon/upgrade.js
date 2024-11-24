// Profile Button DOMS
const upgradeButton = document.getElementById('upgradeButton');
const upgradeMode = document.getElementById('upgradeMode');

// Open Upgrade Mode
upgradeButton.addEventListener('click', () => {
    upgradeMode.style.display = 'flex';
});

// Close Upgrade Mode when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === upgradeMode) upgradeMode.style.display = 'none';
});
