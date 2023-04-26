import {GlobalConstants, GlobalDrawContext, GlobalGameState, Time} from './globals.js';
import {Scene, SceneManager} from './resourcemanagers/index.js';
import {
    FoodSpawnSystem,
    GarbageCollectorSystem,
    LevelSystem,
    MovementSystem,
    PlayerInputSystem,
    PlayerStateSystem,
    RenderSystem,
    ScoreSystem,
    TileBreakingSystem
} from './systems/index.js';
import {Player, TileFactory, TileType} from './entities/index.js';
import {Vector2} from './geometry/index.js';
import {Debug} from './debug.js';

/**
 * Sets up the game scenes. Extend this function to add new scenes with their assets and entities.
 */
function setupScenes() {
    const cupcakeWorld = new Scene(GlobalConstants.INITIAL_SCENE_NAME, true);
    cupcakeWorld.imageManager.addBackground('images/bg_cupcakeworld.png');
    cupcakeWorld.imageManager.addImage('tile_left', 'images/tile_cake_left.png');
    cupcakeWorld.imageManager.addImage('tile_mid', 'images/tile_cake_mid.png');
    cupcakeWorld.imageManager.addImage('tile_right', 'images/tile_cake_right.png');
    cupcakeWorld.imageManager.addImage('cupcake', 'images/cupcake.png');
    cupcakeWorld.imageManager.addImage('player_default', 'images/player_default.png');
    cupcakeWorld.imageManager.addImage('player_hurt', 'images/player_hurt.png');
    cupcakeWorld.imageManager.addImage('player_jump', 'images/player_jump.png');
    cupcakeWorld.imageManager.addImage('player_walk_1', 'images/player_walk_1.png');
    cupcakeWorld.imageManager.addImage('player_walk_2', 'images/player_walk_2.png');
    cupcakeWorld.imageManager.addImage('player_walk_3', 'images/player_walk_3.png');
    cupcakeWorld.soundManager.addSfx('drop', 'sound/drop.mp3');
    cupcakeWorld.soundManager.addSfx('eat', 'sound/eat.ogg');
    cupcakeWorld.createEntities = () => {
        for (let i = 0; i <= 9; i++) {
            const tileType = i === 0 ? TileType.LEFT :
                i === 9 ? TileType.RIGHT :
                    TileType.MID;

            TileFactory.createTile(new Vector2(i * 50, GlobalConstants.GROUND_LEVEL), tileType);
        }
    };

    const spaceWorld = new Scene(GlobalConstants.SECOND_SCENE_NAME, false);
    spaceWorld.imageManager.addBackground('images/background_purple.jpg');
    spaceWorld.setLightFont();
    spaceWorld.imageManager.addImage('tile_left', 'images/tile_moon_left.png');
    spaceWorld.imageManager.addImage('tile_mid', 'images/tile_moon_mid.png');
    spaceWorld.imageManager.addImage('tile_right', 'images/tile_moon_right.png');
    spaceWorld.imageManager.addImage('cupcake', 'images/cupcake.png');
    spaceWorld.imageManager.addImage('star', 'images/star.png');
    spaceWorld.imageManager.addImage('player_default', 'images/player_default.png');
    spaceWorld.imageManager.addImage('player_hurt', 'images/player_hurt.png');
    spaceWorld.imageManager.addImage('player_jump', 'images/player_jump.png');
    spaceWorld.imageManager.addImage('player_walk_1', 'images/player_walk_1.png');
    spaceWorld.imageManager.addImage('player_walk_2', 'images/player_walk_2.png');
    spaceWorld.imageManager.addImage('player_walk_3', 'images/player_walk_3.png');
    spaceWorld.soundManager.addSfx('drop', 'sound/drop.mp3');
    spaceWorld.soundManager.addSfx('eat', 'sound/eat.ogg');
    spaceWorld.createEntities = () => {
        for (let i = 0; i <= 9; i++) {
            const tileType = i === 0 ? TileType.LEFT :
                i === 9 ? TileType.RIGHT :
                    TileType.MID;

            TileFactory.createTile(new Vector2(i * 50, GlobalConstants.GROUND_LEVEL), tileType);
        }
    };

    ///TODO: Add a third scene here. Decide on a name for the level and choose the sounds, images and background.
}

/**
 * Draws the "press any key" start message on the screen.
 */
function drawStartMessage() {
    GlobalDrawContext.strokeStyle = "white";
    GlobalDrawContext.font = "30px Calibri";
    GlobalDrawContext.strokeText("Press any key to start", GlobalConstants.GAME_WINDOW_WIDTH / 4, GlobalConstants.GAME_WINDOW_HEIGHT / 2);
}

// use this to clear the game loop interval
let gameIntervalReference;

/**
 * Main game class.
 */
class Game {
    /**
     * Initialize the game before running.
     */
    static async init() {
        console.info('[Game] Initializing...');

        // setup or basic assets and entities
        setupScenes();
        Player.getEntity(); // ensure the player entity is created

        // load the current scene and render the start screen
        await SceneManager.loadScene(GlobalConstants.INITIAL_SCENE_NAME);
        GlobalDrawContext.drawImage(
            SceneManager.currentScene.imageManager.images.get('background'),
            0,
            0,
            GlobalConstants.GAME_WINDOW_WIDTH,
            GlobalConstants.GAME_WINDOW_HEIGHT
        );
        drawStartMessage();

        // add keyboard listeners to the window
        PlayerInputSystem.registerInputListeners();

        // setup game state variables
        console.info('[Game] Setting up game state...');
        GlobalGameState.reset();
        Time.init();
        Time.suspendTime();

        console.info('[Game] Game ready.');
    }

    /**
     * Run the game loop.
     * The game loop runs in a set interval.
     * The default settings provide ~60 fps.
     */
    static run() {
        gameIntervalReference = setInterval(function gameTick() {
            if (!GlobalGameState.current.paused) {
                Debug.log('[Game] Execute tick...');

                // update the global game run time
                Time.updateDeltaTime();

                // process the game tick through all systems
                // 1. process all user input first
                FoodSpawnSystem.tick();
                MovementSystem.tick();

                // 2. run all systems that require collisions after movement
                PlayerStateSystem.tick();
                TileBreakingSystem.tick();
                ScoreSystem.tick();

                // 3. always run render and gc last
                RenderSystem.tick();
                GarbageCollectorSystem.tick();

                LevelSystem.checkProgressCondition();
            }

            // update debug info
            Debug.printDebugInfo();
        }, GlobalConstants.SLOW_MODE ? 1000 : GlobalConstants.IDEAL_TICK_TIME);
    }
}

// runs on load
Game.init()
    .then(() => Game.run());
