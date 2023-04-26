import {Component} from './interface.js';

/**
 * A component used for 2d entities that can collide with each other, producing various effects.
 */
export class Collision2DComponent extends Component {
    /**
     * @inheritDoc
     * @override
     */
    static get identifier() {
        return 'collision';
    }

    constructor(collider, layer) {
        super();

        this._collider = collider;
        this._layer = layer;
        this._collidingEntities = [];
        this._ignoreCollisions = false;
    }

    /**
     * Get the collider object.
     * @returns {Collider} The collider.
     */
    get collider() {
        return this._collider;
    }

    /**
     * Get the layer index.
     * @returns {number} The layer index.
     */
    get layer() {
        return this._layer;
    }

    /**
     * Get the entities colliding with this entity.
     * @returns {Entity[]} The colliding entities.
     */
    get collidingEntities() {
        return this._collidingEntities;
    }

    /**
     * Resets the currently stored collisions.
     */
    resetCollisions() {
        this._collidingEntities = [];
    }

    /**
     * Adds a new collision entity.
     * @param {Entity} entity The entity this is colliding with.
     */
    addCollision(entity) {
        this._collidingEntities.push(entity);
    }

    disableCollisions() {
        this._ignoreCollisions = true;
    }

    enableCollisions() {
        this._ignoreCollisions = false;
    }

    get ignoreCollisions() {
        return this._ignoreCollisions;
    }
}
