import { generateWeeks } from '../Utility/weekGeneration.js';
import { getBackgroundColor, getBorderColor } from '../Utility/colorise.js';
import { adjustHousePlacement } from '../Utility/housePlacement.js';

document.addEventListener("DOMContentLoaded", function () {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2030-12-31');
    const dayMs = 24 * 60 * 60 * 1000;
    function createTimelineHouse(houseName, houseStartDate, houseEndDate, zoneNumber, status, time, startDate, dayMs) {
        let startSection = (houseStartDate - startDate) / dayMs;
        let lastSection = (houseEndDate - startDate) / dayMs;
        let sectionWidth = lastSection - startSection;

        let backgroundColor = getBackgroundColor(status);
        let borderColor = getBorderColor(time);

        // Створення елемента таймлайн будинку
        let timelineHouse = $("<div class='timeline-house'></div>").css({
            left: startSection * 10 + "px",
            top: 2 + "px",
            width: (sectionWidth + 1) * 10 + "px",
            height: 55 + "px",
            backgroundColor: 'grey',
            border: 'none',
            position: "absolute",
            opacity: 0.9,
            borderRadius: 6 + "px",
            zIndex: 100
        }).addClass(houseName);  // Додаємо підклас замість ID


        // Додавання будинку до відповідного ряду днів
        $(`#days-row-${zoneNumber}`).append(timelineHouse);

        let weeks = [];
        weeks = generateWeeks(houseStartDate, houseEndDate);
        let currentDate = new Date(houseStartDate);

        // Створення дочірніх об'єктів для кожного тижня
        weeks.forEach((week, index) => {
            let daysInWeek = (week.end - week.start) / dayMs + 1;
            let weekWidth = daysInWeek * 10; // Ширина тижня в пікселях

            // Визначення id для тижня
            let weekId;
            if (index === 0) {
                weekId = 'week-first';
            } else if (index === weeks.length - 1) {
                weekId = 'week-last';
            } else {
                weekId = `week-${index + 1}`;
            }

            // Визначення стилів для кожного тижня
            let cssStyles = {
                left: ((week.start - houseStartDate) / dayMs) * 10 + "px",
                top: 0 + "px",
                width: weekWidth + "px",
                height: 55 + "px",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderTopColor: borderColor,
                borderBottomColor: borderColor,
                borderWidth: "4px",
                borderLeftWidth: 0,
                borderRightWidth: 0,
                position: "absolute",
                zIndex: 101
            };

            // Додавання специфічних стилів для першого і останнього тижнів
            if (index === 0) {
                cssStyles.borderLeftWidth = "4px";
                cssStyles.borderRadius = "6px 0 0 6px";
                cssStyles.borderLeftColor = borderColor;
            }

            let weekBase = $("<button class='week' data-bs-toggle='offcanvas' data-bs-target='#offcanvasHouseProgressForm'></button>")
                .css(cssStyles)
                .addClass(houseName + "_" + weekId) // Додавання id до елемента

            let plusSign = $("<span class='plus-sign'>+</span>");
            weekBase.append(plusSign);
            timelineHouse.append(weekBase);
        });
        return timelineHouse;
    }

    $("#houseForm").on("submit", function (e) {
        e.preventDefault();

        let houseStartDate = new Date($("#startDate").val());
        let houseEndDate = new Date($("#endDate").val());
        let zoneNumber = $("#zone").val();
        let houseName = $("#name").val();
        let status = $("input[name='status']:checked").val(); // Get selected status
        let time = $("input[name='time']:checked").val(); // Get selected time
        let houseWidth = $("#width").val(); // Перевірка ширини будинку

        let timelineHouse = createTimelineHouse(houseName, houseStartDate, houseEndDate, zoneNumber, status, time, startDate, dayMs);

        // Отримання елемента зони
        let zoneElement = document.getElementById(`zone-${zoneNumber}`);
        // Виклик функції для перевірки і коригування параметрів будинку
        adjustHousePlacement(timelineHouse[0], zoneElement);
    });
});