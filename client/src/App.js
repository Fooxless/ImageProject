import React, { useState } from "react";
import "./App.css";
import Typography from '@mui/material/Typography';
import { useImageResize } from "./APIs/useImageResize.js";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Footer from './Components/footer.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useNavigate } from "react-router-dom";

function TwitterProject() {
  // eslint-disable-next-line no-unused-vars
  const { imageloading, ImageResize, imagerror } = useImageResize();
  const [selectionModel, setSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = async () => {
    await getHistory();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          {
            history?.length !== 0 && history.keyz[index] !== null ? <ListItemText primary={`${history.keyz[index]}`} onClick={() => navigate(`/history/${history.keyz[index]}`)} /> : null
          }
        </ListItemButton>
      </ListItem>
    );
  }

  // Get History
  function getHistory() {
    fetch(`/api/getRedis`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      }
    }).then(res => res.json())
      .then(body => setHistory(body))
  }

  var ImageURL;

  function handledownload() {
    for (var i = 0; i < selectionModel.length; i++) {
      openInNewTab(`https://cab432-assignment2-cg-ms.s3.ap-southeast-2.amazonaws.com/${selectionModel[i]}`)
    }

  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  if (!imageloading) {
    ImageURL = `https://cab432-assignment2-cg-ms.s3.ap-southeast-2.amazonaws.com/${ImageResize?.data[0].name}`
  }

  const columns = [
    { field: 'name', headerName: 'Image Name', width: '600' },
    { field: 'size', headerName: 'Size' },
  ];

  return (
    <div className='Page'>
      <div className='body'>
        <Typography variant="h1" gutterBottom sx={{ mb: 10 }}>
          Image Transformation Project
        </Typography>

        <div style={{ height: 400, width: '50%', left: "10%", position: "relative" }}>
          <DataGrid
            rows={imageloading ? ([]) : (ImageResize?.data)}
            getRowId={(row) => row.name}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        </div>


        <div style={{ top: "20%", left: "60%", position: "absolute" }}>
          <img src={ImageURL} alt="Random" width="80%"
            height="400px" ></img>
        </div>



        <Button variant="contained" sx={{ mt: 5 }} onClick={handledownload}>
          Download
        </Button>
        <Button variant="contained" sx={{ mt: 5, ml: 5 }} onClick={handleClickOpen}>
          History
        </Button>
        <Button variant="contained" sx={{ mt: 5, ml: 5 }} onClick={() => { window.location.reload(); }}>
          New
        </Button>

        {imageloading ? (<Box sx={{ mt: 10 }}>
          <CircularProgress size='10vh' />
        </Box>) : (<></>)}


        <Dialog open={open} onClose={handleClose} maxWidth="800">
          <DialogTitle>History</DialogTitle>
          <DialogContent>
            <Box
              sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={history?.keyz?.length}
                overscanCount={5}
              >
                {renderRow}
              </FixedSizeList>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog>



      </div>
      <Footer />
    </div >

  );
}



// function renderRow(props) {
//   const { index, style } = props;
//   return (
//     <ListItem style={style} key={index} component="div" disablePadding >
//       <ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
//         {
//           restaurantsData?.data?.length && directiondata?.length === 10 ? <ListItemText primary={`${restaurantsData.data[index].name} - ${directiondata[index].distance} - ${directiondata[index].duration}`} /> : null
//         }
//       </ListItemButton>
//     </ListItem>
//   )
// }
export default TwitterProject;

