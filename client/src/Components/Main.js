import React from "react";
import {
    Container,
    Grid,
    Box
} from "@mui/material";
import SideMenuComponent from './SideMenuComponent';

import {ItemInfo} from './ItemInfo';

const Main = ({ drizzle, drizzleState }) =>
{
    return(
        <Container fluid="true" maxWidth="100%">
            <Grid 
              container 
              spacing={1}
              columnSpacing={1} 
              alignItems="center"
            >
                <Grid 
                  item 
                  xs={12} 
                  align="center"
                >
                    <Box><h1>Supply-Chain Dapp!</h1></Box>
                </Grid>
                <Grid item xs={12} >
                    <Grid
                      container
                      spacing={2} 
                    >
                        <Grid item xs={2}>
                            <SideMenuComponent drizzle={drizzle} drizzleState={drizzleState}/>
                        </Grid>
                        <Grid item xs={10}>
                            <ItemInfo drizzle={drizzle} drizzleState={drizzleState}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Main;