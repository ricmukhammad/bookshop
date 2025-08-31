import HeroImageSlider from "../components/HeroImageSlider.jsx";
import BookGrid from "../components/BookGrid.jsx";

const LandingPage = () => {
    return (
        <div>
            <div className="bg-white text-white py-20">
                <div className="container mx-auto">
                    <HeroImageSlider/>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-6 py-12">
                <h3 className="text-2xl font-semibold text-brand-text mb-6">Featured Books</h3>
                <BookGrid/>
            </main>
        </div>
    )
}

export default LandingPage;