// let arr_cuong = ["CGH001", "Cường", "10/10/2000", true, "cuong@gmail.com"];
// console.log(arr_cuong[1]);

// let obj_cuong = {
//     email: "cuong@gmail.com",
//     gender: true,
//     dob: "10/10/2000",
//     studentCode: "CGG001",
//     name: "Cường",
// }

// console.log(obj_cuong['name']);
// console.log(obj_cuong.name);
// console.log(obj_cuong.email);

// let c0423i1 = [
//     ["CGH001", "Cường", "10/10/2000", true, "cuong@gmail.com"],
//     ["CGH002", "Khánh", "10/10/2000", true, "khanh@gmail.com"]
// ]

// console.log(c0423i1[1][4]);

// {
//     email: "cuong@gmail.com",
//     gender: true,
//     dob: "10/10/2000",
//     studentCode: "CGG001",
//     name: "Cường",
//     hobbies: ["Đá banh", "Bơi lội", "Đọc sách"],
//     languages: [
//         {
//             name: "English",
//             level: "B1"
//         },
//         {
//             name: "Jappanese",
//             level: "N5"
//         }
//     ]
// }

class Student {
    constructor(studentCode, name, email, gender, dob, avatar, hobbies) {
        this.studentCode = studentCode;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.avatar = avatar;
        this.hobbies = hobbies
    }
}

var c0423i1 = []

function init() {
    if (window.localStorage.getItem('c0423i1') == null) { //chưa có
        c0423i1 = [
            new Student("CGG001", "Cường", "cuong@gmail.com", true, "10/10/2000", "https://i.pravatar.cc/150?img=15", ["Đá banh", "Bơi lội", "Đọc sách"]),
            new Student("CGG002", "Khánh", "khanh@gmail.com", true, "10/10/2000", "https://i.pravatar.cc/150?img=10", ["Đá banh", "Bơi lội", "Đọc sách"]),
            new Student("CGG003", "Duy", "duy@gmail.com", true, "10/10/2000", "https://i.pravatar.cc/150?img=20", ["Đá banh", "Bơi lội", "Đọc sách"])
        ]
        // localstorage chỉ lưu dữ liệu là string
        // convert object -> string
        window.localStorage.setItem('c0423i1', JSON.stringify(c0423i1))
    }
    else {
        c0423i1 = JSON.parse(window.localStorage.getItem('c0423i1'));
    }
}


function renderStudents(data) {
    let htmls = data.map(function (student, index) {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${student.studentCode}</td>
                <td>${student.name}</td>
                <td>
                    <img class='avatar' src='${student.avatar}' alt='' />
                </td>
                <td>${student.gender ? 'Male' : 'Female'}</td>
                <td>${student.dob}</td>
                <td>${student.email}</td>
                <td>
                    ${student.hobbies.map(function (hobby, index) {
            return `<p>${hobby}</p>`
        }).join('')}
                </td>
                <td>
                    <button onclick='removeStudent("${student.studentCode}")'>Remove</button>
                </td>
            </tr>
        `
    })
    document.getElementById('tbStudents').innerHTML = htmls.join('')
}

function createStudent() {
    let studentCode = document.getElementById('student-code').value;
    let fullname = document.getElementById('fullname').value;
    let avatar = document.getElementById('avatar').value;
    let email = document.getElementById('email').value;
    let hobbies = [document.getElementById('hobby').value];
    let dob = document.getElementById('dob').value;
    let gender = document.getElementsByName('gender')[0].checked;
    let newStudent = new Student(studentCode, fullname, email, gender, dob, avatar, hobbies)

    c0423i1.push(newStudent);
    window.localStorage.setItem('c0423i1', JSON.stringify(c0423i1))
    renderStudents(c0423i1);

}

function remove() {
    let studentCode = document.getElementById('findStudentCode').value;
    let result = c0423i1.filter(function (std, index) {
        return std.studentCode != studentCode;
    })
    window.localStorage.setItem('c0423i1', JSON.stringify(result))
    renderStudents(result)
    // let position = -1;
    // for(let i = 0; i < c0423i1.length; i++){
    //     if(c0423i1[i].studentCode == studentCode){
    //         position = i;
    //         break;
    //     }
    // }
    // if(position != -1){
    //     c0423i1.splice(position, 1)
    //     window.localStorage.setItem('c0423i1', JSON.stringify(c0423i1))
    //     renderStudents()
    // }
    // else {
    //     alert('Invalid student code');
    // }
}


function search() {
    let keyword = document.getElementById('keyword').value;
    let result = c0423i1.filter(function (std, index) {
        return std.name.toLowerCase().includes(keyword.toLowerCase())
    })
    renderStudents(result)
}

function removeStudent(code) {
    let confirmed = window.confirm('Are you sure to remove this student');
    if (confirmed == true) {
        let result = c0423i1.filter(function (std, index) {
            return std.studentCode != code;
        })
        window.localStorage.setItem('c0423i1', JSON.stringify(result))
        renderStudents(result)
    }

}
init();
renderStudents(c0423i1)

