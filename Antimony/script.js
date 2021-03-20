let constants = 
{
  "avgWeights": {
    "bottles": 15,
    "shoppingBags": 4,
    "straws": 0.4,
    "utensils": 2.2,
    "containers": 17,
    "ziplocBags": 2
  },
  "smallWeights": {
    "bottles": 10,
    "shoppingBags": 3,
    "straws": 0.3,
    "utensils": 1.8,
    "containers": 14,
    "ziplocBags": 1
  },
  "largeWeights": {
    "bottles": 20,
    "shoppingBags": 5,
    "straws": 0.5,
    "utensils": 2.6,
    "containers": 20,
    "ziplocBags": 8
  },
  "baselineUse": {
    "yearly": 220,
    "daily": 0.60274
  }
};

let userName;

let plasticBottles;
let plasticBottleSize;

let plasticBags;
let plasticBagSize;

let plasticStraws;
let plasticStrawSize;

let plasticUtensils;
let plasticUtensilSize;

let plasticStyrofoam;
let plasticStyrofoamSize;

let plasticContainers;
let plasticContainerSize;

let plasticZiplocs;
let plasticZiplocSize;

function execute() {
    userName = document.getElementById('name').value;

    plasticBottles = document.getElementById('bottles').value;
    plasticBottleSize = document.getElementById('bottleSize').value;

    plasticBags = document.getElementById('bags').value;
    plasticBagSize = document.getElementById('bagSize').value;

    plasticStraws = document.getElementById('straws').value;
    plasticStrawSize = document.getElementById('strawSize').value;

    plasticUtensils = document.getElementById('utensils').value;
    plasticUtensilSize = document.getElementById('utensilSize').value;

    plasticStyrofoam = document.getElementById('styrofoam').value;

    plasticContainers = document.getElementById('containers').value;
    plasticContainerSize = document.getElementById('containerSize').value;

    plasticZiplocs = document.getElementById('ziplocs').value;
    plasticZiplocSize = document.getElementById('ziplocSize').value;

    var bottleWt = plasticBottles * weight(plasticBottleSize).bottles;
    var bagWt = plasticBags * weight(plasticBagSize).shoppingBags;
    var strawsWt = plasticStraws * weight(plasticStrawSize).straws;
    var utensilsWt = plasticUtensils * weight(plasticUtensilSize).utensils;
    var foamWt = parseInt(plasticStyrofoam);
    var containersWt = plasticContainers * weight(plasticContainerSize).containers;
    var ziplocWt = plasticZiplocs * weight(plasticZiplocSize).ziplocBags;

    if (typeof bottleWt === undefined || isNaN(bottleWt)) { bottleWt = 0; }
    if (typeof bagWt === undefined || isNaN(bagWt)) { bagWt = 0; }
    if (typeof strawsWt === undefined || isNaN(strawsWt)) { strawsWt = 0; }
    if (typeof utensilsWt === undefined || isNaN(utensilsWt)) { utensilsWt = 0; }
    if (typeof foamWt === undefined || isNaN(foamWt)) { foamWt = 0; }
    if (typeof containersWt === undefined || isNaN(containersWt)) { containersWt = 0; }
    if (typeof ziplocWt === undefined || isNaN(ziplocWt)) { ziplocWt = 0; }

    const userWeights = [bottleWt, bagWt, strawsWt, utensilsWt, foamWt, containersWt, ziplocWt];
    const userWeightsMax = Math.max(...userWeights);

    console.log(userWeights);
    console.log(userWeightsMax);

    let mostUsed;

    switch(userWeights.indexOf(userWeightsMax)) {
        case 0: mostUsed = "plastic bottles"; break;
        case 1: mostUsed = "plastic bags"; break;
        case 2: mostUsed = "plastic straws"; break;
        case 3: mostUsed = "plastic utensils"; break;
        case 4: mostUsed = "styrofoam"; break;
        case 5: mostUsed = "plastic containers"; break;
        case 6: mostUsed = "ziploc bags"; break;
        default: mostUsed = "err";
    }

    document.getElementById('mostused').innerHTML = mostUsed;
    document.getElementById('mostusage').innerHTML = round(userWeightsMax, 2) + " g";

    var userWeightTotal = userWeights.reduce((a, b) => a + b);
    userWeightTotal = round(userWeightTotal / 1000, 2);
    document.getElementById('totalusage').innerHTML = userWeightTotal + " kg";

    const averageConsumption = round(constants.baselineUse.daily * 7 * 0.453592, 2);
    document.getElementById('avgconsumption').innerHTML = averageConsumption + " kg";

    if (userName.length > 2) {
      if (averageConsumption + 0.25 < userWeightTotal) {
          let res = `${userName}, your plastic consumption is greater than the average for your region. Try to reduce your plastic usage, avoid disposables, and recycle whenever possible. Keep working!`;
          document.getElementById('tips').innerHTML = res;
      } else if (averageConsumption - 0.25 > userWeightTotal) {
          let res = `Congratulations, ${userName}! Your plastic consumption is less than the average for your region. Keep up the good work.`
          document.getElementById('tips').innerHTML = res;
      } else if (!isNaN(averageConsumption) && !isNaN(userWeightTotal)) {
          let res = `${userName}, your plastic consumption is approximately equal to the average for your region. Good work, but try to reduce your plastic usage, avoid disposables, and recycle whenever possible.`;
          document.getElementById('tips').innerHTML = res;
      }
    } else {
      if (averageConsumption + 0.25 < userWeightTotal) {
          let res = `Your plastic consumption is greater than the average for your region. Try to reduce your plastic usage, avoid disposables, and recycle whenever possible. Keep working!`;
          document.getElementById('tips').innerHTML = res;
      } else if (averageConsumption - 0.25 > userWeightTotal) {
          let res = `Congratulations! Your plastic consumption is less than the average for your region. Keep up the good work.`
          document.getElementById('tips').innerHTML = res;
      } else if (!isNaN(averageConsumption) && !isNaN(userWeightTotal)) {
          let res = `Your plastic consumption is approximately equal to the average for your region. Good work, but try to reduce your plastic usage, avoid disposables, and recycle whenever possible.`;
          document.getElementById('tips').innerHTML = res;
      }
    }

    var button = document.getElementById('button');
    button.remove();
}

const round = (x, places) => (.0 + Math.round(x * Math.pow(10, places))) / Math.pow(10, places);

function weight(size) {
    if (size == 'small') {
        return constants.smallWeights;
    } else if (size == 'avg') {
        return constants.avgWeights;
    } else if (size == 'large') {
        return constants.largeWeights;
    } else {
        return 0;
    }
}