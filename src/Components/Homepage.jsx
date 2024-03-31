import React, { useState, useEffect } from 'react'

const Homepage = () => {
    const [allpolls, setallpolls] = useState([])

    const BASE_URL = 'http://localhost:3001';
    useEffect(() => {

        const fetchdata = async () => {
            try {
                let res = await fetch(`${BASE_URL}/api/polls/fetchall`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json();
                setallpolls(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                    {allpolls.map((item, index) => {
                        return <div key={index} class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={item.image} />
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{item.title}</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">{item.category}</h2>
                                <p class="mt-1">$12.00</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}

export default Homepage