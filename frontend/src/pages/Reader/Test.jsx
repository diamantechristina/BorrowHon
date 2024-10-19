import { Box } from "@mui/material";
import React, { useState } from "react";
import Carousel from 'react-spring-3d-carousel';
import { v4 as uuidv4 } from 'uuid';

const Test = () => {
    const [goToSlide, setGoToSlide] = useState(null);
    let cards = [
        {
            key: uuidv4(),
            content: (
                <img onClick={() => setGoToSlide(0)} src="../../src/resources/readerdashboardbg.jpg"  />
            )
        },
        {
            key: uuidv4(),
            content: (
                <img onClick={() => setGoToSlide(1)} src="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" />
            )
        },
        {
            key: uuidv4(),
            content: (
                <img onClick={() => setGoToSlide(2)} src="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" />
            )
        },
        {
            key: uuidv4(),
            content: (
                <img onClick={() => setGoToSlide(3)} src="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png" />
            )
        },
        {
            key: uuidv4(),
            content: (
                <img onClick={() => setGoToSlide(4)} src="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg" />
            )
        }
    ];
    return (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "red",
            overflow: "hidden",
        }}
    >
        <Carousel 
        style={{ overflow: "hidden", position: "relative" }}
        slides={cards}
        goToSlide={goToSlide}
        margin="0 auto"
        offset={2}
        showArrows={false}
        />
        
    </Box>);
};

export default Test;
