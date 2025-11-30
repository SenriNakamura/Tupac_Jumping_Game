import { useEffect, useRef, useState, useCallback } from 'react';

interface Player {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  isJumping: boolean;
  score: number;
  color: string;
}

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
}

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const MOVE_SPEED = 4;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const CAMERA_ANCHOR = GAME_HEIGHT * 0.35;

export function JumpingGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const player1Ref = useRef<Player>({
    x: 100,
    y: 400,
    velocityX: 0,
    velocityY: 0,
    width: 40,
    height: 40,
    isJumping: false,
    score: 0,
    color: '#3b82f6', // blue
  });

  const player2Ref = useRef<Player>({
    x: 660,
    y: 400,
    velocityX: 0,
    velocityY: 0,
    width: 40,
    height: 40,
    isJumping: false,
    score: 0,
    color: '#ef4444', // red
  });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameId = useRef<number>();
  const blockIdCounter = useRef(0);

  // Initialize blocks
  const initializeBlocks = useCallback(() => {
    const initialBlocks: Block[] = [];
    
    // Ground blocks
    for (let i = 0; i < GAME_WIDTH; i += 100) {
      initialBlocks.push({
        x: i,
        y: GAME_HEIGHT - 40,
        width: 100,
        height: 40,
        id: blockIdCounter.current++,
      });
    }

    // Random platforms
    for (let i = 0; i < 15; i++) {
      initialBlocks.push({
        x: Math.random() * (GAME_WIDTH - 120),
        y: Math.random() * (GAME_HEIGHT - 200) + 100,
        width: 80 + Math.random() * 60,
        height: 20,
        id: blockIdCounter.current++,
      });
    }

    setBlocks(initialBlocks);
  }, []);

  // Check collision between player and block
  const checkCollision = (player: Player, block: Block): boolean => {
    return (
      player.x < block.x + block.width &&
      player.x + player.width > block.x &&
      player.y + player.height <= block.y &&
      player.y + player.height + player.velocityY >= block.y
    );
  };

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver) return;

    const p1 = player1Ref.current;
    const p2 = player2Ref.current;

    // Handle player 1 controls (WASD)
    if (keysPressed.current.has('a') || keysPressed.current.has('A')) {
      p1.velocityX = -MOVE_SPEED;
    } else if (keysPressed.current.has('d') || keysPressed.current.has('D')) {
      p1.velocityX = MOVE_SPEED;
    } else {
      p1.velocityX = 0;
    }

    if ((keysPressed.current.has('w') || keysPressed.current.has('W')) && !p1.isJumping) {
      p1.velocityY = JUMP_FORCE;
      p1.isJumping = true;
    }

    // Handle player 2 controls (Arrow keys)
    if (keysPressed.current.has('ArrowLeft')) {
      p2.velocityX = -MOVE_SPEED;
    } else if (keysPressed.current.has('ArrowRight')) {
      p2.velocityX = MOVE_SPEED;
    } else {
      p2.velocityX = 0;
    }

    if (keysPressed.current.has('ArrowUp') && !p2.isJumping) {
      p2.velocityY = JUMP_FORCE;
      p2.isJumping = true;
    }

    // Update physics for both players
    [p1, p2].forEach((player) => {
      // Apply gravity
      player.velocityY += GRAVITY;

      // Update position
      player.x += player.velocityX;
      player.y += player.velocityY;

      // Keep player within bounds (horizontal)
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > GAME_WIDTH) player.x = GAME_WIDTH - player.width;

      // Check collision with blocks
      let onGround = false;
      blocks.forEach((block) => {
        if (checkCollision(player, block)) {
          player.y = block.y - player.height;
          player.velocityY = 0;
          player.isJumping = false;
          onGround = true;

          // Award points for reaching higher platforms
          const platformScore = Math.floor((GAME_HEIGHT - block.y) / 10);
          if (platformScore > player.score) {
            player.score = platformScore;
          }
        }
      });

      // Check if player fell off bottom of screen
      if (player.y > GAME_HEIGHT) {
        setGameOver(true);
        const otherPlayer = player === p1 ? p2 : p1;
        setWinner(player === p1 ? 'Player 2' : 'Player 1');
      }
    });

    // --- Dynamic camera scroll (Doodle Jump style) ---
    const highestPlayerY = Math.min(p1.y, p2.y);

    if (highestPlayerY < CAMERA_ANCHOR) {
      const delta = CAMERA_ANCHOR - highestPlayerY;

      // Move both players down by delta
      p1.y += delta;
      p2.y += delta;

      // Move all platforms down by the same amount
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) => ({
          ...block,
          y: block.y + delta,
        }))
      );
    } else {
      // No scroll this frame, just force a re-render
      setBlocks((prev) => [...prev]);
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameOver, blocks]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop]);

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = () => {
    player1Ref.current = {
      x: 100,
      y: 400,
      velocityX: 0,
      velocityY: 0,
      width: 40,
      height: 40,
      isJumping: false,
      score: 0,
      color: '#3b82f6',
    };
    player2Ref.current = {
      x: 660,
      y: 400,
      velocityX: 0,
      velocityY: 0,
      width: 40,
      height: 40,
      isJumping: false,
      score: 0,
      color: '#ef4444',
    };
    initializeBlocks();
    setGameOver(false);
    setWinner(null);
    setGameStarted(true);
  };

  return (
  <div className="flex flex-col items-center gap-4">
    {/* Score Display */}
    <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: player1Ref.current.color }}></div>
          <span>Player 1: {player1Ref.current.score}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: player2Ref.current.color }}></div>
          <span>Player 2: {player2Ref.current.score}</span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative border-4 border-gray-800 bg-gradient-to-b from-sky-200 to-sky-100" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        {/* Blocks */}
        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute bg-green-600 border-2 border-green-700"
            style={{
              left: block.x,
              top: block.y,
              width: block.width,
              height: block.height,
            }}
          />
        ))}

        {/* Player 1 */}
        {gameStarted && (
          <div
            className="absolute rounded shadow-lg"
            style={{
              left: player1Ref.current.x,
              top: player1Ref.current.y,
              width: player1Ref.current.width,
              height: player1Ref.current.height,
              backgroundColor: player1Ref.current.color,
            }}
          />
        )}

        {/* Player 2 */}
        {gameStarted && (
          <div
            className="absolute rounded shadow-lg"
            style={{
              left: player2Ref.current.x,
              top: player2Ref.current.y,
              width: player2Ref.current.width,
              height: player2Ref.current.height,
              backgroundColor: player2Ref.current.color,
            }}
          />
        )}

        {/* Start Screen */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
            <h2 className="mb-4">Two Player Jumping Game</h2>
            <div className="mb-6 text-center">
              <p className="mb-2">Player 1: W to jump, A/D to move</p>
              <p>Player 2: ↑ to jump, ←/→ to move</p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
            <h2 className="mb-4">{winner} Wins!</h2>
            <p className="mb-6">Final Scores: P1 - {player1Ref.current.score} | P2 - {player2Ref.current.score}</p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Controls Info */}
      {gameStarted && !gameOver && (
        <div className="flex gap-8 text-sm text-gray-600">
          <div>
            <span className="inline-block w-3 h-3 rounded mr-2" style={{ backgroundColor: '#3b82f6' }}></span>
            P1: WASD
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded mr-2" style={{ backgroundColor: '#ef4444' }}></span>
            P2: Arrow Keys
          </div>
        </div>
      )}
    </div>
  );
}
