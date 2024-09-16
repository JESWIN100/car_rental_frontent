import React, { useEffect, useState } from 'react';
import { fetchAdminReviews } from '../../services/adminReview'; 
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export default function AdminReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdminReviews();
        setReviews(response);
        console.log('reviews========>', response);
      } catch (error) {
        setError('Error fetching reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = (reviewId, newRating) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === reviewId ? { ...review, rating: newRating } : review
      )
    );
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axiosInstance.delete(`/admin/deleteReview/${reviewId}`, {
        withCredentials: true, // Explicitly set for this request
      });
      setMessage(response.data.message);
      setError('');
      toast.success("Review Deleted Successfully");
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
      console.log(response);
    } catch (err) {
      setError('Failed to delete the review.');
      setMessage('');
      console.log(err);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div>
      <section className="reviews">
        <div className="section-title flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">All Reviews</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Car Image</th>
                <th>Brand</th>
                <th>Review Id</th>
                <th>Model</th>
                <th>Review</th>
                <th>User Name</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <img
                      src={review.car?.image || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
                      alt={review.car?.brand || 'Car image'}
                      className="w-14 h-14 object-cover rounded-full"
                    />
                  </td>
                  <td>{review.car?.brand || 'Anonymous Car'}</td>
                  <td>{review._id}</td>
                  <td>{review.car?.model || 'Unknown Model'}</td>
                  <td>{review.reviewText}</td>
                  <td>{review.user?.name || 'Anonymous'}</td>
                  <td>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${review._id}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={review.rating === star}
                          onChange={() => handleRatingChange(review._id, star)}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
