"use strict";

(() => {
  const state = {
    canvas: undefined,
    screen: undefined,
    color: "",
    mode: "draw",
  };

  const main = () => {
    const canvas = new fabric.Canvas("canvas");
    const screen = document.querySelector(".screen");
    const colorPicker = document.getElementById("color");
    state.color = colorPicker.value;
    state.canvas = canvas;
    state.screen = screen;

    resize();
    window.addEventListener("resize", resize);
    document.getElementById("draw").addEventListener("click", draw);
    document.getElementById("erase").addEventListener("click", erase);
    document.getElementById("clear").addEventListener("click", clear);
    colorPicker.addEventListener("input", colorChange);

    draw(canvas);
  };

  const draw = () => {
    const canvas = state.canvas;
    state.mode = "draw";
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = state.color;
    canvas.isDrawingMode = true;
  };

  const erase = () => {
    const canvas = state.canvas;
    state.mode = "erase";
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = "white";
    canvas.isDrawingMode = true;
  };

  const resize = () => {
    const canvas = state.canvas;
    const screen = state.screen;
    // 画面の横幅を取得
    const screenWidth = document.documentElement.clientWidth;
    // 縦幅いっぱいを取得
    const screenHeight = screen.clientHeight;

    canvas.setWidth(screenWidth);
    canvas.setHeight(screenHeight);
    canvas.renderAll();
  };

  const clear = () => {
    const canvas = state.canvas;
    canvas.clear();
  };

  const colorChange = (e) => {
    state.color = e.target.value;
    if (state.mode === "draw")
      state.canvas.freeDrawingBrush.color = state.color;
  };

  window.addEventListener("load", main);
})();
