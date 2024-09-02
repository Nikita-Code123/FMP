import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/employeeratinglist.css'; // Import the CSS file

const UserRatingsList = ({ userId }) => {
    const [ratings, setRatings] = useState([]);


    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/FreelancerMarketplace/RatingsUser/ratings/user/${userId}`);
                setRatings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching ratings', error);
            }
        };

        fetchRatings();
    }, [userId]);

    // Function to render stars based on rating value
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="star filled">&#9733;</span>); // Filled star
            } else {
                stars.push(<span key={i} className="star">&#9734;</span>); // Empty star
            }
        }
        return stars;
    };

    return (
        <div className="ratings-container">
            <h2>Your Ratings</h2>
            <div className="ratings-list">
                {ratings.length === 0 ? (
                    <p>No ratings available.</p>
                ) : (
                    ratings.map((rating) => (
                        <div key={rating.id} className="rating-card">
                            <div className="rating-stars">
                                {renderStars(rating.rating)}
                            </div>
                            <p className="rating-comment"><strong>Comment:</strong> {rating.comment}</p>
                            <p className="rating-reviewer"><strong>Reviewed by:</strong> {rating.employee.username} (User ID: {rating.reviewerId})</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserRatingsList;
