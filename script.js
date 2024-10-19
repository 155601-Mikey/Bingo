// script.js
document.addEventListener("DOMContentLoaded", () => {
    const bingoForm = document.getElementById('bingo-form');
    const bingoGrid = document.getElementById('bingo-grid');
    const resetButton = document.getElementById('reset-bingo');
    const themeToggle = document.getElementById('theme-toggle');

    // Function to generate Bingo card
    const generateBingoCard = (texts, images) => {
        bingoGrid.innerHTML = '';  // Clear the grid
        const items = texts.concat(images).slice(0, 25); // Max 25 items

        items.forEach(item => {
            const cell = document.createElement('div');
            if (item.startsWith('http')) {
                const img = document.createElement('img');
                img.src = item;
                img.alt = "Bingo image";
                img.style.maxWidth = "100%";
                img.style.maxHeight = "100%";
                cell.appendChild(img);
            } else {
                cell.textContent = item;
            }

            // Add click event to toggle cross
            cell.addEventListener('click', () => {
                cell.classList.toggle('crossed');
            });

            bingoGrid.appendChild(cell);
        });
    };

    // Handle form submission
    bingoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textInput = document.getElementById('custom-text').value.split(',');
        const imageInput = document.getElementById('custom-images').value.split(',');
        generateBingoCard(textInput, imageInput);
    });

    // Reset button
    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.grid div').forEach(cell => {
            cell.classList.remove('crossed');
        });
    });

    // Theme toggle logic
    const applyTheme = (darkMode) => {
        document.body.classList.toggle('dark-mode', darkMode);
        themeToggle.textContent = darkMode ? 'light_mode' : 'dark_mode';
    };

    // Check system preference for dark mode
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemDarkMode);

    themeToggle.addEventListener('click', () => {
        const darkMode = document.body.classList.toggle('dark-mode');
        applyTheme(darkMode);
    });
});
