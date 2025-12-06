import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Phaser from "phaser";
import "./Lab.scss";

// --- PHASER SCENE LOGIC ---
class LabScene extends Phaser.Scene {
  private clickCount = 0;
  private createdImages: Phaser.GameObjects.Image[] = [];
  private labContainer!: Phaser.GameObjects.Container;
  private bg!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "LabScene" });
  }

  preload(): void {
    // Load assets
    this.load.image("laboratory", "/assets/laboratory.jpg");
    this.load.image("sonrisitas", "/assets/sonrisitas.png");
    this.load.audio("sorry1", "/assets/sorry1.mp3");
    this.load.audio("sorry2", "/assets/sorry2.mp3");
    this.load.audio("sorry3", "/assets/sorry3.mp3");
  }

  create() {
    const { width, height } = this.scale;

    // 1. Setup Container for Background + Click Zones
    this.labContainer = this.add.container(0, 0);

    // 2. Setup Background Image inside Container
    // We use origin (0,0) so coordinates match the image pixels exactly
    this.bg = this.add.image(0, 0, "laboratory").setOrigin(0, 0);
    this.labContainer.add(this.bg);

    // 3. Fit the container to the screen
    this.fitContainer(width, height);

    // Handle window resize
    this.scale.on("resize", (gameSize: Phaser.Structs.Size) => {
      this.fitContainer(gameSize.width, gameSize.height);
    });

    // 4. DEBUG TOOL: Log IMAGE coordinates
    // Open Developer Tools (F12) -> Console. Click on the image to see x,y relative to the image.
    this.bg.setInteractive();
    this.bg.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer, localX: number, localY: number) => {
        console.log(
          `Image Coordinates: x=${Math.round(localX)}, y=${Math.round(localY)}`
        );
      }
    );

    // 5. DEFINE CLICKABLE AREAS HERE
    // IMPORTANT: You need to update these points using the new "Image Coordinates" from the console.
    // The current points are likely screen coordinates and will need to be re-done.

    const points = [
      { x: 363, y: 468 },
      { x: 345, y: 655 },
      { x: 482, y: 680 },
      { x: 821, y: 623 },
      { x: 857, y: 581 },
      { x: 950, y: 559 },
      { x: 1086, y: 541 },
      { x: 1154, y: 541 },
      { x: 1180, y: 527 },
      { x: 1230, y: 522 },
      { x: 1213, y: 403 },
      { x: 1130, y: 356 },
      { x: 768, y: 420 },
      { x: 571, y: 419 },
      { x: 357, y: 464 },
    ];

    this.createClickablePolygon(points);
  }

  // Helper to scale and center the container to cover the screen
  fitContainer(width: number, height: number) {
    if (!this.bg) return;

    const imgWidth = this.bg.width;
    const imgHeight = this.bg.height;

    // Calculate scale to cover
    const scaleX = width / imgWidth;
    const scaleY = height / imgHeight;
    const scale = Math.max(scaleX, scaleY);

    this.labContainer.setScale(scale);

    // Center the container
    const x = (width - imgWidth * scale) / 2;
    const y = (height - imgHeight * scale) / 2;

    this.labContainer.setPosition(x, y);
  }

  // Helper to create invisible clickable polygon inside the container
  createClickablePolygon(points: { x: number; y: number }[]) {
    const polygon = new Phaser.Geom.Polygon(points);

    const graphics = this.add.graphics();
    // Set alpha to 0.5 to debug the shape, 0.0 to make it invisible
    graphics.fillStyle(0x00ff00, 0.0);
    graphics.fillPoints(polygon.points, true);

    graphics.setInteractive(polygon, Phaser.Geom.Polygon.Contains);

    graphics.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.handleInteraction(pointer.x, pointer.y);
    });

    // Add to container so it moves/scales with the background
    this.labContainer.add(graphics);
  }

  // Helper to create invisible clickable zones inside the container
  createClickableArea(x: number, y: number, w: number, h: number) {
    // The last parameter (0.0) is alpha. Change to 0.5 to see the red box for debugging.
    const zone = this.add.rectangle(x, y, w, h, 0xff0000, 0.0);
    zone.setInteractive({ useHandCursor: true });

    zone.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.handleInteraction(pointer.x, pointer.y);
    });

    // Add to container so it moves/scales with the background
    this.labContainer.add(zone);
  }

  handleInteraction(x: number, y: number) {
    if (this.clickCount >= 10) return;

    this.clickCount++;

    // Show sample image at the clicked location
    const img = this.add.image(x, y, "sonrisitas");
    this.createdImages.push(img);

    // Play random sound
    const sounds = ["sorry1", "sorry2", "sorry3"];
    const randomSound = Phaser.Math.RND.pick(sounds);
    this.sound.play(randomSound);

    if (this.clickCount === 10) {
      this.startEndingSequence();
    }
  }

  startEndingSequence() {
    const { width, height } = this.scale;
    const sounds = ["sorry1", "sorry2", "sorry3"];

    // 1. Scale up all images to cover screen
    this.createdImages.forEach((img) => {
      // Calculate scale to cover the screen
      const scaleX = width / img.width;
      const scaleY = height / img.height;
      const targetScale = Math.max(scaleX, scaleY);

      this.tweens.add({
        targets: img,
        scale: targetScale,
        duration: 4000,
        ease: "Power2",
      });
    });

    // 2. Fast series of random audios
    const timer = this.time.addEvent({
      delay: 150, // Play a sound every 150ms
      callback: () => {
        const randomSound = Phaser.Math.RND.pick(sounds);
        this.sound.play(randomSound);
      },
      loop: true,
    });

    // Stop the sounds after 4 seconds and navigate
    this.time.delayedCall(4000, () => {
      timer.remove();
      const onComplete = this.registry.get("onComplete");
      if (onComplete) onComplete();
    });
  }
}
// --------------------------

const Lab: React.FC = () => {
  const navigate = useNavigate();
  const [showInitialImage, setShowInitialImage] = useState(true);
  const [startDisappearing, setStartDisappearing] = useState(false);

  const handleImageClick = () => {
    setStartDisappearing(true);
  };

  useEffect(() => {
    if (startDisappearing) {
      const timer = setTimeout(() => {
        setShowInitialImage(false); // Remove the image after the animation
      }, 5000); // Match the duration of the animation
      return () => clearTimeout(timer);
    }
  }, [startDisappearing]);

  // Initialize Phaser when the initial image is gone
  useEffect(() => {
    if (!showInitialImage) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: "phaser-lab-container", // ID of the div below
        width: window.innerWidth,
        height: window.innerHeight,
        scene: LabScene,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
      };

      const game = new Phaser.Game(config);

      // Pass navigation callback to the scene
      game.registry.set("onComplete", () => {
        navigate("/4");
      });

      return () => {
        game.destroy(true);
      };
    }
  }, [showInitialImage, navigate]);

  return (
    <div className="lab-scene">
      {showInitialImage ? (
        <div
          className={`full-height-image-container ${
            startDisappearing ? "disappear" : ""
          }`}
        >
          <img
            src="/assets/ilpostfull.jpg"
            alt="Full Height"
            className="full-height-image"
            onClick={handleImageClick}
          />
        </div>
      ) : (
        <div id="phaser-lab-container"></div>
      )}
    </div>
  );
};

export default Lab;
