import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    const numOfStars = 5;
    return <div className='rating'>
        { [...Array(numOfStars).keys()].map(x => (
            <span key={x}>
                <i
                    style={{color}}
                    className={(value >= x+1) ? 'fas fa-star' : (value >= x+0.5) ? 'fas fa-star-half-alt' : 'far fa-star'}
                />
            </span>
        )) }
        <br/>
        <span>{text && text}</span>
    </div>;
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number, /** can't be required because of initial null during load */
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Rating;
