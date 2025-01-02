"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Colorpicker() {
  const [color, setColor] = useState<string>("#000000");
  const [displayFormat, setDisplayFormat] = useState<"HEX" | "RGB">("HEX");

  const handleColorChanges = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(color);
    alert("Copied to Clipboard");
  };

  const toggleDisplayFormat = (): void => {
    setDisplayFormat(displayFormat === "HEX" ? "RGB" : "HEX");
  };

  const rgb = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto p-6 grid gap-6 shadow-lg rounded-xl">
        <div className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">🎨 Smart Color Picker</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Select a color, preview gradients, and copy HEX/RGB values
          </CardDescription>
        </div>

        {/* Color and Gradient Preview */}
        <div
          className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-800"
          style={{
            background: `linear-gradient(to right, ${color}, #ffffff)`,
          }}
        ></div>

        {/* HEX or RGB Display */}
        <div className="text-center space-y-2">
          {displayFormat === "HEX" ? (
            <div className="text-2xl font-semibold">{color}</div>
          ) : (
            <div className="text-xl font-semibold">
              RGB: {rgb.r}, {rgb.g}, {rgb.b}
            </div>
          )}
          <Button onClick={toggleDisplayFormat} variant="secondary" className="w-full">
            Switch to {displayFormat === "HEX" ? "RGB" : "HEX"}
          </Button>
        </div>

        {/* Copy to Clipboard */}
        <Button onClick={copyToClipboard} variant="default" className="w-full">
          Copy {displayFormat} Value
        </Button>

        {/* Color Picker Input */}
        <Input
          type="color"
          value={color}
          onChange={handleColorChanges}
          className="w-full h-12 cursor-pointer rounded-lg border-2 border-gray-300"
        />
      </Card>
    </div>
  );
}

export default Colorpicker;
