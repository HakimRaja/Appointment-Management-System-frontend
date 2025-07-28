
export const checkTodaysDate = (date) => {
    const today = new Date();
    const todayDate = today.toLocaleDateString('en-CA',{
        timeZone : 'Asia/Karachi'
    });
    if (date != todayDate) {
        return false;
    }
    const timeRightNow = today.toLocaleTimeString('en-GB',{
        timeZone : 'Asia/Karachi',
        hour12 : false
    })
    return timeRightNow;
}