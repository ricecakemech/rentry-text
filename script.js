// added fallbacks just in case someone doesn't have these installed
const fonts = [
  { name: 'Georgia', family: 'Georgia, serif', category: 'serif' },
  { name: 'Times New Roman', family: 'Times New Roman, Times, serif', category: 'serif' },
  { name: 'Palatino', family: 'Palatino Linotype, Palatino, serif', category: 'serif' },
  { name: 'Book Antiqua', family: 'Book Antiqua, Palatino, serif', category: 'serif' },
  { name: 'Garamond', family: 'Garamond, serif', category: 'serif' },
  { name: 'Cambria', family: 'Cambria, serif', category: 'serif' },
  { name: 'Didot', family: 'Didot, serif', category: 'serif' },
  { name: 'Bodoni MT', family: 'Bodoni MT, serif', category: 'serif' },
  { name: 'Arial', family: 'Arial, Helvetica, sans-serif', category: 'sans-serif' },
  { name: 'Verdana', family: 'Verdana, Geneva, sans-serif', category: 'sans-serif' },
  { name: 'Trebuchet MS', family: 'Trebuchet MS, sans-serif', category: 'sans-serif' },
  { name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif', category: 'sans-serif' },
  { name: 'Helvetica', family: 'Helvetica, Arial, sans-serif', category: 'sans-serif' },
  { name: 'Impact', family: 'Impact, Charcoal, sans-serif', category: 'sans-serif' },
  { name: 'Arial Black', family: 'Arial Black, Gadget, sans-serif', category: 'sans-serif' },
  { name: 'Lucida Sans', family: 'Lucida Sans Unicode, Lucida Grande, sans-serif', category: 'sans-serif' },
  { name: 'Century Gothic', family: 'Century Gothic, sans-serif', category: 'sans-serif' },
  { name: 'Segoe UI', family: 'Segoe UI, sans-serif', category: 'sans-serif' },
  { name: 'Calibri', family: 'Calibri, sans-serif', category: 'sans-serif' },
  { name: 'Candara', family: 'Candara, sans-serif', category: 'sans-serif' },
  { name: 'Optima', family: 'Optima, sans-serif', category: 'sans-serif' },
  { name: 'Gill Sans', family: 'Gill Sans, sans-serif', category: 'sans-serif' },
  { name: 'Franklin Gothic', family: 'Franklin Gothic Medium, sans-serif', category: 'sans-serif' },
  { name: 'Courier New', family: 'Courier New, Courier, monospace', category: 'monospace' },
  { name: 'Lucida Console', family: 'Lucida Console, Monaco, monospace', category: 'monospace' },
  { name: 'Consolas', family: 'Consolas, monospace', category: 'monospace' },
  { name: 'Monaco', family: 'Monaco, monospace', category: 'monospace' },
  { name: 'Andale Mono', family: 'Andale Mono, monospace', category: 'monospace' },
  { name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'monospace' },
  { name: 'Comic Sans MS', family: 'Comic Sans MS, cursive', category: 'cursive' },
  { name: 'Lucida Handwriting', family: 'Lucida Handwriting, cursive', category: 'cursive' },
  { name: 'Segoe Script', family: 'Segoe Script, cursive', category: 'cursive' },
  { name: 'Brush Script MT', family: 'Brush Script MT, cursive', category: 'cursive' },
  { name: 'Snell Roundhand', family: 'Snell Roundhand, cursive', category: 'cursive' },
  { name: 'Papyrus', family: 'Papyrus, fantasy', category: 'fantasy' },
  { name: 'Copperplate', family: 'Copperplate, fantasy', category: 'fantasy' },
];

// this holds all the current settings for the text, class could've been used but oh well
// a lot of these are just default values that can be changed by the user afterwards
let state = {
  text: 'Hello World',
  textMode: 'single',
  font: fonts[0],
  fontSize: 18,
  fontWeight: 400,
  textAlign: 'center',
  colorMode: 'solid',
  solidColor: '#ffffff',
  solidOpacity: 1,
  gradientStart: '#ff69b4',
  gradientEnd: '#00ffff',
  gradientDir: 'right',
  gradientOpacity: 1,
  effects: {
    bold: false,
    italic: false,
    blur: false
  },
  underline: {
    enabled: false,
    style: 'solid',
    color: '#ffffff',
    thickness: 2
  },
  overline: {
    enabled: false,
    style: 'solid',
    color: '#ffffff',
    thickness: 2
  },
  transform: {
    rotate: 0,
    flipH: false,
    flipV: false
  },
  glowEnabled: false,
  glowColor: '#ff69b4',
  glowSize: 5,
  glowOpacity: 1,
  shadowEnabled: false,
  shadowColor: '#000000',
  shadowOpacity: 0.5,
  shadowX: 2,
  shadowY: 2,
  shadowBlur: 3,
  outlineEnabled: false,
  outlineColor: '#ffffff',
  outlineWidth: 1,
  letterSpacing: 0,
  animation: 'none',
  animSpeed: 2
};

// builds the font picker grid at the top
// each font displays in its own typeface so you can see what it looks like
function initFontGrid() {
  const grid = document.getElementById('fontGrid');
  fonts.forEach((font, index) => {
    const option = document.createElement('div');
    option.className = 'font-option' + (index === 0 ? ' selected' : '');
    option.style.fontFamily = font.family;
    option.textContent = font.name;
    option.onclick = () => selectFont(index);
    grid.appendChild(option);
  });
}

// handles clicking on a font in the grid
function selectFont(index) {
  state.font = fonts[index];
  // update the visual selection (remove from old, add to new)
  document.querySelectorAll('.font-option').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  updatePreview();
}

// switch between single line and multiline mode, since they behave differently in svg ouput
function setTextMode(mode) {
  state.textMode = mode;
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  updatePreview();
}

// toggle between solid color and gradient
function setColorMode(mode) {
  state.colorMode = mode; //the current color mode
  document.querySelectorAll('[data-color]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === mode);
  });
  // show/hide the appropriate color controls
  document.getElementById('solidColorSection').style.display = mode === 'solid' ? 'block' : 'none';
  document.getElementById('gradientColorSection').style.display = mode === 'gradient' ? 'block' : 'none';
  updatePreview();
}

// changes gradient direction (left, right, up, down); rwquries updating for the preview box
function setGradientDir(dir) {
  state.gradientDir = dir;
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.dir === dir);
  });
  updatePreview();
}

// toggle bold/italic/blur effects, can be simm and i'll update later with more options (strikethrough)
function toggleEffect(effect) {
  state.effects[effect] = !state.effects[effect];
  document.querySelector(`[data-effect="${effect}"]`).classList.toggle('selected');
  updatePreview();
}

// pick which animation to use (default is none or static)
function setAnimation(anim) {
  state.animation = anim;
  document.querySelectorAll('.animation-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.anim === anim);
  });
  updatePreview();
}

// text alignment (left, center, right)
function setTextAlign(align) {
  state.textAlign = align;
  document.querySelectorAll('[data-align]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === align);
  });
  updatePreview();
}

// show/hide underline or overline settings when checkbox is toggled (independntly)
function toggleDecoration(type) {
  if (type === 'underline') {
    state.underline.enabled = document.getElementById('underlineEnabled').checked;
    document.getElementById('underlineSettings').classList.toggle('visible', state.underline.enabled);
  } else if (type === 'overline') {
    state.overline.enabled = document.getElementById('overlineEnabled').checked;
    document.getElementById('overlineSettings').classList.toggle('visible', state.overline.enabled);
  }
  updatePreview();
}

// underline style: solid, dashed, or wavy (will add dotted later, the wavy one is broken too
function setUnderlineStyle(style) {
  state.underline.style = style;
  document.querySelectorAll('.underline-style').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.ulstyle === style);
  });
  updatePreview();
}

// same thing but for overline
function setOverlineStyle(style) {
  state.overline.style = style;
  document.querySelectorAll('.overline-style').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.olstyle === style);
  });
  updatePreview();
}

// flip the text horizontal or vertical, usually on multiline will result in upside-down text
function toggleTransform(type) {
  state.transform[type] = !state.transform[type];
  document.querySelector(`[data-transform="${type}"]`).classList.toggle('selected');
  updatePreview();
}

// glow effect <3
function toggleGlow() {
  state.glowEnabled = document.getElementById('glowEnabled').checked;
  document.getElementById('glowSettings').classList.toggle('visible', state.glowEnabled);
  updatePreview();
}

// shadow toggle
function toggleShadow() {
  state.shadowEnabled = document.getElementById('shadowEnabled').checked;
  document.getElementById('shadowSettings').classList.toggle('visible', state.shadowEnabled);
  updatePreview();
}

// outline/stroke for the text
function toggleOutline() {
  state.outlineEnabled = document.getElementById('outlineEnabled').checked;
  document.getElementById('outlineSettings').classList.toggle('visible', state.outlineEnabled);
  updatePreview();
}


// event listeners update the preview box in real-time
// this is kinda long but pretty straightforward

function initEventListeners() {
  // main text input - updates as you type
  document.getElementById('textInput').addEventListener('input', (e) => {
    state.text = e.target.value;
    updatePreview();
  });

  // font size slider
  document.getElementById('fontSize').addEventListener('input', (e) => {
    state.fontSize = parseInt(e.target.value) || 18;
    updatePreview();
  });

  // solid color picker, synced
  document.getElementById('solidColor').addEventListener('input', (e) => {
    state.solidColor = e.target.value;
    document.getElementById('solidColorHex').value = e.target.value;
    updatePreview();
  });

  // hex input for solid color, has validation function
  document.getElementById('solidColorHex').addEventListener('input', (e) => {
    // only accept valid hex colors
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.solidColor = e.target.value;
      document.getElementById('solidColor').value = e.target.value;
      updatePreview();
    }
  });

  // gradient start color, too lazy to optimise the same damn function
  document.getElementById('gradientStart').addEventListener('input', (e) => {
    state.gradientStart = e.target.value;
    document.getElementById('gradientStartHex').value = e.target.value;
    updatePreview();
  });

  document.getElementById('gradientStartHex').addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.gradientStart = e.target.value;
      document.getElementById('gradientStart').value = e.target.value;
      updatePreview();
    }
  });

  // gradient end color + hex input same with the first color
  document.getElementById('gradientEnd').addEventListener('input', (e) => {
    state.gradientEnd = e.target.value;
    document.getElementById('gradientEndHex').value = e.target.value;
    updatePreview();
  });

  document.getElementById('gradientEndHex').addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.gradientEnd = e.target.value;
      document.getElementById('gradientEnd').value = e.target.value;
      updatePreview();
    }
  });

  // opacity sliders
  document.getElementById('solidOpacity').addEventListener('input', (e) => {
    state.solidOpacity = parseFloat(e.target.value);
    document.getElementById('solidOpacityValue').textContent = Math.round(state.solidOpacity * 100) + '%';
    updatePreview();
  });

  document.getElementById('gradientOpacity').addEventListener('input', (e) => {
    state.gradientOpacity = parseFloat(e.target.value);
    document.getElementById('gradientOpacityValue').textContent = Math.round(state.gradientOpacity * 100) + '%';
    updatePreview();
  });

  // glow settings
  document.getElementById('glowEnabled').addEventListener('change', toggleGlow);

  document.getElementById('glowColor').addEventListener('input', (e) => {
    state.glowColor = e.target.value;
    updatePreview();
  });

  document.getElementById('glowSize').addEventListener('input', (e) => {
    state.glowSize = parseInt(e.target.value) || 5;
    updatePreview();
  });

  document.getElementById('glowOpacity').addEventListener('input', (e) => {
    state.glowOpacity = parseFloat(e.target.value);
    document.getElementById('glowOpacityValue').textContent = Math.round(state.glowOpacity * 100) + '%';
    updatePreview();
  });

  // shadow settings
  document.getElementById('shadowEnabled').addEventListener('change', toggleShadow);

  document.getElementById('shadowColor').addEventListener('input', (e) => {
    state.shadowColor = e.target.value;
    updatePreview();
  });

  document.getElementById('shadowBlur').addEventListener('input', (e) => {
    state.shadowBlur = parseInt(e.target.value) || 3;
    updatePreview();
  });

  document.getElementById('shadowOpacity').addEventListener('input', (e) => {
    state.shadowOpacity = parseFloat(e.target.value);
    document.getElementById('shadowOpacityValue').textContent = Math.round(state.shadowOpacity * 100) + '%';
    updatePreview();
  });

  // shadow offset controls (act like in CSS where u ahve to specify both x and y)
  document.getElementById('shadowX').addEventListener('input', (e) => {
    state.shadowX = parseInt(e.target.value) || 0;
    updatePreview();
  });

  document.getElementById('shadowY').addEventListener('input', (e) => {
    state.shadowY = parseInt(e.target.value) || 0;
    updatePreview();
  });

  // outline/stroke settings
  document.getElementById('outlineEnabled').addEventListener('change', toggleOutline);

  document.getElementById('outlineColor').addEventListener('input', (e) => {
    state.outlineColor = e.target.value;
    updatePreview();
  });

  document.getElementById('outlineWidth').addEventListener('input', (e) => {
    state.outlineWidth = parseFloat(e.target.value) || 1;
    updatePreview();
  });

  // letter spacing slider
  document.getElementById('letterSpacing').addEventListener('input', (e) => {
    state.letterSpacing = parseInt(e.target.value);
    document.getElementById('spacingValue').textContent = state.letterSpacing + 'px';
    updatePreview();
  });

  // animation speed
  document.getElementById('animSpeed').addEventListener('input', (e) => {
    state.animSpeed = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = state.animSpeed + 's';
    updatePreview();
  });

  // font weight dropdown
  document.getElementById('fontWeight').addEventListener('change', (e) => {
    state.fontWeight = parseInt(e.target.value);
    updatePreview();
  });

  // underline customization
  document.getElementById('underlineColor').addEventListener('input', (e) => {
    state.underline.color = e.target.value;
    updatePreview();
  });

  document.getElementById('underlineThickness').addEventListener('input', (e) => {
    state.underline.thickness = parseInt(e.target.value) || 2;
    updatePreview();
  });

  // overline customization
  document.getElementById('overlineColor').addEventListener('input', (e) => {
    state.overline.color = e.target.value;
    updatePreview();
  });

  document.getElementById('overlineThickness').addEventListener('input', (e) => {
    state.overline.thickness = parseInt(e.target.value) || 2;
    updatePreview();
  });

  // rotation slider
  document.getElementById('textRotate').addEventListener('input', (e) => {
    state.transform.rotate = parseInt(e.target.value) || 0;
    updatePreview();
  });
}


// this is the main function that creates the rentry-compatible svg code
// it's pretty long because there's a lot of different options to handle
// the output uses data uri format which rentry supports

// main function that generates the svg code
function generateCode() {
  const lines = state.textMode === 'multi' ? state.text.split('\n') : [state.text];
  const lineHeight = state.fontSize * 1.3;  // standard line height ratio

  // calculate padding needed for effects that extend beyond text bounds
  // gotta account for glow, shadow, animations etc or they get cut off
  const effectPadding = Math.max(
    state.glowEnabled ? state.glowSize * 2 : 0,
    state.shadowEnabled ? Math.abs(state.shadowY) + state.shadowBlur : 0,
    state.outlineEnabled ? state.outlineWidth * 2 : 0,
    state.animation === 'bounce' || state.animation === 'float' || state.animation === 'wave' ? 15 : 0,
    state.animation === 'zoom' ? state.fontSize * 0.15 : 0
  );
  const totalHeight = Math.ceil(lines.length * lineHeight + effectPadding * 2 + state.fontSize * 0.3);

  let styles = [];
  let defs = '';

  // basic font styles
  styles.push(`font-family:${state.font.family}`);
  styles.push(`font-size:${state.fontSize}px`);

  // handle font weight - bold effect overrides the weight dropdown
  if (state.effects.bold) {
    styles.push('font-weight:bold');
  } else if (state.fontWeight !== 400) {
    styles.push(`font-weight:${state.fontWeight}`);
  }

  // color handling is her solid or gradient
  if (state.colorMode === 'gradient') {
    // gradient requires an svg <defs> element
    // the %25 is url-encoded % for the data uri
    const dirs = {
      'right': { x1: '0%25', y1: '0%25', x2: '100%25', y2: '0%25' },
      'left': { x1: '100%25', y1: '0%25', x2: '0%25', y2: '0%25' },
      'down': { x1: '0%25', y1: '0%25', x2: '0%25', y2: '100%25' },
      'up': { x1: '0%25', y1: '100%25', x2: '0%25', y2: '0%25' }
    };
    const d = dirs[state.gradientDir];
    const gradOpacity = state.gradientOpacity < 1 ? ` stop-opacity='${state.gradientOpacity}'` : '';
    defs = `<defs><linearGradient id='g' x1='${d.x1}' y1='${d.y1}' x2='${d.x2}' y2='${d.y2}'><stop offset='0%25' stop-color='${state.gradientStart.replace('#', '%23')}'${gradOpacity}/><stop offset='100%25' stop-color='${state.gradientEnd.replace('#', '%23')}'${gradOpacity}/></linearGradient></defs>`;
    styles.push('fill:url%28%23g%29');
  } else {
    // solid color is simpler
    styles.push(`fill:${state.solidColor.replace('#', '%23')}`);
    if (state.solidOpacity < 1) {
      styles.push(`fill-opacity:${state.solidOpacity}`);
    }
  }

  // outline/stroke effect
  if (state.outlineEnabled) {
    styles.push(`stroke:${state.outlineColor.replace('#', '%23')}`);
    styles.push(`stroke-width:${state.outlineWidth}`);
    styles.push('paint-order:stroke fill');  // makes stroke go behind fill
  }

  if (state.effects.italic) styles.push('font-style:italic');
  if (state.letterSpacing > 0) styles.push(`letter-spacing:${state.letterSpacing}px`);

  // build transform list for rotation and flips
  let transforms = [];
  if (state.transform.rotate !== 0) {
    transforms.push(`rotate%28${state.transform.rotate}deg%29`);
  }
  if (state.transform.flipH) {
    transforms.push('scaleX%28-1%29');
  }
  if (state.transform.flipV) {
    transforms.push('scaleY%28-1%29');
  }

  // filters for blur, shadow, glow
  let filters = [];
  let staticFilters = [];  // filters that stay constant (for glow-pulse animation)
  if (state.effects.blur) filters.push('blur%281px%29');
  if (state.shadowEnabled) {
    const shadowColorWithOpacity = hexToRgba(state.shadowColor, state.shadowOpacity);
    const shadowFilter = `drop-shadow%28${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${shadowColorWithOpacity}%29`;
    filters.push(shadowFilter);
    staticFilters.push(shadowFilter);
  }
  if (state.glowEnabled) {
    const glowColorWithOpacity = hexToRgba(state.glowColor, state.glowOpacity);
    filters.push(`drop-shadow%280 0 ${state.glowSize}px ${glowColorWithOpacity}%29`);
  }

  // animation setup - each type needs different keyframes
  let animationProp = '';
  let animationKeyframes = '';
  const speed = state.animSpeed;

  switch (state.animation) {
    case 'bounce':
      animationProp = `animation:bounce ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes bounce{0%25,100%25{transform:translateY%280%29;}50%25{transform:translateY%28-5px%29;}}`;
      break;
    case 'pulse':
      animationProp = `animation:pulse ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes pulse{0%25,100%25{opacity:1;}50%25{opacity:0.5;}}`;
      break;
    case 'glow-pulse':
      // this one animates the glow filter itself
      const glowCol = state.glowColor.replace('#', '%23');
      const baseFilters = staticFilters.length > 0 ? staticFilters.join(' ') + ' ' : '';
      animationProp = `animation:glowp ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes glowp{0%25,100%25{filter:${baseFilters}drop-shadow%280 0 2px ${glowCol}%29;}50%25{filter:${baseFilters}drop-shadow%280 0 10px ${glowCol}%29;}}`;
      filters = staticFilters.slice();
      break;
    case 'color-shift':
      // cycles through some nice colors (might add custom rainbow filter)
      animationProp = `animation:colorshift ${speed}s linear infinite`;
      animationKeyframes = `@keyframes colorshift{0%25{fill:%23ff69b4;}33%25{fill:%2300ffff;}66%25{fill:%23ffd700;}100%25{fill:%23ff69b4;}}`;
      break;
    case 'float':
      // similar to bounce but smoother/slower feel
      animationProp = `animation:float ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes float{0%25,100%25{transform:translateY%280%29;}50%25{transform:translateY%28-8px%29;}}`;
      break;
    case 'wiggle':
    case 'zoom':
    case 'wave':
    case 'marquee':
      // these are handled separately below
      break;
  }

  // add filters to styles (unless glow-pulse which handles it differently)
  if (filters.length > 0 && state.animation !== 'glow-pulse') {
    styles.push(`filter:${filters.join(' ')}`);
  }

  // some animations need transforms on a wrapper group
  let groupTransforms = [];
  if (state.animation !== 'marquee') {
    groupTransforms = transforms.slice();
  }

  let groupAnimationCSS = '';
  let groupKeyframes = '';
  if (animationProp && ['bounce', 'float'].includes(state.animation)) {
    groupAnimationCSS = animationProp;
    groupKeyframes = animationKeyframes;
  } else if (animationProp && state.animation !== 'wave' && state.animation !== 'wiggle' &&
             state.animation !== 'zoom' && state.animation !== 'marquee') {
    styles.push(animationProp);
    groupKeyframes = animationKeyframes;
  }

  let textContent = '';
  const textY = Math.ceil(effectPadding + state.fontSize);

  // text alignment, maps to svg text-anchor attribute
  let textAnchor = 'start';
  let textX = '0';
  if (state.textAlign === 'center') {
    textAnchor = 'middle';
    textX = '50%25';
  } else if (state.textAlign === 'right') {
    textAnchor = 'end';
    textX = '100%25';
  }

  const useMultiline = state.textMode === 'multi' && lines.length > 1 && state.animation !== 'marquee';
  const displayText = state.animation === 'marquee' ? state.text.replace(/\n/g, ' ') : state.text;

  let extraStyles = '';

  // wave animation - each letter gets its own animation delay
  // this creates that cool wavy text effect, like on rentry custom-font
  if (state.animation === 'wave') {
    const delay = 0.1;
    let letterStyles = [];
    let letterCount = 0;

    if (useMultiline) {
      lines.forEach((line, lineIdx) => {
        const lineY = textY + lineIdx * Math.ceil(lineHeight);
        let lineLetters = '';
        for (let i = 0; i < line.length; i++) {
          const char = escapeText(line[i] === ' ' ? '\u00A0' : line[i]);  // non-breaking space
          lineLetters += `<tspan class='l${letterCount}'>${char}</tspan>`;
          letterStyles.push(`.l${letterCount}{animation:wave ${speed}s ease-in-out infinite;animation-delay:${(letterCount * delay).toFixed(1)}s;}`);
          letterCount++;
        }
        textContent += `<text x='${textX}' y='${lineY}' text-anchor='${textAnchor}'>${lineLetters}</text>`;
      });
    } else {
      const text = displayText;
      let letterElements = '';
      for (let i = 0; i < text.length; i++) {
        const char = escapeText(text[i] === ' ' ? '\u00A0' : text[i]);
        letterElements += `<tspan class='l${i}'>${char}</tspan>`;
        letterStyles.push(`.l${i}{animation:wave ${speed}s ease-in-out infinite;animation-delay:${(i * delay).toFixed(1)}s;}`);
      }
      textContent = `<text x='${textX}' y='${textY}' text-anchor='${textAnchor}'>${letterElements}</text>`;
    }

    extraStyles = `${letterStyles.join('')}@keyframes wave{0%25,100%25{baseline-shift:0;}50%25{baseline-shift:10px;}}`;
  } else if (state.animation === 'marquee') {
    // scrolling text like old websites
    const text = displayText;
    let marqueeStyles = styles.join(';');
    const charWidth = state.fontSize * 0.6;  // rough estimate
    const estTextWidth = text.length * charWidth + state.letterSpacing * (text.length - 1);
    const marqueeKeyframes = `@keyframes marquee{0%25{transform:translateX%28100%25%29;}100%25{transform:translateX%28-${estTextWidth}px%29;}}`;
    const marqueeAnim = `animation:marquee ${speed * 3}s linear infinite;`;
    textContent = `<text x='0' y='${textY}' text-anchor='start'>${escapeText(text)}</text>`;
    const allStyles = `text{${marqueeStyles};${marqueeAnim}}${marqueeKeyframes}`;
    const svg = `![](data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>${defs}<style>/*<![CDATA[*/${allStyles}/*]]>*/</style>${textContent}</svg>){100%:${totalHeight}}`;
    return svg;
  } else if (state.animation === 'wiggle' || state.animation === 'zoom') {
    // wiggle rotates back and forth, zoom scales up and down
    const animName = state.animation;
    const keyframes = animName === 'wiggle'
      ? `@keyframes ${animName}{0%25,100%25{transform:rotate%280deg%29;}25%25{transform:rotate%283deg%29;}75%25{transform:rotate%28-3deg%29;}}`
      : `@keyframes ${animName}{0%25,100%25{transform:scale%281%29;}50%25{transform:scale%281.1%29;}}`;
    groupAnimationCSS = `animation:${animName} ${speed}s ease-in-out infinite;transform-origin:center;transform-box:fill-box`;
    extraStyles = keyframes;

    if (useMultiline) {
      const tspans = lines.map((line, i) => {
        return `<tspan x='${textX}' ${i === 0 ? `y='${textY}'` : `dy='${Math.ceil(lineHeight)}'`}>${escapeText(line)}</tspan>`;
      }).join('');
      textContent = `<text text-anchor='${textAnchor}'>${tspans}</text>`;
    } else {
      textContent = `<text x='${textX}' y='${textY}' text-anchor='${textAnchor}'>${escapeText(displayText)}</text>`;
    }
  } else if (useMultiline) {
    // regular multiline text using tspan elements
    const tspans = lines.map((line, i) => {
      return `<tspan x='${textX}' ${i === 0 ? `y='${textY}'` : `dy='${Math.ceil(lineHeight)}'`}>${escapeText(line)}</tspan>`;
    }).join('');
    textContent = `<text text-anchor='${textAnchor}'>${tspans}</text>`;
  } else {
    // single line text
    textContent = `<text x='${textX}' y='${textY}' text-anchor='${textAnchor}'>${escapeText(displayText)}</text>`;
  }

  // underline and overline decorations
  // had to do these manually because svg text-decoration doesn't work well in data uris
  let decorationElements = '';
  if (state.underline.enabled || state.overline.enabled) {
    const charWidth = state.fontSize * 0.6;

    // helper to build wavy line path
    function buildWavyPath(width, y, amp, wl) {
      const numSegments = Math.ceil((width * 2) / wl) + 2;
      let path = `M 0 ${y} q ${wl/4} ${-amp} ${wl/2} 0`;
      for (let i = 1; i < numSegments; i++) {
        path += ` t ${wl/2} 0`;
      }
      return path;
    }

    // generates the actual decoration lines for a text line
    function generateLineDecor(lineText, baseY, xOffset) {
      let decor = '';
      const lineWidth = lineText.length * charWidth + state.letterSpacing * Math.max(0, lineText.length - 1);
      const ulY = baseY + state.fontSize * 0.15;
      const olY = baseY - state.fontSize * 0.85;

      if (state.underline.enabled) {
        const ulColor = state.underline.color.replace('#', '%23');
        const ulThickness = state.underline.thickness;
        if (state.underline.style === 'wavy') {
          const amp = ulThickness * 1.5, wl = ulThickness * 4;
          decor += `<path d='${buildWavyPath(lineWidth, ulY, amp, wl)}' fill='none' stroke='${ulColor}' stroke-width='${ulThickness}' transform='translate%28${xOffset},0%29'/>`;
        } else {
          const dash = state.underline.style === 'dashed' ? ` stroke-dasharray='${ulThickness * 3} ${ulThickness * 2}'` : '';
          decor += `<line x1='${xOffset}' y1='${ulY}' x2='${xOffset + lineWidth}' y2='${ulY}' stroke='${ulColor}' stroke-width='${ulThickness}'${dash}/>`;
        }
      }
      if (state.overline.enabled) {
        const olColor = state.overline.color.replace('#', '%23');
        const olThickness = state.overline.thickness;
        if (state.overline.style === 'wavy') {
          const amp = olThickness * 1.5, wl = olThickness * 4;
          decor += `<path d='${buildWavyPath(lineWidth, olY, amp, wl)}' fill='none' stroke='${olColor}' stroke-width='${olThickness}' transform='translate%28${xOffset},0%29'/>`;
        } else {
          const dash = state.overline.style === 'dashed' ? ` stroke-dasharray='${olThickness * 3} ${olThickness * 2}'` : '';
          decor += `<line x1='${xOffset}' y1='${olY}' x2='${xOffset + lineWidth}' y2='${olY}' stroke='${olColor}' stroke-width='${olThickness}'${dash}/>`;
        }
      }
      return decor;
    }

    // position decorations based on text alignment
    if (useMultiline) {
      lines.forEach((line, i) => {
        const lineY = textY + i * Math.ceil(lineHeight);
        const lineWidth = line.length * charWidth + state.letterSpacing * Math.max(0, line.length - 1);
        decorationElements += `<g style='transform:translateX%28calc%28${state.textAlign === 'center' ? '50%25' : state.textAlign === 'right' ? '100%25' : '0%25'} - ${state.textAlign === 'center' ? lineWidth/2 : state.textAlign === 'right' ? lineWidth : 0}px%29%29'>${generateLineDecor(line, lineY, 0)}</g>`;
      });
    } else {
      const singleText = displayText.replace(/\n/g, ' ');
      const textWidth = singleText.length * charWidth + state.letterSpacing * Math.max(0, singleText.length - 1);
      decorationElements = generateLineDecor(singleText, textY, 0);
      let decorStyle = '';
      if (state.textAlign === 'center') {
        decorStyle = ` style='transform:translateX%28calc%2850%25 - ${textWidth/2}px%29%29'`;
      } else if (state.textAlign === 'right') {
        decorStyle = ` style='transform:translateX%28calc%28100%25 - ${textWidth}px%29%29'`;
      }
      decorationElements = `<g${decorStyle}>${decorationElements}</g>`;
    }
  }

  const styleStr = styles.join(';');

  // wrap content in a group if we need transforms or animations
  let content = `${textContent}${decorationElements}`;
  let wrapperStyle = '';
  const wrapperParts = [];

  if (groupTransforms.length > 0) {
    wrapperParts.push(`transform:${groupTransforms.join(' ')}`);
    wrapperParts.push('transform-origin:center center');
    wrapperParts.push('transform-box:fill-box');
  }
  if (groupAnimationCSS) {
    wrapperParts.push(groupAnimationCSS);
  }

  if (wrapperParts.length > 0) {
    wrapperStyle = wrapperParts.join(';');
    content = `<g style='${wrapperStyle}'>${content}</g>`;
  }

  // put it all together - the final svg data uri
  // the {100%:height} at the end is rentry's syntax for responsive width
  const allExtraStyles = extraStyles + groupKeyframes;
  const svg = `![](data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>${defs}<style>/*<![CDATA[*/${styleStr}/*]]>*/text{${styleStr}}${allExtraStyles}/*]]>*/</style>${content}</svg>){100%:${totalHeight}}`;

  return svg;
}

// escape special characters for svg/xml
// also url-encode stuff that breaks data uris
function escapeText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/#/g, '%23');
}

// convert hex color to rgba with opacity (url-encoded version)
function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba%28${r},${g},${b},${opacity}%29`;
}

// same but without url encoding (for preview)
function hexToRgbaPlain(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// basically the same as generateCode but outputs regular svg for the preview
// not url-encoded so it actually renders in the browser
// yeah there's some code duplication here but it works
function updatePreview() {
  const code = generateCode();
  document.getElementById('codeOutput').textContent = code;

  const lines = state.textMode === 'multi' ? state.text.split('\n') : [state.text];
  const lineHeight = state.fontSize * 1.3;

  const effectPadding = Math.max(
    state.glowEnabled ? state.glowSize * 2 : 0,
    state.shadowEnabled ? Math.abs(state.shadowY) + state.shadowBlur : 0,
    state.outlineEnabled ? state.outlineWidth * 2 : 0,
    state.animation === 'bounce' || state.animation === 'float' || state.animation === 'wave' ? 15 : 0,
    state.animation === 'zoom' ? state.fontSize * 0.15 : 0
  );
  const totalHeight = Math.ceil(lines.length * lineHeight + effectPadding * 2 + state.fontSize * 0.3);

  let styles = [];
  let defs = '';

  styles.push(`font-family:${state.font.family}`);
  styles.push(`font-size:${state.fontSize}px`);

  if (state.effects.bold) {
    styles.push('font-weight:bold');
  } else if (state.fontWeight !== 400) {
    styles.push(`font-weight:${state.fontWeight}`);
  }

  if (state.colorMode === 'gradient') {
    const dirs = {
      'right': { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
      'left': { x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
      'down': { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
      'up': { x1: '0%', y1: '100%', x2: '0%', y2: '0%' }
    };
    const d = dirs[state.gradientDir];
    const gradOpacity = state.gradientOpacity < 1 ? ` stop-opacity="${state.gradientOpacity}"` : '';
    defs = `<defs><linearGradient id="gp" x1="${d.x1}" y1="${d.y1}" x2="${d.x2}" y2="${d.y2}"><stop offset="0%" stop-color="${state.gradientStart}"${gradOpacity}/><stop offset="100%" stop-color="${state.gradientEnd}"${gradOpacity}/></linearGradient></defs>`;
    styles.push('fill:url(#gp)');
  } else {
    styles.push(`fill:${state.solidColor}`);
    if (state.solidOpacity < 1) {
      styles.push(`fill-opacity:${state.solidOpacity}`);
    }
  }

  if (state.outlineEnabled) {
    styles.push(`stroke:${state.outlineColor}`);
    styles.push(`stroke-width:${state.outlineWidth}`);
    styles.push('paint-order:stroke fill');
  }

  if (state.effects.italic) styles.push('font-style:italic');
  if (state.letterSpacing > 0) styles.push(`letter-spacing:${state.letterSpacing}px`);

  let transforms = [];
  if (state.transform.rotate !== 0) {
    transforms.push(`rotate(${state.transform.rotate}deg)`);
  }
  if (state.transform.flipH) {
    transforms.push('scaleX(-1)');
  }
  if (state.transform.flipV) {
    transforms.push('scaleY(-1)');
  }

  let filters = [];
  let staticFilters = [];
  if (state.effects.blur) filters.push('blur(1px)');
  if (state.shadowEnabled) {
    const shadowColorWithOpacity = hexToRgbaPlain(state.shadowColor, state.shadowOpacity);
    const shadowFilter = `drop-shadow(${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${shadowColorWithOpacity})`;
    filters.push(shadowFilter);
    staticFilters.push(shadowFilter);
  }
  if (state.glowEnabled) {
    const glowColorWithOpacity = hexToRgbaPlain(state.glowColor, state.glowOpacity);
    filters.push(`drop-shadow(0 0 ${state.glowSize}px ${glowColorWithOpacity})`);
  }

  let animationProp = '';
  let animationKeyframes = '';
  const speed = state.animSpeed;

  switch (state.animation) {
    case 'bounce':
      animationProp = `animation:bounce ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}`;
      break;
    case 'pulse':
      animationProp = `animation:pulse ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}`;
      break;
    case 'glow-pulse':
      const baseFilters = staticFilters.length > 0 ? staticFilters.join(' ') + ' ' : '';
      animationProp = `animation:glowp ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes glowp{0%,100%{filter:${baseFilters}drop-shadow(0 0 2px ${state.glowColor});}50%{filter:${baseFilters}drop-shadow(0 0 10px ${state.glowColor});}}`;
      filters = staticFilters.slice();
      break;
    case 'color-shift':
      animationProp = `animation:colorshift ${speed}s linear infinite`;
      animationKeyframes = `@keyframes colorshift{0%{fill:#ff69b4;}33%{fill:#00ffff;}66%{fill:#ffd700;}100%{fill:#ff69b4;}}`;
      break;
    case 'float':
      animationProp = `animation:float ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}`;
      break;
    case 'wiggle':
    case 'zoom':
    case 'wave':
    case 'marquee':
      break;
  }

  if (filters.length > 0 && state.animation !== 'glow-pulse') {
    styles.push(`filter:${filters.join(' ')}`);
  }

  let groupTransforms = [];
  if (state.animation !== 'marquee') {
    groupTransforms = transforms.slice();
  }

  let groupAnimationCSS = '';
  let groupKeyframes = '';
  if (animationProp && ['bounce', 'float'].includes(state.animation)) {
    groupAnimationCSS = animationProp;
    groupKeyframes = animationKeyframes;
  } else if (animationProp && state.animation !== 'wave' && state.animation !== 'wiggle' &&
             state.animation !== 'zoom' && state.animation !== 'marquee') {
    styles.push(animationProp);
    groupKeyframes = animationKeyframes;
  }

  let textAnchor = 'start';
  let textX = '0';
  if (state.textAlign === 'center') {
    textAnchor = 'middle';
    textX = '50%';
  } else if (state.textAlign === 'right') {
    textAnchor = 'end';
    textX = '100%';
  }

  const textY = Math.ceil(effectPadding + state.fontSize);
  let textContent = '';
  let extraStyles = '';
  let allExtraStyles = '';

  const useMultiline = state.textMode === 'multi' && lines.length > 1 && state.animation !== 'marquee';
  const displayText = state.animation === 'marquee' ? state.text.replace(/\n/g, ' ') : state.text;

  if (state.animation === 'wave') {
    const delay = 0.1;
    let letterStyles = [];
    let letterCount = 0;
    let textElements = '';

    if (useMultiline) {
      lines.forEach((line, lineIdx) => {
        const lineY = textY + lineIdx * Math.ceil(lineHeight);
        let lineLetters = '';
        for (let i = 0; i < line.length; i++) {
          const char = escapeHTML(line[i] === ' ' ? '\u00A0' : line[i]);
          lineLetters += `<tspan class="l${letterCount}">${char}</tspan>`;
          letterStyles.push(`.l${letterCount}{animation:wave ${speed}s ease-in-out infinite;animation-delay:${(letterCount * delay).toFixed(1)}s;}`);
          letterCount++;
        }
        textElements += `<text x="${textX}" y="${lineY}" text-anchor="${textAnchor}">${lineLetters}</text>`;
      });
    } else {
      const text = displayText;
      let letterElements = '';
      for (let i = 0; i < text.length; i++) {
        const char = escapeHTML(text[i] === ' ' ? '\u00A0' : text[i]);
        letterElements += `<tspan class="l${i}">${char}</tspan>`;
        letterStyles.push(`.l${i}{animation:wave ${speed}s ease-in-out infinite;animation-delay:${(i * delay).toFixed(1)}s;}`);
      }
      textElements = `<text x="${textX}" y="${textY}" text-anchor="${textAnchor}">${letterElements}</text>`;
    }

    textContent = textElements;
    extraStyles = letterStyles.join('') + `@keyframes wave{0%,100%{baseline-shift:0;}50%{baseline-shift:10px;}}`;
  } else if (state.animation === 'marquee') {
    const text = displayText;
    const charWidth = state.fontSize * 0.6;
    const estTextWidth = text.length * charWidth + state.letterSpacing * (text.length - 1);
    textContent = `<text x="0" y="${textY}" text-anchor="start">${escapeHTML(text)}</text>`;
    extraStyles = `@keyframes marquee{0%{transform:translateX(100%);}100%{transform:translateX(-${estTextWidth}px);}}`;
    styles.push(`animation:marquee ${speed * 3}s linear infinite`);
  } else if (state.animation === 'wiggle' || state.animation === 'zoom') {
    const animName = state.animation;
    const keyframes = animName === 'wiggle'
      ? `@keyframes ${animName}{0%,100%{transform:rotate(0deg);}25%{transform:rotate(3deg);}75%{transform:rotate(-3deg);}}`
      : `@keyframes ${animName}{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}`;
    extraStyles = keyframes;
    groupAnimationCSS = `animation:${animName} ${speed}s ease-in-out infinite;transform-origin:center;transform-box:fill-box;`;

    if (useMultiline) {
      const tspans = lines.map((line, i) => {
        return `<tspan x="${textX}" ${i === 0 ? `y="${textY}"` : `dy="${Math.ceil(lineHeight)}"`}>${escapeHTML(line)}</tspan>`;
      }).join('');
      textContent = `<text text-anchor="${textAnchor}">${tspans}</text>`;
    } else {
      textContent = `<text x="${textX}" y="${textY}" text-anchor="${textAnchor}">${escapeHTML(displayText)}</text>`;
    }
  } else if (useMultiline) {
    const tspans = lines.map((line, i) => {
      return `<tspan x="${textX}" ${i === 0 ? `y="${textY}"` : `dy="${Math.ceil(lineHeight)}"`}>${escapeHTML(line)}</tspan>`;
    }).join('');
    textContent = `<text text-anchor="${textAnchor}">${tspans}</text>`;
  } else {
    textContent = `<text x="${textX}" y="${textY}" text-anchor="${textAnchor}">${escapeHTML(displayText)}</text>`;
  }

  // decoration rendering for preview (same logic as generateCode but cleaner svg)
  let decorationElements = '';
  if (state.underline.enabled || state.overline.enabled) {
    const charWidth = state.fontSize * 0.6;

    function buildWavyPathPreview(width, y, amp, wl) {
      const numSegments = Math.ceil((width * 2) / wl) + 2;
      let path = `M 0 ${y} q ${wl/4} ${-amp} ${wl/2} 0`;
      for (let i = 1; i < numSegments; i++) {
        path += ` t ${wl/2} 0`;
      }
      return path;
    }

    function generateLineDecorPreview(lineText, baseY, xOffset) {
      let decor = '';
      const lineWidth = lineText.length * charWidth + state.letterSpacing * Math.max(0, lineText.length - 1);
      const ulY = baseY + state.fontSize * 0.15;
      const olY = baseY - state.fontSize * 0.85;

      if (state.underline.enabled) {
        const ulColor = state.underline.color;
        const ulThickness = state.underline.thickness;
        if (state.underline.style === 'wavy') {
          const amp = ulThickness * 1.5, wl = ulThickness * 4;
          decor += `<path d="${buildWavyPathPreview(lineWidth, ulY, amp, wl)}" fill="none" stroke="${ulColor}" stroke-width="${ulThickness}" transform="translate(${xOffset},0)"/>`;
        } else {
          const dash = state.underline.style === 'dashed' ? ` stroke-dasharray="${ulThickness * 3} ${ulThickness * 2}"` : '';
          decor += `<line x1="${xOffset}" y1="${ulY}" x2="${xOffset + lineWidth}" y2="${ulY}" stroke="${ulColor}" stroke-width="${ulThickness}"${dash}/>`;
        }
      }
      if (state.overline.enabled) {
        const olColor = state.overline.color;
        const olThickness = state.overline.thickness;
        if (state.overline.style === 'wavy') {
          const amp = olThickness * 1.5, wl = olThickness * 4;
          decor += `<path d="${buildWavyPathPreview(lineWidth, olY, amp, wl)}" fill="none" stroke="${olColor}" stroke-width="${olThickness}" transform="translate(${xOffset},0)"/>`;
        } else {
          const dash = state.overline.style === 'dashed' ? ` stroke-dasharray="${olThickness * 3} ${olThickness * 2}"` : '';
          decor += `<line x1="${xOffset}" y1="${olY}" x2="${xOffset + lineWidth}" y2="${olY}" stroke="${olColor}" stroke-width="${olThickness}"${dash}/>`;
        }
      }
      return decor;
    }

    if (useMultiline) {
      lines.forEach((line, i) => {
        const lineY = textY + i * Math.ceil(lineHeight);
        const lineWidth = line.length * charWidth + state.letterSpacing * Math.max(0, line.length - 1);
        const alignStyle = state.textAlign === 'center' ? `calc(50% - ${lineWidth/2}px)` :
                           state.textAlign === 'right' ? `calc(100% - ${lineWidth}px)` : '0';
        decorationElements += `<g style="transform:translateX(${alignStyle})">${generateLineDecorPreview(line, lineY, 0)}</g>`;
      });
    } else {
      const singleText = displayText.replace(/\n/g, ' ');
      const textWidth = singleText.length * charWidth + state.letterSpacing * Math.max(0, singleText.length - 1);
      decorationElements = generateLineDecorPreview(singleText, textY, 0);
      let decorStyle = '';
      if (state.textAlign === 'center') {
        decorStyle = ` style="transform:translateX(calc(50% - ${textWidth/2}px))"`;
      } else if (state.textAlign === 'right') {
        decorStyle = ` style="transform:translateX(calc(100% - ${textWidth}px))"`;
      }
      decorationElements = `<g${decorStyle}>${decorationElements}</g>`;
    }
  }

  let content = `${textContent}${decorationElements}`;
  const wrapperParts = [];

  if (groupTransforms.length > 0) {
    wrapperParts.push(`transform:${groupTransforms.join(' ')}`);
    wrapperParts.push('transform-origin:center center');
    wrapperParts.push('transform-box:fill-box');
  }
  if (groupAnimationCSS) {
    wrapperParts.push(groupAnimationCSS);
  }

  if (wrapperParts.length > 0) {
    content = `<g style="${wrapperParts.join(';')}">${content}</g>`;
  }

  allExtraStyles = extraStyles + groupKeyframes;
  const previewSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="${Math.max(totalHeight, 80)}">${defs}<style>text{${styles.join(';')}}${allExtraStyles}</style>${content}</svg>`;

  document.getElementById('previewContent').innerHTML = previewSVG;
}

// basic html escaping for preview (not url-encoded)
function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// copy button handler
// shows "Copied!" feedback for a couple seconds
function copyCode() {
  const code = document.getElementById('codeOutput').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy Code';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// kick everything off when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initFontGrid();
  initEventListeners();
  updatePreview();
});
