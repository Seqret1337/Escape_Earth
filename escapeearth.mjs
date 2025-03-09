import fetch from 'node-fetch';

const response = await fetch("https://spacescavanger.onrender.com/start?player=alexandern@uia.no", {method: "GET"});
const data = await response.json();

console.log(data);

const getSunRadiusPin = async () => {
    try {
      // Getting the Sun data from the API
      console.log("Fetching Sun data...");
      const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/sun');
      const sunData = await response.json();
      
      // Calculating the difference (the pin)
      const equatorialRadius = sunData.equaRadius;
      const meanRadius = sunData.meanRadius;
      const pin = Math.abs(equatorialRadius - meanRadius);
      
      console.log(`Sun equatorial radius: ${equatorialRadius} km`);
      console.log(`Sun mean radius: ${meanRadius} km`);
      console.log(`Access pin (difference): ${pin} km`);
      
      // Submiting the answer
      console.log("Submitting answer...");
      const submitResponse = await fetch('https://spacescavanger.onrender.com/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: pin.toString(),
          player: 'alexandern@uia.no'
        })
      });
      
      const result = await submitResponse.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  // Run the function
  getSunRadiusPin();

