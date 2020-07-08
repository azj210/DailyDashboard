import DataService from '../../services/UserServices';

function retrieveCategoryData(uid, token, dashboard, category, currentDate) {
    const firstCategoryName = dashboard.category1;
    const secondCategoryName = dashboard.category2;
    let category1 = {type: firstCategoryName};
    let category2 = {type: secondCategoryName};
    
    function assignObject(category, categoryObject) {
        switch (category) {
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
        }
    }

    assignObject(firstCategoryName, category1);
    assignObject(secondCategoryName, category2);

    let data = {uid: uid, lastUpdate: currentDate};

    DataService.getDashData(category2)
        .then(response => {
            if (response.data.success === 1) {
                data[`${category}`] = response.data.data[`${category}`];
                DataService.updateDisplay(token, data)
                    .then(resopnse => {
                        console.log(response);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        })
        .catch(e => {
            console.log(e);
        });
    //         DataService.getDashData(category2)
    //             .then(response => {
    //                 if (response.data.success === 1) {
    //                     allItems[1] = response.data.data;
    //                 };

    //                 // const newUpdates = {uid: localStorage.getItem("decisionMakerToken")};

    //                 // for (i = 0; i < allItems.length; i++) {
    //                 //     const name = props.dashboard[`category${index + 1}`];
    //                 //     if (name && typeof(allItems[i]) === "undefined") {
    //                 //         newUpdates[`${name.charAt(0)}Name`] = ;
    //                 //     }
    //                 // };
    //                 props.setCategories(allItems);
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //             })
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
}

export default retrieveCategoryData;