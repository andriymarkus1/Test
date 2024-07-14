document.addEventListener("DOMContentLoaded", function () {
    // Ініціалізація поточного тижня
    var currentWeekStart = getMonday(new Date());
    updateWeekSelect(currentWeekStart);

    // Обробка кнопок перемикання тижнів
    $("#prevWeekBtn").click(function () {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        updateWeekSelect(currentWeekStart);
        filterHousesByWeek(currentWeekStart);
    });

    $("#nextWeekBtn").click(function () {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        updateWeekSelect(currentWeekStart);
        filterHousesByWeek(currentWeekStart);
    });

    // Обробка вибору тижня з випадаючого списку
    $("#weekSelect").change(function () {
        let selectedWeek = $(this).val();
        currentWeekStart = new Date(selectedWeek);
        filterHousesByWeek(currentWeekStart);
    });

    // Оновлення випадаючого списку тижнів
    function updateWeekSelect(startOfWeek) {
        let weekSelect = $("#weekSelect");
        weekSelect.empty();

        for (let i = -4; i <= 4; i++) {
            let weekStart = new Date(startOfWeek);
            weekStart.setDate(weekStart.getDate() + (i * 7));
            let weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            let optionText = formatDate(weekStart) + " - " + formatDate(weekEnd);
            let optionValue = weekStart.toISOString().split('T')[0];
            weekSelect.append($("<option></option>").attr("value", optionValue).text(optionText));
        }

        weekSelect.val(startOfWeek.toISOString().split('T')[0]);
    }

    // Фільтрація будинків на основі вибраного тижня
    function filterHousesByWeek(startOfWeek) {
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        let monday = getMonday(startOfWeek);
        let sunday = getSunday(endOfWeek);

        $(".house-container .week").each(function () {
            let weekStart = new Date($(this).data("start-date")); // Використовуємо data() для отримання значення
            let weekEnd = new Date($(this).data("end-date")); // Використовуємо data() для отримання значення

            if ((weekStart >= monday && weekStart <= sunday) || (weekEnd >= monday && weekEnd <= sunday)) {
                $(this).css("visibility", "visible");
            } else {
                $(this).css("visibility", "hidden");
            }
        });
    }

    // Функція для отримання понеділка поточного тижня
    function getMonday(date) {
        date = new Date(date);
        let day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    function getSunday(date) {
        date = new Date(date);
        let day = date.getDay(), diff = date.getDate() - day + (day == 0 ? 0 : 7);
        return new Date(date.setDate(diff));
    }
    // Функція для форматування дати у вигляді 'YYYY/MM/DD'
    function formatDate(date) {
        let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
    }

    // Ініціалізація відображення будинків на поточний тиждень
    filterHousesByWeek(currentWeekStart);
});
