//target button
const btn = document.querySelector('.changeColorBtn');
//target colorGrid
const colorGrid = document.querySelector('.colorGrid');
//target colorValue
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => { //catch the data which has come from background.js
        console.log('color: ', color);
    });
    //to use chrome api we use await functiob
    //to use await function we async the function
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //execute script in google chrome tab
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor, //inject pickColor function on the tab
        },
        async (injectionResults) => { //recive the colorPicker function result in here array format
            const [data] = injectionResults;//destructor the recived data
            if (data.result) {
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.innerText = color;
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});
//functon colorpicker act on other componant, if we have to use this function to upper functiomn or any other position we have to return the funtion and call it theere
async function pickColor() {
    try {
        // Pick the color code..
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open(); //activeate the eyeDroper and it give return the selected color
    } catch (err) {
        console.error(err);
    }
}