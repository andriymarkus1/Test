/*        function checkAndDuplicateHouseOnNextZone(houseWidth, zoneNumber) {
            let overlapZones = [];

            // Отримуємо всі елементи зон
            $(".zone").each(function () {
                let $zone = $(this);
                let currentZoneNumber = $zone.data('zone-number');
                let zoneLeft = $zone.position().left;
                let zoneWidth = $zone.outerWidth(); // Використовуємо outerWidth() для отримання зовнішньої ширини
                let zoneRight = zoneLeft + zoneWidth;

                console.log(`Zone Number: ${currentZoneNumber}, Left: ${zoneLeft}, Width: ${zoneWidth}`);

                // Перевіряємо, чи будинок виходить за межі поточної зони
                if (houseWidth > zoneWidth && zoneNumber == currentZoneNumber) {
                    overlapZones.push(currentZoneNumber + 1); // Додаємо наступну зону до списку для дублювання
                }
            });

            return overlapZones;
        }

        // Викликаємо функцію для поточної зони, де створено будинок
        console.log("Calling checkAndDuplicateHouseOnNextZone");
        let overlapZones = checkAndDuplicateHouseOnNextZone(houseWidth, zoneNumber);
        console.log("Overlap Zones:", overlapZones);

        // Дублювання будинку на таймлайні кожної зони, на яку він накладається
        overlapZones.forEach(zone => {
            let newTimelineHouse = $("<div class='timeline-house'></div>").css({
                left: startSection * 10 + "px",
                top: 10 + "px",
                width: (sectionWidth + 1) * 10 + "px",
                height: 50 + "px",
                backgroundColor: 'green',
                border: 'none',
                position: "absolute",
                opacity: 0.9,
                borderRadius: 6 + "px"
            }).attr("id", houseName);

            // Додавання тижнів до нового будинку
            weeks.forEach((week, index) => {
                let daysInWeek = (week.end - week.start) / dayMs + 1;
                let weekWidth = daysInWeek * 10; // Ширина тижня в пікселях

                // Визначаємо id для тижня
                let weekId;
                if (index === 0) {
                    weekId = 'week-first';
                } else if (index === weeks.length - 1) {
                    weekId = 'week-last';
                } else {
                    weekId = `week-${index + 1}`;
                }

                // Визначаємо стилі для кожного тижня
                let cssStyles = {
                    left: ((week.start - houseStartDate) / dayMs) * 10 + "px",
                    top: 0 + "px",
                    width: weekWidth + "px",
                    height: 50 + "px",
                    backgroundColor: backgroundColor,
                    borderStyle: "solid",
                    borderTopColor: borderColor,
                    borderBottomColor: borderColor,
                    borderWidth: "4px",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    position: "absolute"
                };

                // Додаємо специфічні стилі для першого і останнього тижнів
                if (index === 0) {
                    cssStyles.borderLeftWidth = "4px";
                    cssStyles.borderRadius = "6px 0 0 6px";
                    cssStyles.borderLeftColor = borderColor
                }

                let weekBase = $("<button class='week'></button>")
                    .css(cssStyles)
                    .attr('id', houseName + "/" + weekId); // Додаємо id до елемента

                newTimelineHouse.append(weekBase);
            });

            // Додаємо дубльований будинок до відповідної зони
            $(`#days-row-${zone}`).append(newTimelineHouse);
        });*/