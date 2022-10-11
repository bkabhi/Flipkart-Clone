import React, { useEffect, useState } from 'react';
import { Box,Alert,SkeletonCircle,SkeletonText,AlertIcon,AlertTitle,AlertDescription, Button, Img, Text, WrapItem } from '@chakra-ui/react';
import './fashion.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Slider from "react-slick";

function Groceries() {
    const [groceries, setGroceries] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const PreviousBtn = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <h1 style={{ color: "black", fontSize: "45px" }}> <GrFormPrevious /> </h1>
            </div>
        );
    };
    const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
            <Box className={className} onClick={onClick} display="none">
                <h1 style={{ fontWeight: "bolder", fontSize: "45px" }}> <GrFormNext />  </h1>
            </Box>

        );
    };
    // var settings = {
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     prevArrow: <PreviousBtn />,
    //     nextArrow: <NextBtn />
    // }
    var settings = {
        prevArrow: <PreviousBtn />,
         nextArrow: <NextBtn />,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    const getFashion = () => {
        setLoading(true)
        fetch("http://localhost:4000/groceries")
            .then(res => res.json())
            .then(res => setGroceries(res))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        getFashion();
    }, [])

    if (loading) {
        return (
            <>
                <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='100' />
                    <SkeletonText mt='4' noOfLines={8} spacing='4' />
                </Box>
            </>
        )
    }
    if (error) {
        return (
            <><Alert status='error' w="70%" m="auto" textAlign={"center"}>
                <AlertIcon />
                <AlertTitle>Opps!</AlertTitle>
                <AlertDescription>Please Refresh and try again.</AlertDescription>
            </Alert>
            </>
        )
    }
    return (
        <Box display={"flex"} mt="20px" boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" p='1' bg='white' >

            <Box w="15%" m="auto" textAlign={"center"} className="dealsBox">
                <Text fontSize={{ base: '10px', md: '20px', lg: '30px' }}> Rush Hour</Text>

                <WrapItem mt="10%">
                    <Button fontSize={{ base: '6px', md: '9px', lg: '12px' }} m={"auto"} colorScheme='messenger'>VIEW ALL</Button>
                </WrapItem>
                <Img mt="50%" src="https://www.rvsmedia.co.uk/wp-content/uploads/2021/07/Apparel-Industry_Article_2.jpg" alt="fg" />

            </Box>
            <Box w={{ base: '80%', md: '84%', lg: '84%' }} m="auto" className="OffSlider">
                <Slider {...settings}>
                    {groceries.map(item => <Box m="5px" alignItems="center" textAlign={"center"} key={item.item_id}>
                        <Img w="180px" h="240px" m="auto" _hover={{ transform: "scale(1.1)",transition:"400ms" }} p="10px" src={item.image} alt="" />
                        <Text fontWeight="700"> {item.description}</Text>
                        
                        <Text color={"green"}>₹ {item.new_price}</Text>
                           
                    </Box>)}

                </Slider>
            </Box>
            {/* mobile version */}
            <Box display={{ base: 'block', md: 'none', lg: 'none' }}  bg="orange" backgroundImage={"https://rukminim1.flixcart.com/fk-p-reco/600/150/images/Reco_BDS_ffb8e3.jpg?q=90"} p="10px"> 
                <Box mb="20px" mt="10px" alignItems={"center"} display="flex" justifyContent={"space-between"}> <Text>  Rush Hour</Text> <Button size="sm" colorScheme='messenger'>View All</Button></Box>
                <Box className='itemGrid'display={{ base: 'grid', md: 'none', lg: 'none' }} >
                    
                    
                    {groceries.map(item => <Box m="5px" borderRadius="6px" bg="white" alignItems="center" textAlign={"center"} key={item.item_id} border="1px solid silver">
                        <Img w="180px" h="240px" m="auto" _hover={{ transform: "scale(1.1)", transition: "400ms" }}  p="10px" src={item.image} alt="" />
                        <Text fontWeight="700"> {item.description}</Text>

                        <Text color={"green"}>₹ {item.new_price}</Text>
                        <Text > {item.brand}</Text>
                    </Box>)}
                    
                </Box>
            </Box>
            {/* mobile version end */}
        </Box>

    );
}

export default Groceries;