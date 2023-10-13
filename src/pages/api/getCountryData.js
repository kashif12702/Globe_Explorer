import axios from "axios";

export default async (req, res) => {
    if (req.method === "POST") {
        const { countryName } = req.body;

        try {
            const countryResponse = await axios.get(
                `https://restcountries.com/v3.1/name/${countryName}`
            );
            const countryData = countryResponse.data[0];

            const exchangeRateResponse = await axios.get(
                "http://data.fixer.io/api/latest?access_key=fad90b0caf5ad20cb582260b6b72031f"
            );
            const exchangeRateData = exchangeRateResponse.data.rates;

            // Combine currency data with exchange rates
            const currenciesWithRates = {};
            for (const currencyCode in countryData.currencies) {
                if (exchangeRateData[currencyCode]) {
                    currenciesWithRates[currencyCode] = {
                        ...countryData.currencies[currencyCode],
                        eurRate: exchangeRateData[currencyCode],
                    };
                }
            }

            const response = {
                name: countryData.name.official,
                population: countryData.population,
                currencies: currenciesWithRates,
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(error.response.status).json({ message: error.message });
        }
    } else {
        res.status(405).end();
    }
};
