const dataInput = document.querySelector('#data');

// const imageFormat = document.querySelector('input[name="format"]:checked');

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

const sizeSlider = document.querySelector('#size');
const marginSlider = document.querySelector('#margin');

const sizeValue = document.querySelector('#size-value');
const marginValue = document.querySelector('#margin-value');

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListeners();

const showInputError = () => {
    dataInput.classList.add('error');
};

const addDataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};

addDataInputEventListener();

const prepareParameters = params => {
    return {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    };
};

const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImg = document.querySelector('#qr-code-image');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultContainer.classList.add('flipped');

    qrCodeImg.setAttribute('src', imgUrl);
};

const submitButton = document.querySelector('#cta');

const getQrCode = parameters => {
    const baseUrl = 'http://api.qrserver.com/v1/create-qr-code';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const onSubmit = () => {
    const data = dataInput.value;

    if (!data.length) {
        return showInputError();
    }
    const color = primaryColorPicker.value;
    const bgColor = bgColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = document.querySelector('input[name="format"]:checked.value');

    const parameters = prepareParameters({ data, color, bgColor, size, qZone, format });

    getQrCode(parameters);
};

const addSubmitEventlistener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventlistener();
