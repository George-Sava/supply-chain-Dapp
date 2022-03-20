import React, {useCallback} from "react";
import {
    Container,
    Grid,
    Box
} from "@mui/material";
import SideMenuComponent from './SideMenuComponent';
import {useDispatch, useSelector} from 'react-redux';
import {synchItemList} from '../redux-slicers/itemManagerSlice';
import {ItemInfo} from './ItemInfo';

const Main = ({ drizzle, drizzleState }) =>
{
    const itemIndex = useSelector((state) => state.itemManagerSlice.currentItemIndex);
    const itemManagerContract = drizzle.contracts.ItemManager;
    const dispatch = useDispatch();

    const getItems = useCallback(async () => 
    {
        let auxArr = [];

        for(let i = 0; i < itemIndex; i++)
        {
            await itemManagerContract.methods.items(i).call()
            .then((res)=>
            {
                auxArr.push({
                    index: i,
                    address: res._item,
                    id: res._itemID,
                    priceInWei: res._itemPrice,
                    itemState: res._itemState
                })
            })
        }

        dispatch(synchItemList(auxArr));
    },[itemIndex])
    return(
        <Container fluid="true" maxWidth="100%">
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
                    <Grid
                      container
                      spacing={1} 
                    >
                        <Grid item xs={2}>
                            <SideMenuComponent drizzle={drizzle} drizzleState={drizzleState} getItems={getItems}/>
                        </Grid>
                        <Grid item xs={10}>
                            <ItemInfo drizzle={drizzle} drizzleState={drizzleState} getItems={getItems}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Main;