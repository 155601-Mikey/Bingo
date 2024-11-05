// script.js
document.addEventListener("DOMContentLoaded", () => {
    const bingoGrid = document.getElementById('bingo-grid');
    const resetButton = document.getElementById('reset-bingo');
    const resetAllButton = document.getElementById('reset-all');
    const themeToggle = document.getElementById('theme-toggle');
    const imageUpload = document.getElementById('image-upload');

    const gridSize = 5;
    let customImages = [];

    // Function to generate empty Bingo card
    const generateEmptyBingoCard = () => {
        bingoGrid.innerHTML = '';  // Clear the grid
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('empty');
            
            // Click to add text functionality
            cell.addEventListener('click', () => {
                if (cell.classList.contains('empty')) {
                    const text = prompt('Enter text for this Bingo box:');
                    if (text) {
                        cell.textContent = text;
                        cell.classList.remove('empty');
                    }
                }
            });

            bingoGrid.appendChild(cell);
        }
    };

    // Handle custom image uploads
    imageUpload.addEventListener('change', (e) => {
        customImages = [];
        const files = e.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(event) {
                customImages.push(event.target.result);
                placeImagesInGrid();
            };
            reader.readAsDataURL(file);
        });
    });

    // Place uploaded images into empty grid cells
    const placeImagesInGrid = () => {
        const emptyCells = document.querySelectorAll('.grid div.empty');
        customImages.forEach((image, index) => {
            if (index < emptyCells.length) {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                emptyCells[index].appendChild(imgElement);
                emptyCells[index].classList.remove('empty');
            }
        });
    };

    // Reset only marks
    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.grid div').forEach(cell => {
            cell.classList.remove('crossed');
        });
    });

    // Reset the entire grid
    resetAllButton.addEventListener('click', () => {
        generateEmptyBingoCard();
    });

    // Theme toggle logic
    const applyTheme = (darkMode) => {
        document.body.classList.toggle('dark-mode', darkMode);
    };

    // Check system preference for dark mode
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemDarkMode);

    themeToggle.addEventListener('click', () => {
        const darkMode = document.body.classList.toggle('dark-mode');
        applyTheme(darkMode);
    });

    // Initialize with an empty Bingo card on page load
    generateEmptyBingoCard();
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all cells in the grid
    const cells = document.querySelectorAll('.grid div');

    // Add click event listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Toggle the 'crossed' class on click
            this.classList.toggle('crossed');
        });
    });
});

