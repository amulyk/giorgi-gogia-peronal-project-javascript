export class SubjectsModel {
    constructor({title, lessons, description}) {
        this.title = title;
        this.lessons = lessons;
        this.description = description;
        this.id = String(this.lessons + Math.random());
    }

    _validateInput(title, lessons, description) {
        this._validate(title, 'string');
        this._validate(lessons, 'number');
        if(description) {
            this._validate(description, 'string');
        }
    }

    _validate(input, type){
        if(typeof input !== type) {
            throw new Error(`${input} should be type ${type}`)
        }
    }
}