import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import './style.css';

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <>
      <section id="about" className="pt-16 md:pt-20 lg:pt-28">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <SectionTitle
                  title="Rules of the Competition"
                  paragraph="Students of className 9 to 10 (as well as “O” level) and className 11 to 12 (as well as “A” level) can participate in the competition. Participants will have to pay ৳ 100 for completing registration. Selection round will be on online platform."
                  mb="44px"
                />

                <div
                  className="mb-12 max-w-[570px] lg:mb-0"
                  data-wow-delay=".15s"
                >
                  <div className="mx-[-12px] flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="60 Minutes" />
                      <List text="Performance Analysis" />
                      {/* <List text="Use for lifetime" /> */}
                    </div>

                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="Statistics" />
                      <List text="Questions Per Paper" />
                      {/* <List text="Developer friendly" /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                  <Image
                    src="/images/own/english.svg"
                    alt="about-image"
                    fill
                    className="mx-auto max-w-full drop-shadow-three lg:mr-0"
                  />
                  {/* <Image
                    src="/images/about/about-image-dark.svg"
                    alt="about-image"
                    fill
                    className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h1
        className="p-3 mb-8 text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Win Exciting Prizes
      </h1>

      <div className="container cards items-center justify-center gap-10 flex flex-col md:flex-row" style={{}}>
        <div className="card_box card relative group hover:scale-125" style={{ width: '230px', height: '250px', borderRadius: '20px', background: 'linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%)', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.55)', cursor: 'pointer', transition: 'all .3s' }}>
          <span style={{ position: 'absolute', overflow: 'hidden', width: '150px', height: '150px', top: '-10px', left: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ content: 'Premium', position: 'absolute', width: '150%', height: '40px', backgroundImage: 'linear-gradient(45deg, #ff6547 0%, #ffb144  51%, #ff7053  100%)', transform: 'rotate(-45deg) translateY(-20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 5px 10px rgba(0,0,0,0.23)' }}>First Round</span>
            <span style={{ content: '', position: 'absolute', width: '10px', bottom: '0', left: '0', height: '10px', zIndex: '-1', boxShadow: '140px -140px #cc3f47', backgroundImage: 'linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%)' }}></span>
          </span>
          <div className="justify-center items-center text-center mt-40">
            <p className="text-white font-bold">First Prize</p>
            <p className="text-white font-bold">3000/-</p>
          </div>
        </div>

        <div className="card_box card relative group hover:scale-125" style={{ width: '230px', height: '250px', borderRadius: '20px', background: 'linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%)', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.55)', cursor: 'pointer', transition: 'all .3s' }}>
          <span style={{ position: 'absolute', overflow: 'hidden', width: '150px', height: '150px', top: '-10px', left: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ content: 'Premium', position: 'absolute', width: '150%', height: '40px', backgroundImage: 'linear-gradient(45deg, #ff6547 0%, #ffb144  51%, #ff7053  100%)', transform: 'rotate(-45deg) translateY(-20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 5px 10px rgba(0,0,0,0.23)' }}>Secoud Round</span>
            <span style={{ content: '', position: 'absolute', width: '10px', bottom: '0', left: '0', height: '10px', zIndex: '-1', boxShadow: '140px -140px #cc3f47', backgroundImage: 'linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%)' }}></span>
          </span>
          <div className="justify-center items-center text-center mt-40">
            <p className="text-white font-bold">Second Prize</p>
            <p className="text-white font-bold">2000/-</p>
          </div>
        </div>
        <div className="card_box card relative group hover:scale-125" style={{ width: '230px', height: '250px', borderRadius: '20px', background: 'linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%)', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.55)', cursor: 'pointer', transition: 'all .3s' }}>
          <span style={{ position: 'absolute', overflow: 'hidden', width: '150px', height: '150px', top: '-10px', left: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ content: 'Premium', position: 'absolute', width: '150%', height: '40px', backgroundImage: 'linear-gradient(45deg, #ff6547 0%, #ffb144  51%, #ff7053  100%)', transform: 'rotate(-45deg) translateY(-20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 5px 10px rgba(0,0,0,0.23)' }}>Third Round</span>
            <span style={{ content: '', position: 'absolute', width: '10px', bottom: '0', left: '0', height: '10px', zIndex: '-1', boxShadow: '140px -140px #cc3f47', backgroundImage: 'linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%)' }}></span>
          </span>
          <div className="justify-center items-center text-center mt-40">
            <p className="text-white font-bold">Third Prize</p>
            <p className="text-white font-bold">1000/-</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSectionOne;
