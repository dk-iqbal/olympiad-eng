import Image from "next/image";
import './style.css';

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            {/* <div
              className="relative tanvir-card mx-auto mb-12 aspect-[25/24] max-w-[350px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/own/tanvir.jpg"
                alt="about image"
                fill
                className="drop-shadow-three dark:drop-shadow-none"
              />
            </div> */}
            <div className="tanvir-card m-auto">
              {/* <Image
                src="/images/own/tanvir.jpg"
                alt="about image"
                width={300}
                className="z-3"
                height={300}
                // fill
                // className="drop-shadow-three dark:drop-shadow-none"
              /> */}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Md. Tanvirul Haque
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Md. Tanvirul Haque, a famous author, and successful entrepreneur was born in 1983 in Kazipur Upazilla under the district of Sirajgong. He spent his earlier days at Sherpur Thana of Bogura. He is the third son of Mr. Fazlul Haque, a leading Islamic preacher, and Rokeya Katun, an ideal housewife.  From his childhood, the author has been showing a flash of his outstanding genius in various fields of education. He gained his first scholarship for his academic brilliance when he was a studen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
