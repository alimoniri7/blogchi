import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from '@apollo/client';
import { GET_AUTHOR_POSTS_PREVIEW } from '../../GraphQL/gqls';
import ShowError from './ShowError';
import LoadingCard from './LoadinCard';
import PreviewCard from './PreviewCard';



function SampleNextArrow({ className, style, onClick }) {
    return (
        <ArrowForwardIosIcon
        className={className}
        style={{ ...style, display: "block",color:'black' , '&:hover':{color: '#192837'}  }}
        onClick={onClick}
      />
    );
}
  
  function SamplePrevArrow({ className, style, onClick }) {
    return (
        <ArrowBackIosNewIcon
        className={className}
        sx={{ ...style, display: "block", color:'black' , '&:hover':{color: '#192837'} }}
        onClick={onClick}
        />
    );
  }
    
  
const AuthorPostsSection = ({authorSlug}) => {
    const {loading, data , error} = useQuery(GET_AUTHOR_POSTS_PREVIEW, {
        variables: {slug: authorSlug}
    })
    console.log(authorSlug);
    
    if(error) return <ShowError error={error.message} />
    if(loading) return <LoadingCard/>
    
    const {posts}= data.author
    console.log(posts);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: posts.length===1 ? 1 : posts.length===2 ? 2 : 3,
        slidesToScroll: 1,
        rtl: true,
        lazyLoad: true,
        centerMode: true,
        centerPadding: "70px",
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        prevArrow: <SampleNextArrow />,
        nextArrow: < SamplePrevArrow/>,
        responsive: [
          {
            breakpoint: 1024,
            settings:{
              centerPadding: "0px",

            }
          },
          {
            breakpoint: 900,
            settings:{
              centerPadding: "70px",
              slidesToShow: posts.length===1 ? 1 : 2

            }
          },
          {
            breakpoint: 750,
            settings:{
              centerPadding: "0px",
              slidesToShow: posts.length===1 ? 1 : 2

            }
          },
          {
            breakpoint: 600,
            settings:{
              centerPadding: "70px",
              slidesToShow:1,
              prevArrow: false,
              nextArrow: false,

            }
          },
          {
            breakpoint: 450,
            settings:{
              centerPadding: "10px",
              slidesToShow:1,
              prevArrow: false,
              nextArrow: false,

            }
          }
        ]
  
    }
    

    console.log(data);

    return (
        <Box  >
           <Typography variant='h6' fontWeight={800} padding={1} >مقاله های این نویسنده</Typography> 
           <Box boxShadow='0px 3px 7px #a9a9a9 inset;' bgcolor='#f4f4f4' pb={4} pt={2} borderRadius={1} >
            <Slider {...settings} >
                  {
                      data.author.posts.map(post=>
                          <PreviewCard withoutHeader key={post.slug} maxWidth='270px' title={post.title} slug={post.slug} cover={post.cover}  />
                      )
                  }
            </Slider>
           </Box>
        </Box>
    );
};

export default AuthorPostsSection;