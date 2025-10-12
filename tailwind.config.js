/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

export default {
  content: ['./src/**/*.{vue,js}'],
  theme: {
    extend: {colors},
  },
  plugins: [],
}
