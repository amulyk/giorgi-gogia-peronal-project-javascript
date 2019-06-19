export class GradebooksModel {
    constructor(groups, teachers, lms) {
        this.gradebook = new Map();
        this.data = {
            groups,
            teachers,
            lms 
        }
        this.records;
    }

    add (level, id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') {
                reject('Id should be string');
            } else if(typeof level !== 'number') {
                reject('typeof level should be number')
            } else if(this.data.groups.groups.has(id) === false) {
                rejec('group id required');
            } else {
                this.gradebook.set(id ,
                    {
                        level,
                        id,
                        pupils: []
                    });
                resolve(id);
            }
        });
    }
    clear() {
        return new Promise((resolve, reject) => {
                this.gradebook.clear();
                this.data = {};
                this.records = {};
                resolve("Clear!");
        });
    }

    addRecord(gradebookId, record) {
        this.records = record;
        return new Promise((resolve, reject) => {
            if (typeof gradebookId !== 'string') {
                reject ('id must be a string');
            } else if (!this.gradebook.has(gradebookId)) {
                reject ("This id doesn't exist in the database");
            } else {
                let fullName;
                let groupsDir = this.data.groups.groups.get(gradebookId);
                
                for(let i = 0; i < groupsDir.pupils.length; i++){
                    if(groupsDir.pupils[i].id === record.pupilId) {
                        fullName = groupsDir.pupils[i].name.first + ' ' + groupsDir.pupils[i].name.last;
                    }
                }

                let newObj = {
                    name: fullName,
                    records: [
                      {
                        teacher: this.data.teachers.map.get(record.teacherId).name.first + ' ' + this.data.teachers.map.get(record.teacherId).name.last,
                        subject: this.data.lms.map.get(record.subjectId).title,
                        lesson: record.lesson,
                        mark: record.mark
                      }
                    ]
                }
                this.gradebook.get(gradebookId).pupils.push(newObj);
                resolve("Student records updated");
            }
        });
    }

    read(gradebookId, pupilId) {
        return new Promise ((resolve, reject) => {
            let students = this.gradebook.get(gradebookId);
            for(let i = 0; i < students.pupils.length; i++) {
                if(pupilId === this.records.pupilId) {
                    resolve(students.pupils[i]);
                }
            }
        });
    }

    readAll(gradebookId) {
        return new Promise ((resolve, reject) => {
            if (typeof gradebookId !== 'string') {
                reject ('id must be a string');
            } else if (!this.gradebook.has(gradebookId)) {
                reject ("This id doesn't exist in the database");
            } else {
                resolve(this.gradebook.get(gradebookId).pupils);
            }
        });
    }
}