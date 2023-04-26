import {SceneManager} from "../resourcemanagers/index.js";
import {GlobalConstants, GlobalDrawContext, GlobalGameState, Time} from "../globals.js";
import {Player} from "../entities/playerEntity.js";

/**
 * System for handling level transitions.
 */
export class LevelSystem {
    /**
     * Checks whether the game score is high enough for a level transition.
     * If so, the game is paused and the level is changed to the second level. After that the game resumes.
     */
    static checkProgressCondition() {
        // Switch to second level
        if (GlobalGameState.current.score === 10 && SceneManager.currentScene.name === 'Cupcake-World') {
            GlobalGameState.current.paused = true;
            Time.suspendTime();

            SceneManager.loadScene(GlobalConstants.SECOND_SCENE_NAME).then(
                () => {
                    Player.reset();
                    GlobalGameState.current.paused = false;
                    Time.resumeTime();
                }
            );
            GlobalDrawContext.drawImage(
                SceneManager.currentScene.imageManager.images.get('background'),
                0,
                0,
                GlobalConstants.GAME_WINDOW_WIDTH,
                GlobalConstants.GAME_WINDOW_HEIGHT
            );
        }

        /// TODO: Add a level transition to the third level. Decide at how many points the level should change.
    }
}
