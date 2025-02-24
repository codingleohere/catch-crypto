import React from 'react'

export default function Classic({size}) {
    return (
        <div className="loader_wrapper">
            {/* <div className="blur_div"></div> */}
            <div className="loader_elements">
                <p>Loading, please wait...</p>
                <div className="loader" style={{ backgroundSize: `${size}%` }}></div>
            </div>
        </div>
    )
}
