import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Loading } from "../Card/Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `https://my-home-xlox.onrender.com/properties`
        );
        console.log(res);
        setProperty(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, []);

  const filteredProperty = property?.filter((i) => i._id === id);
  const formattingPrice = (price) => new Intl.NumberFormat().format(price);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center gap-8">
        <Loading />
      </div>
    );
  }

  console.log(formattingPrice(2.0));

  if (filteredProperty) {
    return filteredProperty.map((_prop) => (
      <div className="container mx-auto px-4 text-black pb-11">
        <div className="flex items-center justify-between w-[54%]">
          <h1 className="text-2xl font-semibold  my-4">
            {_prop.property_type}
          </h1>
          <p className="text-[26px] mt-2">₦ {formattingPrice(_prop.price)}</p>
        </div>
        <div className=" flex gap-[150px] mt-2">
          <div className=" w-[700px] ">
            <Carousel>
              {_prop.images.map((image, index) => (
                <div key={index} className="">
                  <img src={image} alt={`Property ${index + 1}`} className="" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="md:col-span-1 border-[1px] p-8 h-[40%] mt-16">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div className="flex mt-4 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <p className="text-black">{_prop.address}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              {/* <p className="text-black">+{_prop.user.phoneNo}</p> */}
            </div>
            <div className="flex justify-between w-[60%]">
              <div className="mt-4 flex gap-1">
                <img src="/Images/🦆 icon _bed_.svg" className="w-6 h-6" />
                <p className="text-black">{_prop.bedrooms}</p>
              </div>
              <div className="mt-4 flex gap-1">
                <img src="/Images/🦆 icon _bathroom_.svg" className="w-6 h-6" />
                <p className="text-black">{_prop.bathrooms}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return <div>Property not found.</div>;
};

export default PropertyDetails;