// CarouselItem.js
const CarouselItem = ({ imgSrc, author, title, topic, description }) => {
    return (
      <div className={`item`}>
        <img src={imgSrc} alt="Carousel item" />
        <div className="content">
          <div className="author">{''}</div>
          <div className="title">{title}</div>
          <div className="topic">{topic}</div>
          <div className="des">{description}</div>
        </div>
      </div>
    );
  };
  
  export default CarouselItem;
  