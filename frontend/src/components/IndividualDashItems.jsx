import React from 'react';

function IndividualDashItems(props) {
    
    function createCategories(category, letter, position) {
        return <p key={position-1}>{props.dashboard[`category${position}`]}: {category[`${letter}Name`]}</p>;
    }

    return (
        <div>
            {props.categories.map((category, index) => {
                let letter;
                const categoryPosition = index+1;
                if (props.dashboard[`category${categoryPosition}`]) {
                    letter = props.dashboard[`category${categoryPosition}`].charAt(0);
                };
                return createCategories(category, letter, categoryPosition);
            })}
        </div>
    );
}

export default IndividualDashItems;