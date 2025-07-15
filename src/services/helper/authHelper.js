export const checkPhoneNumber = (number) =>{
    if (isNaN(number) || number.length != 11 || number[0]!=0 || number[1]!=3) {
        return false;
    }
    return true;
} 