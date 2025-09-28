import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function InfoForm({ userInfo, setUserInfo, setIsStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 max-w-md mx-auto"
    >
      <p className="text-lg font-sans mb-4">
        Nhập thông tin của bạn trước khi bắt đầu quiz
      </p>
      <input
        type="text"
        placeholder="Tên của bạn"
        className="w-full px-3 py-2 mb-4 border rounded-lg"
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <div className="flex justify-between">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-6 py-2 bg-[#f10a0a] text-black font-semibold rounded-lg shadow"
            onClick={() => {
              if (userInfo.name.trim() !== "") setIsStarted(true); // Bắt đầu quiz
            }}
          >
            Quay lại trang chủ
          </motion.button>
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg shadow"
          onClick={() => {
            if (userInfo.name.trim() !== "") setIsStarted(true); // Bắt đầu quiz
          }}
        >
          Bắt đầu quiz
        </motion.button>
      </div>
    </motion.div>
  );
}
