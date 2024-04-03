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
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="Poll Image" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={pollData.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{pollData.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{pollData.title}</h1>
                            <div className="flex">
                                {pollData.options.map((option, index) => (
                                    <div key={index} className="flex flex-col mt-2 items-center">
                                        {option.option && <span className="title-font m-2 font-medium text-xl bg-purple-600 text-white py-2 px-8 rounded-md mr-auto ">{option.option}</span>}
                                        {option.count && <span className="ml-2  text-gray-500">{option.count}</span>}
                                        {option.overallpercentage ?
                                            <div className='mt-2'>
                                                <span className='m-4'>Overall Votes Result: <strong>({option.overallpercentage}%)</strong> </span>
                                            </div>
                                            : <div className='mt-2'>
                                                <span className='m-4'>Overall Votes Result: <strong>({option.overallpercentage}%)</strong> </span>
                                            </div>}
                                        {option.users && (
                                            <ul className='mt-2'>
                                                <h1 className='text-xl text-black font-bold mb-2'>Users List</h1>
                                                <div>
                                                    {option.users.map((item, index) => (
                                                        <div className='text-[16px]' key={index}>{item}</div>
                                                    ))}
                                                </div>
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dynamic