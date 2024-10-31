export default class CustomerModel {
    constructor(id, name, email, phone, address) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}