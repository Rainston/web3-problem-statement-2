import { motion, AnimatePresence } from 'framer-motion';

export default function RecordList({ blocks, onDeleteBlock }) {
  return (
    <div className="glass-effect p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-4">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Student Records
        </h2>
      </div>
      <div className="space-y-6">
        <AnimatePresence>
          {blocks.map((block, index) => (
            <motion.div
              key={block.hash}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white/50 p-6 rounded-xl border border-gray-100/50 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    Block {index}
                  </span>
                  <p className="text-xs text-gray-500 font-mono break-all bg-gray-50 p-2 rounded-lg">
                    {block.hash}
                  </p>
                </div>
                {index !== 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDeleteBlock(index)}
                    className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Delete
                  </motion.button>
                )}
              </div>
              <div className="mt-4 bg-white/70 p-4 rounded-xl border border-gray-100/50">
                {block.data.message ? (
                  <p className="text-gray-600">{block.data.message}</p>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Name', value: block.data.name },
                      { label: 'ID', value: block.data.id },
                      { label: 'Grade', value: block.data.grade },
                      { label: 'Course', value: block.data.course }
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-50/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-indigo-600 mb-1">{label}</p>
                        <p className="text-gray-900 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}