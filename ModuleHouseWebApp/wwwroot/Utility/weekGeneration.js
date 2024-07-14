// weekGeneration.js

export function generateWeeks(houseStartDate, houseEndDate) {
    const dayMs = 24 * 60 * 60 * 1000;
    let today = new Date();
    let currentDate = new Date(houseStartDate);
    let weeks = [];

    // Перший тиждень
    let firstSunday = getSunday(currentDate);
    weeks.push({ start: new Date(currentDate), end: firstSunday });

    // Наступні тижні
    currentDate.setDate(currentDate.getDate() + 7);

    while (true) {
        let weekStart = getMonday(currentDate);
        let weekEnd = getSunday(currentDate);

        if (weekStart > houseEndDate) {
            break;
        }

        if (weekEnd > houseEndDate) {
            weekEnd = houseEndDate;
            weeks.push({ start: weekStart, end: weekEnd });
            break;
        }

        weeks.push({ start: weekStart, end: weekEnd });
        currentDate.setDate(currentDate.getDate() + 7);
    }

    function getSunday(date) {
        let d = new Date(date);
        d.setDate(d.getDate() + (7 - d.getDay()) % 7);
        return d;
    }

    function getMonday(date) {
        let d = new Date(date);
        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
        return d;
    }

    return weeks;
}
