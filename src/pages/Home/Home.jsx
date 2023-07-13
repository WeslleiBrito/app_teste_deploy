import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  URL_BACK_IMG,
  URL_BASE,
  URL_FRONT_IMG,
  URL_LOREN,
} from "../constants/url";
import {
  Button,
  Image,
  Box,
  Flex,
  Wrap,
  WrapItem,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const customTheme = extendTheme({
  components: {
    Image: {
      baseStyle: {
        borderRadius: "md",
        boxShadow: "md",
      },
    },
  },
});

function Home() {
  const [tarotCards, setTarotCards] = useState([]);
  const [showBackground, setShowBackground] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClickable, setIsClickable] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [initialTarotCards, setInitialTarotCards] = useState([]);
  const [cardDescription, setCardDescription] = useState("");

  useEffect(() => {
    axios
      .get("tarot.json")
      .then((response) => {
        const cards = response.data.cards.map((card) => ({
          ...card,
          originalImage: URL_BASE + URL_FRONT_IMG + card.image,
        }));
        setTarotCards(cards);
        setInitialTarotCards(cards);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCardDescription = async () => {
      try {
        const response = await axios.get(`${URL_LOREN}`);
        const paragraphs = response.data;
        setCardDescription(paragraphs[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedCard) {
      fetchCardDescription();
    }
  }, [selectedCard]);

  const handleCardClick = () => {
    setShowBackground(true);
    setIsClickable(true);
    setTarotCards(
      tarotCards.map((card) => ({
        ...card,
        image: URL_BACK_IMG,
      }))
    );
  };

  const handleRandomCardClick = () => {
    if (isClickable) {
      const randomIndex = Math.floor(Math.random() * tarotCards.length);
      const randomCard = tarotCards[randomIndex];
      setSelectedCard(randomCard);
      setTarotCards([randomCard]);
      setShowBackground(false);
      setIsClickable(false);
    }
  };

  const handleResetAllClick = () => {
    setShowBackground(false);
    setIsClickable(false);
    setSelectedCard(null);
    setTarotCards(initialTarotCards);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Flex justify="center" align="center" minH="100vh" p={4}>
        <Box textAlign="center">
          {!selectedCard && !isClickable && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={handleCardClick}
                colorScheme="teal"
                variant="outline"
                mb={4}
              >
                Clique para embaralhar as cartas
              </Button>
            </motion.div>
          )}
          <Flex justify="center" align="center">
            {selectedCard ? (
              <Box justify="center" align="center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box mb={4}>
                    <Image
                      src={selectedCard.originalImage}
                      alt={selectedCard.name}
                      borderRadius="md"
                      boxShadow="md"
                    />
                  </Box>
                  <Box
                    maxW={400}
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    {cardDescription}
                  </Box>
                  <Button
                    onClick={handleResetAllClick}
                    colorScheme="teal"
                    variant="outline"
                    mt={4}
                  >
                    Resetar todas as cartas
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <Wrap spacing={4} justify="center">
                {tarotCards.map((card) => (
                  <WrapItem key={card.name} onClick={handleRandomCardClick}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: Math.random() }}
                    >
                      <Box
                        as={motion.div}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        p={2}
                        bg="white"
                        borderRadius="md"
                        boxShadow="md"
                        cursor="pointer"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Image
                          src={
                            showBackground
                              ? URL_BASE + URL_BACK_IMG
                              : card.originalImage
                          }
                          alt={card.name}
                        />
                      </Box>
                    </motion.div>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
