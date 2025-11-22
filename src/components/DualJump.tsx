import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  BookOpen,
  DollarSign,
  Apple,
  Skull,
  Circle,
  Car,
  Baby,
  Heart,
} from "lucide-react";
import { BrokenHeart } from "./BrokenHeart";
import { PlayerStickFigure } from "./PlayerStickFigure";
import tupitLogo from "../assets/tupit-logo-1920x768.png"; 


interface Player {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  isJumping: boolean;
  score: number;
  lives: number;
  side: "left" | "right";
  maxHeightReached: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  side: "left" | "right";
  movingOffset?: number;
  movingDirection?: number;
  originalX?: number;
}

interface Collectible {
  x: number;
  y: number;
  type:
    | "book"
    | "money"
    | "food"
    | "gun"
    | "drug"
    | "police"
    | "baby";
  id: number;
  side: "left" | "right";
  collected: boolean;
}

interface FloatingHeart {
  x: number;
  y: number;
  id: number;
  isGood: boolean;
  opacity: number;
  time: number; // Track animation time for effects
}

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 4;
const GAME_WIDTH = 900;
const GAME_HEIGHT = 700;
const HALF_WIDTH = GAME_WIDTH / 2;
const STARTING_Y = GAME_HEIGHT - 90;
const CAMERA_ANCHOR = GAME_HEIGHT * 0.4;

export function DualJump() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [tupitActivated, setTupitActivated] = useState(false); 

  const leftPlayerRef = useRef<Player>({
    x: HALF_WIDTH / 2 - 25,
    y: STARTING_Y,
    velocityX: 0,
    velocityY: 0,
    width: 50,
    height: 50,
    isJumping: false,
    score: 0,
    lives: 3,
    side: "left",
    maxHeightReached: STARTING_Y,
  });

  const rightPlayerRef = useRef<Player>({
    x: HALF_WIDTH + HALF_WIDTH / 2 - 25,
    y: STARTING_Y,
    velocityX: 0,
    velocityY: 0,
    width: 50,
    height: 50,
    isJumping: false,
    score: 0,
    lives: 3,
    side: "right",
    maxHeightReached: STARTING_Y,
  });

  const leftCameraY = useRef(0);
  const rightCameraY = useRef(0);

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [collectibles, setCollectibles] = useState<
    Collectible[]
  >([]);
  const [floatingHearts, setFloatingHearts] = useState<
    FloatingHeart[]
  >([]);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameId = useRef<number>();
  const platformIdCounter = useRef(0);
  const collectibleIdCounter = useRef(0);
  const heartIdCounter = useRef(0);

  // Initialize platforms and collectibles
  const initializeGame = useCallback(() => {
    const newPlatforms: Platform[] = [];
    const newCollectibles: Collectible[] = [];

    // Shared bottom platform
    newPlatforms.push({
      x: 0,
      y: GAME_HEIGHT - 40,
      width: GAME_WIDTH,
      height: 40,
      id: platformIdCounter.current++,
      side: "left",
    });

    // Left side platforms (Good Path) - evenly spaced, easy, extends much higher
    const leftPlatformCount = 100;
    for (let i = 1; i <= leftPlatformCount; i++) {
      const y = GAME_HEIGHT - 100 - i * 80;
      const x = Math.random() * (HALF_WIDTH - 140) + 20;

      newPlatforms.push({
        x,
        y,
        width: 120,
        height: 15,
        id: platformIdCounter.current++,
        side: "left",
      });

      // Add good collectibles
      if (i % 2 === 0) {
        const types: ("book" | "money" | "food")[] = [
          "book",
          "money",
          "food",
        ];
        newCollectibles.push({
          x: x + 50,
          y: y - 40,
          type: types[Math.floor(Math.random() * types.length)],
          id: collectibleIdCounter.current++,
          side: "left",
          collected: false,
        });
      }
    }

    // Right side platforms (Hard Path) - harder, moving, extends much higher
    const rightPlatformCount = 100;
    for (let i = 1; i <= rightPlatformCount; i++) {
      const y =
        GAME_HEIGHT - 100 - i * 80 + (Math.random() * 30 - 15);
      const x =
        HALF_WIDTH + Math.random() * (HALF_WIDTH - 110) + 10;

      newPlatforms.push({
        x,
        y,
        width: 80 + Math.random() * 30,
        height: 15,
        id: platformIdCounter.current++,
        side: "right",
        movingOffset: 0,
        movingDirection: Math.random() > 0.5 ? 1 : -1,
        originalX: x,
      });

      // Add bad collectibles
      if (i % 2 === 1) {
        const types: ("gun" | "drug" | "police" | "baby")[] = [
          "gun",
          "drug",
          "police",
          "baby",
        ];
        newCollectibles.push({
          x: x + 30,
          y: y - 40,
          type: types[Math.floor(Math.random() * types.length)],
          id: collectibleIdCounter.current++,
          side: "right",
          collected: false,
        });
      }
    }

    setPlatforms(newPlatforms);
    setCollectibles(newCollectibles);
  }, []);

  // Check collision between player and platform
  const checkCollision = (
    player: Player,
    platform: Platform,
  ): boolean => {
    return (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height <= platform.y + 5 &&
      player.y + player.height + player.velocityY >=
        platform.y &&
      player.velocityY >= 0
    );
  };

  // Add floating heart animation
  const addFloatingHeart = (
    x: number,
    y: number,
    isGood: boolean,
    cameraY: number,
  ) => {
    const id = heartIdCounter.current++;
    setFloatingHearts((prev) => [
      ...prev,
      { x, y: y - cameraY, id, isGood, opacity: 1, time: 0 },
    ]);

    setTimeout(() => {
      setFloatingHearts((prev) =>
        prev.filter((h) => h.id !== id),
      );
    }, 1000);
  };

  const isGoodCollectible = (c: Collectible, tupitOn: boolean): boolean => {
    if (["book", "money", "food"].includes(c.type)) return true;
    if (tupitOn && c.side === "right") return true; // right side becomes good after TUPIT
    return false;
  };
const activateTupit = () => {
  setTupitActivated((alreadyOn) => {
    if (alreadyOn) return alreadyOn; // only once

    // Add extra good collectibles on the right platforms
    setCollectibles((prevCollectibles) => {
      const newCollectibles = [...prevCollectibles];

      // simple pattern: every 3rd right platform gets a good item
      const goodTypes: ("book" | "money" | "food")[] = [
        "book",
        "money",
        "food",
      ];

      platforms
        .filter((p) => p.side === "right")
        .forEach((p, idx) => {
          if (idx % 3 !== 0) return; // spacing

          newCollectibles.push({
            x: p.x + p.width / 2 - 15,
            y: p.y - 40,
            type: goodTypes[idx % goodTypes.length],
            id: collectibleIdCounter.current++,
            side: "right",
            collected: false,
          });
        });

      return newCollectibles;
    });

    return true;
  });
};


  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver) return;

    const leftPlayer = leftPlayerRef.current;
    const rightPlayer = rightPlayerRef.current;

    // Handle left player controls (A/W/D)
    if (
      keysPressed.current.has("a") ||
      keysPressed.current.has("A")
    ) {
      leftPlayer.velocityX = -MOVE_SPEED;
    } else if (
      keysPressed.current.has("d") ||
      keysPressed.current.has("D")
    ) {
      leftPlayer.velocityX = MOVE_SPEED;
    } else {
      leftPlayer.velocityX = 0;
    }

    if (
      (keysPressed.current.has("w") ||
        keysPressed.current.has("W")) &&
      !leftPlayer.isJumping
    ) {
      leftPlayer.velocityY = JUMP_FORCE;
      leftPlayer.isJumping = true;
    }

    // Handle right player controls (J/I/L)
    if (
      keysPressed.current.has("j") ||
      keysPressed.current.has("J")
    ) {
      rightPlayer.velocityX = -MOVE_SPEED;
    } else if (
      keysPressed.current.has("l") ||
      keysPressed.current.has("L")
    ) {
      rightPlayer.velocityX = MOVE_SPEED;
    } else {
      rightPlayer.velocityX = 0;
    }

    if (
      (keysPressed.current.has("i") ||
        keysPressed.current.has("I")) &&
      !rightPlayer.isJumping
    ) {
      rightPlayer.velocityY = JUMP_FORCE;
      rightPlayer.isJumping = true;
    }

    // Update physics for both players
    [leftPlayer, rightPlayer].forEach((player) => {
      // Apply gravity
      player.velocityY += GRAVITY;

      // Update position
      player.x += player.velocityX;
      player.y += player.velocityY;

      // Keep player within their half
      const minX = player.side === "left" ? 0 : HALF_WIDTH;
      const maxX =
        player.side === "left" ? HALF_WIDTH : GAME_WIDTH;

      if (player.x < minX) player.x = minX;
      if (player.x + player.width > maxX)
        player.x = maxX - player.width;

      // Track max height reached (lower Y = higher up)
      if (player.y < player.maxHeightReached) {
        player.maxHeightReached = player.y;
      }

      // Check collision with platforms
      platforms.forEach((platform) => {
        if (
          platform.side === player.side ||
          platform.y === GAME_HEIGHT - 40
        ) {
          if (checkCollision(player, platform)) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.isJumping = false;
          }
        }
      });

      // Death conditions
      // 1. Fell off the bottom of the screen
      if (player.y > GAME_HEIGHT + 100) {
        player.lives = 0;
      }

      // 2. Fell back to starting platform after climbing
      if (
        player.y >= STARTING_Y &&
        player.maxHeightReached < STARTING_Y - 100
      ) {
        player.lives = 0;
      }
    });

    // Update camera positions to follow players
    // Camera only moves up when player goes above threshold
    const leftPlayerScreenY =
      leftPlayer.y - leftCameraY.current;
    if (
      leftPlayerScreenY < CAMERA_ANCHOR &&
      leftPlayer.velocityY < 0
    ) {
      leftCameraY.current = leftPlayer.y - CAMERA_ANCHOR;
    }

    const rightPlayerScreenY =
      rightPlayer.y - rightCameraY.current;
    if (
      rightPlayerScreenY < CAMERA_ANCHOR &&
      rightPlayer.velocityY < 0
    ) {
      rightCameraY.current = rightPlayer.y - CAMERA_ANCHOR;
    }

    // // Keep camera from going negative
    // if (leftCameraY.current < 0) leftCameraY.current = 0;
    // if (rightCameraY.current < 0) rightCameraY.current = 0;

    // Update moving platforms
    setPlatforms((prev) =>
      prev.map((platform) => {
        if (
          platform.side === "right" &&
          platform.movingOffset !== undefined &&
          platform.originalX !== undefined
        ) {
          const newOffset =
            platform.movingOffset +
            platform.movingDirection! * 1;

          if (Math.abs(newOffset) > 40) {
            platform.movingDirection! *= -1;
          }

          return {
            ...platform,
            movingOffset: newOffset,
            x: platform.originalX + newOffset,
          };
        }
        return platform;
      }),
    );

    // Check collectible collisions
setCollectibles((prev) =>
  prev.map((collectible) => {
    if (collectible.collected) return collectible;

    const player =
      collectible.side === "left" ? leftPlayer : rightPlayer;
    const cameraY =
      collectible.side === "left"
        ? leftCameraY.current
        : rightCameraY.current;

    // Check if player touches collectible
    if (
      player.x < collectible.x + 30 &&
      player.x + player.width > collectible.x &&
      player.y < collectible.y + 30 &&
      player.y + player.height > collectible.y
    ) {
      // Good collectibles
      if (["book", "money", "food"].includes(collectible.type)) {
        player.lives = Math.min(player.lives + 1, 5);
        player.score += 10;
        addFloatingHeart(
          collectible.x,
          collectible.y,
          true,
          cameraY,
        );
      } else {
        // Bad collectibles
        player.lives -= 1;
        addFloatingHeart(
          collectible.x,
          collectible.y,
          false,
          cameraY,
        );
      }

      return { ...collectible, collected: true };
    }
    return collectible;
  }),
);

    // Update floating hearts
    setFloatingHearts((prev) =>
      prev.map((heart) => ({
        ...heart,
        y: heart.y - 2,
        opacity: heart.opacity - 0.02,
        time: heart.time + 1,
      })),
    );

    // Check game over
    if (leftPlayer.lives <= 0 || rightPlayer.lives <= 0) {
      setGameOver(true);
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameOver, platforms, tupitActivated]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationFrameId.current =
        requestAnimationFrame(gameLoop);
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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startGame = () => {
    leftPlayerRef.current = {
      x: HALF_WIDTH / 2 - 25,
      y: STARTING_Y,
      velocityX: 0,
      velocityY: 0,
      width: 50,
      height: 50,
      isJumping: false,
      score: 0,
      lives: 3,
      side: "left",
      maxHeightReached: STARTING_Y,
    };
    rightPlayerRef.current = {
      x: HALF_WIDTH + HALF_WIDTH / 2 - 25,
      y: STARTING_Y,
      velocityX: 0,
      velocityY: 0,
      width: 50,
      height: 50,
      isJumping: false,
      score: 0,
      lives: 3,
      side: "right",
      maxHeightReached: STARTING_Y,
    };
    leftCameraY.current = 0;
    rightCameraY.current = 0;
    setFloatingHearts([]);
    initializeGame();
    setGameOver(false);
    setGameStarted(true);
    setTupitActivated(false);
  };

  const CollectibleIcon = ({ type }: { type: string }) => {
  const iconProps = { size: 28, strokeWidth: 1.5 };
  switch (type) {
    case "book":
      return <BookOpen {...iconProps} className="text-black" />;
    case "money":
      return <DollarSign {...iconProps} className="text-black" />;
    case "food":
      return <Apple {...iconProps} className="text-black" />;
    case "gun":
      return <Skull {...iconProps} className="text-white" />;
    case "drug":
      return (
        <Circle
          {...iconProps}
          className="text-white"
          fill="white"
        />
      );
    case "police":
      return <Car {...iconProps} className="text-white" />;
    case "baby":
      return <Baby {...iconProps} className="text-white" />;
    default:
      return null;
  }
};



  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title */}
      <h1 className="tracking-widest text-gray-900">
        STILL I RISE
      </h1>

      {/* Game Canvas */}
      <div
        className="relative border-4 border-black overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Left Half - Good Path (White) */}
        <div
          className="absolute top-0 left-0 bg-white overflow-hidden"
          style={{ width: HALF_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Score and Lives - Top Left */}
          <div className="absolute top-4 left-4 text-black z-10">
            <div>Score: {leftPlayerRef.current.score}</div>
            <div className="flex items-center gap-1 mt-1">
              <span>Lives:</span>
              {Array.from({
                length: leftPlayerRef.current.lives,
              }).map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  fill="red"
                  className="text-red-600"
                />
              ))}
            </div>
          </div>

          {/* Upward arrow indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-400 opacity-30 z-10">
            <div className="text-center text-[rgb(69,74,82)] text-[24px]">
              ↑
            </div>
            <div className="text-xs text-[rgba(153,161,175,0)]">
              GOOD PATH
            </div>
          </div>

          {/* Left side platforms and entities */}
          <div className="absolute inset-0">
            {platforms
              .filter(
                (p) =>
                  p.side === "left" || p.y === GAME_HEIGHT - 40,
              )
              .map((platform) => {
                const screenY =
                  platform.y - leftCameraY.current;
                const screenX =
                  platform.side === "left"
                    ? platform.x
                    : platform.x;
                return (
                  <div
                    key={platform.id}
                    className="absolute bg-gray-300 shadow-md"
                    style={{
                      left: screenX,
                      top: screenY,
                      width:
                        platform.side === "left" ||
                        platform.y === GAME_HEIGHT - 40
                          ? platform.width
                          : HALF_WIDTH,
                      height: platform.height,
                    }}
                  />
                );
              })}

            {/* Left side collectibles */}
            {collectibles
              .filter((c) => c.side === "left" && !c.collected)
              .map((collectible) => {
                const screenY =
                  collectible.y - leftCameraY.current;
                return (
                  <div
                    key={collectible.id}
                    className="absolute"
                    style={{
                      left: collectible.x,
                      top: screenY,
                    }}
                  >
                    <CollectibleIcon type={collectible.type} />
                  </div>
                );
              })}

            {/* Left Player */}
            {gameStarted && (
              <div
                className="absolute"
                style={{
                  left: leftPlayerRef.current.x,
                  top: leftPlayerRef.current.y - leftCameraY.current,
                  width: leftPlayerRef.current.width,
                  height: leftPlayerRef.current.height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayerStickFigure
                  size={leftPlayerRef.current.width * 0.9}
                  color="black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Half - Hard Path (Black) */}
        <div
          className="absolute top-0 bg-black overflow-hidden"
          style={{
            left: HALF_WIDTH,
            width: HALF_WIDTH,
            height: GAME_HEIGHT,
          }}
        >
          {/* Score, Lives, and TUPIT logo - Top Right */}
        <div className="absolute top-4 right-4 text-white text-right z-10">
          <div>Score: {rightPlayerRef.current.score}</div>

          <div className="flex items-center justify-end gap-1 mt-1">
            <span>Lives:</span>
            {Array.from({
              length: rightPlayerRef.current.lives,
            }).map((_, i) => (
              <Heart
                key={i}
                size={16}
                fill="red"
                className="text-red-600"
              />
            ))}
          </div>

          {/* Clickable TUPIT logo */}
          <button
            type="button"
            onClick={activateTupit}
            className="mt-2 flex justify-end w-full"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              outline: "none",
              boxShadow: "none",
              cursor: "pointer",
            }}
          >
            <img
              src={tupitLogo}
              alt="TUPIT logo"
              className="object-contain transition-all duration-300"
              style={{
                height: "34px",
                width: "auto",
                opacity: tupitActivated ? 1 : 0.35,
                filter: tupitActivated
                  ? "none"
                  : "grayscale(100%) brightness(60%)",
                display: "block", // removes inline spacing
              }}
            />
          </button>


        </div>

          {/* Upward arrow indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-600 opacity-30 z-10">
            <div className="text-center text-[rgb(255,255,255)] text-[24px]">
              ↑
            </div>
            <div className="text-xs text-[rgba(74,85,101,0)]">
              HARD PATH
            </div>
          </div>

          {/* Right side platforms and entities */}
          <div className="absolute inset-0">
            {platforms
              .filter(
                (p) =>
                  p.side === "right" ||
                  p.y === GAME_HEIGHT - 40,
              )
              .map((platform) => {
                const screenY =
                  platform.y - rightCameraY.current;
                const screenX =
                  platform.side === "right"
                    ? platform.x - HALF_WIDTH
                    : 0;
                return (
                  <div
                    key={platform.id}
                    className="absolute bg-gray-700 shadow-md"
                    style={{
                      left: screenX,
                      top: screenY,
                      width:
                        platform.side === "right"
                          ? platform.width
                          : HALF_WIDTH,
                      height: platform.height,
                    }}
                  >
                    {/* Motion arrows for moving platforms */}
                    {platform.movingDirection && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                        {platform.movingDirection > 0
                          ? "→"
                          : "←"}
                      </div>
                    )}
                  </div>
                );
              })}

            {/* Right side collectibles */}
            {collectibles
              .filter((c) => c.side === "right" && !c.collected)
              .map((collectible) => {
                const screenY =
                  collectible.y - rightCameraY.current;
                return (
                  <div
                    key={collectible.id}
                    className="absolute"
                    style={{
                      left: collectible.x - HALF_WIDTH,
                      top: screenY,
                    }}
                  >
                <CollectibleIcon type={collectible.type} isRightSideGood={tupitActivated} />
                  </div>
                );
              })}

            {/* Right Player */}
            {gameStarted && (
              <div
                className="absolute"
                style={{
                  left: rightPlayerRef.current.x - HALF_WIDTH,
                  top: rightPlayerRef.current.y - rightCameraY.current,
                  width: rightPlayerRef.current.width,
                  height: rightPlayerRef.current.height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayerStickFigure
                  size={rightPlayerRef.current.width * 0.9}
                  color="white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Center dividing line */}
        <div
          className="absolute top-0 w-1 bg-gray-500 z-20"
          style={{
            left: HALF_WIDTH - 0.5,
            height: GAME_HEIGHT,
          }}
        />

        {/* Floating Hearts */}
        {floatingHearts.map((heart) => {
          // Calculate animation effects based on time
          const progress = heart.time / 50; // 50 frames for full animation
          
          // Good heart: floats up smoothly with soft glow
          const goodHeartY = heart.y;
          
          // Bad heart: drops slightly then shakes
          const shakeX = heart.isGood ? 0 : Math.sin(heart.time * 0.5) * 3;
          const badHeartY = heart.y + (heart.isGood ? 0 : Math.sin(progress * Math.PI) * 8);
          const rotation = heart.isGood ? 0 : Math.sin(heart.time * 0.4) * 5;
          
          return (
            <div
              key={heart.id}
              className="absolute pointer-events-none z-30"
              style={{
                left: heart.x + shakeX,
                top: heart.isGood ? goodHeartY : badHeartY,
                opacity: heart.opacity,
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {heart.isGood ? (
                <div style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 4px rgba(255, 100, 100, 0.6))',
                }}>
                  <Heart
                    size={32}
                    fill="#EF4444"
                    className="text-red-500"
                  />
                </div>
              ) : (
                <BrokenHeart
                  size={32}
                />
              )}
            </div>
          );
        })}

        {/* Start Screen */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 z-40">
            <div className="text-white text-center max-w-xl p-8">
              <h2 className="mb-6">Choose Your Path</h2>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <h3 className="mb-3 text-gray-300">
                    Good Path (Left)
                  </h3>
                  <p className="text-sm mb-3 text-gray-400">
                    Collect knowledge, opportunity, and
                    sustenance to gain lives.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        A
                      </kbd>
                      <span className="text-gray-400">
                        Move Left
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        W
                      </kbd>
                      <span className="text-gray-400">
                        Jump
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        D
                      </kbd>
                      <span className="text-gray-400">
                        Move Right
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="mb-3 text-gray-300">
                    Hard Path (Right)
                  </h3>
                  <p className="text-sm mb-3 text-gray-400">
                    Avoid temptations and dangers. Moving
                    platforms, lose lives on contact.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        J
                      </kbd>
                      <span className="text-gray-400">
                        Move Left
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        I
                      </kbd>
                      <span className="text-gray-400">
                        Jump
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">
                        L
                      </kbd>
                      <span className="text-gray-400">
                        Move Right
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors"
              >
                START GAME
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white z-40">
            <h2 className="mb-4">GAME OVER</h2>
            <div className="mb-6 text-center space-y-2">
              <p>
                Good Path Score: {leftPlayerRef.current.score}
              </p>
              <p>
                Hard Path Score: {rightPlayerRef.current.score}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors"
              >
                RESTART
              </button>
              <button
                onClick={() => {
                  setGameStarted(false);
                  setGameOver(false);
                }}
                className="px-8 py-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                EXIT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Legend */}
      {gameStarted && !gameOver && (
        <div className="flex gap-12 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black"></div>
            <span>Left: A/W/D</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300"></div>
            <span>Right: J/I/L</span>
          </div>
        </div>
      )}
    </div>
  );
}