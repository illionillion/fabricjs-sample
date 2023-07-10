"use strict";

const state = {
    mode: 'draw'
}

const main = () => {

  const canvas = new fabric.Canvas("canvas");
  const screen = document.querySelector(".screen");

  resize(canvas, screen);
  window.addEventListener("resize", () => resize(canvas, screen));
  document.getElementById('draw').addEventListener('click', () => draw(canvas))
  document.getElementById('erase').addEventListener('click', () => erase(canvas))

  draw(canvas)
};

const draw = (canvas) => {
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "black";
  canvas.isDrawingMode = true;
};

const erase = (canvas) => {
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.width = 10;
  canvas.freeDrawingBrush.color = "white";
  canvas.isDrawingMode = true;
};

const resize = (canvas, screen) => {
  // 画面の横幅を取得
  const screenWidth = window.innerWidth;
  // 縦幅いっぱいを取得
  const screenHeight = screen.clientHeight;

  canvas.setWidth(screenWidth);
  canvas.setHeight(screenHeight);
  canvas.renderAll();
};

window.addEventListener("load", main);
