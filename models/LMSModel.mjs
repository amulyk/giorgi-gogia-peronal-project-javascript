import { validate } from "./validate.mjs";

export class LMSModel {
    constructor() {
        this.map = new Map();
        this.schema = {
            "title": "string",
            "lessons": "number",
            "description": "string"
        }
    }

    add(subject) {
        return new Promise((resolve, reject) => {
            if(validate(this.schema, subject, true)) {
                const {id} = subject;
                this.map.set(id, subject);
                resolve('Added a new subject');
            } else {
                reject('Wrong input');
            }
        });
    }

    remove(subject) {
        return new Promise((resolve, reject) => {
            const {id} = subject;
            if(this.map.has(id)) {
                this.map.delete(id);
                resolve('Subject removed');
            }
            else {
                reject("We don't have a subject with this id");
            }
        });
    }

    verify(subject) {
        return new Promise((resolve, reject) => {
            const {id} = subject;
            resolve(this.map.has(id));
        });
    }

    readAll() {
        return new Promise((resolve, reject) => {
            resolve ([...this.map.values()]);
        });
    }
}