import React from "react";
import {
    Grid
} from "@mui/material";

export function AccountInformation ({drizzle, drizzleState }) 
{
    return(
        <Grid container alignItems="center" >
            <Grid item xs={12} component="h3" sx={{textAlign: "center"}}>Connected Account</Grid>
            {/* <Grid item xs={12}>
                <Box
                  sx={{ whiteSpace: 'normal' }}
                >Account Address: {drizzleState.accounts[0]} </Box>
            </Grid> */}
            <Grid item xs={12} align="center">Balance: {drizzle.web3.utils.fromWei(drizzleState.accountBalances[drizzleState.accounts[0]])}Ether</Grid>
        </Grid>
    );
}

