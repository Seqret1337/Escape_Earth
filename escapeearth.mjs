import fetch from 'node-fetch';

const response = await fetch("https://spacescavanger.onrender.com/start?player=alexandern@uia.no", {method: "GET"});
const data = await response.json();

console.log(data);
