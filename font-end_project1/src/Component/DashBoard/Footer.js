import React from 'react';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid"; 
import Link from "@material-ui/core/Link"
import { withStyles } from '@material-ui/core/styles';
import FooterStyle from '../styleComponent/FooterStyle';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Fab } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
const Footer = (props) => {
    const classes = props.classes ; 
    return (
      <footer className={classes.footer}>
          <Box bgcolor = "text.secondary">
              <Container maxWidth="lg" color="white">
                  <Grid container spacing={5}>
                     <Grid item xs={12} sm={4}>
                         <Box borderBottom={1}>Help</Box>
                         <Box>
                             <Link href="" color="inherit">Content</Link>
                         </Box>
                         <Box>
                             <Link href="" color="inherit">Support</Link>
                         </Box>
                         <Box>
                             <Link href ="" color="inherit">Contact</Link>
                         </Box>
                     </Grid>
                     <Grid item xs={12} sm={4}>
                         <Box borderBottom={1}>Help</Box>
                         <Box>
                             <Link href="" color="inherit">Content</Link>
                         </Box>
                         <Box>
                             <Link href="" color="inherit">Support</Link>
                         </Box>
                     </Grid>
                     <Grid item xs={12} sm={4}>
                         <Box borderBottom={1}>Contact</Box>
                         <Fab color="primary" aria-label="fb" style ={{margin:"20px"}} >
                           <FacebookIcon />
                         </Fab>
                         <Fab  aria-label="yt" style={{color :"red",margin:"20px"}} > 
                           <YouTubeIcon/> 
                         </Fab> 
                         <Fab aria-label="ins" style= {{color:"#8a3ab9",margin:"20px"}}>
                           <InstagramIcon/>
                         </Fab>
                     </Grid>
                  </Grid>
              </Container>
            <Box textAlign="center" pt={{xs:2, sm:5}} pb={{xs:2, sm:5}}> Project1 &reg; {new Date().getFullYear()}</Box>
          </Box>
      </footer>
    );
};

export default withStyles(FooterStyle)(Footer);