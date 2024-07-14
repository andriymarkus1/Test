import { generateMagneticPoints, findClosestPoint, enableDragAndDrop } from '../Utility/draganddrop.js';
import { generateWeeks } from '../Utility/weekGeneration.js';
import { getBackgroundColor, getBorderColor } from '../Utility/colorise.js';

$(function () {
    let allMagneticPoints = [];

    function initializeMagneticPoints() {
        $(".zone").each(function () {
            const zone = $(this);
            const points = generateMagneticPoints(zone);
            allMagneticPoints = allMagneticPoints.concat(points);
        });
    }

    // Initialize magnetic points on page load
    initializeMagneticPoints();

    function createHouse(houseName, zoneNumber, houseWidth, houseHeight, houseStartDate, houseEndDate, brigade, status, time) {
        const dayMs = 24 * 60 * 60 * 1000;
        // Find the corresponding zone based on zoneNumber
        let selectedZone = $(`#zone-${zoneNumber}`);

        if (selectedZone.length > 0) {
            // Calculate position relative to the coordinate-plane
            let zoneTop = parseInt(selectedZone.css('top'), 10);
            let zoneLeft = parseInt(selectedZone.css('left'), 10);

            // Встановлення кольору фону та границі
            let backgroundColor = getBackgroundColor(status);
            let borderColor = getBorderColor(time);

            // Create a new house container
            let newHouseContainer = $("<div class='house-container'></div>").css({
                top: zoneTop + 5 + "px",
                left: zoneLeft + 5 + "px",
                width: houseWidth + "px",
                height: houseHeight + "px",
                backgroundColor: 'grey',
                borderStyle: "none", // Вказуємо тип границі
                borderWidth: "4px",   // Вказуємо товщину границі
                borderRadius: "4px",
                borderColor: borderColor,
                position: "absolute",
                opacity: 0.8,
                cursor: "grab"
            }).addClass(houseName); // Додавання id до елемента

            //aaa
            // Add new house container to the coordinate-plane
            $(".coordinate-plane").append(newHouseContainer);

            let weeks = generateWeeks(houseStartDate, houseEndDate);
            // Generate weeks for the house
            weeks.forEach((week, index) => {
                let daysInWeek = (week.end - week.start) / dayMs + 1;

                // Визначення id для тижня
                let weekId;
                if (index === 0) {
                    weekId = 'week-first';
                } else if (index === weeks.length - 1) {
                    weekId = 'week-last';
                } else {
                    weekId = `week-${index + 1}`;
                }

                // Отримання поточної дати без часу
                let today = new Date();
                today.setHours(0, 0, 0, 0);

                let visibility = "hidden";
                if (today >= week.start && today <= week.end) {
                    visibility = "visible";
                }

                // Визначення стилів для кожного тижня
                let cssStyles = {
                    left: -4 + "px",
                    top: -4 + "px",
                    width: houseWidth + "px",
                    height: houseHeight + "px",
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderColor: borderColor,
                    borderWidth: "4px",
                    borderRadius: "4px",
                    position: "absolute",
                    visibility: visibility
                };

                // Додавання специфічних стилів для першого і останнього тижнів
                if (index === 0) {
                    cssStyles.borderLeftWidth = "4px";
                    cssStyles.borderRadius = "6px 0 0 6px";
                    cssStyles.borderLeftColor = borderColor;
                }

                // Додаємо напис із атрибутами початку та кінця тижня
                let weekLabel = $("<span class='week-label'></span>").text(
                    "Початок: " + week.start.toLocaleDateString() + " Кінець: " + week.end.toLocaleDateString()
                ).css({
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                    fontSize: "12px",
                    textAlign: "center",
                });

                let weekElement = $("<div class='week'></div>")
                    .css(cssStyles)
                    .addClass(houseName + "_" + weekId) // Додавання id до елемента
                    .data({
                        "start-date": week.start.toISOString(), // Використовуємо data() для встановлення значення
                        "end-date": week.end.toISOString() // Використовуємо data() для встановлення значення
                    });

                weekElement.append(weekLabel);
                newHouseContainer.append(weekElement);
            });

            // Enable drag-and-drop functionality with snapping
            enableDragAndDrop(newHouseContainer, allMagneticPoints);
        } else {
            alert("Зона з номером " + zoneNumber + " не знайдена. Будинок не може бути створений.");
        }
    }

    $("#houseForm").on("submit", function (e) {
        e.preventDefault();

        // Fetch form data
        let houseName = $("#name").val();
        let zoneNumber = $("#zone").val();
        let houseWidth = $("#width").val();
        let houseHeight = $("#height").val();
        let houseStartDate = new Date($("#startDate").val());
        let houseEndDate = new Date($("#endDate").val());
        let brigade = $("#brigade").val();
        let status = $("input[name='status']:checked").val(); // Get selected status
        let time = $("input[name='time']:checked").val(); // Get selected time

        createHouse(houseName, zoneNumber, houseWidth, houseHeight, houseStartDate, houseEndDate, brigade, status, time);
    });
});
