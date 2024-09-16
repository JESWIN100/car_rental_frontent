import React, { useEffect, useState } from 'react';
import { fetchReview } from '../../services/carsApi';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchReview(id);
        setReviews(response);
        console.log("revi=======>",response);
        
      } catch (error) {
        setError("Unable to fetch reviews. Please try again later.");
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 text-sm">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500 text-sm">{error}</p>;

  const reviewsToDisplay = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col pt-16">
      <h2 className="text-2xl font-bold mb-6 text-center ">
        Customer Reviews <span className=" px-3 py-1 rounded-full text-sm 0">{reviews.length}</span>
      </h2>
      {reviewsToDisplay.map((review) => {
        const date = new Date(review.createdAt);
        const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

        return (
          <div key={review._id} className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <img
                src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
                alt={review.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
              />
              <div>
              {review.user ? review.user.name : 'User not found'}
                <div className="text-gray-500 text-xs">{formattedDate}</div>
                
              </div>
            </div>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((ratingValue) => (
                <FaStar
                  key={ratingValue}
                  className={`text-xl ${ratingValue <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-700">{review.reviewText}</p>
          </div>
        );
      })}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center mx-auto text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors py-2 px-4"
        >
          {showAll ? 'Show Less' : 'Show More'}
          <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showAll ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>
    </div>
  );
}
