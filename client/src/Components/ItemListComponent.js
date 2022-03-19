import React, {useEffect} from "react";

import {
    Typography,
    Grid
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

function ItemListComponent({itemList, getItems})
{
    useEffect(() =>
    {
        getItems();
    },[])
    
    console.log(itemList)
    if(itemList != [])
    {
        return (
            <>
            <Grid container sx={{
                border: '1px solid white',
                padding: '4px',
                marginTop: '10px' 
                }} >
            {itemList && itemList.map(item =>
                {
                return (
                <Grid container key={item.id} >
                    <Grid item xs={6} key={item.id}>
                        <Typography variant="body1" gutterBottom>
                            {/* <DescriptionIcon fontSize="small"/> */}
                            Address: {item.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" gutterBottom>
                            Item ID: {item.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" gutterBottom>
                            Price: {item.priceInWei}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" gutterBottom>
                            State: {item.itemState === '0'? 'Created': item.itemState === '1'? 'Payed': 'Delivered'}
                        </Typography>
                    </Grid>
                </Grid>
                )})}
            </Grid>
            </>
        )
    }
    else
    {
        return <div>No items!</div>
    }
}


export default ItemListComponent;