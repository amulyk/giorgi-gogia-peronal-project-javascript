import {validate} from './validate';

export class PupilsModel {
    constructor() {
        this.map = new Map();
        this.schema = {
            "name": {
              "first": "string",
              "last": "string"
            },
            "image": "string",
            "dateOfBirth": "string", // format date
            "phones": [
              {
                "phone": "string",
                "primary": "boolean"
              }
            ],
            "sex": "string", // male OR female
            "description": "string"
        };
    }

    _validate(name, type) {
        if (typeof name !== type) {
            throw new Error(`You must enter ${name} as ${type}`)
        }
    }
    _validateString(name) {
        if (typeof name !== 'string') {
            throw new Error(`You must enter ${name} as a string`)
        }
    }

    add(data) {
        this._validate(data, 'object');
        return new Promise((resolve, reject) => {
            if(validate(this.schema, data)) {
                let id = Math.random().toString();
                data.id = id;
                this.map.set(id, data);
                resolve(data);
            } else {
                reject('Wrong input')
            }
        });
    }

    read(id) {
        return new Promise ((resolve, reject) => {
            if (typeof id !== 'string') {
                reject ('id must be a string');
            } else if (!this.map.has(id)) {
                reject ("This id doesn't exist in the database");
            } else {
                resolve(this.map.get(id));
            }
        });
    }

    update(id, newProfile ) {
        this._validateString(id);
        this._validate(newProfile, 'object');
        return new Promise((resolve, reject) => {
            if (!this.map.has(id)) {
                reject("This id doesn't exist in the database");
            }
            if(validate (this.schema, newProfile, true)) {
                let oldProfile = this.map.get(id);
                for ( var i  = 0 ; i < Object.keys(newProfile).length; i++) {
                    if(Array.isArray(newProfile[Object.keys(newProfile)[i]])) {
                        for (let i = 0 ; i < newProfile[Object.keys(newProfile)[i]].length ; i++) {
                            this.update(id, newProfile[Object.keys(newProfile)[i]])
                        }
                    }
                    if (typeof newProfile[Object.keys(newProfile)[i]] == 'object') {
                        this.update(id, newProfile[Object.keys(newProfile)[i]])
                    }
                    if (Object.keys(newProfile)[i] == Object.keys(oldProfile)[i]) {
                        this.map.set(id, {...oldProfile, ...newProfile});
                    }
                }
                resolve(id);
        }
      });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            if(typeof id !== 'string') {
              reject('id must be a string');
            }
            if(this.map.has(id)) {
              this.map.delete(id);
              resolve("Pupil has been removed from the database")
            } else {
              reject("We don't have a pupil with this id");
            }
        });
    }
}