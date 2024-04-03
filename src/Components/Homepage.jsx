import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const BASE_URL = 'http://localhost:3001';


    useEffect(() => {
        const fetchPolls = async () => {
            try {
                axios.defaults.headers.common['ngrok-skip-browser-warning'] = `false`;
                const response = await axios.get(`${BASE_URL}/api/polls/fetchall`);
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls data:', error);
            }
        };

        fetchPolls();
    }, []);

    const handleOptionClick = async (pollId, option, index) => {
        try {
            const res = await fetch(`${BASE_URL}/api/polls/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                    'ngrok-skip-browser-warning': `false`

                },
                body: JSON.stringify({ pollId, optionindex: index })
            })
            if (res.ok) {
                setSelectedPoll(pollId);
                setSelectedOption(option);
                setAlertMessage('Voted successfully!');
            }
        } catch (error) {
            console.error('Error voting:', error);
            setAlertMessage('Failed to vote. Please try again.');
        }
    };

    return (
        <div className="container mx-auto">
            {alertMessage && (
                <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-4" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm18.95-2.75a8 8 0 1 0-15.9 0 9.9 9.9 0 0 0 15.9 0zM12 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-5a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0V4zm0 8a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0v-1z" /></svg></div>
                        <div>
                            <p className="font-bold">{alertMessage}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-[5%] mb-[5%] md:grid-cols-3 gap-8">
                {polls.length > 0 ? (
                    polls.map((poll) => (
                        <div key={poll._id} className="p-8 border rounded shadow-lg">
                            <Link to={`/Dynamic/${poll._id}`}>
                                <div>
                                    <img src={poll.image} className="h-full w-full" alt="" />
                                </div>
                            </Link>
                            <h3 className="text-lg font-semibold mt-3">{poll.title}</h3>
                            <p>Category: {poll.category}</p>
                            <p>State: {poll.state}</p>
                            <p>Expiry Date: {new Date(poll.expirydate).toLocaleDateString()}</p>
                            <div className="text-xl font-bold mt-2">
                                Vote Below!
                            </div>
                            <div className="mt-2">
                                {poll.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 mr-2 ${selectedPoll === poll._id && selectedOption === option.newoptions ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded`}
                                        onClick={() => handleOptionClick(poll._id, option.newoptions, index)}
                                    >
                                        {option.newoptions}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No polls available</p>
                )}
            </div>
        </div>
    );
};

export default Homepage;
