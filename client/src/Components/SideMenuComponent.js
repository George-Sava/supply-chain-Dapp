import React, {useState, useEffect} from "react";
import {
    Grid
} from "@mui/material";
import {
    AccountInformation
} from './AccountInfo';
import PaymentComponent from './PaymentComponent';

function SideMenuComponent({ drizzle, drizzleState, getItems })
{
    const [balance, setBalance] = useState('0');

    const getAcountBalance = async() =>
    {
        if(drizzleState)
        {    
            let acBalance = await drizzle.web3.eth.getBalance(drizzleState.accounts[0])
            setBalance(acBalance)
        }
    }

    useEffect(() =>
    {
        getAcountBalance()
    })

    return(
        <Grid container sx={{
            border: '1px solid white',
            backgroundColor: '#1f4c57',
            borderRadius: '5px',
            paddingTop: '5px'
            }}>
            <Grid item xs={12}>
                <AccountInformation drizzle={drizzle} drizzleState={drizzleState} getAccountBalance={getAcountBalance} accountBalance={balance}/>
            </Grid>
            <Grid item xs={12}>
                <PaymentComponent drizzle={drizzle} getItems={getItems} getAcountBalance={getAcountBalance}/>
            </Grid>
        </Grid>
    )
}

export default SideMenuComponent;