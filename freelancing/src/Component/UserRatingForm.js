import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS
import '../styles/employeeratingform.css'; 

const UserRatingForm = () => {
    const navigate =useNavigate();
    const { userId } = useParams(); 
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [reviewerId, setReviewerId] = useState(null); // Initially set to null or undefined

    // Get userId from localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setReviewerId(Number(storedUserId)); // Set reviewerId with userId from localStorage
        } else {
            console.error('User ID not found in localStorage');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reviewerId === null) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User ID is not available. Please log in again.',
                confirmButtonColor: '#3085d6'
            });
            return navigate("/") ;
        }

        try {
            await axios.post('http://localhost:8000/FreelancerMarketplace/RatingsUser/ratings', {
                rating,
                comment,
                userId,
                reviewerId
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Rating submitted successfully!',
                confirmButtonColor: '#3085d6'
            });
            navigate("/dashboard/employee");
            setRating(1); 
            setComment('');
        } catch (error) {
            console.error('Error submitting rating', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to submit rating',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    return (
        <div className="rating-form-container">
            <h2>Rate Freelancer</h2>
            <form onSubmit={handleSubmit} className="rating-form">
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${rating >= star ? 'filled' : ''}`}
                            onClick={() => handleStarClick(star)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <br />
                <label>
                    Comment:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </label>
                <br />
                <button type="submit" className="submit-btn">Submit Rating</button>
            </form>
        </div>
    );
};

export default UserRatingForm;
