//set the background image
const setBackground = (dayOrNight, mainDisplay) => {
    const imgsNight = {
        "Thunderstorm":"/images/thunderstormNight.jpg",
        "Drizzle":"/images/drizzleNight.jpg",
        "Rain":"/images/rainNight.jpg",
        "Snow":"/images/snowNight.jpg",
        "Mist":"/images/mist.jpg",
        "Smoke":"/images/smoke.jpg",
        "Haze":"/images/haze.jpg",
        "Dust":"/images/dust.jpg",
        "Fog":"/images/fog.jpg",
        "Sand":"/images/sand.jpg",
        "Ash":"/images/ash.jpg",
        "Squall":"/images/squall.jpg",
        "Tornado":"/images/tornado.jpg",
        "Clear":"/images/clearNight.jpg",
        "Clouds":"/images/cloudsNight.jpg"
    };
    const imgsDay = {
        "Thunderstorm":"/images/thunderstormDay.jpg",
        "Drizzle":"/images/drizzleDay.jpg",
        "Rain":"/images/rainDay.jpg",
        "Snow":"/images/snowDay.jpg",
        "Mist":"/images/mist.jpg",
        "Smoke":"/images/smoke.jpg",
        "Haze":"/images/haze.jpg",
        "Dust":"/images/dust.jpg",
        "Fog":"/images/fog.jpg",
        "Sand":"/images/sand.jpg",
        "Ash":"/images/ash.jpg",
        "Squall":"/images/squall.jpg",
        "Tornado":"/images/tornado.jpg",
        "Clear":"/images/clearDay.jpg",
        "Clouds":"/images/cloudsDay.jpg"
    };

    //if the local time is between 6am and 7pm then access imgsDay
    //else access imgsNight
    let imgRes;
    if (dayOrNight) {
        imgRes = imgsDay[mainDisplay];
    }
    else{
        imgRes = imgsNight[mainDisplay];
    }
    //return the image by passing in the main from prop to the respective dictionary
    return imgRes;
}

export default setBackground;