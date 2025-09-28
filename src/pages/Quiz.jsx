import { useState } from "react";
import { motion } from "framer-motion";
import { quizData } from "../data/quizData";
import InfoForm from "../components/InfoForm";
import Scoreboard from "../components/Scoreboard";
import { Link } from "react-router-dom";
import useQuizTimer from "../utils/useQuizTimer";
import { getRandomQuestions } from "../utils/getRandomQuestion";
import { submitQuizScore, getScoreboard } from "../services/api";
import { b } from "framer-motion/client";

// Lấy ngẫu nhiên 15 câu hỏi từ quizData
const quizDataRandom = getRandomQuestions(quizData, 15);

export default function Quiz() {
  const [info, setInfo] = useState({ name: "", score: 0, time: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [scoreboard, setScoreboard] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const question = quizDataRandom[current];
  const { seconds, formatTime, setSeconds } = useQuizTimer(isStarted);

  const shakeAnimation = {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 },
  };

  // Handle score submission
  const handleSubmitScore = async (userName, score, correct) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitQuizScore(userName, score, correct);
      // Load scoreboard after successful submission
      await loadScoreboard();
    } catch (error) {
      console.error('Failed to submit score:', error);
      setSubmitError('Không thể lưu điểm. Vui lòng thử lại.');
      // Still try to load scoreboard even if submission fails
      await loadScoreboard();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load scoreboard data
  const loadScoreboard = async () => {
    try {
      console.log('Loading scoreboard...');
      const data = await getScoreboard();
      console.log('Scoreboard data received:', data);
      setScoreboard(data);
    } catch (error) {
      console.error('Failed to load scoreboard:', error);
      // Fallback to mock data if API fails
      setScoreboard([
        {
          id: 1,
          name: "Nguyễn Văn A",
          score: 14,
          total: quizDataRandom.length,
          time: "00:02:30",
        },
        {
          id: 2,
          name: "Trần Thị B",
          score: 12,
          total: quizDataRandom.length,
          time: "00:03:10",
        },
        {
          id: 3,
          name: "Lê Văn C",
          score: 10,
          total: quizDataRandom.length,
          time: "00:04:00",
        },
        {
          id: 4,
          name: info.name,
          score: info.score,
          total: quizDataRandom.length,
          time: info.time,
        },
      ]);
    }
  };

  // Retry submission
  const handleRetry = async () => {
    await handleSubmitScore(info.name, info.score, info.score);
  };

  const handleAnswer = async (value) => {
    let isCorrect = false;

    if (question.type === "mcq" || question.type === "truefalse") {
      isCorrect = value === question.answer;
    } else if (question.type === "fillblank") {
      isCorrect = value.trim().toLowerCase() === question.answer.toLowerCase();
    }

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(async () => {
      if (current + 1 < quizDataRandom.length) {
        setCurrent((prev) => prev + 1);
        setSelected("");
        setFeedback(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        setFinished(true);
        setInfo({
          ...info,
          score: finalScore,
          time: formatTime(),
        });

        // Submit score to API
        await handleSubmitScore(info.name, finalScore, finalScore);
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#8B0000] mb-6 font-sans">
        Quiz kiến thức Mác Lê Nin
      </h2>
      <div className="mb-4 text-lg font-sans">
        <span className="mr-6">
          Thời gian: {finished ? info.time : formatTime()}
        </span>
        <span className="mr-6">
          Câu hỏi: {current + 1}/{quizDataRandom.length}
        </span>
        <span className="mr-6">
          Diểm: {score}/{quizDataRandom.length}
        </span>
      </div>

      {!isStarted ? (
        <InfoForm
          userInfo={info}
          setUserInfo={setInfo}
          setIsStarted={setIsStarted}
        />
      ) : !finished ? (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <p className="text-lg font-sans mb-4">{`Câu ${current + 1}: ${question.question
            }`}</p>

          {/* Multiple Choice */}
          {question.type === "mcq" && (
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full px-4 py-2 rounded-lg border ${selected === opt
                    ? feedback === "correct"
                      ? "bg-green-500 text-white"
                      : feedback === "wrong"
                        ? "bg-red-500 text-white"
                        : "bg-[#FFD700] text-black font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  onClick={() => {
                    setSelected(opt);
                    handleAnswer(opt);
                  }}
                  disabled={!!feedback}
                  animate={feedback === "wrong" ? shakeAnimation : {}}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* True / False */}
          {question.type === "truefalse" && (
            <div className="grid grid-cols-2 gap-3">
              {["True", "False"].map((val) => (
                <motion.button
                  key={val}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-lg border ${selected === val
                    ? feedback === "correct"
                      ? "bg-green-500 text-white"
                      : feedback === "wrong"
                        ? "bg-red-500 text-white"
                        : "bg-[#FFD700] text-black font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  onClick={() => {
                    setSelected(val);
                    handleAnswer(val);
                  }}
                  disabled={!!feedback}
                  animate={feedback === "wrong" ? shakeAnimation : {}}
                >
                  {val}
                </motion.button>
              ))}
            </div>
          )}

          {/* Fill in the blank */}
          {question.type === "fillblank" && (
            <div className="mt-4">
              <motion.input
                type="text"
                className={`border px-3 py-2 rounded-lg w-full transition-colors duration-300
                            ${feedback === "correct"
                    ? "border-green-500 bg-green-100"
                    : ""
                  }
                            ${feedback === "wrong"
                    ? "border-red-500 bg-red-100"
                    : ""
                  }
                          `}
                placeholder="Nhập câu trả lời..."
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                disabled={!!feedback}
                animate={feedback === "wrong" ? shakeAnimation : {}}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg shadow"
                onClick={() => handleAnswer(selected)}
              >
                Trả lời
              </motion.button>
            </div>
          )}
        </motion.div>
      ) : (
        <Scoreboard
          scoreboard={scoreboard}
          currentUser={info}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onRetry={handleRetry}
        />
      )}
      {/*Sẽ được thay thế bới scoreboard khi có api */}
    </div>
  );
}
