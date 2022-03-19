import React from "react";
import {
    Grid
} from "@mui/material";
import {
    AccountInformation
} from './AccountInfo';
import PaymentComponent from './PaymentComponent';

function SideMenuComponent({ drizzle, drizzleState, getItems })
{
    return(
        <Grid container sx={{
            border: '1px solid white',
            backgroundColor: '#1f4c57',
            borderRadius: '5px',
            paddingTop: '5px'
            }}>
            <Grid item xs={12}>
                <AccountInformation drizzle={drizzle} drizzleState={drizzleState} />
            </Grid>
            <Grid item xs={12}>
                <PaymentComponent drizzle={drizzle} getItems={getItems}/>
            </Grid>
        </Grid>
    )
}

export default SideMenuComponent;