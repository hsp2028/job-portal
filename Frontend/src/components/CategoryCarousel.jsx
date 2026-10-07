import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel.jsx";
import { Button } from "./ui/button.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice.js";

const category = [
  "Foront Developer",
  "Backend Developer",
  "Graphic Designer",
  "Fullstack Developer",
];

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) =>{
      dispatch(setSearchedQuery(query));
      navigate("/browse");  
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl my-20 mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={cat} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={(e) => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full cursor-pointer"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
