// import Switch from '@mui/joy/Switch';
// import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
// import WavesRoundedIcon from '@mui/icons-material/WavesRounded';
// import { useState } from 'react';
// const ToggleButtonWithIcons = ({ icon, label, count=0 }) => {
//     const [dark, setDark] = useState(false);
//     return (
//         <Switch
//         color={dark ? 'primary' : 'danger'}
//         slotProps={{ input: { 'aria-label': 'dark mode' } }}
//         startDecorator={
//           <LocalFireDepartmentRoundedIcon
//             sx={[dark ? { color: 'text.tertiary' } : { color: 'danger.600' }]}
//           />
//         }
//         endDecorator={
//           <WavesRoundedIcon
//             sx={[dark ? { color: 'primary.500' } : { color: 'text.tertiary' }]}
//           />
//         }
//         checked={dark}
//         onChange={(event) => setDark(event.target.checked)}
//       />

//     );
//   };

//   export default ToggleButtonWithIcons;

//   import Switch from '@mui/joy/Switch';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { useState } from 'react';

// const ToggleButtonWithIcons = () => {
//   const [dark, setDark] = useState(false);

//   return (
//     <Switch
//       checked={dark} // Bind the state to the Switch
//       onChange={(e) => setDark(e.target.checked)} // Toggle the state
//       size="lg"
//       slotProps={{
//         input: { 'aria-label': dark ? 'Dark mode' : 'Light mode' },
//         thumb: {
//           children: dark ? <DarkModeIcon /> : <LightModeIcon />, // Dynamic icon
//         },
//         track: {
//           children: (
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 width: '100%',
//                 padding: '0 8px',
//                 fontSize: '12px',
//                 color: dark ? 'white' : 'black',
//               }}
//             >
//               <LightModeIcon />
//               <DarkModeIcon />
//             </div>
//           ),
//         },
//       }}
//       sx={{
//         '--Switch-thumbSize': '24px',
//         '--Switch-trackHeight': '32px',
//         '--Switch-trackWidth': '64px',
//         '--Switch-trackBackground': dark ? '#333' : '#ddd', // Change track color
//       }}
//     />
//   );
// };

// export default ToggleButtonWithIcons;
