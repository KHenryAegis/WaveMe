"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions and Classes for Fireworks ---

// Generates a random number within a range
const random = (min, max) => Math.random() * (max - min) + min;

// Calculates distance between two points
const calculateDistance = (p1x, p1y, p2x, p2y) => {
  const xDistance = p1x - p2x;
  const yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

// Represents a single particle from a firework explosion
class Particle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    this.friction = 0.95;
    this.gravity = 1;
    this.hue = hue;
    this.brightness = random(50, 80);
    this.alpha = 1;
    this.decay = random(0.015, 0.03);
  }

  update(index, particles) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
  }
}

// Represents a firework rocket before it explodes
class Firework {
  constructor(sx, sy, tx, ty) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);
    this.targetRadius = 1;
    this.hue = random(0, 360);
  }

  update(index, fireworks, particles) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }

    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    
    // Update the position
    this.x += vx;
    this.y += vy;
    
    // Recalculate the distance traveled based on the new position
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x, this.y);

    // Check if the firework has reached or passed its target
    if (this.distanceTraveled >= this.distanceToTarget) {
      // Create explosion particles at the target coordinates
      let i = 100; // particle count
      while (i--) {
        particles.push(new Particle(this.tx, this.ty, this.hue));
      }
      // Remove the firework from the array
      fireworks.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
}


// --- React Components ---

// Canvas component for rendering the firework animation
const FireworksCanvas = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const fireworks = useRef([]);
  const particles = useRef([]);
  const launchInterval = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    canvas.width = vw;
    canvas.height = vh;

    const launchFirework = () => {
      if (fireworks.current.length < 5) { // Limit number of simultaneous fireworks
        const startX = vw / 2;
        const startY = vh;
        const targetX = random(0, vw);
        const targetY = random(0, vh / 2);
        fireworks.current.push(new Firework(startX, startY, targetX, targetY));
      }
    };

    const loop = () => {
      animationFrameId.current = requestAnimationFrame(loop);
      // Add a semi-transparent background to create a trailing effect
      ctx.globalCompositeOperation = 'destination-out';
      // Changed to midnight blue for better contrast on dark backgrounds
      ctx.fillStyle = 'rgba(25, 25, 112, 0.5)'; 
      ctx.fillRect(0, 0, vw, vh);
      ctx.globalCompositeOperation = 'lighter';

      // --- UPDATE PHASE ---
      // Update all fireworks. This may remove fireworks and add particles.
      let i = fireworks.current.length;
      while (i--) {
        fireworks.current[i].update(i, fireworks.current, particles.current);
      }

      // Update all particles. This may remove particles.
      let j = particles.current.length;
      while (j--) {
        particles.current[j].update(j, particles.current);
      }
      
      // --- DRAW PHASE ---
      // Draw all remaining fireworks.
      for (const firework of fireworks.current) {
        firework.draw(ctx);
      }

      // Draw all remaining particles.
      for (const particle of particles.current) {
        particle.draw(ctx);
      }
    };

    // Start animation
    loop();

    // Launch a few fireworks automatically on load
    launchFirework();
    launchInterval.current = setInterval(launchFirework, 800);

    // Stop launching new fireworks after a few seconds
    setTimeout(() => {
      clearInterval(launchInterval.current);
    }, 4000);

    // Cleanup function
    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if(launchInterval.current) clearInterval(launchInterval.current);
      // Clear any remaining particles and fireworks
      fireworks.current = [];
      particles.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};


// Main App Component
export default function App() {
  // State for the editable introduction text
  const [introText, setIntroText] = useState(
    "Hello! I'm Alex, a creative developer and photographer. I love building beautiful things for the web and capturing moments in time. Welcome to my personal space!"
  );
  // State for the modal visibility
  const [isEditing, setIsEditing] = useState(false);
  // State for the text inside the modal's textarea
  const [editText, setEditText] = useState(introText);

  const handleEdit = () => {
    setEditText(introText);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIntroText(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <FireworksCanvas />
      <div className="relative z-10 font-sans bg-gray-900 text-white min-h-screen flex flex-col p-6 sm:p-8">
        
        {/* --- Main Content --- */}
        <main className="flex-grow flex flex-col gap-8 w-full max-w-md mx-auto">
          
          {/* Top Section: Profile Info */}
          <div className="flex items-center gap-4 mt-8">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-cyan-400 object-cover"
              src="https://placehold.co/100x100/22d3ee/1e293b?text=A"
              alt="Profile picture"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/22d3ee/1e293b?text=A'; }}
            />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold">Alex Doe</h1>
              <p className="text-sm sm:text-base text-gray-300 mt-1">
                {introText}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-start">
            <button
              onClick={handleEdit}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Edit Intro
            </button>
          </div>

          {/* Bottom Section: Photo Frame */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">My Gallery</h2>
            <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
              <img
                className="w-full h-auto rounded-md"
                src="https://placehold.co/600x400/1e293b/ffffff?text=My+Latest+Photo"
                alt="Showcase of work or a personal photo"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/ffffff?text=Error'; }}
              />
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Alex Doe. All rights reserved.</p>
        </footer>

        {/* --- Edit Modal --- */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-xl">
              <h3 className="text-lg font-bold mb-4">Edit Introduction</h3>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full h-40 p-2 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
