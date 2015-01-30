/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating seeeduino grove blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */


// define blocks
if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.nokiaGetReady = {
  category: 'Graphic LCD',
  helpUrl: '',
  init: function() {
    this.setColour(0);
    this.appendDummyInput("")
        .appendTitle("Initialize LCD")
        .appendTitle(new Blockly.FieldImage("https://cdn.sparkfun.com//assets/parts/4/4/7/3/10168-01.jpg", 64, 64))
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};



/*
Blockly.Language.nokiaWAT = {
  category: 'goo',
  helpUrl: 'http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b#Grove_.E2.80.93_Buzzer',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Piezo Buzzer")
        .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/ed/Buzzer1.jpg/400px-Buzzer1.jpg", 64, 64))
        .appendTitle("PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendTitle("stat")
        .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Emit a tone when the output is high');
  }
};
*/

/*
Blockly.Language.nokiaJustDemo = {
  category: 'Graphic LCD',
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Blahdy blah")
        .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/LED1.jpg/400px-LED1.jpg", 64, 64))
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};
*/

// define generators
Blockly.Arduino = Blockly.Generator.get('Arduino');

/* works.
Blockly.Arduino.nokiaWAT = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};
*/

Blockly.Arduino.nokiaGetReady = function() {
	
	var reallyLongFunctionsEtcEtc = "//Unfortunately, there's a bunch of extra code that \n//needs to be here. \n//We're going to set it up soon so you don't have to see it.\n//The code you've written is at the very bottom.\n.\n.\n.\n.\n.\n.\n     /* Nokia 5100 LCD Example Code\n Graphics driver and PCD8544 interface code for SparkFun's\n 84x48 Graphic LCD.\n https://www.sparkfun.com/products/10168\n\nby: Jim Lindblom\n  adapted from code by Nathan Seidle and mish-mashed with\n  code from the ColorLCDShield.\ndate: October 10, 2013\nlicense: Beerware. Feel free to use, reuse, and modify this\ncode as you see fit. If you find it useful, and we meet someday,\nyou can buy me a beer.\n\nThis all-inclusive sketch will show off a series of graphics\nfunctions, like drawing lines, circles, squares, and text. Then\nit'll go into serial monitor echo mode, where you can type\ntext into the serial monitor, and it'll be displayed on the\nLCD.\n\nThis stuff could all be put into a library, but we wanted to\nleave it all in one sketch to keep it as transparent as possible.\n\nHardware: (Note most of these pins can be swapped)\n  Graphic LCD Pin ---------- Arduino Pin\n     1-VCC       ----------------  5V\n     2-GND       ----------------  GND\n     3-SCE       ----------------  7\n     4-RST       ----------------  6\n     5-D/C       ----------------  5\n     6-DN(MOSI)  ----------------  11\n     7-SCLK      ----------------  13\n     8-LED       - 330 Ohm res --  9\n The SCLK, DN(MOSI), must remain where they are, but the other \n pins can be swapped. The LED pin should remain a PWM-capable\n pin. Don't forget to stick a current-limiting resistor in line\n between the LCD's LED pin and Arduino pin 9!\n*/\n#include <SPI.h> // We'll use SPI to transfer data. Faster!\n\n/* PCD8544-specific defines: */\n#define LCD_COMMAND  0 \n#define LCD_DATA     1\n\n/* 84x48 LCD Defines: */\n#define LCD_WIDTH   84 // Note: x-coordinates go wide\n#define LCD_HEIGHT  48 // Note: y-coordinates go high\n#define WHITE       0  // For drawing pixels. A 0 draws white.\n#define BLACK       1  // A 1 draws black.\n\n/* Pin definitions: \nMost of these pins can be moved to any digital or analog pin.\nDN(MOSI)and SCLK should be left where they are (SPI pins). The \nLED (backlight) pin should remain on a PWM-capable pin. */\nconst int scePin = 7;   // SCE - Chip select, pin 3 on LCD.\nconst int rstPin = 6;   // RST - Reset, pin 4 on LCD.\nconst int dcPin = 5;    // DC - Data/Command, pin 5 on LCD.\nconst int sdinPin = 11;  // DN(MOSI) - Serial data, pin 6 on LCD.\nconst int sclkPin = 13;  // SCLK - Serial clock, pin 7 on LCD.\nconst int blPin = 9;    // LED - Backlight LED, pin 8 on LCD.\n\n/* Font table:\nThis table contains the hex values that represent pixels for a\nfont that is 5 pixels wide and 8 pixels high. Each byte in a row\nrepresents one, 8-pixel, vertical column of a character. 5 bytes\nper character. */\nstatic const byte ASCII[][5] = {\n// First 32 characters (0x00-0x19) are ignored. These are\n// non-displayable, control characters.\n {0x00, 0x00, 0x00, 0x00, 0x00} // 0x20  \n,{0x00, 0x00, 0x5f, 0x00, 0x00} // 0x21 !\n,{0x00, 0x07, 0x00, 0x07, 0x00} // 0x22 \"\n,{0x14, 0x7f, 0x14, 0x7f, 0x14} // 0x23 #\n,{0x24, 0x2a, 0x7f, 0x2a, 0x12} // 0x24 $\n,{0x23, 0x13, 0x08, 0x64, 0x62} // 0x25 %\n,{0x36, 0x49, 0x55, 0x22, 0x50} // 0x26 &\n,{0x00, 0x05, 0x03, 0x00, 0x00} // 0x27 '\n,{0x00, 0x1c, 0x22, 0x41, 0x00} // 0x28 (\n,{0x00, 0x41, 0x22, 0x1c, 0x00} // 0x29 )\n,{0x14, 0x08, 0x3e, 0x08, 0x14} // 0x2a *\n,{0x08, 0x08, 0x3e, 0x08, 0x08} // 0x2b +\n,{0x00, 0x50, 0x30, 0x00, 0x00} // 0x2c ,\n,{0x08, 0x08, 0x08, 0x08, 0x08} // 0x2d -\n,{0x00, 0x60, 0x60, 0x00, 0x00} // 0x2e .\n,{0x20, 0x10, 0x08, 0x04, 0x02} // 0x2f /\n,{0x3e, 0x51, 0x49, 0x45, 0x3e} // 0x30 0\n,{0x00, 0x42, 0x7f, 0x40, 0x00} // 0x31 1\n,{0x42, 0x61, 0x51, 0x49, 0x46} // 0x32 2\n,{0x21, 0x41, 0x45, 0x4b, 0x31} // 0x33 3\n,{0x18, 0x14, 0x12, 0x7f, 0x10} // 0x34 4\n,{0x27, 0x45, 0x45, 0x45, 0x39} // 0x35 5\n,{0x3c, 0x4a, 0x49, 0x49, 0x30} // 0x36 6\n,{0x01, 0x71, 0x09, 0x05, 0x03} // 0x37 7\n,{0x36, 0x49, 0x49, 0x49, 0x36} // 0x38 8\n,{0x06, 0x49, 0x49, 0x29, 0x1e} // 0x39 9\n,{0x00, 0x36, 0x36, 0x00, 0x00} // 0x3a :\n,{0x00, 0x56, 0x36, 0x00, 0x00} // 0x3b ;\n,{0x08, 0x14, 0x22, 0x41, 0x00} // 0x3c <\n,{0x14, 0x14, 0x14, 0x14, 0x14} // 0x3d =\n,{0x00, 0x41, 0x22, 0x14, 0x08} // 0x3e >\n,{0x02, 0x01, 0x51, 0x09, 0x06} // 0x3f ?\n,{0x32, 0x49, 0x79, 0x41, 0x3e} // 0x40 @\n,{0x7e, 0x11, 0x11, 0x11, 0x7e} // 0x41 A\n,{0x7f, 0x49, 0x49, 0x49, 0x36} // 0x42 B\n,{0x3e, 0x41, 0x41, 0x41, 0x22} // 0x43 C\n,{0x7f, 0x41, 0x41, 0x22, 0x1c} // 0x44 D\n,{0x7f, 0x49, 0x49, 0x49, 0x41} // 0x45 E\n,{0x7f, 0x09, 0x09, 0x09, 0x01} // 0x46 F\n,{0x3e, 0x41, 0x49, 0x49, 0x7a} // 0x47 G\n,{0x7f, 0x08, 0x08, 0x08, 0x7f} // 0x48 H\n,{0x00, 0x41, 0x7f, 0x41, 0x00} // 0x49 I\n,{0x20, 0x40, 0x41, 0x3f, 0x01} // 0x4a J\n,{0x7f, 0x08, 0x14, 0x22, 0x41} // 0x4b K\n,{0x7f, 0x40, 0x40, 0x40, 0x40} // 0x4c L\n,{0x7f, 0x02, 0x0c, 0x02, 0x7f} // 0x4d M\n,{0x7f, 0x04, 0x08, 0x10, 0x7f} // 0x4e N\n,{0x3e, 0x41, 0x41, 0x41, 0x3e} // 0x4f O\n,{0x7f, 0x09, 0x09, 0x09, 0x06} // 0x50 P\n,{0x3e, 0x41, 0x51, 0x21, 0x5e} // 0x51 Q\n,{0x7f, 0x09, 0x19, 0x29, 0x46} // 0x52 R\n,{0x46, 0x49, 0x49, 0x49, 0x31} // 0x53 S\n,{0x01, 0x01, 0x7f, 0x01, 0x01} // 0x54 T\n,{0x3f, 0x40, 0x40, 0x40, 0x3f} // 0x55 U\n,{0x1f, 0x20, 0x40, 0x20, 0x1f} // 0x56 V\n,{0x3f, 0x40, 0x38, 0x40, 0x3f} // 0x57 W\n,{0x63, 0x14, 0x08, 0x14, 0x63} // 0x58 X\n,{0x07, 0x08, 0x70, 0x08, 0x07} // 0x59 Y\n,{0x61, 0x51, 0x49, 0x45, 0x43} // 0x5a Z\n,{0x00, 0x7f, 0x41, 0x41, 0x00} // 0x5b [\n,{0x02, 0x04, 0x08, 0x10, 0x20} // 0x5c ,{0x00, 0x41, 0x41, 0x7f, 0x00} // 0x5d ]\n,{0x00, 0x41, 0x41, 0x7f, 0x00} // 0x5d ]\n,{0x04, 0x02, 0x01, 0x02, 0x04} // 0x5e ^\n,{0x40, 0x40, 0x40, 0x40, 0x40} // 0x5f _\n,{0x00, 0x01, 0x02, 0x04, 0x00} // 0x60 `\n,{0x20, 0x54, 0x54, 0x54, 0x78} // 0x61 a\n,{0x7f, 0x48, 0x44, 0x44, 0x38} // 0x62 b\n,{0x38, 0x44, 0x44, 0x44, 0x20} // 0x63 c\n,{0x38, 0x44, 0x44, 0x48, 0x7f} // 0x64 d\n,{0x38, 0x54, 0x54, 0x54, 0x18} // 0x65 e\n,{0x08, 0x7e, 0x09, 0x01, 0x02} // 0x66 f\n,{0x0c, 0x52, 0x52, 0x52, 0x3e} // 0x67 g\n,{0x7f, 0x08, 0x04, 0x04, 0x78} // 0x68 h\n,{0x00, 0x44, 0x7d, 0x40, 0x00} // 0x69 i\n,{0x20, 0x40, 0x44, 0x3d, 0x00} // 0x6a j \n,{0x7f, 0x10, 0x28, 0x44, 0x00} // 0x6b k\n,{0x00, 0x41, 0x7f, 0x40, 0x00} // 0x6c l\n,{0x7c, 0x04, 0x18, 0x04, 0x78} // 0x6d m\n,{0x7c, 0x08, 0x04, 0x04, 0x78} // 0x6e n\n,{0x38, 0x44, 0x44, 0x44, 0x38} // 0x6f o\n,{0x7c, 0x14, 0x14, 0x14, 0x08} // 0x70 p\n,{0x08, 0x14, 0x14, 0x18, 0x7c} // 0x71 q\n,{0x7c, 0x08, 0x04, 0x04, 0x08} // 0x72 r\n,{0x48, 0x54, 0x54, 0x54, 0x20} // 0x73 s\n,{0x04, 0x3f, 0x44, 0x40, 0x20} // 0x74 t\n,{0x3c, 0x40, 0x40, 0x20, 0x7c} // 0x75 u\n,{0x1c, 0x20, 0x40, 0x20, 0x1c} // 0x76 v\n,{0x3c, 0x40, 0x30, 0x40, 0x3c} // 0x77 w\n,{0x44, 0x28, 0x10, 0x28, 0x44} // 0x78 x\n,{0x0c, 0x50, 0x50, 0x50, 0x3c} // 0x79 y\n,{0x44, 0x64, 0x54, 0x4c, 0x44} // 0x7a z\n,{0x00, 0x08, 0x36, 0x41, 0x00} // 0x7b {\n,{0x00, 0x00, 0x7f, 0x00, 0x00} // 0x7c |\n,{0x00, 0x41, 0x36, 0x08, 0x00} // 0x7d }\n,{0x10, 0x08, 0x08, 0x10, 0x08} // 0x7e ~\n,{0x78, 0x46, 0x41, 0x46, 0x78} // 0x7f DEL\n};\n\n/* The displayMap variable stores a buffer representation of the\npixels on our display. There are 504 total bits in this array,\nsame as how many pixels there are on a 84 x 48 display.\n\nEach byte in this array covers a 8-pixel vertical block on the \ndisplay. Each successive byte covers the next 8-pixel column over\nuntil you reach the right-edge of the display and step down 8 rows.\n\nTo update the display, we first have to write to this array, then\ncall the updateDisplay() function, which sends this whole array\nto the PCD8544.\n\nBecause the PCD8544 won't let us write individual pixels at a \ntime, this is how we can make targeted changes to the display. */\nbyte displayMap[LCD_WIDTH * LCD_HEIGHT / 8] = {\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,0)->(11,7) ~ These 12 bytes cover an 8x12 block in the left corner of the display \n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,0)->(23,7)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xE0, // (24,0)->(35,7)\n0xF0, 0xF8, 0xFC, 0xFC, 0xFE, 0xFE, 0xFE, 0xFE, 0x1E, 0x0E, 0x02, 0x00, // (36,0)->(47,7)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (48,0)->(59,7)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,0)->(71,7)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,0)->(83,7)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,8)->(11,15)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,8)->(23,15)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // (24,8)->(35,15)\n0x0F, 0x1F, 0x3F, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFC, 0xF8, // (36,8)->(47,15)\n0xF8, 0xF0, 0xF8, 0xFE, 0xFE, 0xFC, 0xF8, 0xE0, 0x00, 0x00, 0x00, 0x00, // (48,8)->(59,15)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,8)->(71,15)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,8)->(83,15)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,16)->(11,23)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,16)->(23,23)\n0x00, 0x00, 0xF8, 0xFC, 0xFE, 0xFE, 0xFF, 0xFF, 0xF3, 0xE0, 0xE0, 0xC0, // (24,16)->(35,23)\n0xC0, 0xC0, 0xE0, 0xE0, 0xF1, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // (36,16)->(47,23)\n0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x3E, 0x00, 0x00, 0x00, // (48,16)->(59,23)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,16)->(71,23)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,16)->(83,23)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,24)->(11,31)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,24)->(23,31)\n0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // (24,24)->(35,31)\n0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // (36,24)->(47,31)\n0xFF, 0xFF, 0xFF, 0x7F, 0x3F, 0x1F, 0x07, 0x01, 0x00, 0x00, 0x00, 0x00, // (48,24)->(59,31)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,24)->(71,31)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,24)->(83,31)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,32)->(11,39)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,32)->(23,39)\n0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F, 0x3F, 0x1F, // (24,32)->(35,39)\n0x0F, 0x0F, 0x0F, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x03, 0x03, // (36,32)->(47,39)\n0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (48,32)->(59,39)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,32)->(71,39)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,32)->(83,39)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (0,40)->(11,47)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (12,40)->(23,47)\n0x00, 0x00, 0x3F, 0x1F, 0x0F, 0x07, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, // (24,40)->(35,47)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (36,40)->(47,47)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (48,40)->(59,47)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (60,40)->(71,47)\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // (72,40)->(83,47) !!! The bottom right pixel!\n};\n\n/* This array is the same size as the displayMap. We'll use it\nas an example of how to draw a bitmap. xkcd comic transposing\nmakes for an excellent display application.\nFor reference, see: http://xkcd.com/149/ */\nchar xkcdSandwich[504] = {\n0xFF, 0x8D, 0x9F, 0x13, 0x13, 0xF3, 0x01, 0x01, 0xF9, 0xF9, 0x01, 0x81, 0xF9, 0xF9, 0x01, 0xF1,\n0xF9, 0x09, 0x09, 0xFF, 0xFF, 0xF1, 0xF9, 0x09, 0x09, 0xF9, 0xF1, 0x01, 0x01, 0x01, 0x01, 0x01,\n0xF9, 0xF9, 0x09, 0xF9, 0x09, 0xF9, 0xF1, 0x01, 0xC1, 0xE9, 0x29, 0x29, 0xF9, 0xF1, 0x01, 0xFF,\n0xFF, 0x71, 0xD9, 0x01, 0x01, 0xF1, 0xF9, 0x29, 0x29, 0xB9, 0xB1, 0x01, 0x01, 0x01, 0xF1, 0xF1,\n0x11, 0xF1, 0xF1, 0xF1, 0xE1, 0x01, 0xE1, 0xF1, 0x51, 0x51, 0x71, 0x61, 0x01, 0x01, 0xC1, 0xF1,\n0x31, 0x31, 0xF1, 0xFF, 0xFF, 0x00, 0x01, 0x01, 0x01, 0x01, 0x60, 0xE0, 0xA0, 0x01, 0x01, 0x81,\n0xE1, 0x61, 0x60, 0xC0, 0x01, 0xE1, 0xE1, 0x21, 0x21, 0xE0, 0xC1, 0x01, 0xC1, 0xE1, 0x20, 0x20,\n0xFC, 0xFC, 0xE0, 0xE0, 0xC1, 0xE1, 0xE0, 0xC1, 0xE0, 0xE1, 0x01, 0xFC, 0xFC, 0x21, 0x21, 0xE1,\n0xC1, 0xE5, 0xE4, 0x01, 0xC1, 0xE0, 0x20, 0x21, 0x20, 0x00, 0x01, 0xFD, 0xFD, 0x21, 0x20, 0xE0,\n0x00, 0x00, 0x01, 0x01, 0xC0, 0x61, 0x31, 0x31, 0x21, 0x20, 0xC0, 0x81, 0x01, 0x01, 0x01, 0x00,\n0x00, 0x00, 0x00, 0x01, 0x01, 0x01, 0x01, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x01, 0x03, 0x02,\n0x03, 0x01, 0x00, 0x01, 0x03, 0xF2, 0x1A, 0x0B, 0x08, 0x0B, 0x1B, 0x10, 0x60, 0xE3, 0x03, 0x00,\n0x01, 0x03, 0x02, 0x02, 0x03, 0x03, 0x00, 0x03, 0x03, 0x00, 0x00, 0x03, 0x03, 0x00, 0x00, 0x03,\n0x03, 0x00, 0x00, 0x03, 0x03, 0x03, 0x03, 0x00, 0x01, 0x03, 0x02, 0x02, 0x03, 0x01, 0x00, 0x03,\n0x03, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x3E, 0x63, 0x80, 0x80, 0x80, 0x80, 0x60, 0x3F, 0x07,\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00,\n0x00, 0x00, 0x00, 0x00, 0xFE, 0x01, 0x01, 0x01, 0x02, 0x03, 0x3E, 0xE8, 0xF8, 0xF0, 0xD0, 0x90,\n0x18, 0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x38, 0xFF,\n0x0C, 0x38, 0xE0, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF,\n0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1F, 0xF0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x33,\n0x5F, 0x8F, 0x84, 0x05, 0x07, 0x06, 0x0C, 0x0E, 0x0E, 0x0C, 0x14, 0x34, 0x68, 0x88, 0xD8, 0x70,\n0x00, 0x00, 0x00, 0x00, 0x00, 0xE0, 0x10, 0x10, 0x10, 0xF0, 0xE0, 0x00, 0xF0, 0xF0, 0x00, 0x80,\n0x80, 0x00, 0x00, 0x80, 0x80, 0x80, 0x80, 0x00, 0x80, 0x80, 0x00, 0x80, 0x00, 0x00, 0x20, 0x38,\n0x0E, 0x01, 0xC0, 0x3F, 0xE0, 0x00, 0x00, 0x03, 0x0E, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,\n0x00, 0x00, 0x00, 0xFF, 0xFF, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xB6, 0xED, 0xC0, 0xC0,\n0xC0, 0xE0, 0xA0, 0xA0, 0xA0, 0xA0, 0xA1, 0xA1, 0xA1, 0xA1, 0xA1, 0xA1, 0xA1, 0xE1, 0xE1, 0xC1,\n0xEF, 0xBB, 0x83, 0x86, 0x88, 0xB0, 0x80, 0x80, 0x80, 0x8F, 0x90, 0x90, 0x90, 0x9F, 0x8F, 0x80,\n0x9F, 0x9F, 0x87, 0x8D, 0x98, 0x80, 0x8C, 0x9E, 0x92, 0x92, 0x9F, 0xC0, 0xC7, 0xFF, 0xB8, 0x8F,\n0x80, 0x90, 0x90, 0xC0, 0xF0, 0x8E, 0x81, 0x80, 0x81, 0x8F, 0xB8, 0xE0, 0x80, 0x80, 0x80, 0x80,\n0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xFF, \n};\n\n\n// Because I keep forgetting to put bw variable in when setting...\nvoid setPixel(int x, int y)\n{\nsetPixel(x, y, BLACK); // Call setPixel with bw set to Black\n}\n\nvoid clearPixel(int x, int y)\n{\nsetPixel(x, y, WHITE); // call setPixel with bw set to white\n}\n\n// This function sets a pixel on displayMap to your preferred\n// color. 1=Black, 0= white.\nvoid setPixel(int x, int y, boolean bw)\n{\n// First, double check that the coordinate is in range.\nif ((x >= 0) && (x < LCD_WIDTH) && (y >= 0) && (y < LCD_HEIGHT))\n{\n  byte shift = y % 8;\n\n  if (bw) // If black, set the bit.\n    displayMap[x + (y/8)*LCD_WIDTH] |= 1<<shift;\n  else   // If white clear the bit.\n    displayMap[x + (y/8)*LCD_WIDTH] &= ~(1<<shift);\n}\n}\n\n// setLine draws a line from x0,y0 to x1,y1 with the set color.\n// This function was grabbed from the SparkFun ColorLCDShield \n// library.\nvoid setLine(int x0, int y0, int x1, int y1, boolean bw)\n{\nint dy = y1 - y0; // Difference between y0 and y1\nint dx = x1 - x0; // Difference between x0 and x1\nint stepx, stepy;\n\nif (dy < 0)\n{\n  dy = -dy;\n  stepy = -1;\n}\nelse\n  stepy = 1;\n\nif (dx < 0)\n{\n  dx = -dx;\n  stepx = -1;\n}\nelse\n  stepx = 1;\n\ndy <<= 1; // dy is now 2*dy\ndx <<= 1; // dx is now 2*dx\nsetPixel(x0, y0, bw); // Draw the first pixel.\n\nif (dx > dy) \n{\n  int fraction = dy - (dx >> 1);\n  while (x0 != x1)\n  {\n    if (fraction >= 0)\n    {\n      y0 += stepy;\n      fraction -= dx;\n    }\n    x0 += stepx;\n    fraction += dy;\n    setPixel(x0, y0, bw);\n  }\n}\nelse\n{\n  int fraction = dx - (dy >> 1);\n  while (y0 != y1)\n  {\n    if (fraction >= 0)\n    {\n      x0 += stepx;\n      fraction -= dy;\n    }\n    y0 += stepy;\n    fraction += dx;\n    setPixel(x0, y0, bw);\n  }\n}\n}\n\n// setRect will draw a rectangle from x0,y0 top-left corner to\n// a x1,y1 bottom-right corner. Can be filled with the fill\n// parameter, and colored with bw.\n// This function was grabbed from the SparkFun ColorLCDShield\n// library.\nvoid setRect(int x0, int y0, int x1, int y1, boolean fill, boolean bw)\n{\n// check if the rectangle is to be filled\nif (fill == 1)\n{\n  int xDiff;\n\n  if(x0 > x1)\n    xDiff = x0 - x1; //Find the difference between the x vars\n  else\n    xDiff = x1 - x0;\n\n  while(xDiff > 0)\n  {\n    setLine(x0, y0, x0, y1, bw);\n\n    if(x0 > x1)\n      x0--;\n    else\n      x0++;\n\n    xDiff--;\n  }\n}\nelse \n{\n  // best way to draw an unfilled rectangle is to draw four lines\n  setLine(x0, y0, x1, y0, bw);\n  setLine(x0, y1, x1, y1, bw);\n  setLine(x0, y0, x0, y1, bw);\n  setLine(x1, y0, x1, y1, bw);\n}\n}\n\n// setCircle draws a circle centered around x0,y0 with a defined\n// radius. The circle can be black or white. And have a line\n// thickness ranging from 1 to the radius of the circle.\n// This function was grabbed from the SparkFun ColorLCDShield \n// library.\nvoid setCircle (int x0, int y0, int radius, boolean bw, int lineThickness)\n{\nfor(int r = 0; r < lineThickness; r++)\n{\n  int f = 1 - radius;\n  int ddF_x = 0;\n  int ddF_y = -2 * radius;\n  int x = 0;\n  int y = radius;\n\n  setPixel(x0, y0 + radius, bw);\n  setPixel(x0, y0 - radius, bw);\n  setPixel(x0 + radius, y0, bw);\n  setPixel(x0 - radius, y0, bw);\n\n  while(x < y)\n  {\n    if(f >= 0)\n    {\n      y--;\n      ddF_y += 2;\n      f += ddF_y;\n    }\n    x++;\n    ddF_x += 2;\n    f += ddF_x + 1;\n\n    setPixel(x0 + x, y0 + y, bw);\n    setPixel(x0 - x, y0 + y, bw);\n    setPixel(x0 + x, y0 - y, bw);\n    setPixel(x0 - x, y0 - y, bw);\n    setPixel(x0 + y, y0 + x, bw);\n    setPixel(x0 - y, y0 + x, bw);\n    setPixel(x0 + y, y0 - x, bw);\n    setPixel(x0 - y, y0 - x, bw);\n  }\n  radius--;\n}\n}\n\n// This function will draw a char (defined in the ASCII table\n// near the beginning of this sketch) at a defined x and y).\n// The color can be either black (1) or white (0).\nvoid setChar(char character, int x, int y, boolean bw)\n{\nbyte column; // temp byte to store character's column bitmap\nfor (int i=0; i<5; i++) // 5 columns (x) per character\n{\n  column = ASCII[character - 0x20][i];\n  for (int j=0; j<8; j++) // 8 rows (y) per character\n  {\n    if (column & (0x01 << j)) // test bits to set pixels\n      setPixel(x+i, y+j, bw);\n    else\n      setPixel(x+i, y+j, !bw);\n  }\n}\n}\n\n// setStr draws a string of characters, calling setChar with\n// progressive coordinates until it's done.\n// This function was grabbed from the SparkFun ColorLCDShield\n// library.\nvoid setStr(char * dString, int x, int y, boolean bw)\n{\nwhile (*dString != 0x00) // loop until null terminator\n{\n  setChar(*dString++, x, y, bw);\n  x+=5;\n  for (int i=y; i<y+8; i++)\n  {\n    setPixel(x, i, !bw);\n  }\n  x++;\n  if (x > (LCD_WIDTH - 5)) // Enables wrap around\n  {\n    x = 0;\n    y += 8;\n  }\n}\n}\n\n// This function will draw an array over the screen. (For now) the\n// array must be the same size as the screen, covering the entirety\n// of the display.\nvoid setBitmap(char * bitArray)\n{\nfor (int i=0; i<(LCD_WIDTH * LCD_HEIGHT / 8); i++)\n  displayMap[i] = bitArray[i];\n}\n\n// This function clears the entire display either white (0) or\n// black (1).\n// The screen won't actually clear until you call updateDisplay()!\nvoid clearDisplay(boolean bw)\n{\nfor (int i=0; i<(LCD_WIDTH * LCD_HEIGHT / 8); i++)\n{\n  if (bw)\n    displayMap[i] = 0xFF;\n  else\n    displayMap[i] = 0;\n}\n}\n\n// Helpful function to directly command the LCD to go to a \n// specific x,y coordinate.\nvoid gotoXY(int x, int y)\n{\nLCDWrite(0, 0x80 | x);  // Column.\nLCDWrite(0, 0x40 | y);  // Row.  ?\n}\n\n// This will actually draw on the display, whatever is currently\n// in the displayMap array.\nvoid updateDisplay()\n{\ngotoXY(0, 0);\nfor (int i=0; i < (LCD_WIDTH * LCD_HEIGHT / 8); i++)\n{\n  LCDWrite(LCD_DATA, displayMap[i]);\n}\n}\n\n// Set contrast can set the LCD Vop to a value between 0 and 127.\n// 40-60 is usually a pretty good range.\nvoid setContrast(byte contrast)\n{  \nLCDWrite(LCD_COMMAND, 0x21); //Tell LCD that extended commands follow\nLCDWrite(LCD_COMMAND, 0x80 | contrast); //Set LCD Vop (Contrast): Try 0xB1(good @ 3.3V) or 0xBF if your display is too dark\nLCDWrite(LCD_COMMAND, 0x20); //Set display mode\n}\n\n/* There are two ways to do this. Either through direct commands\nto the display, or by swapping each bit in the displayMap array.\nWe'll leave both methods here, comment one or the other out if \nyou please. */\nvoid invertDisplay()\n{\n/* Direct LCD Command option\nLCDWrite(LCD_COMMAND, 0x20); //Tell LCD that extended commands follow\nLCDWrite(LCD_COMMAND, 0x08 | 0x05); //Set LCD Vop (Contrast): Try 0xB1(good @ 3.3V) or 0xBF if your display is too dark\nLCDWrite(LCD_COMMAND, 0x20); //Set display mode  */\n\n/* Indirect, swap bits in displayMap option: */\nfor (int i=0; i < (LCD_WIDTH * LCD_HEIGHT / 8); i++)\n{\n  displayMap[i] = ~displayMap[i] & 0xFF;\n}\nupdateDisplay();\n}\n\n// There are two memory banks in the LCD, data/RAM and commands.\n// This function sets the DC pin high or low depending, and then \n// sends the data byte\nvoid LCDWrite(byte data_or_command, byte data) \n{\n//Tell the LCD that we are writing either to data or a command\ndigitalWrite(dcPin, data_or_command); \n\n//Send the data\ndigitalWrite(scePin, LOW);\nSPI.transfer(data); //shiftOut(sdinPin, sclkPin, MSBFIRST, data);\ndigitalWrite(scePin, HIGH);\n}\n\n//This sends the magical commands to the PCD8544\nvoid lcdBegin(void) \n{\n//Configure control pins\npinMode(scePin, OUTPUT);\npinMode(rstPin, OUTPUT);\npinMode(dcPin, OUTPUT);\npinMode(sdinPin, OUTPUT);\npinMode(sclkPin, OUTPUT);\npinMode(blPin, OUTPUT);\nanalogWrite(blPin, 255);\n\nSPI.begin();\nSPI.setDataMode(SPI_MODE0);\nSPI.setBitOrder(MSBFIRST);\n\n//Reset the LCD to a known state\ndigitalWrite(rstPin, LOW);\ndigitalWrite(rstPin, HIGH);\n\nLCDWrite(LCD_COMMAND, 0x21); //Tell LCD extended commands follow\nLCDWrite(LCD_COMMAND, 0xB0); //Set LCD Vop (Contrast)\nLCDWrite(LCD_COMMAND, 0x04); //Set Temp coefficent\nLCDWrite(LCD_COMMAND, 0x14); //LCD bias mode 1:48 (try 0x13)\n//We must send 0x20 before modifying the display control mode\nLCDWrite(LCD_COMMAND, 0x20); \nLCDWrite(LCD_COMMAND, 0x0C); //Set display control, normal mode.\n}\n";
	
	Blockly.Arduino.definitions_['define_nokiaAllSetupStuff'] = reallyLongFunctionsEtcEtc;
	Blockly.Arduino.setups_['blahThingSET'] = 'lcdBegin();\n  setContrast(55);';
	var code = ''
	return code;
};


/*
Blockly.Arduino.nokiaJustDemo = function() {

  Blockly.Arduino.definitions_['define_nokiaGraphicLCD'] = '// include the library code:\n#include <LiquidCrystal.h>\n';
  Blockly.Arduino.setups_['blahThing'] = 'blahThing;';
  

  var code = 'digitalWrite(blah);\n'
  return code;
};
*/
