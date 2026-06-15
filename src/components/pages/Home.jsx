import HeroSection from "../../components/HeroSection";
import ProductSession from "../../components/sections/ProductSession";
import VideoSection from "../../components/sections/VideoSection";
import BestSellersSection from "../../components/sections/BestSeller";
import CollectionsSection from "../../components/sections/CollectionSection";
import ReviewsSection from "../../components/sections/ReviewSection";
import StylesWearSection from "../../components/sections/StyleWearsSection";
import BlogSection from "../../components/sections/BlogSection";
import CommunitySection from "../../components/sections/CommunitySection";
import Page from "../../components/sections/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProductSession />
      <VideoSection />
      <BestSellersSection />
      <CollectionsSection />
      <ReviewsSection />
      <StylesWearSection />
      <BlogSection />
      <CommunitySection />
      <Page />
    </>
  );
};

export default Home;