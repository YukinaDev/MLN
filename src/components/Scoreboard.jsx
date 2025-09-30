import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import anime from "animejs";

const Scoreboard = ({
    scoreboard,
    currentUser,
    isSubmitting,
    submitError,
    onRetry
}) => {
    const listRef = useRef(null);

    useEffect(() => {
        if (!listRef.current) return;
        const numbers = listRef.current.querySelectorAll('[data-count]');
        numbers.forEach((el) => {
            const end = parseInt(el.getAttribute('data-count') || '0', 10);
            anime({
                targets: { val: 0 },
                val: end,
                easing: 'easeOutQuad',
                duration: 800,
                round: 1,
                update: (a) => (el.textContent = a.animations[0].currentValue),
            });
        });
    }, [scoreboard]);

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
            <h3 className="text-2xl font-bold text-[#8B0000] mb-4">
                Bảng xếp hạng
            </h3>

            {/* Show loading state */}
            {isSubmitting && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B0000]"></div>
                    <p className="mt-2 text-gray-600">Đang lưu điểm...</p>
                </div>
            )}

            {/* Show error message */}
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{submitError}</p>
                    <button
                        onClick={onRetry}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Show scoreboard */}
            {!isSubmitting && scoreboard.length > 0 && (
                <div ref={listRef} className="space-y-2">
                    {scoreboard.map((player, idx) => (
                        <div
                            key={player.id}
                            className={`flex justify-between items-center p-3 mb-2 rounded-lg ${player.name === currentUser.name
                                ? "bg-[#FFD700] text-black font-semibold"
                                : "bg-gray-100"
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg">
                                    #{player.rank || (idx + 1)}
                                </span>
                                <span className="font-medium">
                                    {player.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm"><span data-count={player.score}></span>/{player.total || 15}</span>
                                <span className="text-sm font-medium"><span data-count={player.percentage}></span>%</span>
                                <span className="text-sm text-gray-600">
                                    {player.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Show empty state */}
            {!isSubmitting && scoreboard.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>Chưa có dữ liệu bảng xếp hạng</p>
                </div>
            )}

            <Link to="/">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg shadow"
                >
                    Về trang chủ
                </motion.button>
            </Link>
        </motion.div>
    );
};

export default Scoreboard;
