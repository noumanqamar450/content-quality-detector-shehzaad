import React from 'react';
import { RatingStar } from "rating-star";
import { Spinner } from 'react-bootstrap';
// import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_reviewLoader: true,
            reviews: [],
            verifiedReviews: []
        };
    }

    async componentDidMount(){
        
        // Reviews
        await fetch("https://textx.org/wp-json/mo/v1/reviews")
        .then((response) => response.json())
        .then(reviews => {
            reviews = reviews.filter(r => r.rating >= 3)
            reviews = reviews.filter(r => r.is_approved === "1")
            reviews = reviews.reverse();
            let verifiedReviews = reviews.filter(r => r.is_verified === "1")
            let unVerifiedReviews = reviews.filter(r => r.is_verified === "0")
            this.setState({ reviews: unVerifiedReviews });
            this.setState({ verifiedReviews: verifiedReviews })
            this.setState({ is_reviewLoader: false });
        });

    }

    render() {
    let reviews = this.state.reviews;
    let verifiedReviews = this.state.verifiedReviews;
    
        return (
            <>
                <div className="row mt-5 mb-5">
                    <div className="col-lg-2 col-md-12"></div>
                    <div className="col-lg-8 col-md-12">
                        <h3 className='text-center mb-5'>Reviews</h3>
                        <div className="row justify-content-center">
                            <Spinner animation="border" variant="primary" style={this.state.is_reviewLoader ? {} : { display: "none" }} />
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                centeredSlides={true}
                                breakpoints={{
                                    // when window width is >= 640px
                                    640: {
                                        width: 640,
                                        slidesPerView:2,
                                    },
                                    // when window width is >= 768px
                                    768: {
                                        width: 768,
                                        slidesPerView: 2,
                                    },
                                }}
                            >
                                {
                                    verifiedReviews.length > 0 && verifiedReviews.map((r, i) => {
                                        return (i < 4) ? (
                                            <SwiperSlide key={r.review_id}>
                                                <div className="r-card reviews">
                                                    {r.is_verified === "1" ? (<div className="badge float-end" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#000", fontSize: "15px" }}><img src="/ai-content-detector/verified.png" alt="verified" style={{ width: "20px" }} /> Verified</div>) : ""}
                                                    <img className='avatar' src={r.avatar ? r.avatar : "/ai-content-detector/im.png"} alt={r.name ? r.name : "No Name"} />
                                                    <h4>{r.name ? r.name : "No Name"} <RatingStar maxScore={5} rating={r.rating ? Number(r.rating) : 5} id={r.review_id} /></h4>
                                                </div>
                                            </SwiperSlide>
                                        ) : ""
                                    })
                                }
                                {
                                    reviews.length > 0 && reviews.map((r, i) => {
                                        return (i < 4) ? (
                                            <SwiperSlide key={r.review_id}>
                                                <div className="r-card">
                                                    {r.is_verified === "1" ? (<div className="badge float-end" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#000", fontSize: "15px" }}><img src="/verified.png" alt="verified" style={{ width: "20px" }} /> Verified</div>) : ""}
                                                    <img className='avatar' src={r.avatar ? r.avatar : "/ai-content-detector/im.png"} alt={r.name ? r.name : "No Name"} />
                                                    <h4>{r.name ? r.name : "No Name"} <RatingStar maxScore={5} rating={r.rating ? Number(r.rating) : 5} id={r.review_id} /></h4>
                                                </div>
                                            </SwiperSlide>
                                        ) : ""
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12"></div>
                    {
                        this.state.is_reviewLoader ? "" : (
                            <a href="/reviews" className='btn btn-primary mt-4' style={{ background: '#6300E2', maxWidth: "300px", margin: "0 auto" }}>Tell Us What you think About Us!</a>
                        )
                    }
                </div>
            </>
        )
    }
}

export default Reviews;