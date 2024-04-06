import React, { useState, useContext } from 'react';
import pollContext from '../Context/pollContext';

const PollForm = () => {
    const context = useContext(pollContext);
    const { createpoll } = context;

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [expirydate, setexpirydate] = useState('')
    const [options, setOptions] = useState(['', '']);

    const handleOptionChange = (index, e) => {
        const newoptions = [...options];
        newoptions[index] = e.target.value;
        setOptions(newoptions)
    }

    const handleRemoveOption = (start) => {
        const newOptions = [...options];
        newOptions.splice(start, 1);
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            createpoll(title, image, expirydate, category, state, options);
            alert("Your Poll has been Created")
            setTitle('');
            setImage('');
            setexpirydate('');
            setCategory('');
            setState('');
            setOptions(['', ''])
        }
        catch (error) {
            console.log(error);
            alert('Failed to create a Poll')
        }
    }
    return (
        <form className="max-w-md mt-[5%] mx-auto p-6 bg-slate-100 shadow-md rounded-md">
            <h2 className='text-center font-bold text-xl capitalize'>Create a Poll</h2>
            <label className="block mb-2">
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full mt-1 border-2 py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                Image URL:
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="block w-full mt-1 border-2 py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                Expiry Date:
                <input
                    type="datetime-local"
                    value={expirydate}
                    onChange={(e) => setexpirydate(e.target.value)}
                    className="block w-full mt-1 border-2 py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full mt-1 border-2 py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                State:
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full mt-1 border-2  py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                Options:
                {options.map((option, index) => (
                    <div className='flex mb-2' key={index}>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e)}
                            className="block w-full mt-1 border-2  py-2 outline-none border-gray-400 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            className="ml-2 rounded-lg px-3 py-2 bg-red-500 text-white"
                        >
                            Remove
                        </button>
                    </div>

                ))}
            </label>
            <button type="button" onClick={() => setOptions([...options, ''])} className="block w-full py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Add Option
            </button>
            <button onClick={handleSubmit} type="submit" className="block w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Create Poll
            </button>
        </form>
    );
};

export default PollForm;
