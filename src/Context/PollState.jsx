import React, { useState } from 'react'
import PollContext from './pollContext'

const PollState = (props) => {
    const [poll, setpoll] = useState([])

    const BASE_URL = 'http://localhost:3001';

    const createpoll = async (title, image, expirydate, category, state, options) => {
        let url = `${BASE_URL}/api/polls/addpolls`
        try {
            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': `false`,
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, image, expirydate, category, state, options })
            })
            const data = await res.json();
            setpoll(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <PollContext.Provider value={{ poll, createpoll }} >
            {props.children}
        </PollContext.Provider>
    )
}

export default PollState