const minSlider = document.getElementById("minSlider");
const maxSlider = document.getElementById("maxSlider");

const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");

const track = document.querySelector(".track");

function updateSlider() {

    let min = parseInt(minSlider.value);
    let max = parseInt(maxSlider.value);

    // Prevent overlap
    if(min >= max){
        min = max - 1;
        minSlider.value = min;
    }

    if(max <= min){
        max = min + 1;
        maxSlider.value = max;
    }

    minValue.textContent = min;
    maxValue.textContent = max;

    let minPercent = (min / minSlider.max) * 100;
    let maxPercent = (max / maxSlider.max) * 100;

    track.style.background =
    `linear-gradient(to right,
    #ccc ${minPercent}%,
    #2196f3 ${minPercent}%,
    #2196f3 ${maxPercent}%,
    #ccc ${maxPercent}%)`;
}

minSlider.addEventListener("input", updateSlider);
maxSlider.addEventListener("input", updateSlider);

updateSlider();