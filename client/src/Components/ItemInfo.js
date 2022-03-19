import React, {useEffect, useState, useCallback} from "react";
import {
    Box,
    Grid,
    Button
} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {createItem, initializeItemIndex, synchItemList} from '../redux-slicers/itemManagerSlice';
import ItemsComponent from './ItemsCountComponent';
import ItemsCountComponent from './ItemListComponent';
import { toast, ToastContainer } from 'react-toastify';
import CustomInput from './CustomStyledTextField';



export function ItemInfo({drizzle, drizzleState, getItems})
{
    const [itemPrice, setItemPrice] = useState(0);
    const [itemID, setItemID] = useState('');
    const itemList = useSelector((state) => state.itemManagerSlice.itemList);
    const itemIndex = useSelector((state) => state.itemManagerSlice.currentItemIndex);
    const itemManagerContract = drizzle.contracts.ItemManager;
    const dispatch = useDispatch();
    const notify = (message) => toast(message,{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,});

    const getItemIndexKey = useCallback(async () =>
    {
        await itemManagerContract.methods.itemIndex().call()
            .then((res) =>{
                    let index = parseInt(res)
                    dispatch(initializeItemIndex(index))
            });
    },[drizzleState]);
       
    const getInputPrice = (e) =>
    {
        setItemPrice(e.target.value);
    }

    const getInputID = (e) =>
    {
        setItemID(e.target.value);
    }

    const createItemAction =async () => {

        const existingItem = itemList.find(item => item.id === itemID);

        if(!existingItem)
        {
            await itemManagerContract.methods.createItem(itemID,itemPrice).send({from: drizzleState.accounts[0]})
                .then((result)=>{
                    let itemAddress = result.events.SupplyChaninStep.returnValues._itemAddress;
                    let itemState = result.events.SupplyChaninStep.returnValues._itemState;
                    let itemIndex = result.events.SupplyChaninStep.returnValues._itemIndex;

                    dispatch(
                        createItem({
                            index:itemIndex,
                            id:itemID,
                            priceInWei: itemPrice,
                            address: itemAddress,
                            itemIndex: itemIndex,
                            itemState: itemState
                        })
                    );
                });
        }
        else
        {
            notify(`Item with Id: ${itemID}, already exists!`)
        }
    };


    useEffect( ()=> 
    {
        getItemIndexKey()
    },[drizzleState])

    return (
    <Grid container sx={{border: '1px solid white', padding: '5px', borderRadius: '8px', backgroundColor: '#1f4c57'}}>
        <Grid item xs={12} component="h3" sx={{textAlign: "center"}}> Item Info</Grid>
        <Grid item xs={12}  align="center"> 
            <ToastContainer />
            <Grid container >
                <Grid item xs={8} align="left">
                    <ItemsComponent getItems={getItems}  /> 
                </Grid>
                <Grid item xs={4}>
                    {/* to add button for itemlist feature */}
                </Grid>
                <Grid item xs={12} align="center">
                    <Grid container spacing={2}>
                        <Grid item xs={1} align="left">
                            <Box component="h4" >
                                Add item
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <CustomInput 
                            type="number" 
                            label="Input Price" 
                            variant="standard"
                            InputProps={{ inputProps: { min: 0}, style: { color: "white"}}} 
                            onChange={getInputPrice}
                            sx={{
                                input:{color:"white"},
                                label:{color:"white"},
                                width: "100%"
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <CustomInput 
                                label="Input Item ID"
                                variant="standard"
                                InputProps={{  }}
                                onChange={getInputID}
                                sx={{
                                    input:{color:"white"},
                                    label:{color:"white"},
                                    width: "100%"
                                    }}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button 
                            sx={{
                                backgroundColor: "#C64191", 
                                color: "white",
                                fontWeight: "bold",
                                ':hover': {color:"white", backgroundColor: '#ADA3D6'}
                                }} 
                            variant="contained"
                            onClick={createItemAction}
                            > Create new item</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    {itemIndex !== 0? <ItemsCountComponent itemList={itemList} getItems={getItems}/>: ''}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}
