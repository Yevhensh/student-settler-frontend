
export default class Room {
    private _id;
    private _title;

    constructor(id, title) {
        this._id = id;
        this._title = title;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }
}