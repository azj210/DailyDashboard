import React from 'react';

function IndividualDashItems(props) {
    
    function createCategories(text, position) {
        return <p key={position}>{text}</p>;
    }

    return (
        <div>
            {props.categories.map((text, index) => {
                return createCategories(text, index);
            })}
        </div>
    );
}

export default IndividualDashItems;