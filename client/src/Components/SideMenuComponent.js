import React from "react";
import {
    Grid
} from "@mui/material";

import {
    AccountInformation
} from './AccountInfo';

function SideMenuComponent({ drizzle, drizzleState })
{
    return(
        <Grid container sx={{
            border: '1px solid white',
            backgroundColor: '#1f4c57',
            borderRadius: '5px',
            }}>
            <Grid item xs={12}>
                <AccountInformation drizzle={drizzle} drizzleState={drizzleState} />
            </Grid>
        </Grid>
    )
}

export default SideMenuComponent;