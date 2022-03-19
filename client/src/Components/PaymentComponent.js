import React, {useCallback,useState} from "react";
import CustomStyledTextField from './CustomStyledTextField';
import {
    Grid,
    Button,
    Container
} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

const PaymentComponent = ({drizzle, getItems, getAccountBalance}) =>
{
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemManagerSlice.itemList);
    const currentAddress = useSelector(state => state.accounts[0])
    const [itemID, setItemID] = useState('');



    const triggerPayment = useCallback(async (id) => {
        const item = itemList.find(item => item.id === id)

        if (item)
        {
            const itemPrice = item.priceInWei
            // const itemIndex = item.index
            const itemAddress = item.address

            await drizzle.web3.eth.sendTransaction({from: currentAddress, to: itemAddress, value: itemPrice})
            getItems()
            getAccountBalance()    
        }
    })

    return (
        <Container >
            <Grid container spacing={2} alignItems="center" sx={{marginBottom: "5px", marginTop: "5px"}}>
                <Grid item xs={12} align="center" component="h3">
                    Purchase Item
                </Grid>
                <Grid item xs={12} align="center" component="h5">
                    Item Identifier
                </Grid>
                <Grid item xs={12} align="center" component="h5">
                    <CustomStyledTextField 
                    label="Input Item ID"
                    variant="standard"
                    onChange={(e) => setItemID(e.target.value)}
                    sx={{
                        input:{color:"white"},
                        label:{color:"white"}
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Button 
                      variant="contained"
                      size="medium"
                      sx={{
                          width: "100%"
                      }}
                      onClick={() => triggerPayment(itemID)}
                    >Buy</Button>
                </Grid>
            </Grid>
        </Container>

    )
}

export default PaymentComponent;