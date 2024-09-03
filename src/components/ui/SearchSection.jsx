import React from 'react';

const SearchSection = () => {
    return (
        <section className="flex justify-center items-center p-5  rounded-lg shadow-lg ">
            <div className="flex flex-row md:flex-row justify-center items-center">
                <div className="flex flex-row md:mx-5" >
                    <label htmlFor="pickup" className="text-gray-700 mb-1">Pick-Up</label>
                    <input
                        type="text"
                        id="pickup"
                        placeholder="Locations"
                        className="p-2 rounded-md border border-gray-300 mt-1"
                    />
                    <input
                        type="date"
                        className="p-2 rounded-md border border-gray-300 mt-2"
                    />
                    <input
                        type="time"
                        className="p-2 rounded-md border border-gray-300 mt-2"
                    />
                </div>
                </div>
                <button className="bg-blue-500 text-white p-3 rounded-md mx-5 my-5 md:my-0">
                    ⇄
                </button>
                <div >
                <div className="flex flex-row md:flex-row justify-center items-center">
                <div className="flex flex-row md:mx-5">
                    <label htmlFor="dropoff" className="text-gray-700 mb-1">Drop-Off</label>
                    <input
                        type="text"
                        id="dropoff"
                        placeholder="Locations"
                        className="p-2 rounded-md border border-gray-300 mt-1"
                    />
                    <input
                        type="date"
                        className="p-2 rounded-md border border-gray-300 mt-2"
                    />
                    <input
                        type="time"
                        className="p-2 rounded-md border border-gray-300 mt-2"
                    />
                </div>
                </div>
                </div>
        </section>
    );
};

export default SearchSection;
