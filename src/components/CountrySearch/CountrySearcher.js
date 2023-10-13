import { useEffect, useState } from 'react';
import axios from 'axios';
import ConverterForm from './ConverterForm';

const CountrySearcher = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        const sessionResults = JSON.parse(sessionStorage.getItem('searchResults')) || [];
        setSearchResults(sessionResults);
    }, []);
    const showAlert = () => {
        window.alert('No such Country found');
    };
    const handleAdd = async () => {
        try {
            const response = await axios.post('/api/getCountryData', { countryName: searchQuery });
            const countryData = response.data;

            const sessionResults = JSON.parse(sessionStorage.getItem('searchResults')) || [];
            sessionResults.push(countryData);
            sessionStorage.setItem('searchResults', JSON.stringify(sessionResults));

            setSearchResults(sessionResults);
        } catch (error) {
            showAlert()
            console.error(error);
        }
        setSearchQuery("")
    };
    const removeHandle = (name) => {
        const sessionResults = JSON.parse(sessionStorage.getItem('searchResults'))
        const updSessionResults = sessionResults.filter((i) => { return i.name !== name })
        sessionStorage.setItem('searchResults', JSON.stringify(updSessionResults));
        setSearchResults(updSessionResults);
    }
    const allCurr = (data) => {
        return Object.entries(data).map(([currencyCode, currencyInfo]) => (
            <li className='my-5' key={currencyCode}>
                <strong>{currencyCode}:</strong> {currencyInfo.name} ({currencyInfo.symbol}) <strong className='text-lg'>/</strong>  {currencyInfo.eurRate ? currencyInfo.eurRate : '--'}
            </li>
        ));

    }
    const converter = (data) => {
        return Object.entries(data).map(([currencyCode, currencyInfo]) => {
            return <ConverterForm currencyCode={currencyCode} currencyInfo={currencyInfo} />
        })
    }

    return (
        <main className='w-[95%] mx-auto mt-20'>
            <h1 className='primary-heading text-center'>Add Country to get Information</h1>
            <section className='flex items-center justify-center'>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                    placeholder="Enter a country name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='pink-button' onClick={handleAdd}>Add</button>
            </section>
            <h2 className='secondary-heading text-center'>Search Results</h2>
            <section className='flex items-center justify-center'>
                <table>
                    <thead>
                        <tr className='bg-gray-200'>
                            <td className='py-4 px-8 b-2 border-r-[1px] border-gray-300 text-lg font-semibold'>Name</td>
                            <td className='py-4 px-8 b-2 border-r-[1px] border-gray-300 text-lg font-semibold'>Population</td>
                            <td className='py-4 px-8 b-2 border-r-[1px] border-gray-300 text-lg font-semibold'>Currencies / EUR</td>
                            <td className='py-4 px-8 b-2 border-r-[1px] border-gray-300 text-lg font-semibold'>converter</td>
                            <td className='py-4 px-8 b-2 text-lg font-semibold'>Remove</td>

                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index} className='border-b-[1px]'>
                                <td className='py-4 px-8 b-2'>{result.name}</td>
                                <td className='py-4 px-8 b-2 text-center'>{result.population}</td>
                                <td className='py-4 px-8 b-2'>
                                    <ul>
                                        {allCurr(result.currencies)}
                                    </ul>
                                </td>
                                <td className='py-4 px-8 b-2'>
                                    <ul>
                                        {converter(result.currencies)}
                                    </ul>
                                </td>
                                <td>
                                    <h2 onClick={() => { removeHandle(result.name) }} className='text-center hover:underline text-blue-500 cursor-pointer'>delete</h2>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default CountrySearcher;
// http://data.fixer.io/api/latest?access_key=fad90b0caf5ad20cb582260b6b72031f&base=GBP&symbols=USD,AUD,CAD,PLN,MXN