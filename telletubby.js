class TelleTubby {
    /**
     * @param {*} name 
     * @param {*} color 
     * @param {*} height 
     * @param {*} weight 
     * @param {{face: boolean, chest: boolean, arms: boolean, legs: boolean, feet: boolean}} features
     */
    constructor(name, color, height, weight, features) {
        this = { ...this, _name, _color, _height, _weight, _features};
    }

    get name() {
        return this._name;
    }
    get color() {
        return this._color;
    }
    get height() {
        return this._height;
    }
    get weight() {
        return this._weight;
    }
    get features() {
        return this._features;
    }

    removeFeature(feature) {
        return new Promise((resolve, reject) => {
            if (!(feature in this._features))
                reject(`That's not a valid feature!`)
            if (!this._features[feature])
                reject(`Stupid little ${this._name}'s ${feature} has already been removed!`)
            this._features[feature] = false;
            resolve(`Stupid little ${this._name}'s ${this._color} ${feature} was blown off pwahahha`);
        });
    }

    addFeature(feature) {
        return new Promise((resolve, reject) => {
            if (!(feature in this._features))
                reject(`That's not a valid feature!`)
            if (this._features[feature]) 
                reject(`Stupid little ${this._name} already has a stupid little ${feature}`)
            this._features[feature] = true
            resolve(`Stupid little ${this._name} was given his stupid little ${this._color} ${feature} back :(`)
        });
    }
}