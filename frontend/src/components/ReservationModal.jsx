import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReservationModal = ({ isOpen, onClose, onSelectTable }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const restaurantLayout = {
    sections: [
      {
        id: 'main-dining',
        name: 'Main Dining',
        tables: [
          { id: 1, name: 'T1', capacity: 2, status: 'available', position: { x: -140, y: -60 }, shape: 'round' },
          { id: 2, name: 'T2', capacity: 4, status: 'occupied', position: { x: -70, y: -60 }, shape: 'square' },
          { id: 3, name: 'T3', capacity: 6, status: 'available', position: { x: 0, y: -60 }, shape: 'rectangle' },
          { id: 4, name: 'T4', capacity: 2, status: 'available', position: { x: 70, y: -60 }, shape: 'round' },
          { id: 5, name: 'T5', capacity: 4, status: 'reserved', position: { x: 140, y: -60 }, shape: 'square' },
          { id: 6, name: 'T6', capacity: 8, status: 'available', position: { x: -100, y: 10 }, shape: 'rectangle' },
          { id: 7, name: 'T7', capacity: 2, status: 'available', position: { x: -40, y: 10 }, shape: 'round' },
          { id: 8, name: 'T8', capacity: 4, status: 'occupied', position: { x: 20, y: 10 }, shape: 'square' },
          { id: 9, name: 'T9', capacity: 6, status: 'available', position: { x: 100, y: 10 }, shape: 'rectangle' },
        ]
      },
      {
        id: 'window',
        name: 'Window Side',
        tables: [
          { id: 10, name: 'T10', capacity: 2, status: 'available', position: { x: -80, y: 80 }, shape: 'round' },
          { id: 11, name: 'T11', capacity: 4, status: 'available', position: { x: 0, y: 80 }, shape: 'square' },
          { id: 12, name: 'T12', capacity: 2, status: 'reserved', position: { x: 80, y: 80 }, shape: 'round' },
        ]
      },
      {
        id: 'patio',
        name: 'Patio',
        tables: [
          { id: 13, name: 'T13', capacity: 4, status: 'available', position: { x: 200, y: -20 }, shape: 'rectangle' },
          { id: 14, name: 'T14', capacity: 6, status: 'available', position: { x: 200, y: 50 }, shape: 'rectangle' },
        ]
      }
    ]
  };

  const handleTableSelect = (table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
    }
  };

  const renderFloorPlan = () => (
    <div className="relative w-full h-[500px] bg-[#fdfbf7] rounded-3xl overflow-hidden border border-amber-100 shadow-inner">
      {/* Decorative Floor Elements */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(#92400e 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px'
      }} />
      
      {/* Architectural Elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-amber-800/10 border-b border-amber-800/20 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-amber-900/40 font-bold">Main Entrance</span>
      </div>
      <div className="absolute right-0 top-0 h-full w-4 bg-amber-800/5 border-l border-amber-800/10 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-amber-900/40 font-bold [writing-mode:vertical-lr] rotate-180">Garden Patio</span>
      </div>

      {restaurantLayout.sections.map(section => (
        <div key={section.id}>
          {section.tables.map((table) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={table.status === 'available' ? { scale: 1.05, y: -2 } : {}}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${table.position.x}px)`,
                top: `calc(50% + ${table.position.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleTableSelect(table)}
            >
              {/* Table shadow */}
              <div className="absolute inset-0 translate-y-2 blur-md bg-black/10 rounded-full" />
              
              {/* Table Graphics */}
              <div className={`
                relative transition-all duration-300 flex items-center justify-center
                ${table.shape === 'round' ? 'rounded-full' : table.shape === 'rectangle' ? 'rounded-xl' : 'rounded-lg'}
                ${table.status === 'available' 
                  ? 'bg-white border-2 border-amber-500 shadow-md group-hover:shadow-amber-200 group-hover:border-amber-600' 
                  : table.status === 'occupied' 
                    ? 'bg-gray-100 border-2 border-gray-300' 
                    : 'bg-gray-50 border-2 border-gray-200 opacity-60'}
              `}
              style={{
                width: table.capacity >= 8 ? '90px' : table.capacity >= 6 ? '70px' : table.capacity >= 4 ? '55px' : '45px',
                height: table.shape === 'rectangle' ? '50px' : (table.capacity >= 4 ? '55px' : '45px'),
              }}>
                {/* Wood texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")'
                }} />

                {/* Table Name */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`text-[10px] font-bold tracking-tighter ${table.status === 'available' ? 'text-amber-900' : 'text-gray-400'}`}>
                    {table.name}
                  </span>
                  <div className={`w-4 h-[1px] ${table.status === 'available' ? 'bg-amber-200' : 'bg-gray-200'}`} />
                  <span className={`text-[8px] uppercase font-bold tracking-widest ${table.status === 'available' ? 'text-amber-600' : 'text-gray-300'}`}>
                    {table.capacity}P
                  </span>
                </div>

                {/* Chairs */}
                {[...Array(table.capacity)].map((_, i) => {
                  const angle = (i * 360) / table.capacity;
                  const radius = table.shape === 'rectangle' ? 32 : (table.capacity >= 4 ? 32 : 28);
                  return (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 rounded-sm border transition-colors duration-300 ${
                        table.status === 'available' ? 'bg-amber-100 border-amber-300' : 'bg-gray-200 border-gray-300'
                      }`}
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                      }}
                    />
                  );
                })}

                {/* Selected Indicator */}
                {selectedTable?.id === table.id && (
                  <motion.div 
                    layoutId="selected-ring"
                    className="absolute inset-[-6px] border-2 border-amber-500 rounded-inherit ring-4 ring-amber-500/10"
                  />
                )}

                {/* Availability Pulse */}
                {table.status === 'available' && !selectedTable && (
                  <div className="absolute inset-0 rounded-inherit bg-amber-400/5 animate-pulse" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-10 py-8 bg-[#fafafa] border-b border-gray-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-serif text-gray-900">Choose Your Table</h2>
              </div>
              <p className="text-gray-500 text-sm ml-11">Interactive seat map for your perfect dining experience</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-10">
            {renderFloorPlan()}
            
            {/* Legend & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="flex items-center gap-8 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Reserved</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                {selectedTable ? (
                  <div className="text-right">
                    <p className="text-sm font-serif text-gray-900">Table {selectedTable.name} Selected</p>
                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">{selectedTable.capacity} People • {selectedTable.shape}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Select a table to continue</p>
                )}
                <button
                  onClick={() => selectedTable && onSelectTable(selectedTable) && onClose()}
                  disabled={!selectedTable}
                  className={`px-8 py-3 rounded-xl text-sm font-bold shadow-xl transition-all ${
                    selectedTable
                      ? 'bg-gray-900 text-white hover:bg-black hover:shadow-2xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  Confirm Table
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationModal;