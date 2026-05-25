const API_URL = "https://d0omv83s40.execute-api.ap-southeast-2.amazonaws.com/visit";

async function updateCounter() {
    const res = await fetch(API_URL);
    const data = await res.json();
    document.getElementById("visitor-count").innerText = data.count;
}

updateCounter();