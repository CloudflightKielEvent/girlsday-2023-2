import {FoodFactory} from '../entities/index.js';
import {GlobalConstants, GlobalGameState, Time} from '../globals.js';
import {Vector2} from '../geometry/index.js';

let lastFoodSpawn = 0;

/**
 * System for handling food spawns.
 */
export class FoodSpawnSystem {
    /**
     * Process a single game tick.
     * Will spawn new food entities in regular intervals in a randomized x position near the top of the screen.
     */
    static tick() {
        if (Time.deltaTime > lastFoodSpawn + GlobalGameState.current.foodSpawnIntervalMs) {
            lastFoodSpawn = Time.deltaTime;

            const spawnX = GlobalConstants.FOOD_SPAWN_POSITIONS[Math.floor(Math.random() * GlobalConstants.FOOD_SPAWN_POSITIONS.length)];

            FoodFactory.createFood(new Vector2(spawnX, 20));
        }
    }
}
