import React, { useState, useEffect } from "react";

const TourCard = ({ tour, onRemove }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 transform transition-all duration-300 ease-in-out hover:scale-105">
      <p className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
        ${tour.price}
      </p>
      <img
        src={tour.image}
        alt={tour.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{tour.name}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
        <button
          className="text-green-600 ml-2"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </p>
      <button
        className="absolute bottom-0 left-0 w-full bg-white text-green-300 py-2 text-center rounded-b hover:bg-green-700 transition duration-200"
        onClick={() => onRemove(tour.id)}
      >
        Not Interested
      </button>
    </div>
  );
};

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://www.course-api.com/react-tours-project");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleRemoveTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  const handleRefresh = () => {
    setLoading(true);
    fetch("https://www.course-api.com/react-tours-project")
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch((error) => console.error("Error refreshing tours:", error))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div className="text-center py-10 text-lg font-bold text-green-600">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-green-600 mb-4">Our Tours</h1>
        <hr className="border-green-600 mb-8 w-1/3 mx-auto" />
      </div>

      {tours.length === 0 ? (
        <div className="text-center">
          <p className="text-lg font-bold text-green-500 mb-4">No tours left</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onRemove={handleRemoveTour} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursList;
