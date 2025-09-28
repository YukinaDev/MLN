export function getRandomQuestions(quizData, count = 15) {
  // Copy mảng gốc để tránh mutate
  const shuffled = [...quizData].sort(() => Math.random() - 0.5);

  // Cắt ra "count" phần tử đầu tiên
  return shuffled.slice(0, count);
}