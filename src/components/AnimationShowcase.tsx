import { Heart } from "lucide-react";
import { BrokenHeart } from "./BrokenHeart";
import { useState, useEffect } from "react";

export function AnimationShowcase() {
  const [goodHearts, setGoodHearts] = useState<{ id: number; time: number }[]>([]);
  const [badHearts, setBadHearts] = useState<{ id: number; time: number }[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoodHearts(prev => prev.map(h => ({ ...h, time: h.time + 1 })).filter(h => h.time < 50));
      setBadHearts(prev => prev.map(h => ({ ...h, time: h.time + 1 })).filter(h => h.time < 50));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const addGoodHeart = () => {
    setGoodHearts(prev => [...prev, { id: counter, time: 0 }]);
    setCounter(c => c + 1);
  };

  const addBadHeart = () => {
    setBadHearts(prev => [...prev, { id: counter, time: 0 }]);
    setCounter(c => c + 1);
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      <div className="mb-8 text-center">
        <p className="text-gray-600 mb-4">
          Click the buttons below to see the animations in action!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Good Heart Demo */}
        <div className="bg-white p-6 rounded-lg border-2 border-green-200 relative overflow-hidden" style={{ height: 300 }}>
          <h3 className="mb-3 text-green-700">✅ Good Collectible</h3>
          <p className="text-sm text-gray-600 mb-4">
            Bright red heart with soft white glow, floats upward smoothly
          </p>
          <button
            onClick={addGoodHeart}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Spawn Good Heart
          </button>
          
          {/* Animation container */}
          <div className="absolute inset-0 pointer-events-none">
            {goodHearts.map(heart => {
              const opacity = 1 - (heart.time / 50);
              const y = 150 - (heart.time * 2);
              
              return (
                <div
                  key={heart.id}
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: y,
                    opacity,
                  }}
                >
                  <div style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 4px rgba(255, 100, 100, 0.6))',
                  }}>
                    <Heart size={32} fill="#EF4444" className="text-red-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bad Heart Demo */}
        <div className="bg-black p-6 rounded-lg border-2 border-red-900 relative overflow-hidden" style={{ height: 300 }}>
          <h3 className="mb-3 text-red-400">❌ Bad Collectible</h3>
          <p className="text-sm text-gray-400 mb-4">
            Broken heart drops down, shakes horizontally, rotates
          </p>
          <button
            onClick={addBadHeart}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
          >
            Spawn Broken Heart
          </button>
          
          {/* Animation container */}
          <div className="absolute inset-0 pointer-events-none">
            {badHearts.map(heart => {
              const progress = heart.time / 50;
              const opacity = 1 - progress;
              const shakeX = Math.sin(heart.time * 0.5) * 3;
              const y = 150 + Math.sin(progress * Math.PI) * 8 - (heart.time * 2);
              const rotation = Math.sin(heart.time * 0.4) * 5;
              
              return (
                <div
                  key={heart.id}
                  className="absolute left-1/2"
                  style={{
                    top: y,
                    opacity,
                    transform: `translateX(calc(-50% + ${shakeX}px)) rotate(${rotation}deg)`,
                  }}
                >
                  <BrokenHeart size={32} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="mb-2 text-blue-900">Technical Details</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Good Heart:</strong> ~0.8s animation, floats upward with soft glow effect</li>
          <li><strong>Bad Heart:</strong> ~0.8s animation, drops down + horizontal shake + rotation jitter</li>
          <li><strong>Both:</strong> Fade from 100% → 0% opacity, centered for easy gameplay alignment</li>
        </ul>
      </div>
    </div>
  );
}
