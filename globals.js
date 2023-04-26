import {Vector2} from "./geometry/vector2.js";

/**
 * Collection of global constants and configuration values.
 * These will never change during game execution,
 */
export const GlobalConstants = Object.freeze({
    GAME_WINDOW_WIDTH: 500,
    GAME_WINDOW_HEIGHT: 500,
    INITIAL_SCENE_NAME: 'Cupcake-World',
    SECOND_SCENE_NAME: 'Space-World',
    IDEAL_TICK_TIME: 1000 / 60, // => ~60 fps,
    INITIAL_PLAYER_POSITION: new Vector2(300, 300),
    PLAYER_MOVEMENT_SPEED: 3,
    FOOD_SPAWN_POSITIONS: [2,52,102,152,202,252,302,352,402,452],
    WALKABLE_GROUND_LEVEL: 350,
    GROUND_LEVEL: 400,
    DEBUG_MODE: false,
    SLOW_MODE: false
});

const canvas = document.querySelector('#canvas');

canvas.width = GlobalConstants.GAME_WINDOW_WIDTH;
canvas.height = GlobalConstants.GAME_WINDOW_HEIGHT;

/**
 * Accessor for the canvas draw context used by the game.
 */
export const GlobalDrawContext = canvas.getContext('2d');

/**
 * Container for a global game state tracking various details of the game while playing.
 */
export class GlobalGameState {
    constructor() {
        this.score = 0;
        this.lives = 5;
        this.gameOver = false;
        this.paused = true;
        this.foodSpawnIntervalMs = GlobalConstants.SLOW_MODE ? 60_000 : 2000;
    }

    static get current() {
        if (GlobalGameState._instance === undefined) {
            GlobalGameState.reset();
        }

        return GlobalGameState._instance;
    }

    static reset() {
        GlobalGameState._instance = new GlobalGameState();
    }
}

/**
 * Global time object, will track time passing for the game as a whole and for each game tick.
 */
export class Time {
    static init() {
        Time._startupTime = performance.now();
        Time._suspendTime = Time._startupTime;
        Time._deltaSuspended = 0;
        Time._isSuspended = false;
    }

    static get deltaTime() {
        return Time._deltaTime || 0;
    }

    static suspendTime()  {
        Time._suspendTime = performance.now();
        Time._isSuspended = true;
    }

    static resumeTime() {
        Time._deltaSuspended += performance.now() - Time._suspendTime;
        Time._isSuspended = false;
    }

    static updateDeltaTime() {
        if (!Time._isSuspended) {
            Time._deltaTime = performance.now() - Time._startupTime - Time._deltaSuspended;
        }
    }
}

/**
 * Map of key bindings for the game.
 */
export const KeyBinds = Object.freeze({
    ACTION_MOVE_LEFT: ['A', 'a', 'Left', 'ArrowLeft'],
    ACTION_MOVE_RIGHT: ['D', 'd', 'Right', 'ArrowRight'],
    ACTION_JUMP: [' ', 'Space', 'W', 'w', 'Up', 'ArrowUp'],
    GAME_PAUSE_PLAY: ['Esc', 'Escape'],
    GAME_RESTART: []
});

/**
 * Layer index identifiers.
 */
export const LayerIndexes = Object.freeze({
    BACKGROUND: 0,
    FOOD: 1,
    Main: 2,
    FOREGROUND: 3
});
