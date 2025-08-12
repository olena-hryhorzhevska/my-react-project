// interface ColorPickerProps {
//   onColorChange: ({ color }: { color: string }) => void;
// }

// export default function ColorPicker({ onColorChange }: ColorPickerProps) {
//   const colors = ['red', 'green', 'blue'];

//   return (
//     <div>
//       {colors.map((c) => (
//         <button key={c} onClick={() => onColorChange({ color: c })}>
//           {c}
//         </button>
//       ))}
//     </div>
//   );
// }





// import { useState } from 'react';
// import ColorPicker from './ColorPicker';

// export default function App() {
//   const [selectedColor, setSelectedColor] = useState('');

//   return (
//     <div>
//       <h1>Selected color: {selectedColor}</h1>
//       <ColorPicker onColorChange={(obj) => setSelectedColor(obj.color)} />
//     </div>
//   );
// }