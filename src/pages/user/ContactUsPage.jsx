import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const[user,setUser]=useState()
  const { register, handleSubmit,reset, formState: { errors }, setFocus } = useForm();


const navigate=useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
          const response = await axiosInstance.get('user/profile', {
              withCredentials: true, // Include cookies with the request
          });
          setUser(response?.data?.data);
          console.log("fetchUser", response.data.data);
      } catch (error) {
          console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      }
  };
  
  fetchUser()
  }, []);
  







  const onSubmit = async (data) => {
    try {
      const contactData = { ...data, userId: user?._id };
      const response = await axiosInstance.post('/contact/create', contactData, {
        withCredentials: true,
      });
      console.log('Thank You For Your ContactUs', response);
      toast.success('Your message has been sent successfully!');
      reset()
      setTimeout(() => {
       navigate('/user/home')
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/vintage-pink-telephone-composition_23-2148913955.jpg")' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Section */}
        <div className="contact-info">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Morent</h3>
          <p className="text-gray-700 mb-6">
            Your reliable car rental service. We provide luxury, sedan, hatchback, and SUV cars for rent at affordable prices.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <i className="fas fa-map-marker-alt text-teal-600 mr-2"></i>
              <p>Manathavady, Wayanad, 673121, Kerala, India</p>
            </div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-phone text-teal-600 mr-2"></i>
              <p>8903382318</p>
            </div>
          </div>
          <div className="social-media mt-6">
            <p className="text-gray-700">Connect with us:</p>
            <div className="flex space-x-2 mt-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form bg-teal-600 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-white">Contact us</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-2 border-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full p-2 border-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Phone"
              {...register('phone', { required: 'Phone number is required' })}
              className={`w-full p-2 border-2 rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Message"
              {...register('message', { required: 'Message is required' })}
              className={`w-full p-2 border-2 rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              rows="4"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 bg-white text-teal-600 rounded hover:bg-gray-200">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
