import { count } from 'console';
import fetch from 'node-fetch';

async function getCurrentChallange() {
    const response = await fetch("https://spacescavanger.onrender.com/start?player=alexandern@uia.no", {method: "GET"});
    const data = await response.json();
    console.log("Current challenge");
    console.log(data);
    return data;
}


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
    return result;
    };

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
    return result;
  }

async function findShortestDayPlanet() {
    // Get all planets
    console.log("Fetching planetary data...");
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies');
    const data = await response.json();
    
    // Find planet with shortest day
    let quickest = null;
    let shortestTime = Infinity;
    
    data.bodies.forEach(body => {
      if (body.isPlanet) {
        const dayLength = Math.abs(body.sideralRotation);
        console.log(`${body.englishName}: ${dayLength} hours`);
        
        if (dayLength > 0 && dayLength < shortestTime) {
          shortestTime = dayLength;
          quickest = body.englishName;
        }
      }
    });
    
    console.log(`\nPlanet with shortest day: ${quickest} (${shortestTime} hours)`);
    
    // Submit answer
    console.log("Submitting answer...");
    const submitResponse = await fetch('https://spacescavanger.onrender.com/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: quickest,
        player: 'alexandern@uia.no'
      })
    });
    
    const result = await submitResponse.json();
    console.log("Response:", result);
    return result;
  }

async function countJupiterMoons() {
    console.log("Fetching Jupiter's moons data...");
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies');
    const data = await response.json();
    
    const jupiterMoons = data.bodies.filter(body => 
      body.aroundPlanet && body.aroundPlanet.planet === 'jupiter');
    
    console.log(`Number of Jupiter's moons: ${jupiterMoons.length}`);
    
    // Submit answer
    console.log("Submitting answer...");
    const submitResponse = await fetch('https://spacescavanger.onrender.com/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: jupiterMoons.length.toString(),
        player: 'alexandern@uia.no'
      })
    });
    
    const result = await submitResponse.json();
    console.log("Response:", result);
    return result;
  }


async function solveOnebyone() {
    await getCurrentChallange();
    await getSunRadiusPin();
    await findClosestPlanet();
    await findShortestDayPlanet();
    await countJupiterMoons();
}
solveOnebyone();