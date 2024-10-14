import { useEffect, useState } from "react";
import errorImg from "./assets/errorImg.png";
import andesImg from "./assets/TheAndes.jpg";
import animalsImg from "./assets/animalsCategory.png";
import artImg from "./assets/artCategory.png";
import celebritiesImg from "./assets/celebritiesCategory.png";
import boardGamesImg from "./assets/boardGameCategory.jpeg";
import booksImg from "./assets/EntertainmentBooksCategory.jpeg";
import cartoonImg from "./assets/EntertainmentCartoonCategory.jpeg";
import comicImg from "./assets/EntertainmentComicsCategory.jpeg";
import filmImg from "./assets/FilmCategory.jpeg";
import animeImg from "./assets/EntertainmentAnimeCategory.jpeg";
import musicImg from "./assets/MusicCategory.jpeg";
import musicalsImg from "./assets/musicalsTheatresCategory.jpeg";
import televisionImg from "./assets/televisionCategory.jpeg";
import videoGamesImg from "./assets/EntertainmentVideoGamesCategory.jpeg";
import generalKnowledgeImg from "./assets/GeneralKnowledgeCategory.jpeg";
import geographyImg from "./assets/GeographyCategory.jpeg";
import historyImg from "./assets/HistoryCategory.jpeg";
import mythologyImg from "./assets/MythologyCategory.jpeg";
import politicsImg from "./assets/PoliticsCategory.jpeg";
import natureImg from "./assets/ScienceNatureCategory.jpeg";
import computersImg from "./assets/ScienceComputersCategory.jpeg";
import gadgetsImg from "./assets/ScienceGadgetsCategory.jpeg";
import mathematicsImg from "./assets/ScienceMathematicsCategory.jpeg";
import sportsImg from "./assets/SportsCategory.jpeg";
import vehicleImg from "./assets/VehicleCategory.jpeg";
import "./App.css";
import Flashcard from "./components/Flashcard";
import HistoryCard from "./components/HistoryCard";

const key = {
  Animals: ["27", animalsImg],
  Art: ["25", artImg],
  Celebrities: ["26", celebritiesImg],
  "Entertainment: Board Games": ["16", boardGamesImg],
  "Entertainment: Books": ["10", booksImg],
  "Entertainment: Cartoon & Animations": ["32", cartoonImg],
  "Entertainment: Comics": ["29", comicImg],
  "Entertainment: Film": ["11", filmImg],
  "Entertainment: Japanese Anime & Manga": ["31", animeImg],
  "Entertainment: Music": ["12", musicImg],
  "Entertainment: Musicals & Theatres": ["13", musicalsImg],
  "Entertainment: Television": ["14", televisionImg],
  "Entertainment: Video Games": ["15", videoGamesImg],
  "General Knowledge": ["9", generalKnowledgeImg],
  Geography: ["22", geographyImg],
  History: ["23", historyImg],
  Mythology: ["20", mythologyImg],
  Politics: ["24", politicsImg],
  "Science & Nature": ["17", natureImg],
  "Science: Computers": ["18", computersImg],
  "Science: Gadgets": ["30", gadgetsImg],
  "Science: Mathematics": ["19", mathematicsImg],
  Sports: ["21", sportsImg],
  Vehicles: ["28", vehicleImg],
};

function App() {
  const [flag, setFlag] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [question, setQuestion] = useState({
    type: "",
    question: "",
    answer: "",
    category: "",
    difficulty: "",
    options: [],
  });
  const [filters, setFilters] = useState({
    type: [],
    category: [],
    difficulty: [],
  });
  const [history, setHistory] = useState([]);

  const handleFlipCard = () => {
    setIsFlipped((prevState) => !prevState);
    setShowAnswer((prevState) => !prevState);
  };

  const handleFilterCategory = () => {
    setFilters({
      ...filters,
      category: [...filters.category, question.category],
    });
  };

  const handleFilterDifficulty = () => {
    setFilters({
      ...filters,
      difficulty: [...filters.difficulty, question.difficulty],
    });
  };

  const handleFilterType = () => {
    setFilters({
      ...filters,
      type: [...filters.type, question.type],
    });
  };

  const handleRemoveCategoryFilter = (unfilteredCategory) => {
    setFilters({
      ...filters,
      category: filters.type.category((c) => c !== unfilteredCategory),
    });
  };
  const handleRemoveDifficultyFilter = (unfilteredDifficulty) => {
    setFilters({
      ...filters,
      type: filters.type.filter((d) => d !== unfilteredDifficulty),
    });
  };

  const handleRemoveTypeFilter = (unfilteredType) => {
    setFilters({
      ...filters,
      type: filters.type.filter((t) => t !== unfilteredType),
    });
  };

  useEffect(() => {
    const getRandomQuestion = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&encode=url3986"
        );
        const q = await response.json();
        if (q.response_code === 0) {
          let filteredQuestions = q.results.filter(
            (question) =>
              filters.category.indexOf(question.category) === -1 &&
              filters.type.indexOf(question.type) === -1 &&
              filters.difficulty.indexOf(question.difficulty) === -1
          );
          // console.log(filteredQuestions);
          if (filteredQuestions.length === 0) {
            console.log("empty");
            setQuestion({
              type: "",
              question: "",
              answer: "",
              category: "",
              difficulty: "",
              options: [],
            });
            setError("Something went wrong. Please try again");
          } else {
            const chosenQuestion = filteredQuestions[0];
            const options = chosenQuestion.incorrect_answers;
            const answer = chosenQuestion.correct_answer;
            const index = Math.floor(Math.random() * options.length);
            options.splice(index, 0, answer);
            setQuestion({
              question: decodeURIComponent(chosenQuestion.question),
              type: decodeURIComponent(chosenQuestion.type),
              answer,
              options,
              difficulty: decodeURIComponent(chosenQuestion.difficulty),
              category: decodeURIComponent(chosenQuestion.category),
            });
            setError(null);
          }
        } else {
          setQuestion({
            type: "",
            question: "",
            answer: "",
            category: "",
            difficulty: "",
            options: [],
          });
          setError("Something went wrong. Please try again");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRandomQuestion();
  }, [flag]);

  const handleClick = () => {
    setIsFlipped(false);
    setShowAnswer(false);
    if (question.question !== "") {
      setHistory((prevState) => {
        return [
          ...prevState,
          {
            question: question.question,
            answer: question.answer,
            category: question.category,
          },
        ];
      });
    }
    setFlag((flag) => !flag);
  };

  return (
    <div className="layout">
      <div className="history">
        {history.length === 0 && <h4>Nothing to see yet...👀</h4>}
        {history.length > 0 && <h4>What you've seen so far</h4>}
        {history.length > 0 &&
          history.map((his, index) => (
            <HistoryCard
              key={index}
              question={decodeURIComponent(his.question)}
              answer={decodeURIComponent(his.answer)}
              category={decodeURIComponent(his.category)}
            />
          ))}
      </div>
      <div className="center">
        {!error && (
          <div className="home">
            <button onClick={handleFilterCategory}>{question.category}</button>
            <button onClick={handleFilterType}>{question.type}</button>
            <button onClick={handleFilterDifficulty}>
              {question.difficulty}
            </button>
          </div>
        )}
        {error && (
          <Flashcard
            question={error}
            category={""}
            answer={""}
            difficulty={""}
            show={false}
            flipped={isFlipped}
            options={[]}
            isClicked={() => {}}
            image={errorImg}
          />
        )}
        {!error && question.question && (
          <Flashcard
            question={question.question}
            category={question.category}
            answer={question.answer}
            difficulty={question.difficulty}
            show={showAnswer}
            flipped={isFlipped}
            options={question.options}
            isClicked={handleFlipCard}
            image={question.category ? key[question.category][1] : ""}
          />
        )}
        <div className="home">
          <button onClick={handleClick}>Different Question?</button>
        </div>
      </div>
      <div className="filter">
        <h4>Pick attributes to add to your ban list.</h4>
        <p>Ban List: </p>
        {filters.category.map((category, index) => (
          <button
            onClick={() => handleRemoveCategoryFilter(category)}
            key={index}
          >
            {category}
          </button>
        ))}
        {filters.difficulty.map((difficulty, index) => (
          <button
            onClick={() => handleRemoveDifficultyFilter(difficulty)}
            key={index}
          >
            {difficulty}
          </button>
        ))}
        {filters.type.map((type, index) => (
          <button onClick={() => handleRemoveTypeFilter(type)} key={index}>
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
