import React, { useState, useRef, useEffect } from "react";
import Card from "./components/card";
import Navbar from "./components/navbar";

// Watermark Component
const Watermark = () => (
  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
    <h1 className="text-4xl font-bold text-gray-200">SimpleBoard+</h1>
  </div>
);

// Main App Component
const App = () => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("simpleBoardCards");
    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            id: 1,
            title: "Welcome to SimpleBoard+",
            content: "Double click to edit this card. Drag to move it around.",
            position: { x: 300, y: 250 },
            isSupporting: false,
          },
        ];
  });

  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Save to localStorage whenever cards change
  useEffect(() => {
    localStorage.setItem("simpleBoardCards", JSON.stringify(cards));
  }, [cards]);

  const handleDragStart = (e, card) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setDraggedCard(card);
    setDragOffset({
      x: e.clientX - (rect.left + card.position.x),
      y: e.clientY - (rect.top + card.position.y),
    });
  };

  const handleDragMove = (e) => {
    if (draggedCard) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      setCards(
        cards.map((card) =>
          card.id === draggedCard.id ? { ...card, position: { x, y } } : card
        )
      );
    }
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleCardUpdate = (id, field, value) => {
    if (field === "delete") {
      setCards(cards.filter((card) => card.id !== id));
      return;
    }

    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const handleClearBoard = () => {
    setCards([]);
  };

  const addNewCard = () => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const centerX = canvasRect.width / 2;
    const centerY = Math.min(300, canvasRect.height / 2);

    const newCard = {
      id: Date.now(),
      title: "New Card",
      content: "Double click to edit content...",
      position: { x: centerX, y: centerY },
      isSupporting: false,
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onAddCard={addNewCard} onClearBoard={handleClearBoard} />

      <div className="mx-auto max-w-7xl p-8 pt-20">
        <div
          ref={canvasRef}
          className="relative h-[800px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <Watermark />
          {cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onDragStart={(e) => handleDragStart(e, card)}
              setIsSupporting={(newValue) => {
                handleCardUpdate(card.id, "isSupporting", newValue);
              }}
              onUpdate={handleCardUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
