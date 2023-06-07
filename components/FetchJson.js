import React, { useState, useEffect } from 'react';

const FetchJson = ({base_url, collection}) => {
    const [dicts, setDicts] = useState({});

    useEffect(() => {
        const url = `${base_url}/${collection}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setDicts(data.dicts);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (

                            <div>
                                <table style={{borderCollapse: 'collapse', width: '100%'}}>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'left', padding: '10px'}}>Number</th>
                                            <th style={{textAlign: 'left', padding: '10px'}}>Dictionary</th>
                                            <th style={{textAlign: 'left', padding: '10px'}}>Size</th>
                                            <th style={{textAlign: 'left', padding: '10px'}}>GraphQL</th>
                                            <th style={{textAlign: 'left', padding: '10px'}}>RESTful</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(dicts).map((dictKey, index) => {
                                            const dict = dicts[dictKey];
                                            return (
                                                <React.Fragment key={dictKey}>
                                                    <tr>
                                                        <td style={{border: '1px solid black', padding: '10px'}}>{index + 1}</td>
                                                        <td style={{border: '1px solid black', padding: '10px'}}>{dictKey}</td>
                                                        <td style={{border: '1px solid black', padding: '10px'}}>{dict.size}</td>
                                                        <td style={{border: '1px solid black', padding: '10px'}}>
                                                            {dict.endpoints.graphql &&
                                                                <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => window.open(`${base_url}${dict.endpoints.graphql}`)}>{`${base_url}${dict.endpoints.graphql}`}</span>
                                                            }
                                                        </td>
                                                        <td style={{border: '1px solid black', padding: '10px'}}>
                                                            {dict.endpoints.graphql &&
                                                                <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => window.open(`${base_url}${dict.endpoints.restful}`)}>{`${base_url}${dict.endpoints.restful}`}</span>
                                                            }
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
export default FetchJson;

