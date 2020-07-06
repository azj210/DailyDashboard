import React from 'react';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {

    const firstCategoryName = props.dashboard.category1;
    const secondCategoryName = props.dashboard.category2;
    let category1 = {type: firstCategoryName};
    let category2 = {type: secondCategoryName};
    
    function assignObject(category, categoryObject) {
        switch (category) {
            case "song":
                let lowEnd = 0.6;
                let highEnd = 1;

                if (props.dashboard.songEnergy = "low") {
                    lowEnd = 0;
                    highEnd = 0.4;
                } else if (props.dashboard.songEnergy = "medium") {
                    lowEnd = 0.4;
                    highEnd = 0.6;
                };

                categoryObject.decade = props.dashboard.songDecade;
                categoryObject.p1 = lowEnd;
                categoryObject.p2 = highEnd;
                break;
            case "cocktail":
                categoryObject.category = props.dashboard.cocktailPref;
                break;
            case "movie": 
                categoryObject.genre = props.dashboard.movieGenre;
                break;
            case "food":
                let proteins = 0;
                let calories = 902;
                let fats = 100;
                let sugars = 100;

                const preference = props.dashboard.foodPref;

                if (preference = "High Protein") {
                    proteins = 20;
                } else if (preference = "Low Calorie") {
                    calories = 100;
                } else if (preference = "Low Fat") {
                    fats = 3;
                } else if (preference = "Low Sugar") {
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

    console.log(category1);
    console.log(category2);

    DataService.getDashData("frbughfbu4herj")
        .then(response => {
            console.log(category1);
            console.log(response);
            props.setDashItems({...props.dashItems, firstCategory: response.data.data})
        })
        .catch(e => {
            console.log(e);
        });
    DataService.getDashData(category2)
        .then(response => {
            console.log(response);
            props.setDashItems({...props.dashItems, secondCategory: response.data.data})
        })
        .catch(e => {
            console.log(e);
        })
};

const methods = {
    componentDidMount
};

function DashboardItems (props) {

    const firstCategoryLetter = props.dashboard.category1.charAt(0);
    const secondCategoryLetter = props.dashboard.category2.charAt(0);

    return (
        <div>
            <p>Daily {props.dashboard.category1}: {props.dashItems.firstCategory/* [`${firstCategoryLetter}Name`] */}</p>
            <p>Daily {props.dashboard.category2}: {props.dashItems.secondCategory/* [`${secondCategoryLetter}Name`] */}</p>
        </div>
    );
}

export default lifecycle(methods)(DashboardItems);