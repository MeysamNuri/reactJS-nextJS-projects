function hex(c) {
  let s = "0123456789abcdef";
  let i = parseInt(c);
  if (i == 0 || isNaN(c)) {
    return "00";
  }
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) {
  return s.charAt(0) == "#" ? s.substring(1, 7) : s;
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
  let color = [];
  color[0] = parseInt(trim(hex).substring(0, 2), 16);
  color[1] = parseInt(trim(hex).substring(2, 4), 16);
  color[2] = parseInt(trim(hex).substring(4, 6), 16);
  return color;
}

export function generateColor(colorStart, colorEnd, colorCount) {
  // The beginning of your gradient
  let start = convertToRGB(colorStart);

  // The end of your gradient
  let end = convertToRGB(colorEnd);

  // The number of colors to compute
  let len = colorCount;
  //Alpha blending amount
  let alpha = 0.0;

  let saida = [];

  // for (let i = 0; i < len; i++) {
    let c = [];
    alpha += 1.0 / len;

    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    saida.push(`#${convertToHex(c)}`);
  // }

  return saida;
}
export function scale(count) {
  if (!typeof count === "number") {
    return 1;
  }
  let _scale = 0.5;
  if (count <= 5) {
    _scale = 0.65;
  } else if (count > 5 && count <= 10) {
    _scale = 0.75;
  } else if (count > 10 && count <= 20) {
    _scale = 0.85;
  } else if (count > 20 && count <= 50) {
    _scale = 1.05;
  } else if (count > 50) {
    _scale = 1.15;
  }
  return _scale;
}

// Exemplo de como usar

// let tmp = generateColor('#4CAF50', '#D32F2F', 50);
