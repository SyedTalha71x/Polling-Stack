import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
const Dynamic = () => {

    const { id } = useParams();
    const [pollData, setPollData] = useState(null);
    useEffect(() => {
        const fetchPollData = async () => {
            const BASE_URL = 'http://localhost:3001'
            try {
                axios.defaults.headers.common['ngrok-skip-browser-warning'] = `false`;
                const response = await axios.get(`${BASE_URL}/api/polls/fetchspecificpoll/${id}`);
                setPollData(response.data.poll);
            } catch (error) {
                console.error('Error fetching poll data:', error);
            }
        };

        fetchPollData();
    }, [id]);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                {pollData && (
                    <div className="lg:w-4/5 mx-auto">
                        <img alt="Poll Image" className="max-w-max h-[500px] object-top  rounded mb-6" src={pollData.image} />
                        <h2 className="text-lg title-font  mt-4 text-gray-700 tracking-widest mb-2">{pollData.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4"><span className='font-extrabold'>Question: </span>{pollData.title}</h1>
                        {pollData.options.map((option, index) => (
                            <div key={index} className="mb-8">
                                {/* <span className="title-font  font-medium text-xl bg-purple-600 text-white py-2 px-8 rounded-md">{option.option}</span> */}
                                {/* {option.count && <span className="ml-2 text-gray-500">{option.count}</span>} */}

                                {option.users && (
                                    <div className="mt-4">
                                        <h1 className="text-xl text-white flex justify-between items-center bg-black rounded-lg p-3 font-semibold mb-2">Users List for Option: <span>{option.option}</span></h1>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-gray-900 uppercase tracking-wider">Name</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {option.users.map((user, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{user}</div>
                                                        </td>

                                                    </tr>
                                                ))}
                                                {option.overallpercentage &&
                                                    <div className='mt-4'>
                                                        <span className='mt-6'>Overall Votes Result: <strong>({option.overallpercentage}%)</strong></span>
                                                    </div>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dynamic