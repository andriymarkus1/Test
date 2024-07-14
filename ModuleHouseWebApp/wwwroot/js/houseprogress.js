document.addEventListener("DOMContentLoaded", function () {
    $('#offcanvasHouseProgressForm').on('show.bs.offcanvas', function (e) {
        let houseWeek = $(e.relatedTarget); // Кнопка, яка викликала відсувне меню

        // Отримання ID кнопки "week"
        let houseWeekClass = houseWeek.attr('class');
        let houseColor;
        console.log("houseWeekClass 1"+houseWeekClass);
        // Розбиття ID для отримання назви будинку та номера тижня
        let parts = houseWeekClass.split(' ');
        let parts1 = parts[1].split('_');
        houseWeekClass = parts[1];
        let houseName = parts1[0];
        let weekParts = parts1[1].split('-');
        let weekNumber = weekParts[1];

        // Використання jQuery для отримання об'єкта timeline-house
        let houseTimeline = houseName;

        console.log("houseWeekClass 2:" + houseWeekClass);
        console.log("houseTimeline 1:" + houseTimeline);
        // Оновлення тексту над формою
        $('#weekInfo').html('Будинок: ' + houseName + '<br>Тиждень: ' + weekNumber);

        $("#houseProgressForm").off("submit").on("submit", function (e) {
            e.preventDefault();

            // Determine background color based on status radio
            let constructionStatus = $("input[name='constructionStatus']:checked").val();
            let backgroundColor;
            switch (constructionStatus) {
                case "будувався":
                    backgroundColor = '#5cd35c';
                    break;
                case "простоював":
                    backgroundColor = '#d04c4c';
                    break;
                default:
                    backgroundColor = 'none';
            }

            // Determine border color based on terms radio
            let terms = $("input[name='terms']:checked").val();
            let borderColor;
            switch (terms) {
                case "в межах":
                    borderColor = '#36c136';
                    break;
                case "не в межах":
                    borderColor = '#b31717';
                    break;
                default:
                    borderColor = 'none';
            }

            // Визначення кольору будинку згідно з вибором користувача
            if ($('#changeHouseColor').is(':checked')) {
                houseColor = '#dddd3e';
            } else {
                houseColor = 'grey'; // Початковий колір
            }


            $('.' + houseTimeline).css('background-color', houseColor);
            $('.' + houseWeekClass).css('background-color', backgroundColor);
            $('.' + houseWeekClass).css('border-color', borderColor);
        });
    });
});
