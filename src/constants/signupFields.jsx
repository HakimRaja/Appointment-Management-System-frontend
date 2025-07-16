export const SIGNUP_FIELDS = {
    name : {
        label : 'Name',
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        required : true
    },
    email : {
        label:'Email',
        type:'email',
        name:'email',
        placeholder:'Email',
        required:true
    },
    password : {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        required : true
    },
    phone : {
        label : 'Phone Number',
        type :'text',
        name : 'phone',
        placeholder:'03********* (11 digit phone number)',
        required : true
    },
    dob : {
        label : 'Date of Birth',
        name : 'dob',
        required : true
    },
    roles : ['admin','doctor','patient'],
    roleSelect : {
        label : 'Select Role',
        name : 'role',
        required : true,
        type : 'radio'

    },
    experience : {
        label : 'Experience(Starting Date)',
        required:true,
        name:'experience'
    },
    specialization : {
        label:'Specialization',
        required:true,
        name:'specialization',
        allowMultiple:true
    },
    history : {
        label:'Patient History',
        type:'text',
        name:'history',
        placeholder:'Write your disease history',
        required:true
    }


}