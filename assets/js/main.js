// Main JS logic placeholder
// Bonus Hunt Widget Logic
function calculateBonusHunt(type) {
    const prefix = type === 'mega' ? 'mega' : (type === 'super' ? 'super' : 'player');
    const startingBalance = parseFloat(document.getElementById(prefix + '-starting').value) || 0;
    let totalBet = 0;
    let gameCount = 0;
    document.querySelectorAll('.' + prefix + '-bet').forEach(input => {
        const bet = parseFloat(input.value) || 0;
        totalBet += bet;
        if (bet > 0) gameCount++;
    });
    const avgBet = gameCount > 0 ? (totalBet / gameCount).toFixed(2) : 0;
    const avgX = (gameCount > 0 && avgBet > 0) ? (startingBalance / gameCount / avgBet).toFixed(2) : 0;
    document.getElementById(prefix + '-avg-bet').textContent = avgBet;
    document.getElementById(prefix + '-avg-x').textContent = avgX;
}
// Performance Debugging
console.time('HUD Load');
window.addEventListener('load', () => {
    console.timeEnd('HUD Load');
});
