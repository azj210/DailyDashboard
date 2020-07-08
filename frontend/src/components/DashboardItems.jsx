import React from 'react';
import DataService from '../services/UserServices';
import retrieveCategoryData from './AppFunctions/retrieveCategoryData';
import IndividualDashItems from './IndividualDashItems';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    let firstCategoryLetter;
    let secondCategoryLetter;

    if (props.dashboard.category1) {
        firstCategoryLetter = props.dashboard.category1.charAt(0);
    };
    if (props.dashboard.category2) {
        secondCategoryLetter = props.dashboard.category2.charAt(0);
    };

    if ((props.currentDate-props.display.lastUpdateObj >= 1) && props.currentDate.getDate() > props.display.lastUpdateObj.getDate()) {
        //update
    }

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
            for (let i = 1; i < 3; i++) {
                if (props.dashboard[`category${i}`] && responseData[`${categoryNames[`name${i}`].charAt(0)}Name`] !== null) {
                    texts[i-1] = props.dashboard[`category${i}`] + ": " + responseData[`${categoryNames[`name${i}`]}`];
                } else if (props.dashboard[`category${i}`] && categoryNames[`name${1}`] === null) {
                    retrieveCategoryData(uid, token, props.dashboard, `${categoryNames[`name${i}`].charAt(0)}Name`, props.display.lastUpdateObj)
                } //else if () date conditional
            }
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