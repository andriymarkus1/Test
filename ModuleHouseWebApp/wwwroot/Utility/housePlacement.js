 export function adjustHousePlacement(houseElement, zoneElement) {
    // Отримати параметри будинку та зони
    const houseWidth = $("#width").val();
    const zoneWidth = zoneElement.offsetWidth;
    const zoneId = parseInt(zoneElement.dataset.zoneNumber);

    // Логування параметрів
    console.log(`House width: ${houseWidth}, Zone width: ${zoneWidth}, Zone ID: ${zoneId}`);

    // Визначити групу (ряд) зони
    let zoneGroup = zoneId <= 4 || zoneId == 9 ? 1 : 2;

    // Перевірити чи більший будинок за ширину зони
    if (houseWidth > zoneWidth) {
        let difference = houseWidth - zoneWidth;

        if (difference >= 30) {
            // Збільшити висоту будинку на таймлайні на 70px і створити його на 20px нижче на таймлайні
            houseElement.style.height = (houseElement.offsetHeight + 36) + 'px';
            houseElement.style.top = (houseElement.offsetTop + 25) + 'px';

            // Збільшити висоту тижнів
            const weeks = houseElement.querySelectorAll('.week');
            weeks.forEach(week => {
                week.style.height = (week.offsetHeight + 36) + 'px';
            });
        }

        let totalZoneWidth = zoneWidth;
        let nextZoneId = zoneId + 1;
    }
}