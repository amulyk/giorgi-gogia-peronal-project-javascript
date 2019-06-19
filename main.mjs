import {
    SubjectsModel,
    LMSModel,
    TeachersModel,
    PupilsModel,
    GroupsModel,
    GradebooksModel
} from './models';

// node --experimental-modules main.mjs

let data = {
    "name": {
      "first": "Will",
      "last": "Smith"
    },
    "image": "image",
    "dateOfBirth": "11/11/2000", // format date - "mm/dd/yyyy"
    "emails": [
      {
        "email": "email.com",
        "primary": true
      }
    ],
    "phones": [
      {
        "phone": "123456789",
        "primary": false
      }
    ],
    "sex": "male", // male or female
    "subjects": [
      {
        "subject": "History"
      }
    ],
    "description": "string",
};

let data1 = 
{
    "name": {
    "first": 'Oliver',
    "last": "White"
    },
    "image": "image",
    "dateOfBirth": "20/8/1996", 
    "emails": [
    {
        "email": "dhhty",
        "primary": true,
    }
    ],
    "phones": [
    {
        "phone": "+6785163254",
        "primary": true
    },
    {
        "phone": "+6785167854",
        "primary": false
    }
    ],
};

let pupilData = {
    "name": {
        "first": "Kid",
        "last": "Cudi"
    },
    "image": "string",
    "dateOfBirth": "11/11/2000", // format date
    "phones": [
        {
        "phone": "grgrg",
        "primary": true
        }
    ],
    "sex": "female", // male OR female
    "description": "string"
};

let data2 = {'description': 1,
              'sex': 'male'
};

(async() => {
    // -----checking teacher

    const teachers = new TeachersModel();
    const teacherId = await teachers.add(data);
    console.log(await teachers.read(teacherId));
    await teachers.update(teacherId, data1);
    console.log(await teachers.read(teacherId));    
    // // console.log(teachers.remove(teacherId));

    //-----checking pupil

    const pupils = new PupilsModel();
    const pupil = await pupils.add(pupilData);
    // console.log(await pupils.read(pupil.id));
    // await pupils.update(pupil.id, data2);
    // console.log(await pupils.read(pupil.id));
    // console.log(await pupils.remove(pupil.id));
    // console.log(await pupils.read(pupil.id));

    //-----checking LMS and Subject

    const history = new SubjectsModel({
      title: 'History',
      lessons: 24,
      description: 'hey'
    });
    // console.log(history);
    const lms = new LMSModel();
    console.log(await lms.add(history));
    // console.log(await lms.readAll());
    console.log(await lms.verify(history));
    // console.log(await lms.remove(history));
    // console.log(await lms.readAll());

    //-----checking groups

    const room = 236;
    const groups = new GroupsModel();
    const groupId = await groups.add(room);
    console.log(groupId);
    
    // console.log(await groups.read(groupId));
    console.log(await groups.addPupil(groupId, pupil));
    // console.log(await groups.read(groupId));
    // console.log(await groups.removePupil(groupId, pupil.id));
    // console.log(await groups.update(groupId, {
    //     room: 237
    // }));
    // console.log(await groups.readAll());

    //-----checking gradebook

    const pupilId = pupil.id;
    const gradebooks = new GradebooksModel(groups, teachers, lms);

    const level = 1;
    const gradebookId = await gradebooks.add(level, groupId);

    const record = {
      pupilId: pupilId,
      teacherId: teacherId,
      subjectId: history.id,
      lesson: 1,
      mark: 9
    };
    
    console.log(await gradebooks.addRecord(gradebookId, record));
    const oliver = await gradebooks.read(gradebookId, pupilId);
    console.log(oliver);
    const students = await gradebooks.readAll(gradebookId);
    console.log(students)
    console.log(await gradebooks.clear());
    console.log(gradebooks);
})();