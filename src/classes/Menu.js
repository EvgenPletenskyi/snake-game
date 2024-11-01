import {Container, Graphics, Text} from 'pixi.js';
import {ButtonContainer, CheckBox} from '@pixi/ui';

class Menu {
    constructor() {
        this.container = new Container();
        this._bestScore = localStorage.getItem('bestScore') || 0;
        this._currentScore = 0;
        this.container.x = 440;
        this._gameStatus = 'menu';
        this._selectedMode = null;

        this.createBackground(300, 440);
        this.createTitle();
        this.createScoreDisplay();
        this.createModes();
        this.createButtons();
    }

    createBackground(width, height) {
        const background = new Graphics();
        background.rect(0, 0, width, height).fill(0x077482);
        this.container.addChild(background);
    }

    createTitle() {
        const title = new Text({
            text: 'Snake Game',
            style: {
                fontFamily: 'Arial',
                fontSize: 36,
                fontWeight: 600,
                fill: 0x55d292,
            }
        });
        title.anchor.set(0.5, 0);
        title.position.set(this.container.width / 2, 20);
        this.container.addChild(title);
    }

    createText(text, x, y, fontSize = 22, color = 0xffffff) {
        const textObj = new Text({
            text: text,
            style: {
                fontSize: fontSize,
                fill: color,
            }
        });
        textObj.position.set(x, y);
        this.container.addChild(textObj);
        return textObj;
    }

    createScoreDisplay() {
        this.bestScoreText = this.createText(`Best: ${this._bestScore}`, 20, 80);

        this.currentScoreText = this.createText(`Score: ${this._currentScore}`, 20, 110);
    }

    createModes() {
        const modes = ['Classic', 'God mode', 'Walls', 'Portal', 'Speed'];
        const width = 25, height = 25, radius = 5;
        this.checkBoxContainer = new Container();

        modes.forEach((modeName, index) => {
            const checkbox = new CheckBox({
                checked: false,
                text: `${modeName}`,
                style: {
                    unchecked: new Graphics()
                        .fill(0xDCB000)
                        .roundRect(-2, -2, width + 4, height + 4, radius)
                        .fill(0xF1D583)
                        .roundRect(0, 0, width, height, radius),

                    checked: new Graphics()
                        .fill(0xDCB000)
                        .roundRect(-2, -2, width + 4, height + 4, radius)
                        .fill(0xF1D583)
                        .roundRect(0, 0, width, height, radius)
                        .fill(0xA5E24D)
                        .roundRect(5, 5, width - 10, height - 10, radius),
                    text: {
                        fontSize: 22,
                        fill: 0xFFFFFF
                    }
                }
            });

            checkbox.position.set(20, 160 + index * 40);
            checkbox.onCheck.connect((checked => {
                if (checked) {
                    this.onModeChecked(modeName);
                } else {
                    this.onModeUnchecked(modeName)
                }
            }));

            this.checkBoxContainer.addChild(checkbox);
        });
        this.container.addChild(this.checkBoxContainer);
    }

    onModeChecked(modeName) {
        if (this._selectedMode && this._selectedMode !== modeName) {
            this.checkBoxContainer.children.forEach(checkbox => {
                if (checkbox.text === this._selectedMode) {
                    checkbox.checked = false; // Uncheck the previous checkbox
                }
            });
        }
        this._selectedMode = modeName; // Save the newly selected mode
    }

    onModeUnchecked(modeName) {
        if (this._selectedMode === modeName) {
            this._selectedMode = null; // Clear selected mode if unchecked
        }
    }
    createButton(label, x, y, onClick) {
        const buttonGraphics = new Graphics()
            .rect(0, 0, 100, 50, 15)
            .fill(0x245450);

        const buttonText = new Text({
            text: label,
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffffff,
                align: 'center'
            }});
        buttonText.anchor.set(0.5);
        buttonText.position.set(buttonGraphics.width / 2, buttonGraphics.height / 2);

        const buttonContainer = new ButtonContainer(buttonGraphics);
        buttonContainer.addChild(buttonText);
        buttonContainer.position.set(x, y);
        buttonContainer.interactive = true;
        buttonContainer.buttonMode = true;
        buttonContainer.on('pointerdown', onClick);

        this.container.addChild(buttonContainer);

        return buttonContainer;
    }

    createButtons() {
        this.playButton = this.createButton('Play', 20, 370, () => this.startGame());
        this.exitButton=  this.createButton('Exit', 150, 370, () => this.exitGame());
    }

    updateScore(newScore) {
        this._currentScore = newScore;
        this.currentScoreText.text = `Score: ${this._currentScore}`;

        if (newScore > this._bestScore) {
            this._bestScore = newScore;
            this.bestScoreText.text = `Best: ${this._bestScore}`;
            localStorage.setItem('bestScore', this._bestScore);
        }
    }

    startGame() {
        if (this._selectedMode) {
            this._gameStatus = 'start';
            this.playButton.visible = false;
            this.exitButton.visible = false;
            this.checkBoxContainer.visible = false;

            this.createMenuButton();
        }else {
            window.alert("Please select the game mode");
        }
    }
    createMenuButton() {
        this.menuButton = this.createButton('Menu', 20, 370, () => {
            this.restoreMenu();
            this.menuButton.visible = false;
        });
    }

    restoreMenu() {
        this.playButton.visible = true;
        this.exitButton.visible = true;
        this.menuButton.visible = false;
        this.checkBoxContainer.visible = true;
        this._gameStatus = 'menu';
    }
    exitGame() {
        this._gameStatus = 'menu';
        const confirmExit = window.confirm("Are you sure you want to close the game?");
        if (confirmExit) {
            window.close();
        }
    }

    get gameStatus() {
        return this._gameStatus;
    }
    set gameStatus(gameStatus) {
        this._gameStatus = gameStatus;
    }
    get selectedMode() {
        return this._selectedMode;
    }
}

export default Menu;
