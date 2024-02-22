import Navbar from "../components/navbar";
import bg from "../assets/background.svg";
import { AiOutlineSearch } from "react-icons/ai";
import CardComponent from "../components/card";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png"
import card3 from "../assets/card3.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="max-w-[1240px] text-black">
      <Navbar />
      <div
        className=" mx-auto rounded-xl bg-center bg-blend-normal w-[75%]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col justify-center h-full w-[100%] px-4 pt-64 pb-5">
          <h1 className="text-5xl font-bold text-white m-2 ">
            Shorten, brand and share links with our audience
          </h1>
          <div className="p-2 rounded-md flex flex-row items-center justify-between bg-white w-[40%]">
            <p className="flex flex-row items-center justify-between text-gray-400">
              {" "}
              <AiOutlineSearch size={20} className="mx-4" /> Paste link to
              shorten it
            </p>
            <button className="bg-[#12A3ED] px-4 py-2 rounded-xl font-semibold text-white">
              <Link to="/register">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <div className=" mx-auto rounded-xl bg-center bg-blend-normal w-[75%] pt-10">
        <div className="text-3xl font-bold text-black m-2 w-[60%]">
          Linkify offers more than just link shortening
        </div>
        <div className="flex flex-row justify-around items-center p-4">
          <CardComponent
            header="Brand Links"
            text="Increase brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content."
            card1={card1}
          />
          <CardComponent
            header="Detailed Records"
            text="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
            picture={card2}
          />
          <CardComponent
            header="Fully Customizable"
            text="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
            picture={card3}
          />
        </div>
      </div>
      <div className="mx-auto rounded-xl bg-center bg-blend-normal w-[75%] pt-10">
        <div className="flex flex-col justify-around items-center p-4">
          <div className="flex flex-col text-3xl font-bold text-black m-2 w-[100%] items-center">
            <h1 className="text-center">Ready to join us?</h1>
            <p className="font-[400] text-[15px] text-center">
              Start shortening links for free with Linkify. Sign up now to get
              access to advanced link management and branding features, or keep
              reading to learn more.
            </p>
            <button className="bg-[#12A3ED] px-4 py-1 rounded-xl font-semibold text-white text-[14px] mx-auto">
              <Link to="/register">Get Started for free</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
