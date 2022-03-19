import React, {useEffect} from "react";
import {
    Typography
} from "@mui/material";
import {useSelector} from 'react-redux';

function ItemsComponent ({ getItems}) 
{
    const itemCount = useSelector((state) => state.itemManagerSlice.totalQuantity);

    useEffect(() =>
    {
        getItems()
    },[getItems])

    return(
        <>
            <Typography component="h5">
                Items:{itemCount }
            </Typography>
        </>
    )
}

export default ItemsComponent;