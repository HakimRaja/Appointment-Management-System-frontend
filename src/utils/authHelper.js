const checkPhoneNumber = (number) =>{
    if (isNaN(number) || number.length != 11 || !number.startsWith('03')) {
        return false;
    }
    return true;
} 
const isValid=(experience , dob)=>{
    const today = new Date();
    today.setHours(0,0,0,0);
    if (!experience) {
        dob = new Date(dob);    
        return dob < today;
    }
    experience = new Date(experience);
    dob = new Date(dob);

    return experience > dob && experience < today;
}

export const getSignupInfo = (info) =>{
    const nums = '0123456789';
    for (let c of info.name) {
        if (nums.includes(c)) {
            return {check : false , message : 'please provide correct name without numbers'}
        }
    }
    if (info.password.length < 8) {
        return {check : false , message : 'password must contain atleast 8 letters/digits'}
    }
    else if (!(checkPhoneNumber(info.phone))) {
        return {check : false , message : 'please provide correct phone number'}
    }
    else if (info.dob == '') {
        return {check : false , message : 'please enter Date of Birth'}
    }
    else if (!isValid(null ,info.dob) ) {
        return {check : false , message : 'please enter correct Date of Birth'}
    }
    else if (info.role == 'admin') {
        return {check:true , data : {name : info.name , email : info.email ,password : info.password,phone : info.phone , dob : info.dob ,role : info.role}}
    }
    else if (info.role == 'doctor') {
        if (info.experience == '') {
            return {check : false , message : 'please enter Experience'}
        }
        else if (!isValid(info.experience , info.dob)) {
            return {check : false , message : 'please enter correct Experience'}
        }
        else if (info.specialization.length == 0) {
            return {check : false , message : 'please select atleast one Specialization'}
        }
        return {check:true , data : {name : info.name , email : info.email ,password : info.password,phone : info.phone , dob : info.dob,role : info.role,experience : info.experience , specialization : info.specialization}}
    }
    else if (info.role == 'patient') {
            if (info.history == '') {
                return {check : false , message : 'please provide patient history'}
            }
            return {check:true , data : {name : info.name , email : info.email ,password : info.password,phone : info.phone , dob : info.dob,role : info.role, history : info.history}};
    }
    return {check : false , message : 'issue in role'};
}