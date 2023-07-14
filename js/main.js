"use strict";

(() => {
  const state = {
    canvas: undefined,
    screen: undefined,
    color: "",
    mode: "draw",
    width: 5,
  };

  const main = () => {
    const canvas = new fabric.Canvas("canvas");
    const screen = document.querySelector(".screen");
    const colorPicker = document.getElementById("color");
    const widthRange = document.getElementById("width-range");
    state.color = colorPicker.value;
    state.canvas = canvas;
    state.screen = screen;

    resize();
    window.addEventListener("resize", resize);
    document.getElementById("draw").addEventListener("click", draw);
    document.getElementById("erase").addEventListener("click", erase);
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("download").addEventListener("click", download);
    colorPicker.addEventListener("input", colorChange);
    // widthRange.addEventListener("input", widthChange);

    draw(canvas);
  };

  const draw = () => {
    const canvas = state.canvas;
    state.mode = "draw";
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = state.width;
    canvas.freeDrawingBrush.color = state.color;
    canvas.isDrawingMode = true;
  };

  const erase = () => {
    const canvas = state.canvas;
    state.mode = "erase";
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = state.width;
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

  const download = () => {
    let canvasToDL = document.getElementById("canvas");
    let link = document.createElement("a");
    link.href = canvasToDL.toDataURL("image/png");
    link.download = "drawing.png";
    link.click();
  };

  const colorChange = (e) => {
    state.color = e.target.value;
    if (state.mode === "draw")
      state.canvas.freeDrawingBrush.color = state.color;
  };

  const widthChange = (e) => {
    state.width = e.target.value;
    state.canvas.freeDrawingBrush.width = state.width;
    e.target.title = `太さ：${state.width}px`;
  };

  window.addEventListener("load", main);
})();
