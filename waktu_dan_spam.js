
document.addEventListener('DOMContentLoaded', function () {

    function updateTime() {
        const now = new Date();


        const options = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        };

        const timeString = now.toLocaleTimeString('id-ID', options);
        document.getElementById('current-time').textContent = timeString;
    }


    updateTime();
    setInterval(updateTime, 600);


    function addVibrateEffect() {
        const vibrationTimes = [0, 20, 40];
        const now = new Date();
        const secondsInCurrentMinute = now.getSeconds();


        vibrationTimes.forEach(time => {

            if (Math.abs(secondsInCurrentMinute - time) <= 1 ||
                Math.abs(secondsInCurrentMinute - (time + 60)) <= 1) {


                const iphone = document.querySelector('.iphone');
                iphone.classList.add('vibrate');


                setTimeout(() => {
                    iphone.classList.remove('vibrate');
                }, 300);


                const messages = [
                    "Anda memiliki pesan baru",
                    "Update aplikasi tersedia",
                    "Pengingat: Deadline project"
                ];


                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                document.querySelector('.notification-message').textContent = randomMessage;
            }
        });
    }


    setInterval(addVibrateEffect, 1000);
});