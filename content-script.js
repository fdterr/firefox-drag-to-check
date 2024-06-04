let isMetaKeyDown = false;
let startX,
  startY,
  selectionRectangle,
  isDrawing = false;

document.addEventListener("keydown", function (event) {
  if (event.metaKey && !isMetaKeyDown) {
    isMetaKeyDown = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (!event.metaKey && isMetaKeyDown) {
    isMetaKeyDown = false;
  }
});

document.addEventListener("mousedown", function (event) {
  if (isMetaKeyDown) {
    isDrawing = true;
    startX = event.pageX;
    startY = event.pageY;

    selectionRectangle = document.createElement("div");
    selectionRectangle.classList.add("selection-rectangle");
    selectionRectangle.style.top = `${startY}px`;
    selectionRectangle.style.left = `${startX}px`;
    document.body.appendChild(selectionRectangle);

    event.preventDefault(); // Prevent text selection
  }
});

document.addEventListener("mousemove", function (event) {
  if (isDrawing) {
    const currentX = event.pageX;
    const currentY = event.pageY;

    selectionRectangle.style.width = `${Math.abs(currentX - startX)}px`;
    selectionRectangle.style.height = `${Math.abs(currentY - startY)}px`;
    selectionRectangle.style.top = `${Math.min(currentY, startY)}px`;
    selectionRectangle.style.left = `${Math.min(currentX, startX)}px`;
  }
});

document.addEventListener("mouseup", function (event) {
  if (isDrawing) {
    isDrawing = false;

    const rect = selectionRectangle.getBoundingClientRect();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const checkboxRect = checkbox.getBoundingClientRect();
      if (
        checkboxRect.right >= rect.left &&
        checkboxRect.left <= rect.right &&
        checkboxRect.bottom >= rect.top &&
        checkboxRect.top <= rect.bottom
      ) {
        checkbox.checked = !checkbox.checked;
      }
    });

    document.body.removeChild(selectionRectangle);
  }
});
