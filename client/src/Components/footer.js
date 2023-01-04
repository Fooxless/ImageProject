import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./footer.css";


export default function StickyFooter() {
    return (
        <Box

            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '28vh',

            }}
        >
            <CssBaseline />

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <div className="foot">
                        <Typography variant="h6">
                            CAB432 Cloud Computing
                        </Typography>
                        <Typography variant="body1">
                            Connor Gryphon -  n10776800 | Mike Senna - n11024348
                        </Typography>
                    </div>

                </Container>
            </Box>
        </Box>
    );
}