import React from 'react';
import DataService from '../services/UserServices';
import IndividualDashItems from './IndividualDashItems';
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

    DataService.getDashData(category1)
        .then(response => {
            // console.log(response);
            props.setFirstCategory(response.data.data);
            DataService.getDashData(category2)
                .then(response => {
                    // console.log(response);
                    const var2 = response.data.data
                    props.setSecondCategory(var2)
                    console.log(props.dashItems.firstCategory);
                    console.log(props.dashItems.secondCategory);
                })
                .catch(e => {
                    console.log(e);
                })
        })
        .catch(e => {
            console.log(e);
        });
};

const methods = {
    componentDidMount
};

function DashboardItems (props) {

    return (
        <IndividualDashItems dashboard={props.dashboard} firstCategory={props.firstCategory} secondCategory={props.secondCategory} />
    );
}

export default lifecycle(methods)(DashboardItems);