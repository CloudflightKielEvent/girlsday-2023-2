import {EntityList, Player} from './entities/index.js';
import {GlobalConstants, GlobalGameState, Time} from './globals.js';

/*
 * This is just a div below the canvas to print some debug info on screen.
 */
const debugArea = document.querySelector('#debugarea');

/**
 * Helper to print some debug info.
 */
export class Debug {
    /**
     * Print some debug info on the screen as html.
     */
    static printDebugInfo() {
        const activeGameEntities = EntityList.entities;
        const mappedEntities = activeGameEntities.map((iEntity) => iEntity.type).join(',');

        const currentGameState = GlobalGameState.current;
        debugArea.innerHTML = `
            <p>Entities: ${mappedEntities}</p>
            <p>Paused: ${currentGameState.paused}</p>
            <p>Food spawn interval: ${currentGameState.foodSpawnIntervalMs}</p>
            <p>Game run time: ${Math.floor(Time.deltaTime / 1000)} seconds</p>
            ${GlobalConstants.DEBUG_MODE ? Player.getDebugInfo() : ''}
        `;
    }

    /**
     * Log stuff to console if and only if debug mode is enabled.
     * @param {*} args The args to pass to console.debug.
     */
    static log(...args) {
        if (GlobalConstants.DEBUG_MODE) {
            console.debug(...args);
        }
    }
}
