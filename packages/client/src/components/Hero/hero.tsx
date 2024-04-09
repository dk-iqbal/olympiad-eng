'use client'
// Carousel.js
import { useEffect } from 'react';
import CarouselItem from './CarouselItem';
import './style.css';

const Carousel = () => {
    const carouselItems = [
        {
            imgSrc: '/images/hero/img1.jpg',
            author: 'LUNDEV',
            title: 'OLYMPIAD',
            topic: 'ENGLISH',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            imgSrc: '/images/hero/img2.jpg',
            author: 'LUNDEV',
            title: 'OLYMPIAD',
            topic: 'ENGLISH',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            imgSrc: '/images/hero/img3.jpg',
            author: 'LUNDEV',
            title: 'OLYMPIAD',
            topic: 'ENGLISH',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            imgSrc: '/images/hero/img4.jpg',
            author: 'LUNDEV',
            title: 'OLYMPIAD',
            topic: 'ENGLISH',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        // Add more items here as needed
    ];

    const thumbnailItems = [
        {
            imgSrc: '/images/hero/img1.jpg',
            title: 'Animal',
            description: '',
        },
        {
            imgSrc: '/images/hero/img2.jpg',
            title: 'Animal',
            description: '',
        },
        {
            imgSrc: '/images/hero/img3.jpg',
            title: 'Animal',
            description: '',
        },
        {
            imgSrc: '/images/hero/img4.jpg',
            title: 'Animal',
            description: '',
        },
    ];

    // useEffect(() => {
    //     let nextDom, prevDom, carouselDom, SliderDom, thumbnailBorderDom, thumbnailItemsDom, timeDom;
    //     let timeRunning, timeAutoNext, SliderItemsDom, runNextAuto;
    //     const script = document.createElement('script');
    //     script.innerHTML = `
    //       nextDom = document.getElementById('next');
    //       prevDom = document.getElementById('prev');
    //       carouselDom = document.querySelector('.carousel');
    //       SliderDom = carouselDom.querySelector('.carousel .list');
    //       thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    //       thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    //       timeDom = document.querySelector('.carousel .time');
      
    //       thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    //       timeRunning = 1000;
    //       timeAutoNext = 5000;
      
    //       nextDom.onclick = function(){
    //         showSlider('next');    
    //       }
      
    //       prevDom.onclick = function(){
    //         showSlider('prev');    
    //       }
          
    //       runNextAuto = setTimeout(() => {
    //         nextDom.click();
    //       }, timeAutoNext)
    //       function showSlider(type){
    //         SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    //        let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
      
    //         if(type === 'next'){
    //           SliderDom.appendChild(SliderItemsDom[0]);
    //           thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    //           carouselDom.classList.add('next');
    //         }else{
    //           SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    //           thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    //           carouselDom.classList.add('prev');
    //         }
    //         let runTimeOut;
    //         clearTimeout(runTimeOut);
    //         runTimeOut = setTimeout(() => {
    //           carouselDom.classList.remove('next');
    //           carouselDom.classList.remove('prev');
    //         }, timeRunning);
      
    //         clearTimeout(runNextAuto);
    //         runNextAuto = setTimeout(() => {
    //           nextDom.click();
    //         }, timeAutoNext)
    //       }
    //     `;
    //     document.body.appendChild(script);
      
    //     return () => {
    //       document.body.removeChild(script);
    //     };
    //   }, []);

    useEffect(() => {
      let nextDom, prevDom, carouselDom, SliderDom, thumbnailBorderDom, timeDom;
      let timeRunning, timeAutoNext, SliderItemsDom, runNextAuto;
      const script = document.createElement('script');
      script.innerHTML = `
        nextDom = document.getElementById('next');
        prevDom = document.getElementById('prev');
        carouselDom = document.querySelector('.carousel');
        SliderDom = carouselDom.querySelector('.carousel .list');
        thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        timeDom = document.querySelector('.carousel .time');
    
        timeRunning = 1000;
        timeAutoNext = 5000;
    
        nextDom.onclick = function(){
          showSlider('next');    
        }
    
        prevDom.onclick = function(){
          showSlider('prev');    
        }
        
        runNextAuto = setTimeout(() => {
          nextDom.click();
        }, timeAutoNext)
        function showSlider(type){
          SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
          let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    
          if (SliderItemsDom.length === 0 || thumbnailItemsDom.length === 0) return; // Add a check here to ensure the elements exist
    
          if(type === 'next'){
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0].cloneNode(true)); // Append a cloneNode
            carouselDom.classList.add('next');
          }else{
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1].cloneNode(true)); // Append a cloneNode
            carouselDom.classList.add('prev');
          }
          let runTimeOut;
          clearTimeout(runTimeOut);
          runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
          }, timeRunning);
    
          clearTimeout(runNextAuto);
          runNextAuto = setTimeout(() => {
            nextDom.click();
          }, timeAutoNext)
        }
      `;
      document.body.appendChild(script);
    
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    return (
        <div className="carousel">
            <div className="list">
                {carouselItems.map((item, index) => (
                    <CarouselItem
                        key={index}
                        imgSrc={item.imgSrc}
                        author={item.author}
                        title={item.title}
                        topic={item.topic}
                        description={item.description}
                    />
                ))}
            </div>
            <div className="thumbnail">
                {thumbnailItems.map((item, index) => (
                    <div className="item" key={index}>
                        <img src={item.imgSrc} alt="Thumbnail" />
                        <div className="content">
                            <div className="title">{item.title}</div>
                            <div className="description">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
               {/* Thumbnails */}
   
        {/* End of Thumbnails */}
            <div className="arrows">
                <button id="prev">{'<'}</button>
                <button id="next">{'>'}</button>
            </div>
            <div className="time"></div>
              {/* Arrows */}
        {/* End of Arrows */}
      </div>
    );
};

export default Carousel;
