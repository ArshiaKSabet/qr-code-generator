const dataInput = document.querySelector('#data');

const primaryColorPicker = document.querySelector('#color');
const bgColorPicker = document.querySelector('#bg-color');

const primaryColorValue = document.querySelector('#color-value');
const bgColorValue = document.querySelector('#bg-color-value');

const updateColor = e => {
    const value = e.target.value;
    primaryColorValue.innerText = value;
};

const updateBgColor = e => {
    const value = e.target.value;
    bgColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    primaryColorPicker.addEventListener('change', updateColor);
    bgColorPicker.addEventListener('change', updateBgColor);
};

addColorPickerEventListeners();
