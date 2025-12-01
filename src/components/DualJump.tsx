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
  Syringe,
} from "lucide-react";
import { BrokenHeart } from "./BrokenHeart";
import { PlayerStickFigure } from "./PlayerStickFigure";
import tupitLogo from "../assets/TUPIT_2_color.png";
import { SyringeIcon } from "@/components/ui/syringe-icon";
import { StillIRiseExplanationPage } from "./StillIRiseExplanation";

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
  type: "book" | "money" | "food" | "gun" | "drug" | "police" | "baby";
  id: number;
  side: "left" | "right";
  collected: boolean;
  platformId?: number;
  platformOffsetX?: number;
}

interface FloatingHeart {
  x: number;
  y: number;
  id: number;
  isGood: boolean;
  opacity: number;
  time: number;
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
  const [showInfo, setShowInfo] = useState(false);

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
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
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

    // Left side platforms (Good Path)
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

      if (i % 2 === 0) {
        const roll = Math.random();

        if (roll < 0.1) {
          const badTypes: ("gun" | "drug" | "police" | "baby")[] = [
            "gun",
            "drug",
            "police",
            "baby",
          ];
          newCollectibles.push({
            x: x + 50,
            y: y - 40,
            type: badTypes[Math.floor(Math.random() * badTypes.length)],
            id: collectibleIdCounter.current++,
            side: "left",
            collected: false,
          });
        } else {
          const goodTypes: ("book" | "money" | "food")[] = ["book", "money", "food"];
          newCollectibles.push({
            x: x + 50,
            y: y - 40,
            type: goodTypes[Math.floor(Math.random() * goodTypes.length)],
            id: collectibleIdCounter.current++,
            side: "left",
            collected: false,
          });
        }
      }
    }

    // Right side platforms (Hard Path)
    const rightPlatformCount = 100;
    for (let i = 1; i <= rightPlatformCount; i++) {
      const y = GAME_HEIGHT - 90 - i * 80 + (Math.random() * 30 - 15);
      const x = HALF_WIDTH + Math.random() * (HALF_WIDTH - 110) + 10;

      const platformId = platformIdCounter.current++;
      const platform: Platform = {
        x,
        y,
        width: 80 + Math.random() * 30,
        height: 15,
        id: platformId,
        side: "right",
        movingOffset: 0,
        movingDirection: Math.random() > 0.5 ? 1 : -1,
        originalX: x,
      };

      newPlatforms.push(platform);
      const collectibleX = x + 30;
      const collectibleY = y - 40;

      if (i % 2 === 1) {
        const types: ("gun" | "drug" | "police" | "baby")[] = [
          "gun",
          "drug",
          "police",
          "baby",
        ];
        newCollectibles.push({
          x: collectibleX,
          y: collectibleY,
          type: types[Math.floor(Math.random() * types.length)],
          id: collectibleIdCounter.current++,
          side: "right",
          collected: false,
          platformId,
          platformOffsetX: collectibleX - x,
        });
      }
    }

    setPlatforms(newPlatforms);
    setCollectibles(newCollectibles);
  }, []);

  // Collision with platform
  const checkCollision = (player: Player, platform: Platform): boolean => {
    return (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height <= platform.y + 5 &&
      player.y + player.height + player.velocityY >= platform.y &&
      player.velocityY >= 0
    );
  };

  // Floating heart
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
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  const activateTupit = () => {
    setTupitActivated((alreadyOn) => {
      if (alreadyOn) return alreadyOn;

      const rightPlayer = rightPlayerRef.current;

      setCollectibles((prev) => {
        const newCollectibles = [...prev];

        platforms
          .filter(
            (p) =>
              p.side === "right" &&
              p.y < rightPlayer.y - 80, // above player
          )
          .forEach((p, index) => {
            if (index % 3 !== 0) return;

            const bookX = p.x + p.width / 2 - 15;
            const bookY = p.y - 40;

            const overlapsExisting = newCollectibles.some(
              (c) =>
                c.side === "right" &&
                Math.abs(c.x - bookX) < 10 &&
                Math.abs(c.y - bookY) < 10,
            );
            if (overlapsExisting) return;

            newCollectibles.push({
              x: bookX,
              y: bookY,
              type: "book",
              id: collectibleIdCounter.current++,
              side: "right",
              collected: false,
              platformId: p.id,
              platformOffsetX: bookX - p.x,
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

    // Left controls
    if (keysPressed.current.has("a") || keysPressed.current.has("A")) {
      leftPlayer.velocityX = -MOVE_SPEED;
    } else if (keysPressed.current.has("d") || keysPressed.current.has("D")) {
      leftPlayer.velocityX = MOVE_SPEED;
    } else {
      leftPlayer.velocityX = 0;
    }

    if (
      (keysPressed.current.has("w") || keysPressed.current.has("W")) &&
      !leftPlayer.isJumping
    ) {
      leftPlayer.velocityY = JUMP_FORCE;
      leftPlayer.isJumping = true;
    }

    // Right controls
    if (keysPressed.current.has("j") || keysPressed.current.has("J")) {
      rightPlayer.velocityX = -MOVE_SPEED;
    } else if (keysPressed.current.has("l") || keysPressed.current.has("L")) {
      rightPlayer.velocityX = MOVE_SPEED;
    } else {
      rightPlayer.velocityX = 0;
    }

    if (
      (keysPressed.current.has("i") || keysPressed.current.has("I")) &&
      !rightPlayer.isJumping
    ) {
      rightPlayer.velocityY = JUMP_FORCE;
      rightPlayer.isJumping = true;
    }

    // Physics for both players
    [leftPlayer, rightPlayer].forEach((player) => {
      player.velocityY += GRAVITY;
      player.x += player.velocityX;
      player.y += player.velocityY;

      const minX = player.side === "left" ? 0 : HALF_WIDTH;
      const maxX = player.side === "left" ? HALF_WIDTH : GAME_WIDTH;

      if (player.x < minX) player.x = minX;
      if (player.x + player.width > maxX) player.x = maxX - player.width;

      if (player.y < player.maxHeightReached) {
        player.maxHeightReached = player.y;
      }

      platforms.forEach((platform) => {
        if (platform.side === player.side || platform.y === GAME_HEIGHT - 40) {
          if (checkCollision(player, platform)) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.isJumping = false;
          }
        }
      });

      const cameraY = player.side === "left" ? leftCameraY.current : rightCameraY.current;
      const screenY = player.y - cameraY;

      if (screenY > GAME_HEIGHT + 50) {
        player.lives = 0;
      }

      if (
        player.y >= STARTING_Y &&
        player.maxHeightReached < STARTING_Y - 100
      ) {
        player.lives = 0;
      }
    });

    // Camera follow
    const leftPlayerScreenY = leftPlayer.y - leftCameraY.current;
    if (leftPlayerScreenY < CAMERA_ANCHOR && leftPlayer.velocityY < 0) {
      leftCameraY.current = leftPlayer.y - CAMERA_ANCHOR;
    }

    const rightPlayerScreenY = rightPlayer.y - rightCameraY.current;
    if (rightPlayerScreenY < CAMERA_ANCHOR && rightPlayer.velocityY < 0) {
      rightCameraY.current = rightPlayer.y - CAMERA_ANCHOR;
    }

    // Moving platforms + attached collectibles
    const platformById: Record<number, Platform> = {};

    const updatedPlatforms = platforms.map((platform) => {
      if (
        platform.side === "right" &&
        platform.movingOffset !== undefined &&
        platform.originalX !== undefined
      ) {
        const newOffset = platform.movingOffset + platform.movingDirection! * 1;
        let newDirection = platform.movingDirection!;

        if (Math.abs(newOffset) > 40) {
          newDirection *= -1;
        }

        const newX = platform.originalX + newOffset;
        const updated = {
          ...platform,
          movingOffset: newOffset,
          movingDirection: newDirection,
          x: newX,
        };
        platformById[updated.id] = updated;
        return updated;
      }

      platformById[platform.id] = platform;
      return platform;
    });

    setPlatforms(updatedPlatforms);

    setCollectibles((prev) =>
      prev.map((c) => {
        if (c.side === "right" && c.platformId != null && c.platformOffsetX != null) {
          const plat = platformById[c.platformId];
          if (plat) {
            return { ...c, x: plat.x + c.platformOffsetX };
          }
        }
        return c;
      }),
    );

    // Collectible collisions
    setCollectibles((prev) =>
      prev.map((collectible) => {
        if (collectible.collected) return collectible;

        const player = collectible.side === "left" ? leftPlayer : rightPlayer;
        const cameraY =
          collectible.side === "left" ? leftCameraY.current : rightCameraY.current;

        if (
          player.x < collectible.x + 30 &&
          player.x + player.width > collectible.x &&
          player.y < collectible.y + 30 &&
          player.y + player.height > collectible.y
        ) {
          if (["book", "money", "food"].includes(collectible.type)) {
            player.lives = Math.min(player.lives + 1, 5);
            player.score += 10;
            addFloatingHeart(collectible.x, collectible.y, true, cameraY);
          } else {
            player.lives -= 1;
            addFloatingHeart(collectible.x, collectible.y, false, cameraY);
          }

          return { ...collectible, collected: true };
        }
        return collectible;
      }),
    );

    // Floating hearts animation
    setFloatingHearts((prev) =>
      prev.map((heart) => ({
        ...heart,
        y: heart.y - 2,
        opacity: heart.opacity - 0.02,
        time: heart.time + 1,
      })),
    );

    if (leftPlayer.lives <= 0 || rightPlayer.lives <= 0) {
      setGameOver(true);
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameOver, platforms, tupitActivated]);

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

  // Keyboard events
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

  const CollectibleIcon = ({
    type,
    side,
  }: {
    type: string;
    side: "left" | "right";
  }) => {
    const iconProps = { size: 28, strokeWidth: 1.5 };
    const colorClass = side === "left" ? "text-black" : "text-white";

    switch (type) {
      case "book":
        return <BookOpen {...iconProps} className={colorClass} />;
      case "money":
        return <DollarSign {...iconProps} className={colorClass} />;
      case "food":
        return <Apple {...iconProps} className={colorClass} />;
      case "gun":
        return <Skull {...iconProps} className={colorClass} />;
      case "drug":
        return <SyringeIcon size={28} side={side} />;
      case "police":
        return <Car {...iconProps} className={colorClass} />;
      case "baby":
        return <Baby {...iconProps} className={colorClass} />;
      default:
        return null;
    }
  };

  // 🔴 ABOUT PAGE: if true, show explanation page and nothing else
  if (showInfo) {
    return (
      <StillIRiseExplanationPage onBack={() => setShowInfo(false)} />
    );
  }

  // MAIN GAME RENDER
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Game Canvas */}
      <div
        className="relative border-4 border-black overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Left Half */}
        <div
          className="absolute top-0 left-0 bg-white overflow-hidden"
          style={{ width: HALF_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Score & Lives */}
          <div className="absolute top-4 left-4 text-black z-10">
            <div>Score: {leftPlayerRef.current.score}</div>
            <div className="flex items-center gap-1 mt-1">
              <span>Lives:</span>
              {Array.from({ length: leftPlayerRef.current.lives }).map((_, i) => (
                <Heart key={i} size={16} fill="red" className="text-red-600" />
              ))}
            </div>
          </div>

          {/* Up Arrow */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-400 opacity-30 z-10">
            <div className="text-center text-[rgb(69,74,82)] text-[24px]">↑</div>
            <div className="text-xs text-[rgba(153,161,175,0)]">GOOD PATH</div>
          </div>

          {/* Platforms & Entities */}
          <div className="absolute inset-0">
            {platforms
              .filter((p) => p.side === "left" || p.y === GAME_HEIGHT - 40)
              .map((platform) => {
                const screenY = platform.y - leftCameraY.current;
                const screenX = platform.x;
                return (
                  <div
                    key={platform.id}
                    className="absolute bg-gray-300 shadow-md"
                    style={{
                      left: screenX,
                      top: screenY,
                      width:
                        platform.side === "left" || platform.y === GAME_HEIGHT - 40
                          ? platform.width
                          : HALF_WIDTH,
                      height: platform.height,
                    }}
                  />
                );
              })}

            {/* Collectibles */}
            {collectibles
              .filter((c) => c.side === "left" && !c.collected)
              .map((collectible) => {
                const screenY = collectible.y - leftCameraY.current;
                return (
                  <div
                    key={collectible.id}
                    className="absolute"
                    style={{ left: collectible.x, top: screenY }}
                  >
                    <CollectibleIcon type={collectible.type} side="left" />
                  </div>
                );
              })}

            {/* Player */}
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

        {/* Right Half */}
        <div
          className="absolute top-0 bg-black overflow-hidden"
          style={{ left: HALF_WIDTH, width: HALF_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Score, Lives & TUPIT */}
          <div className="absolute top-4 right-4 text-white text-right z-10">
            <div>Score: {rightPlayerRef.current.score}</div>

            <div className="flex items-center justify-end gap-1 mt-1">
              <span>Lives:</span>
              {Array.from({ length: rightPlayerRef.current.lives }).map((_, i) => (
                <Heart key={i} size={16} fill="red" className="text-red-600" />
              ))}
            </div>

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
                  opacity: tupitActivated ? 1 : 0.6,
                  filter: tupitActivated
                    ? "none"
                    : "grayscale(90%) brightness(90%)",
                  display: "block",
                }}
              />
            </button>
          </div>

          {/* Up Arrow */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-600 opacity-30 z-10">
            <div className="text-center text-[rgb(255,255,255)] text-[24px]">↑</div>
            <div className="text-xs text-[rgba(74,85,101,0)]">HARD PATH</div>
          </div>

          {/* Platforms & Entities */}
          <div className="absolute inset-0">
            {platforms
              .filter((p) => p.side === "right" || p.y === GAME_HEIGHT - 40)
              .map((platform) => {
                const screenY = platform.y - rightCameraY.current;
                const screenX = platform.side === "right" ? platform.x - HALF_WIDTH : 0;
                return (
                  <div
                    key={platform.id}
                    className="absolute bg-gray-700 shadow-md"
                    style={{
                      left: screenX,
                      top: screenY,
                      width:
                        platform.side === "right" ? platform.width : HALF_WIDTH,
                      height: platform.height,
                    }}
                  >
                    {platform.movingDirection && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                        {platform.movingDirection > 0 ? "→" : "←"}
                      </div>
                    )}
                  </div>
                );
              })}

            {/* Collectibles */}
            {collectibles
              .filter((c) => c.side === "right" && !c.collected)
              .map((collectible) => {
                const screenY = collectible.y - rightCameraY.current;
                return (
                  <div
                    key={collectible.id}
                    className="absolute"
                    style={{
                      left: collectible.x - HALF_WIDTH,
                      top: screenY,
                    }}
                  >
                    <CollectibleIcon type={collectible.type} side="right" />
                  </div>
                );
              })}

            {/* Player */}
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

        {/* Center Divider */}
        <div
          className="absolute top-0 w-1 bg-gray-500 z-20"
          style={{ left: HALF_WIDTH - 0.5, height: GAME_HEIGHT }}
        />

        {/* Floating Hearts */}
        {floatingHearts.map((heart) => {
          const progress = heart.time / 50;
          const goodHeartY = heart.y;
          const shakeX = heart.isGood ? 0 : Math.sin(heart.time * 0.5) * 3;
          const badHeartY =
            heart.y + (heart.isGood ? 0 : Math.sin(progress * Math.PI) * 8);
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
                transition: "transform 0.1s ease-out",
              }}
            >
              {heart.isGood ? (
                <div
                  style={{
                    filter:
                      "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 4px rgba(255, 100, 100, 0.6))",
                  }}
                >
                  <Heart size={32} fill="#EF4444" className="text-red-500" />
                </div>
              ) : (
                <BrokenHeart size={32} />
              )}
            </div>
          );
        })}

        {/* Start Screen */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 z-40">
            <div className="text-white text-center max-w-3xl p-8">
              <h2 className="text-sm tracking-[0.35em] uppercase text-gray-400 mb-2">
                Still I Rise
              </h2>
              <p className="text-lg font-semibold mb-4">
                Two players, two paths, one climb.
              </p>
              <p className="text-sm text-gray-300 mb-8">
                Climb as high as you can. Collect good items and glowing hearts to stay alive, 
                avoid bad items and falling off the screen. The left side is more stable; the 
                right side is harder and more unstable.
              </p>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-8 mb-8 text-left">
                <div>
                  <h3 className="mb-2 text-gray-200 font-semibold">Good Path (Left)</h3>
                  <p className="text-sm mb-3 text-gray-400">
                    Collect books, apples, and dollar signs to gain hearts and climb higher.
                    Platforms are mostly stable.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">A</kbd>
                      <span className="text-gray-400">Move Left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">W</kbd>
                      <span className="text-gray-400">Jump</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">D</kbd>
                      <span className="text-gray-400">Move Right</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-gray-200 font-semibold">Hard Path (Right)</h3>
                  <p className="text-sm mb-3 text-gray-400">
                    Platforms move and shift. Avoid red icons and cracked hearts. 
                    Click the TUPIT logo during the climb to trigger extra book drops.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">J</kbd>
                      <span className="text-gray-400">Move Left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">I</kbd>
                      <span className="text-gray-400">Jump</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-gray-700 rounded">L</kbd>
                      <span className="text-gray-400">Move Right</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual legend */}
              <div className="mb-8 text-sm text-gray-300">
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart size={16} fill="red" className="text-red-500" />
                    <span>Glowing Heart = extra life</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-white" />
                    <Apple size={16} className="text-white" />
                    <DollarSign size={16} className="text-white" />
                    <span>Good collectibles = help you rise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BrokenHeart size={16} />
                    <Skull size={16} className="text-white" />
                    <Car size={16} className="text-white" />
                    <Baby size={16} className="text-white" />
                    <Syringe size={16} className="text-white" />
                    <span>Bad collectibles = take hearts / knock you down</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-2 flex justify-center gap-4">
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg"
                >
                  START GAME
                </button>
                <button
                  onClick={() => setShowInfo(true)}
                  className="px-8 py-3 bg-blue-900 text-white hover:bg-blue-700 transition-colors rounded-lg"
                >
                  ABOUT THIS GAME
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Game Over */}
       {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white z-40">
          <h2 className="mb-4 text-2xl font-bold tracking-wide">GAME OVER</h2>

          <div className="mb-6 text-center space-y-2 text-gray-300">
            <p>Good Path Score: {leftPlayerRef.current.score}</p>
            <p>Hard Path Score: {rightPlayerRef.current.score}</p>
          </div>

          <div className="flex gap-4">
            {/* Restart */}
            <button
              onClick={startGame}
              className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg"
            >
              RESTART
            </button>

            {/* Exit to Start */}
            <button
              onClick={() => {
                setGameStarted(false);
                setGameOver(false);
              }}
              className="px-8 py-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded-lg"
            >
              EXIT
            </button>

            {/* About This Game */}
            <button
              onClick={() => {
                setGameStarted(false);
                setGameOver(false);
                setShowInfo(true); // <-- opens About section
              }}
              className="px-8 py-3 bg-blue-900 text-white hover:bg-blue-700 transition-colors rounded-lg"
            >
              ABOUT THIS GAME
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
