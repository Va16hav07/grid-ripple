"use client";

import { useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState<number[]>(Array(9).fill(0));
  const lockedCount = grid.filter(v => v >= 15).length;

  const getRowCol = (index: number) => ({
    row: Math.floor(index / 3),
    col: index % 3,
  });

  const getRightIndex = (index: number) => {
    const { row, col } = getRowCol(index);
    if (col === 2) return null;
    return row * 3 + (col + 1);
  };

  const getBelowIndex = (index: number) => {
    const { row, col } = getRowCol(index);
    if (row === 2) return null;
    return (row + 1) * 3 + col;
  };

  const isLocked = (index: number) => grid[index] >= 15;

  const handleBoxClick = (index: number) => {
    if (isLocked(index)) return;

    const newGrid = [...grid];
    newGrid[index] += 1;

    if (newGrid[index] % 3 === 0) {
      const rightIndex = getRightIndex(index);
      if (rightIndex !== null && !isLocked(rightIndex)) {
        newGrid[rightIndex] -= 1;
      }
    }

    if (newGrid[index] % 5 === 0) {
      const belowIndex = getBelowIndex(index);
      if (belowIndex !== null && !isLocked(belowIndex)) {
        newGrid[belowIndex] += 2;
      }
    }

    setGrid(newGrid);
  };

  const getBoxStyle = (value: number) => {
    if (value >= 15) {
      return {
        backgroundColor: "#ef4444",
        color: "white",
      };
    }
    if (value % 2 === 0) {
      return {
        backgroundColor: "#e0e7ff",
        color: "#1e1b4b",
      };
    }
    return {
      backgroundColor: "#1e1b4b",
      color: "#fff",
    };
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md game-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Grid Ripple</h1>
          <p className="subtitle text-indigo-700 text-sm">Click boxes to trigger ripple effects</p>
        </div>

        {/* Stats */}
        <div className="stats-card rounded-lg p-4 mb-6 flex justify-around text-center">
          <div>
            <p className="text-gray-600 text-sm font-medium">Locked Boxes</p>
            <p className="text-2xl locked-count">{lockedCount}/9</p>
          </div>
          <div className="border-l border-gray-300"></div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Max Value</p>
            <p className="text-2xl max-value">{Math.max(...grid)}</p>
          </div>
        </div>

        {/* Grid */}
        <div className="game-grid rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-3">
            {grid.map((value, index) => {
              const style = getBoxStyle(value);
              const isLockedState = isLocked(index);

              return (
                <button
                  key={index}
                  onClick={() => handleBoxClick(index)}
                  disabled={isLockedState}
                  className={`grid-box ${
                    isLockedState 
                      ? "opacity-75" 
                      : "hover:scale-105 active:scale-95 hover:shadow-lg"
                  }`}
                  style={{
                    ...style,
                    borderRadius: "8px",
                    boxShadow: isLockedState ? "0 4px 12px rgba(255, 0, 0, 0.3)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    aspectRatio: "1",
                    fontSize: "28px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: isLockedState ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    transform: isLockedState ? "scale(0.95)" : "scale(1)",
                  }}
                  title={isLockedState ? "This box is locked" : ""}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => setGrid(Array(9).fill(0))}
          className="reset-button w-full text-white font-semibold py-3 px-4 rounded-lg"
        >
          Reset Grid
        </button>
      </div>
    </div>
  );
}
