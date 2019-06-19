export function validate(schema, data, flag = false) {
    if (flag == false) {
        for (let i = 0; i < Object.keys(schema).length ; i++) {
            if(Object.keys(data)[i] === 'dateOfBirth') {
                if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data[Object.keys(data)[i]])) {
                    throw new Error("The date format should be 'mm/dd/yyyy'")
                }
            }
            if(Object.keys(data)[i] === 'sex') {
                if(data[Object.keys(data)[i]] !== 'male' && data[Object.keys(data)[i]] !== 'female') {
                    throw new Error('The sex should be either male or female')
                }
            }
            if(Array.isArray(data[Object.keys(data)[i]])) {
                for (let i = 0 ; i < data[Object.keys(data)[i]].length ; i++) {
                    validate (schema[Object.keys(schema)[i]] , data[Object.keys(data)[i]])
                }
            }
            if(typeof data[Object.keys(data)[i]] == 'object') {
                validate(schema[Object.keys(schema)[i]] , data[Object.keys(data)[i]])
            }
            if(data.hasOwnProperty(Object.keys(schema)[i]) === false) {
                throw new Error(`${Object.keys(schema)[i]} is required`)
            }
            if(typeof Object.values(schema)[i] !== 'object' && Object.values(schema)[i] !== typeof data[Object.keys(data)[i]] ) {
                throw new Error(`Type of ${Object.keys(schema)[i]} should be ${schema[Object.keys(schema)[i]]}`)
            }
        }
    }
    else {
        for (let i = 0; i < Object.keys(schema).length; i++) {
            if(Object.keys(data)[i] === 'dateOfBirth') {
                if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data[Object.keys(data)[i]])) {
                    throw new Error("The date format should be 'mm/dd/yyyy'")
                }
            }
            if(Object.keys(data)[i] === 'sex') {
                if(data[Object.keys(data)[i]] !== 'male' && data[Object.keys(data)[i]] !== 'female') {
                    throw new Error('The sex should be either male or female')
                }
            }
            if(Array.isArray(data[Object.keys(data)[i]])) {
                for (let i = 0 ; i < data[Object.keys(data)[i]].length ; i++) {
                    validate (schema[Object.keys(schema)[i]], data[Object.keys(data)[i]], true)
                }
            }
            if(typeof data[Object.keys(data)[i]] === 'object') {
                validate(schema[Object.keys(schema)[i]] , data[Object.keys(data)[i]], true)
            }
            if(data.hasOwnProperty(Object.keys(schema)[i]) === false) {
                continue;
            }
            if(typeof Object.values(schema)[i] !== 'object' && Object.values(schema)[i] !== typeof data[Object.keys(data)[i]] && Object.keys(data)[i] === Object.keys(schema)[i]) {                 
                throw new Error(`Type of ${Object.keys(data)[i]} should be ${schema[Object.keys(schema)[i]]}`)
            }
        }
    }
    return true;
}