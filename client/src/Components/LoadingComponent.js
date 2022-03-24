import React from "react";
import {
    Container,
    Grid,
    Typography
} from "@mui/material";

const LoadingComponent = () =>
{
    return (
        <Container fluid="true">
            <Grid container spacing={2} alignItems="center" >
                <Grid item align="center" xs={12} sx={{textAlign: "center"}}>
                    <Typography variant="h2" gutterBottom component="div" sx={{textAlign: "center"}}>Loading...</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoadingComponent;