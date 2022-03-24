import React from 'react';
import {
    Grid
} from "@mui/material";

import {ItemInfo} from './ItemInfo';

const OwnerComponent = ({drizzle,drizzleState,getItems}) => 
{
    return (
        <Grid 
              container 
              spacing={2}
              columnSpacing={0} 
              alignItems="center">
                <Grid 
                  item 
                  xs={12} 
                  align="center">
                    {/* <Box><h1>Supply-Chain Dapp!</h1></Box> */}
                </Grid>
                <Grid item xs={12} >
                    <ItemInfo drizzle={drizzle} drizzleState={drizzleState} getItems={getItems}/>
                </Grid>
            </Grid>
    )
}

export default OwnerComponent;