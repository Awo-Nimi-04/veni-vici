const Flashcard = ({
  question,
  options,
  type,
  category,
  answer,
  difficulty,
  flipped,
  show,
  isClicked,
  image,
}) => {
  return (
    <div
      className={`flashcard ${difficulty} ${flipped ? "is-flipped" : ""}`}
      onClick={isClicked}
    >
      <div className="content">
        {!show && (
          <div className="front">
            <div>
              {category !== "" && (
                <h3 className="category">Category : {category}</h3>
              )}
              <img src={image} alt="" />
            </div>
            <h2>{question}</h2>
            <div className="">
              {options.map((option, index) => (
                <button key={index}>{decodeURIComponent(option)}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      {show && (
        <div className="back">
          <h2>{decodeURIComponent(answer)}</h2>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
