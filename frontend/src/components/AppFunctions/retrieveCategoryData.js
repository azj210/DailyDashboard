
import DataService from '../../services/UserServices';

async function retrieveCategoryData(info /*display, token, dashboard, categoryName, abbreviatedCategory, currentDate*/) {

    function assignObject(categoryN, categoryObject) {
        switch (categoryN) {
            case "song":
                let lowEnd = 0.6;
                let highEnd = 1;

                if (info[0].dashboard.songEnergy = "low") {
                    lowEnd = 0;
                    highEnd = 0.4;
                } else if (info[0].dashboard.songEnergy = "medium") {
                    lowEnd = 0.4;
                    highEnd = 0.6;
                };

                categoryObject.decade = info[0].dashboard.songDecade;
                categoryObject.p1 = lowEnd;
                categoryObject.p2 = highEnd;
                break;
            case "cocktail":
                categoryObject.category = info[0].dashboard.cocktailPref;
                break;
            case "movie": 
                categoryObject.genre = info[0].dashboard.movieGenre;
                break;
            case "food":
                let proteins = 0;
                let calories = 902;
                let fats = 100;
                let sugars = 100;

                const preference = info[0].dashboard.foodPref;

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

    let data = {...info[0].display, lastUpdate: info[0].currentDate}

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

    DataService.updateDisplay(info[0].token, data)
    .then(response => {
        console.log(4);
        console.log(response);
        window.location.reload();
    })
    .catch(e => {
        console.log(e);
    })
}

export default retrieveCategoryData;