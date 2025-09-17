class RGBGame {
            constructor() {
                this.numSquares = 6;
                this.colors = [];
                this.pickedColor = '';
                this.score = 0;
                this.initElements();
                this.bindEvents();
                this.newGame();
            }

            initElements() {
                this.squares = document.querySelectorAll('.square');
                this.colorDisplay = document.getElementById('colorDisplay');
                this.messageDisplay = document.getElementById('message');
                this.h1 = document.querySelector('h1');
                this.resetButton = document.getElementById('reset');
                this.easyBtn = document.getElementById('easyBtn');
                this.hardBtn = document.getElementById('hardBtn');
                this.scoreDisplay = document.getElementById('scoreDisplay');
                this.squaresContainer = document.getElementById('squaresContainer');
            }

            bindEvents() {
                this.easyBtn.addEventListener('click', () => this.setDifficulty(3));
                this.hardBtn.addEventListener('click', () => this.setDifficulty(6));
                this.resetButton.addEventListener('click', () => this.newGame());
                
                this.squares.forEach(square => {
                    square.addEventListener('click', (e) => this.handleSquareClick(e));
                });
            }

            setDifficulty(num) {
                this.numSquares = num;
                
                // Update button states
                [this.easyBtn, this.hardBtn].forEach(btn => btn.classList.remove('selected'));
                (num === 3 ? this.easyBtn : this.hardBtn).classList.add('selected');
                
                // Update grid layout
                this.squaresContainer.style.gridTemplateColumns = 
                    num === 3 ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)';
                
                this.newGame();
            }

            newGame() {
                this.colors = this.generateRandomColors(this.numSquares);
                this.pickedColor = this.pickColor();
                this.colorDisplay.textContent = this.pickedColor;
                this.messageDisplay.textContent = 'Pick a color!';
                this.resetButton.textContent = 'New Colors';
                this.h1.style.background = 'linear-gradient(45deg, #4682b4, #5a9fd4)';
                
                this.squares.forEach((square, i) => {
                    square.className = 'square'; // Reset classes
                    if (i < this.numSquares) {
                        square.style.backgroundColor = this.colors[i];
                        square.style.display = 'block';
                    } else {
                        square.style.display = 'none';
                    }
                });
            }

            handleSquareClick(e) {
                const clickedColor = e.target.style.backgroundColor;
                
                if (clickedColor === this.pickedColor) {
                    this.handleCorrectGuess(e.target, clickedColor);
                } else {
                    this.handleWrongGuess(e.target);
                }
            }

            handleCorrectGuess(square, color) {
                this.score += this.numSquares === 6 ? 10 : 5;
                this.scoreDisplay.textContent = `Score: ${this.score}`;
                this.messageDisplay.textContent = 'Correct! 🎉';
                this.resetButton.textContent = 'Play Again?';
                
                square.classList.add('correct');
                this.changeAllColors(color);
                this.h1.style.background = color;
                
                setTimeout(() => square.classList.remove('correct'), 600);
            }

            handleWrongGuess(square) {
                square.classList.add('wrong');
                square.style.backgroundColor = '#2d2d2d';
                this.messageDisplay.textContent = 'Try again! 🤔';
                
                setTimeout(() => square.classList.remove('wrong'), 500);
            }

            changeAllColors(color) {
                this.squares.forEach(square => {
                    if (square.style.display !== 'none') {
                        square.style.backgroundColor = color;
                    }
                });
            }

            pickColor() {
                const randomIndex = Math.floor(Math.random() * this.colors.length);
                return this.colors[randomIndex];
            }

            generateRandomColors(num) {
                return Array.from({ length: num }, () => this.randomColor());
            }

            randomColor() {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                return `rgb(${r}, ${g}, ${b})`;
            }
        }

        // Start the game when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new RGBGame();
        });