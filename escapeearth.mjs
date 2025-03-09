import fetch from 'node-fetch';

const response = await fetch("https://spacescavanger.onrender.com/start?player=alexandern@uia.no", {method: "GET"});
const data = await response.json();

console.log(data);

async function getSunRadiusPin() {
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
    
    };
  getSunRadiusPin();

async function findClosestPlanet() {
    // Get all planets
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies');
    const data = await response.json();
    
    // Get Earth's tilt
    const earth = data.bodies.find(body => body.englishName === 'Earth');
    const earthTilt = earth.axialTilt;
    console.log(`Earth tilt: ${earthTilt}°`);
    
    // Find closest planet
    let closest = null;
    let minDiff = Infinity;
    
    data.bodies.forEach(body => {
      if (body.isPlanet && body.englishName !== 'Earth' && body.axialTilt !== undefined) {
        const diff = Math.abs(body.axialTilt - earthTilt);
        console.log(`${body.englishName}: ${body.axialTilt}° (diff: ${diff.toFixed(2)}°)`);
        
        if (diff < minDiff) {
          minDiff = diff;
          closest = body.englishName;
        }
      }
    });
    
    console.log(`\nClosest planet: ${closest}`);
    
    // Submit answer
    const submitResponse = await fetch('https://spacescavanger.onrender.com/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: closest,
        player: 'alexandern@uia.no'
      })
    });
    
    const result = await submitResponse.json();
    console.log("Response:", result);
  }
  findClosestPlanet();
