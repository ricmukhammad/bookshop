import Slider from "react-slick";
import header1 from "/src/assets/Header-1.png"
import header2 from "/src/assets/Header-2.jpeg"
import header3 from "/src/assets/Header-3.jpeg"

const HeroImageSlider = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
    };

    const slides = [
        {
            id: 1,
            image: header2,
            title: "Discover New Books",
            subtitle: "Timeless classics, modern bestsellers, and hidden gems.",
        },
        {
            id: 2,
            image: header1,
            title: "Read Anywhere",
            subtitle: "Your digital library follows you everywhere.",
        },
        {
            id: 3,
            image: header3,
            title: "Join Our Community",
            subtitle: "Share reviews and connect with fellow readers.",
        },
    ];

    return (
        <div className="w-full">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow">
                                {slide.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroImageSlider;