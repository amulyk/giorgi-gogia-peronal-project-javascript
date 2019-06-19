import {validate} from './validate';

export class TeachersModel {
    constructor() {
        this.map = new Map();
        this.schema = {
            "name": {
              "first": "string",
              "last": "string"
            },
            "image": "string",
            "dateOfBirth": "string", // format date
            "emails": [
              {
                "email": "string",
                "primary": "boolean"
              }
            ],
            "phones": [
              {
                "phone": "string",
                "primary": "boolean"
              }
            ],
            "sex": "string", // male or female
            "subjects": [
              {
                "subject": "string"
              }
            ],
            "description": "string",
        }
    }

    _validateDate(date) {
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
            throw new Error("The date format should be 'mm/dd/yyyy'")
        }
    }

    _validateSex(sex) {
        if(sex !== 'male' || sex !== 'female') {
            throw new Error('The sex should be either male or female')
        }
    }

    add(data) {
        return new Promise((resolve, reject) => {
            if(validate(this.schema, data)) {
                let id = Math.random().toString();
                this.map.set(id, data);
                resolve (id);
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
                let data = this.map.get(id);
                data.id = id;
                resolve(data);
            }
        });
    }

    update(id, newProfile) {
        return new Promise((resolve, reject) => {
          if(!this.map.get(id)) {
            reject("This id doesn't exist in the database");
          }
          if(validate (this.schema, newProfile, true)) {
              let oldProfile = this.map.get(id);
              resolve(this.map.set(id, {...oldProfile, ...newProfile}));
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
          resolve("Teacher has been removed from the database")
        } else {
          reject("We don't have a teacher with this id");
        }
      });
    }
}