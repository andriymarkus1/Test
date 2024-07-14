// dragAndDrop.js

export function generateMagneticPoints(zone) {
    const spacing = 10; // Adjust the spacing as needed
    const points = [];
    const zoneWidth = zone.width();
    const zoneHeight = zone.height();
    const zoneTop = parseInt(zone.css('top'), 10);
    const zoneLeft = parseInt(zone.css('left'), 10);

    for (let x = zoneLeft + 10; x < zoneLeft + zoneWidth - 10; x += spacing) {
        for (let y = zoneTop + 10; y < zoneTop + zoneHeight - 10; y += spacing) {
            points.push({ x, y });
        }
    }
    return points;
}

export function findClosestPoint(x, y, points) {
    let closestPoint = points[0];
    let minDistance = Math.hypot(x - points[0].x, y - points[0].y);

    for (let i = 1; i < points.length; i++) {
        const distance = Math.hypot(x - points[i].x, y - points[i].y);
        if (distance < minDistance) {
            minDistance = distance;
            closestPoint = points[i];
        }
    }
    return closestPoint;
}

export function enableDragAndDrop(element, points) {
    let isDragging = false;
    let startX, startY, initialX, initialY, offsetX, offsetY;

    element.on('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.position().left;
        initialY = element.position().top;
        offsetX = startX - initialX;
        offsetY = startY - initialY;
        element.css('cursor', 'grabbing');

        $(document).on('mousemove', onMouseMove);
        $(document).on('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            element.css({
                left: initialX + deltaX + "px",
                top: initialY + deltaY + "px"
            });
        }
    }

    function onMouseUp(e) {
        if (isDragging) {
            isDragging = false;
            element.css('cursor', 'grab');
            $(document).off('mousemove', onMouseMove);
            $(document).off('mouseup', onMouseUp);

            // Snap to closest magnetic point
            const currentX = parseInt(element.css('left'), 10);
            const currentY = parseInt(element.css('top'), 10);
            const closestPoint = findClosestPoint(currentX, currentY, points);

            element.css({
                left: closestPoint.x + "px",
                top: closestPoint.y + "px"
            });
        }
    }
}
