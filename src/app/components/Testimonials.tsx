"use client";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className=" flex justify-center px-4 py-20 bg-primary ">
      <div className="md:w-[80vw] ">
        <div className=" pb-12 text-center">
          <h3 className="mb-4 text-white">Customer Reviews</h3>
        </div>

        <div className="flex flex-col items-center ">
          <Carousel
            className="max-w-[70vw]  sm:max-w-[80vw] lg:max-w-[96vw]"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {[
                {
                  name: "Linda M.",
                  occupation: "Health Enthusiast",
                  content:
                    "I love the freshness and quality of the organic produce from this site. My go-to for nutrient-packed goodness every week!",
                  img: "https://img.freepik.com/free-photo/i-like-that-good-job-happy-young-dark-skinned-female-wearing-casual-long-sleeved-t-shirt-making-thumbs-up-sign-smiling-cheerfully-showing-her-support-respect-someone-body-language_273609-1258.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699488000&semt=ais",
                },
                {
                  name: "Alex P.",
                  occupation: "Culinary Artist",
                  content:
                    "Exceptional organic ingredients elevate my dishes. The variety and taste of fruits, vegetables, and meats are unparalleled. A chef's dream!",
                  img: "https://cdn.pixabay.com/photo/2020/09/04/21/36/man-5545030_1280.jpg",
                },
                {
                  name: "Emily T.",
                  occupation: "Busy Mom",
                  content:
                    "Organic produce delivered to my door? A game-changer! The convenience, freshness, and nutritional value make meal planning for my family stress-free.",
                  img: "https://img.freepik.com/free-photo/amazing-cheerful-business-woman-standing-with-arms-crossed_171337-8487.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705276800&semt=ais",
                },
                {
                  name: "Carlos G.",
                  occupation: "Fitness Fanatic",
                  content:
                    "Fueling my workouts with the best! The organic meat and juices are essential for my fitness journey. The quality and taste are unbeatable.",
                  img: "https://img.freepik.com/free-photo/black-businessman-happy-expression_1194-2539.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696636800&semt=ais",
                },
                {
                  name: "Sophie L. ",
                  occupation: "Nature Lover",
                  content:
                    "Thrilled with the commitment to sustainability and organic farming practices. Delicious, guilt-free options that align with my values. A trusted source!",
                  img: "https://img.freepik.com/premium-photo/happy-woman-arms-crossed-portrait-studio-white-background-backdrop-young-female-model-smile-natural-curly-afro-hair-with-positive-personality-gen-z-girl-south-africa_590464-165129.jpg",
                },
              ].map(({ name, occupation, content, img }, index) => (
                <CarouselItem
                  key={index}
                  className="  md:basis-1/2 lg:basis-1/3 text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex flex-col items-center px-4">
                    <div className="mb-4  ">
                      <Image
                        src={img}
                        className="object-cover rounded-full  h-[150px] w-[150px]"
                        alt="Organic"
                        height={150}
                        width={150}
                      />
                    </div>

                    <div className="text-secondary ">
                      <p className="mb-4">{content}</p>
                      <h5 className="text-secondary-foreground font-semibold mb-3 ">
                        {name}
                      </h5>
                      <p className="mb-4  ">-{occupation}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
