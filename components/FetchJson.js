import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../app/globals.css';

const FetchJson = ({ base_url, collection }) => {
    const [dicts, setDicts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${base_url}/${collection}`;
                const response = await fetch(url, { cache: 'force-cache' });
                const data = await response.json();
                setDicts(data.dicts);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [base_url, collection]);

    return (
        <div className="border border-gray-500">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="text-center border border-gray-500 px-4 py-2">Number</th>
                        <th className="text-center border border-gray-500 px-4 py-2">Dict_ID</th>
                        <th className="text-center border border-gray-500 px-4 py-2">Entries</th>
                        <th className="text-center border border-gray-500 px-4 py-2">GraphQL</th>
                        <th className="text-center border border-gray-500 px-4 py-2">RESTful</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(dicts).map((dictKey, index) => {
                        const { size, endpoints } = dicts[dictKey];
                        return (
                            <React.Fragment key={dictKey}>
                                <tr>
                                    <td className="text-center border border-gray-500 px-4 py-2">{index + 1}</td>
                                    <td className="text-center border border-gray-500 px-4 py-2">
                                        <span
                                            className="text-blue-500 underline cursor-pointer"
                                            onClick={() => window.open(`${base_url}/${collection}/${dictKey}`)}
                                        >
                                            {dictKey}
                                        </span>
                                    </td>
                                    <td className="text-center border border-gray-500 px-4 py-2">{size}</td>
                                    <td className="text-center border border-gray-500 px-4 py-2">
                                        {endpoints?.graphql && (
                                            <span
                                                className="text-blue-500 underline cursor-pointer"
                                                onClick={() => window.open(`${base_url}${endpoints.graphql}`)}
                                            >
                                                {`${base_url}${endpoints.graphql}`}
                                            </span>
                                        )}
                                    </td>
                                    <td className="border-b border-gray-500 px-4 py-2">
                                        {endpoints?.restful && (
                                            <span
                                                className="text-blue-500 underline cursor-pointer"
                                                onClick={() => window.open(`${base_url}${endpoints.restful}`)}
                                            >
                                                {`${base_url}${endpoints.restful}`}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

FetchJson.propTypes = {
    base_url: PropTypes.string.isRequired,
    collection: PropTypes.string.isRequired,
};
export default FetchJson;
