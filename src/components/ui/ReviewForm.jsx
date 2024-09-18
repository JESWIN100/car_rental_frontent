import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import { FaStar } from 'react-icons/fa'; // Font Awesome Icons

// Ensure that you bind modal to your appElement (for accessibility)
Modal.setAppElement('#root'); 

const ReviewForm = ({ carId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Start with modal closed
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [rating, setRating] = useState(null); // Star rating value
  const [hover, setHover] = useState(null); // Star hover state

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/review/cars/reviews', {
        carId,
        userId,
        ...data,
        rating, // Add star rating to the submitted data
      }, {
        withCredentials: true, // Make sure cookies are sent with the request
      });

      toast.success("Thank you for your valuable review! Have a nice day!");

      reset(); // Reset form fields on success
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred while submitting your review.");
      console.error("Review submission error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => setIsModalOpen(true)} // Open modal on button click
        className="btn btn-primary w-full mb-4 transition-all duration-200 ease-in-out hover:bg-blue-700"
      >
        Write a Review
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside or pressing escape
        contentLabel="Review Form"
        className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
          <button
            onClick={() => setIsModalOpen(false)} // Close modal on button click
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Review</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Star Rating Component */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <label key={starValue}>
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        {...register('rating', { required: "Rating is required" })}
                        className="hidden" // Hide the radio input
                        onClick={() => setRating(starValue)}
                      />
                      <FaStar
                        className="cursor-pointer transition-colors duration-200"
                        color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} // Highlight stars based on hover or selected rating
                        size={30}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>}
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea
                id="reviewText"
                rows="4"
                {...register('reviewText', { required: "Review text is required" })}
                className={`w-full px-4 py-2 border ${errors.reviewText ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500`}
              />
              {errors.reviewText && <p className="text-red-600 text-sm mt-1">{errors.reviewText.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full py-2 rounded-md text-white font-semibold ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-200`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <span className="loader mr-2"></span> Submitting...
                </div>
              ) : 'Submit Review'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewForm;
