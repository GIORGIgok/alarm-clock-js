const current_time = document.getElementById("current_time");
const hours_input = document.getElementById("hours_input");
const minutes_input = document.getElementById("minutes_input");
const set_alarm = document.getElementById("set_alarm");
const alarm_image = document.getElementById("alarm_image");
const clock_div = document.querySelector(".clock");
const alarm_sound = new Audio("./assets/audio/ringtone.mp3");

setInterval(() => {
    let timeFromDevice = new Date();
    current_time.innerHTML = timeFromDevice.toLocaleTimeString();
}, 1000);

function setAlarm() {
    let h = parseInt(hours_input.value, 10);
    let m = parseInt(minutes_input.value, 10);

    // validation
    if (
        isNaN(h) ||
        isNaN(m) ||
        h < 0 ||
        h > 23 ||
        m < 0 ||
        m > 59 ||
        hours_input.value.length !== 2 || // check length
        minutes_input.value.length !== 2
    ) {
        alert(
            "Invalid input. Please enter valid hours (0-23) and minutes (0-59) in the format HH MM (for example, 08 - 05, 12 - 30)."
        );
        return;
    }
    set_alarm.innerHTML = h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0');
}

function validateInput(input) {
    input.value = input.value.replace(/\D/g, '').slice(0, 2);
}

let checkInterval = setInterval(() => {
    let alarmtime = set_alarm.innerHTML;
    alarmtime = alarmtime.split(":");

    let alarmhours = parseInt(alarmtime[0], 10); // using parseInt to convert string to integer
    let alarmminutes = parseInt(alarmtime[1], 10);

    let systemTime = new Date();
    let systemhours = systemTime.getHours();
    let systemminutes = systemTime.getMinutes();
    
    if (systemhours > 12) {
        systemhours = systemhours - 12;
    }
    if (alarmhours === systemhours && alarmminutes === systemminutes) {
        alarm_image.classList.add("shake");
        clock_div.classList.add("alarm_on");
        clock_div.style.background = "none";
        alarm_sound.play();
    }
}, 1000);
