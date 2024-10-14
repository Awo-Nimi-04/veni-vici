const HistoryCard = ({ category, question, answer }) => {
  return (
    <div className="hcard">
      <h3>Question: </h3>
      <p>{question}</p>
      <h3>Answer:</h3>
      <p> {answer}</p>
    </div>
  );
};

export default HistoryCard;
