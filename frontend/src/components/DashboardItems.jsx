import React from 'react';
import DataService from '../services/UserServices';
import retrieveCategoryData from './AppFunctions/retrieveCategoryData';
import IndividualDashItems from './IndividualDashItems';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {

    const token = localStorage.getItem("decisionMakerToken");
    const uid = localStorage.getItem("decisionMakerUID");

    const assignRetrievalName = categoryName => {
        switch (categoryName) {
            case "song":
                return "sName";
            case "cocktail":
                return "cName";
            case "movie":
                return "mName";
            case "food":
                return "fName";
            default:
                return null;
        }
    }

    const categoryNames = {};

    categoryNames.name1 = assignRetrievalName(props.dashboard.category1);
    categoryNames.name2 = assignRetrievalName(props.dashboard.category2);

    const texts = [];
    DataService.getDisplayByUID(token, uid)
        .then(response => {
            const responseData = response.data.data;
            // condition should always be set to "less than the max amount of categories the user can pick to show on the dashboard + 1"
            const toBeUpdated = [];

            for (let i = 1; i < 3; i++) {
                // check if today is at least one day ahead of the last update
                if ((props.currentDate-props.display.lastUpdateObj > 0) && (props.currentDate.getDate() > props.display.lastUpdateObj.getDate() || props.currentDate.getMonth() > props.display.lastUpdateObj.getMonth() || props.currentDate.getYear() > props.display.lastUpdateObj.getYear())) {
                    // retrieveCategoryData(props.display, token, props.dashboard, props.dashboard[`category${i}`], `${categoryNames[`name${i}`]}`, props.currentDate);
                    toBeUpdated.push({categoryName: props.dashboard[`category${i}`], abbreviatedCategory: `${categoryNames[`name${i}`]}`})
                }
                // check if user filled out the category and the display is null for that category 
                else if (props.dashboard[`category${i}`] && responseData[`${categoryNames[`name${i}`]}`] === null) {
                    // retrieveCategoryData(props.display, token, props.dashboard, props.dashboard[`category${i}`], `${categoryNames[`name${i}`]}`, props.currentDate);
                    toBeUpdated.push({categoryName: props.dashboard[`category${i}`], abbreviatedCategory: `${categoryNames[`name${i}`]}`})
                }
                // check if user filled out the category and the display isn't null for that category 
                else if (props.dashboard[`category${i}`] && responseData[`${categoryNames[`name${i}`]}`] !== null) {
                    const categoryName = props.dashboard[`category${i}`];

                    texts[i-1] = `${categoryName[0].toUpperCase()}${categoryName.slice(1)}` +  ": " + responseData[`${categoryNames[`name${i}`]}`];
                }
            } 
            if (toBeUpdated.length > 0) {
                retrieveCategoryData(props.display, props.dashboard, token, props.currentDate, toBeUpdated);
            };
            props.setCategories(texts);
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
        typeof(props.categories) === "undefined" ?
        <div /> :
        <div>
            <IndividualDashItems dashboard={props.dashboard} categories={props.categories} />
        </div>
    );
}

export default lifecycle(methods)(DashboardItems);