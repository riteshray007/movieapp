// import React, { useEffect } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';


// export default function Trailer({ openup }) {
//   const [open, setOpen] = React.useState(false);


//   //  useEffect (()=>{
//   //   if(openup === true){
//   //     setOpen(false);
//   //   }else{
//   //     setOpen(true);
//   //   }
//   //  },[])
//   const handleopen = () => {
//     setOpen(true);
//   }
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>

//       <Dialog
//         open={this.state.open == n.id}
//         onClose={this.setclose}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//         fullWidth={true}
//         maxWidth='md'>
//         <DialogActions>
//           {/* let sr =  https://www.youtube.com/watch?v=&{this.state.keylist} ; */}
//           < ReactPlayer url={this.state.link} controls />
//           {/* <video src={this.state.link} controls  ></video> */}
//           <Button onClick={this.setclose} autoFocus>
//             Close
//           </Button>
//           <Button onClick={() => this.trailerincrement()} >  Next </Button>
//           {/* <p> {n.id} </p> */}
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }