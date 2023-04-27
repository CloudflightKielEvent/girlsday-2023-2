import {GlobalDrawContext, GlobalGameState, Time} from './globals.js';
import {GlobalConfig} from './config.js';
import {Scene, SceneManager} from './engine/resourcemanagers/index.js';
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
} from './engine/systems/index.js';
import {Player, TileFactory, TileType} from './entities/index.js';
import {Vector2} from './engine/geometry/index.js';
import {Debug} from './engine/debug.js';

const defineCupcakeWorld = () => {
    const cupcakeWorld = new Scene(GlobalConfig.INITIAL_SCENE_NAME, true);
    /*
     * TODO TASK
     *  For each level, we need to define the assets (images and sounds) available in the scene.
     *  You can try switching assets by changing the urls, but make sure to not change the ids! :)
     */
    cupcakeWorld.imageManager.addBackground('images/bg_cupcakeworld.png');
    cupcakeWorld.imageManager.addImage('tile_left', 'images/tile_cake_left.png');
    cupcakeWorld.imageManager.addImage('tile_mid', 'images/tile_cake_mid.png');
    cupcakeWorld.imageManager.addImage('tile_right', 'images/tile_cake_right.png');
    cupcakeWorld.imageManager.addImage('cupcake', 'images/cupcake.png');
    cupcakeWorld.imageManager.addImage('seashell', 'images/seashell.png');
    cupcakeWorld.imageManager.addImage('player_default', 'images/player2_walk_1.png');
    cupcakeWorld.imageManager.addImage('player_hurt', 'images/player2_hurt.png');
    cupcakeWorld.imageManager.addImage('player_jump', 'images/player2_jump.png');
    cupcakeWorld.imageManager.addImage('player_walk_1', 'images/player2_walk_1.png');
    cupcakeWorld.imageManager.addImage('player_walk_2', 'images/player2_walk_2.png');
    cupcakeWorld.imageManager.addImage('player_walk_3', 'images/player2_walk_3.png');
    cupcakeWorld.soundManager.addSfx('drop', 'sound/drop.mp3');
    cupcakeWorld.soundManager.addSfx('eat', 'sound/eat.ogg');
    cupcakeWorld.soundManager.addSfx('music', 'sound/music.ogg');

    cupcakeWorld.createEntities = () => {
        for (let i = 0; i <= 9; i++) {
            const tileType = i === 0 ? TileType.LEFT :
                i === 9 ? TileType.RIGHT :
                    TileType.MID;

            TileFactory.createTile(new Vector2(i * 50, GlobalConfig.GROUND_LEVEL), tileType);
        }
    };
}

const defineSpaceWorld = () => {
    const spaceWorld = new Scene(GlobalConfig.SECOND_SCENE_NAME, false);
    spaceWorld.imageManager.addBackground('images/background_purple.jpg');
    spaceWorld.setLightFont();
    spaceWorld.imageManager.addImage('tile_left', 'images/tile_tundra_left.png');
    spaceWorld.imageManager.addImage('tile_mid', 'images/tile_tundra_mid.png');
    spaceWorld.imageManager.addImage('tile_right', 'images/tile_tundra_right.png');
    spaceWorld.imageManager.addImage('cupcake', 'images/cupcake.png');
    spaceWorld.imageManager.addImage('seashell', 'images/seashell.png');
    spaceWorld.imageManager.addImage('star', 'images/star.png');
    spaceWorld.imageManager.addImage('player_default', 'images/player_default.png');
    spaceWorld.imageManager.addImage('player_hurt', 'images/player_hurt.png');
    spaceWorld.imageManager.addImage('player_jump', 'images/player_jump.png');
    spaceWorld.imageManager.addImage('player_walk_1', 'images/player_walk_1.png');
    spaceWorld.imageManager.addImage('player_walk_2', 'images/player_walk_2.png');
    spaceWorld.imageManager.addImage('player_walk_3', 'images/player_walk_3.png');
    spaceWorld.soundManager.addSfx('drop', 'sound/drop.mp3');
    spaceWorld.soundManager.addSfx('eat', 'sound/eat.ogg');
    spaceWorld.soundManager.addSfx('music', 'sound/music_space_world.ogg');
    spaceWorld.createEntities = () => {
        for (let i = 0; i <= 9; i++) {
            const tileType = i === 0 ? TileType.LEFT :
                i === 9 ? TileType.RIGHT :
                    TileType.MID;

            TileFactory.createTile(new Vector2(i * 50, GlobalConfig.GROUND_LEVEL), tileType);
        }
    };
}

const defineThirdWorld = () => {
    const beachWorld = new Scene(GlobalConfig.THIRD_SCENE_NAME, false);
    beachWorld.imageManager.addBackground('images/background_beach.png');
    beachWorld.setLightFont();
    beachWorld.imageManager.addImage('tile_left', 'images/tile_choco_left.png');
    beachWorld.imageManager.addImage('tile_mid', 'images/tile_choco_mid.png');
    beachWorld.imageManager.addImage('tile_right', 'images/tile_choco_right.png');
    beachWorld.imageManager.addImage('seashell', 'images/seashell.png');
    beachWorld.imageManager.addImage('star', 'images/star.png');
    beachWorld.imageManager.addImage('player_default', 'images/seal_walk_1.png');
    beachWorld.imageManager.addImage('player_hurt', 'images/seal_fall.png');
    beachWorld.imageManager.addImage('player_jump', 'images/seal_jump.png');
    beachWorld.imageManager.addImage('player_walk_1', 'images/seal_walk_1.png');
    beachWorld.imageManager.addImage('player_walk_2', 'images/seal_walk_2.png');
    beachWorld.imageManager.addImage('player_walk_3', 'images/seal_walk_3.png');
    beachWorld.soundManager.addSfx('drop', 'sound/drop.mp3');
    beachWorld.soundManager.addSfx('eat', 'sound/eat.ogg');
    beachWorld.soundManager.addSfx('music', 'sound/music.ogg');
    beachWorld.createEntities = () => {
        for (let i = 0; i <= 9; i++) {
            const tileType = i === 0 ? TileType.LEFT :
                i === 9 ? TileType.RIGHT :
                    TileType.MID;

            TileFactory.createTile(new Vector2(i * 50, GlobalConfig.GROUND_LEVEL), tileType);
        }
    }; /*
     * TODO TASK
     *  Define a third world with another scene. Use the above scenes for inspiration. Try experimenting with different assets and settings.
     */
}

/**
 * Sets up the game scenes. Extend this function to add new scenes with their assets and entities.
 */
function setupScenes() {
    defineCupcakeWorld();
    defineSpaceWorld();
    defineThirdWorld();
}

/**
 * Draws the "press any key" start message on the screen.
 */
function drawStartMessage() {
    GlobalDrawContext.strokeStyle = "white";
    GlobalDrawContext.font = "30px Calibri";
    GlobalDrawContext.strokeText("Hello Girlsday press 'A' to start", 60, GlobalConfig.GAME_WINDOW_HEIGHT / 2);
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
        await SceneManager.loadScene(GlobalConfig.THIRD_SCENE_NAME);
        GlobalDrawContext.drawImage(
            SceneManager.currentScene.imageManager.images.get('background'),
            0,
            0,
            GlobalConfig.GAME_WINDOW_WIDTH,
            GlobalConfig.GAME_WINDOW_HEIGHT
        );
        Player.reset();
        drawStartMessage();

        // add keyboard listeners to the window
        PlayerInputSystem.registerInputListeners();

        // setup game state variables
        console.info('[Game] Setting up game state...');
        GlobalGameState.reset();
        Time.init();

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

                LevelSystem.completeLoopRun();
            }

            // update debug info
            Debug.printDebugInfo();
        }, GlobalConfig.SLOW_MODE ? 1000 : GlobalConfig.IDEAL_TICK_TIME);
    }
}

// runs on load
Game.init()
    .then(() => Game.run());
