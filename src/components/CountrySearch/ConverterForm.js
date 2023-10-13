import React, { useEffect, useState } from 'react';

const ConverterForm = ({ currencyCode, currencyInfo }) => {

    const [eurVal, setEurVal] = useState('');
    const [currVal, setCurrVal] = useState(0);

    useEffect(() => {
        const eurValue = parseFloat(eurVal);
        if (!isNaN(eurValue)) {
            setCurrVal(eurValue * currencyInfo.eurRate);
        } else {
            setCurrVal(0);
        }
    }, [eurVal, currencyInfo.eurRate]);

    return (
        <li key={currencyCode}>
            <input
                placeholder='EUR'
                value={eurVal}
                disabled={currencyInfo.eurRate ? false : true}
                onChange={(e) => setEurVal(e.target.value)}
                className='border-[1px] rounded-lg m-2 p-1 w-[100px]'
            />
            {' => '}
            <input
                placeholder='Curr'
                disabled={true}
                value={currVal.toFixed(2)}
                className='border-[1px] rounded-lg m-2 p-1 w-[100px]'
            />
        </li>
    )
};

export default ConverterForm;
