"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"

type Player = "🐱" | "🐶" | null
type Board = Player[]

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"🐱" | "🐶">("🐱")
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [scores, setScores] = useState({ cat: 0, dog: 0, draws: 0 })

  const checkWinner = useCallback((board: Board): Player => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }, [])

  const checkDraw = useCallback(
    (board: Board): boolean => {
      return board.every((cell) => cell !== null) && !checkWinner(board)
    },
    [checkWinner],
  )

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winner || isDraw) return

      const newBoard = [...board]
      newBoard[index] = currentPlayer
      setBoard(newBoard)

      const gameWinner = checkWinner(newBoard)
      const gameDraw = checkDraw(newBoard)

      if (gameWinner) {
        setWinner(gameWinner)
        setScores((prev) => ({
          ...prev,
          [gameWinner === "🐱" ? "cat" : "dog"]: prev[gameWinner === "🐱" ? "cat" : "dog"] + 1,
        }))
      } else if (gameDraw) {
        setIsDraw(true)
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      } else {
        setCurrentPlayer(currentPlayer === "🐱" ? "🐶" : "🐱")
      }
    },
    [board, currentPlayer, winner, isDraw, checkWinner, checkDraw],
  )

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("🐱")
    setWinner(null)
    setIsDraw(false)
  }, [])

  const resetScores = useCallback(() => {
    setScores({ cat: 0, dog: 0, draws: 0 })
    resetGame()
  }, [resetGame])

  const getGameStatus = () => {
    if (winner) return `Winner: ${winner} 🎉`
    if (isDraw) return "It's a draw! 🤝"
    return `Turn: ${currentPlayer}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <Card className="w-full max-w-md relative z-10 shadow-2xl rounded-2xl bg-transparent">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-3xl font-bold">🐱 vs 🐶 Tic-Tac-Toe</CardTitle>
            <CardDescription className="text-lg mt-1">{getGameStatus()}</CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Board */}
          <div className="grid grid-cols-3 gap-2 mx-auto w-fit">
            {board.map((cell, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="w-20 h-20 text-4xl font-bold bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                onClick={() => handleCellClick(index)}
                disabled={!!cell || !!winner || isDraw}
              >
                {cell && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="block"
                  >
                    {cell}
                  </motion.span>
                )}
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center">
            <motion.div whileHover={{ rotate: -10 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                New Game
              </Button>
            </motion.div>
            <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
              <Button onClick={resetScores} variant="secondary">
                Reset Scores
              </Button>
            </motion.div>
          </div>

          {/* Scoreboard */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center gap-4"
          >
            <div className="text-center">
              <Badge variant="outline" className="border-blue-600">🐱 Cat</Badge>
              <p className="text-2xl font-bold mt-1">{scores.cat}</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-muted-foreground">Draws</Badge>
              <p className="text-2xl font-bold mt-1">{scores.draws}</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="border-red-600">🐶 Dog</Badge>
              <p className="text-2xl font-bold mt-1">{scores.dog}</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
