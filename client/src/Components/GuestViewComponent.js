import React, { useEffect} from "react";
import {
    Grid
} from "@mui/material";
import {
    AccountInformation
} from './AccountInfo';
import PaymentComponent from './PaymentComponent';

function GuestViewComponent({ drizzle, drizzleState, getItems, balance, getAcountBalance })
{

    useEffect(() =>
    {
        getItems()
    },[drizzleState])

    return(
        <Grid container sx={{
            border: '1px solid white',
            backgroundColor: '#1f4c57',
            borderRadius: '5px',
            paddingTop: '5px'
            }}
            alignContent="center"
            >
            <Grid item xs={12}>
                <AccountInformation drizzle={drizzle} drizzleState={drizzleState} getAccountBalance={getAcountBalance} accountBalance={balance}/>
            </Grid>
            <Grid item xs={12}>
                <PaymentComponent drizzle={drizzle} getItems={getItems} getAcountBalance={getAcountBalance}/>
            </Grid>
        </Grid>
    )
}

export default GuestViewComponent;