import {
    Collision2DComponent,
    ConsumableComponent,
    Graphics2DComponent,
    Gravity2DComponent
} from '../engine/components/index.js';
import {GlobalDrawContext, GlobalGameState, LayerIndexes} from '../globals.js';     
import {CircleCollider} from '../engine/geometry/index.js';
import {Entity, EntityTypes} from '../engine/entities/index.js';
import { SceneFontColor, SceneManager } from '../engine/resourcemanagers/sceneManager.js';
import { GlobalConfig } from '../config.js';

/**
 * Various available food types.
 */
const FoodTypes = Object.freeze({
    CUPCAKE: {
        name: 'cupcake',
        value: 1,
        weight: 3 // TODO TASK - try changing the weight of a cupcake to see how it affects the game
    },
    SHELL: {
        name: 'seashell',
        value: 1,
        weight: 2 // TODO TASK - try changing the weight of a cupcake to see how it affects the game
    },
    FRUIT: {
        name: 'fruit',
        value: 3,
        weight: 5
    },
    STAR: {
        name: 'star',
        value: 10,
        weight: 5
    }
});

/**
 * Factory for creating food entities.
 */
export class FoodFactory {
    /**
     * Creates a food item.
     * @param position The position where the food item is spawned.
     * @returns {Entity} The created entity.
     */
    static createFood(position) {
        /*
         * TODO TASK
         *  Currently, only cupcakes are spawned by the game.
         *  Come up with a rule on how to spawn different food types, e.g. randomly selecting one or spawning one every n items / seconds.
         *  Then implement that rule.
         */

        let foodType = FoodTypes.SHELL;

        if(SceneManager.currentScene.name === GlobalConfig.THIRD_SCENE_NAME) {
             foodType = FoodTypes.SHELL;
        }


        if(SceneManager.currentScene.name === GlobalConfig.SECOND_SCENE_NAME) {
             foodType = FoodTypes.STAR;
        }

        
        if(SceneManager.currentScene.name === GlobalConfig.INITIAL_SCENE_NAME) {
            foodType = FoodTypes.CUPCAKE;
       }



        return new Entity(EntityTypes.FOOD)
            .addComponent(new ConsumableComponent(foodType.value))
            .addComponent(new Graphics2DComponent(position, 44, 44, foodType.name))
            .addComponent(new Collision2DComponent(CircleCollider.fromDimensions(position, 44, 44), LayerIndexes.FOOD))
            .addComponent(new Gravity2DComponent(foodType.weight)); // TODO TASK - If you add a difficulty level via a global config, you could e.g. multiply it with the weight to make things fall faster
    }
}
