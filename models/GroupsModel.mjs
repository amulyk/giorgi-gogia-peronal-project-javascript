export class GroupsModel {
    constructor() {
        this.groups = new Map();
    }
    
    add(roomNumber) {
        return new Promise((resolve, reject) => {
            if(typeof roomNumber !== 'number') {
                reject('');
            } else {
                let id = Math.random().toString();
                let room = roomNumber;
                let pupils = [];
                const data = {
                    id,
                    room,
                    pupils,
                }
                this.groups.set(id, data);
                resolve(id);
            }
        });
    }
    
    read(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') {
                reject ('id must be a string');
            } else if (!this.groups.has(id)) {
                reject ("This id doesn't exist in the database");
            } else {
                resolve(this.groups.get(id));
            }
        });
    }

    addPupil(groupId, pupil) {
        return new Promise((resolve, reject) => {
            if (typeof groupId !== 'string') {
                reject ('id must be a string');
            } else if (!this.groups.has(groupId)) {
                reject ("This id doesn't exist in the database");
            } else {
                let group = this.groups.get(groupId);
                group.pupils.push(pupil);
                resolve('Added a new pupil');
            }
        });
    }

    removePupil(groupId, pupilId) {
        return new Promise((resolve, reject) => {
            let group = this.groups.get(groupId);
            for(let i = 0; i < Object.keys(group).length ; i++) {
                if(Object.keys(group)[i] == 'pupils') {
                    for(let j = 0; j < group.pupils.length; j++) {
                        if(group.pupils[j].id === pupilId) {
                            group.pupils.splice(j, 1);
                            resolve('Removed the pupil');
                        } else {
                            reject("Pupil doesn't exist in the database");
                        }
                    }
                }
            }
        });
    }

    update(groupId, newRoom) {
        return new Promise((resolve, reject) => {
            if(this.groups.has(groupId)) {
                let oldRoom = this.groups.get(groupId);
                resolve(this.groups.set(groupId, {...oldRoom, ...newRoom}));
            } else {
                reject("This id doesn't exist in the database");
            }
        });
    }

    readAll() {
        return new Promise((resolve, reject) => {
            resolve([...this.groups.values()]);
        });
    }
}