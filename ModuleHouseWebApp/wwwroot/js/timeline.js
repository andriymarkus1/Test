document.addEventListener("DOMContentLoaded", function () {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2030-12-31');

    let currentDate = startDate;
    const dayMs = 24 * 60 * 60 * 1000;
    let dayCount = 0;
    let monthOffsets = [];

    // Create all day and month elements once
    const dayElements = [];
    const monthElements = [];
    while (currentDate <= endDate) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.style.left = `${dayCount * 10}px`;

        // Check if the day is the first of the month
        if (currentDate.getDate() === 1) {
            const monthElement = document.createElement('div');
            monthElement.className = 'month';
            monthElement.style.left = `${dayCount * 10}px`;
            monthElement.style.width = `${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() * 10}px`;
            monthElement.innerHTML = currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' });
            monthElements.push({ element: monthElement, dayCount });

            // Add to month offsets
            monthOffsets.push({
                month: currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' }),
                offset: dayCount * 10
            });
        }

        // Add week marker class if applicable
        if (dayCount % 7 === 0) {
            dayElement.classList.add('week-marker');
        }

        // Add month-end marker class if applicable
        if (currentDate.getDate() === new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()) {
            dayElement.classList.add('month-end-marker');
        }

        dayElements.push(dayElement);

        // Increment date and day count
        dayCount++;
        currentDate = new Date(currentDate.getTime() + dayMs);
    }

    // Function to initialize a timeline group
    function initializeTimelineGroup(groupId, zoneIds) {
        zoneIds.forEach(zoneId => {
            const timelineContainer = document.getElementById(`timeline-container-${zoneId}`);
            if (timelineContainer.getAttribute('data-initialized')) {
                return; // Safeguard to prevent multiple executions
            }
            timelineContainer.setAttribute('data-initialized', 'true');

            const daysRow = document.getElementById(`days-row-${zoneId}`);
            const monthsRow = document.getElementById(`months-row-${zoneId}`);
            const monthDropdown = document.getElementById('month-dropdown');

            // Append day elements
            dayElements.forEach(dayElement => {
                daysRow.appendChild(dayElement.cloneNode(true));
            });

            // Append month elements
            monthElements.forEach(({ element, dayCount }) => {
                monthsRow.appendChild(element.cloneNode(true));

                // Add option to dropdown if not exists
                if (!Array.from(monthDropdown.options).some(option => option.text === element.innerHTML)) {
                    const option = document.createElement('option');
                    option.value = dayCount * 10;
                    option.text = element.innerHTML;
                    monthDropdown.appendChild(option);
                }
            });

            // Scroll event listener for timeline container
            timelineContainer.addEventListener('scroll', function () {
                const scrollLeft = timelineContainer.scrollLeft;
                let activeMonth = monthOffsets[0].month;

                for (let i = 0; i < monthOffsets.length; i++) {
                    if (scrollLeft >= monthOffsets[i].offset) {
                        activeMonth = monthOffsets[i].month;
                    } else {
                        break;
                    }
                }

                for (let i = 0; i < monthDropdown.options.length; i++) {
                    if (monthDropdown.options[i].text === activeMonth) {
                        monthDropdown.selectedIndex = i;
                        break;
                    }
                }
            });

            // Change event listener for month dropdown
            monthDropdown.addEventListener('change', function () {
                timelineContainer.scrollLeft = monthDropdown.value;
            });
        });

        // Add scroll synchronization for the group
        const timelineGroup = document.getElementById(groupId);
        const timelineContainers = timelineGroup.querySelectorAll('.timeline-container');

        timelineContainers.forEach(container => {
            container.addEventListener('scroll', function () {
                const scrollLeft = container.scrollLeft;
                timelineContainers.forEach(syncContainer => {
                    if (syncContainer !== container) {
                        syncContainer.scrollLeft = scrollLeft;
                    }
                });
            });
        });
    }

    // Initialize both groups
    initializeTimelineGroup('group-1', [1, 2, 3, 4, 9]);
    initializeTimelineGroup('group-2', [5, 6, 7, 8, 10]);
});
