import { createTheme } from "@mui/material";

const theme= createTheme({
    direction: "rtl",
    typography:{
        fontFamily:"'Yekan Bakh','Galey', 'Roboto'"
        
    },
    palette:{
        BurntOrange: {
            main: '#E35A01'
        },
        NavyBlue:{
            main: '#2E4769'
        },
        ForestGreen:{
            main: '#4C7C71'
        },
        DarkBlue:{
            main: '#1F262E'
        }
    }
})

export default theme;