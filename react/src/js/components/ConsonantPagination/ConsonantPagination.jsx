import React from 'react';

const ConsonantPagination = () => (
    <div className="consonant-pagination">
        <div className="consonant-pagination--paginator">
            <button type="buttton" className="consonant-pagination--btn">previous</button>
            <ul className="consonant-pagination--items">
                <li className="consonant-pagination--item consonant-pagination--item_active">
                    <button type="button" className="consonant-pagination--item-btn">1</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">2</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">3</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn" disabled>4</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">5</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">6</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">7</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">8</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">9</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">10</button>
                </li>
                <li className="consonant-pagination--item">
                    <button type="button" className="consonant-pagination--item-btn">24 </button>
                </li>
            </ul>
            <button type="buttton" className="consonant-pagination--btn">next</button>
        </div>
        <div className="consonant-pagination--summary">
            Showing
            <strong>1–6 of</strong>
            273 Results
        </div>
    </div>
);

export default ConsonantPagination;
