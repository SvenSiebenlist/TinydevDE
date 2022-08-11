import Node2D from "../Node2D.class.js";

export default class Menu extends Node2D {
    _child = null;
    _value = 100;
    width = 100;
    height = 20;
    showValue = false;
    staticPosition = true;
    gravity = false;

    backgroundColor = "black";
    valueColor = "orange";
    
    constructor(child = null, valueAttrName = null) {
        super();
        this._child = child;
        this._value = valueAttrName;
    }

    get displayText() {
        return this.value;
    }

    setSize(w, h) {
        this.width = w;
        this.height = h;
    }

    get value() {
        if(typeof this._child[this._value] == "number") {
            return Math.floor(this._child[this._value]);
        }
        return this._child[this._value];
    }
    renderStatic(ctx, xOffset = 0, zOffset = 0, width = 0, height = 0) {
        const point = this.getStaticHitboxPoints();
        
        ctx.fillStyle = this.backgroundColor; // rect background
        ctx.fillRect(point.topLeft.x, point.topLeft.z, this.width, this.height);

        ctx.fillStyle = this.valueColor; // rect value
        ctx.fillRect(point.topLeft.x, point.topLeft.z, this.width / this.limit * this.value, this.height);

        ctx.strokeStyle = "black"; // rect border
        ctx.strokeRect(point.topLeft.x, point.topLeft.z, this.width, this.height);

        // ctx.textAlign = "right"; // text title
        // ctx.fillText(this.value + ":", this.position.x + xOffset, this.position.z + zOffset + this.height - 5);

        ctx.fillStyle = "white";
        ctx.textAlign = "center"; // text value
        if(this.showValue) {
            ctx.fillText(this._value + ": " + this.displayText, point.topCenter.x, point.topCenter.z + this.height/2 + 3);
        }
    }

    renderDynamic(ctx, xOffset = 0, zOffset = 0, width = 0, height = 0) {
        const point = this.getDynamicHitboxPoints(xOffset, zOffset, width, height);

        ctx.fillStyle = this.backgroundColor; // rect background
        ctx.fillRect(point.topLeft.x, point.topLeft.z, this.width, this.height);

        ctx.strokeStyle = "black"; // rect border
        ctx.strokeRect(point.topLeft.x, point.topLeft.z, this.width, this.height);

        ctx.textAlign = "right"; // text title
        // ctx.fillText(this.#value + ":", this.position.x + xOffset, this.position.z + zOffset + this.height - 5);

        ctx.fillStyle = "white";
        ctx.textAlign = "center"; // text value
        if(this.showValue) {
            ctx.fillText(this._value + ": " + this.displayText, point.topCenter.x, point.topCenter.z + this.height/2 + 3);
        }
    }
    
    render(ctx, xOffset, zOffset, width, height) {
        // ctx.fillRect(this.position.x + xOffset + width/2 - this.width/2, this.position.z + zOffset, this.width, this.height);
        
        if(this.staticPosition) {
            this.renderStatic(ctx, 0, 0, 0, 0);
        } else {
            this.renderDynamic(ctx, xOffset, zOffset, width, height);
        }
        
    }
}