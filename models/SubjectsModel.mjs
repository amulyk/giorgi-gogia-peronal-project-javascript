import {validate} from './validate';

export class SubjectsModel {
    constructor(data) {
        this.schema = {
            "title": "string",
            "lessons": "number",
            "description": "string"
        };
        const {title, lessons, description} = data;
        if(validate(this.schema, data))
        this.title = title;
        this.lessons = lessons;
        this.description = description;
        this.id = String(this.lessons + Math.random());
    }
}