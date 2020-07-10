
import DataService from '../../services/UserServices';

async function retrieveCategoryData(display, dashboard, token, currentDate, info) {

    function assignObject(categoryN, categoryObject) {
        switch (categoryN) {
            case "song":
                let lowEnd = 0.6;
                let highEnd = 1;

                if (dashboard.songEnergy = "low") {
                    lowEnd = 0;
                    highEnd = 0.4;
                } else if (dashboard.songEnergy = "medium") {
                    lowEnd = 0.4;
                    highEnd = 0.6;
                };

                categoryObject.decade = dashboard.songDecade;
                categoryObject.p1 = lowEnd;
                categoryObject.p2 = highEnd;
                break;
            case "cocktail":
                categoryObject.category = dashboard.cocktailPref;
                break;
            case "movie": 
                categoryObject.genre = dashboard.movieGenre;
                break;
            case "food":
                let proteins = 0;
                let calories = 902;
                let fats = 100;
                let sugars = 100;

                const preference = dashboard.foodPref;

                if (preference === "High Protein") {
                    proteins = 20;
                } else if (preference === "Low Calorie") {
                    calories = 100;
                } else if (preference === "Low Fat") {
                    fats = 3;
                } else if (preference === "Low Sugar") {
                    sugars = 5;
                }
                categoryObject.calorie = calories;
                categoryObject.fat = fats;
                categoryObject.protein = proteins;
                categoryObject.sugar = sugars;
                break;
            default:
        }
    }

    let data = {...display, lastUpdate: currentDate}

    for (let i = 0; i < info.length; i++) {
        let category = {type: info[i].categoryName};

        assignObject(info[i].categoryName, category);

        await DataService.getDashData(category)
            .then(response => {
                if (response.data.success === 1) {
                    data[`${info[i].abbreviatedCategory}`] = response.data.data[`${info[i].abbreviatedCategory}`];
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    DataService.updateDisplay(token, data)
    .then(response => {
        // window.location.reload();
    })
    .catch(e => {
        console.log(e);
    })
}

export default retrieveCategoryData;