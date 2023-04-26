import {Component} from './interface.js';

const PlayerMovementState = Object.freeze({
    JUMPING: 'jumping',
    FALLING: 'falling',
    GROUNDED: 'grounded'
});

/**
 * Component added to the player controlled entity to handle jumping and other inputs correctly.
 */
export class PlayerControlledComponent extends Component {
    static get identifier() {
        return 'player';
    }

    constructor(jumpHeight) {
        super();

        this._jumpHeight = jumpHeight;
        this._controlsEnabled = true;
        this._movementState = PlayerMovementState.FALLING;
    }

    reset() {
        this._movementState = PlayerMovementState.FALLING;
        this._controlsEnabled = true;
    }

    get jumpHeight() {
        return this._jumpHeight;
    }

    get isGrounded() {
        return this._movementState === PlayerMovementState.GROUNDED;
    }

    get isJumping() {
        return this._movementState === PlayerMovementState.JUMPING;
    }

    get isFalling() {
        return this._movementState === PlayerMovementState.FALLING;
    }

    setJumping() {
        this._movementState = PlayerMovementState.JUMPING;
    }

    setFalling() {
        this._movementState = PlayerMovementState.FALLING;
    }

    setGrounded() {
        this._movementState = PlayerMovementState.GROUNDED;
    }

    get controlsEnabled() {
        return this._controlsEnabled;
    }

    disableControls() {
        this._controlsEnabled = false;
    }
}
