export const timeSlots = [];

for (let hour = 9; hour < 21; hour++) {
    for (let minutes = 0; minutes < 60; minutes+=30) {
        const starthour = hour.toString().padStart(2,'0');
        const startminute = minutes.toString().padStart(2,'0');
        const end = new Date(0,0,0,hour,minutes+30);
        const endhour = end.getHours().toString().padStart(2,'0');
        const endminute = end.getMinutes().toString().padStart(2,'0');
        
        timeSlots.push({
            start_time : `${starthour}:${startminute}:00`,
            end_time : `${endhour}:${endminute}:00`,
            label : `${starthour}:${startminute} - ${endhour}:${endminute}`
        })
    }
}