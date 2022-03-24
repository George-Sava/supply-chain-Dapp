import React from 'react';
import {
    Grid,
    Box
} from "@mui/material";
import GuestViewComponent from './GuestViewComponent';

const GuestComponent = ({drizzle, drizzleState, getItems, balance, getAcountBalance}) => 
{
    return(
        <Grid container alignItems="center"  sx={{ height: "100vh"}}>
            <Grid item xs={4}></Grid>
            <Grid item align="center" xs={4}>
                <GuestViewComponent drizzle={drizzle} drizzleState={drizzleState} getItems={getItems} balance={balance} getAcountBalance={getAcountBalance}/>
            </Grid>
        </Grid>
    )
}

export default GuestComponent;