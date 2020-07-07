import React from 'react';

function IndividualDashItems(props) {
    
    let firstCategoryLetter;
    let secondCategoryLetter;

    if (props.dashboard.category1 !== null) {
        firstCategoryLetter = props.dashboard.category1.charAt(0);
    };
    if (props.dashboard.category2 !== null) {
        secondCategoryLetter = props.dashboard.category2.charAt(0);
    };

    return (
        <div>
            {typeof(props.firstCategory) === "undefined" ?
            <div /> :
            <p>Daily {props.dashboard.category1}: {props.firstCategory[`${firstCategoryLetter}Name`]}</p>}

            {typeof(props.secondCategory) === "undefined" ?
            <div /> :
            <p>Daily {props.dashboard.category2}: {props.secondCategory[`${secondCategoryLetter}Name`]}</p>}
        </div>
    );
}

export default IndividualDashItems;