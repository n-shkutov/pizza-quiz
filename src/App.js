import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Container, Box, Heading, Button, Flex, Image, AspectRatio, IconButton, Grid,
} from '@chakra-ui/react';
import celebrate from 'src/confetti';
import quizConfig from 'src/quiz.conf';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(quizConfig);

  const {
    title, options = [], optionName, next, pathResolver, buttonMessage, finish, image, prev,
  } = currentStep;

  const nextHandler = () => {
    if (typeof next === 'function') {
      setCurrentStep(next(answers));
    } else if (typeof next === 'object') {
      setCurrentStep(next);
    }
  };

  const optionsHandler = (value) => () => {
    setAnswers((p) => ({ ...p, [optionName]: value }));
    if (pathResolver) {
      setCurrentStep(pathResolver[value]);
    }
  };

  const backHandler = () => {
    setCurrentStep(prev);
  };

  useEffect(() => {
    if (finish) {
      celebrate();
    }
  }, [finish]);

  return (
    <Container centerContent height="100%" py="16" display="grid">

      <AnimatePresence>
        <Box
          p={8}
          key={title}
          borderRadius="base"
          height="100%"
          width="100%"
          bg="gray.700"
          as={motion.div}
          position="relative"
          initial={{
            x: 300, opacity: 0,
          }}
          animate={{
            x: 0, opacity: 1,
          }}
          exit={{
            x: -300, opacity: 0,
          }}
          transition={{ duration: 2, type: 'tween' }}
          gridArea="1/1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Grid autoFlow="column" gap={4} justifyItems="start" justifyContent="start">
            {prev && <IconButton icon={<ArrowBackIcon />} onClick={backHandler} />}
            <Heading>{title}</Heading>
          </Grid>
          <div>

            {image && (
            <AspectRatio ratio={1}>
              <Image
                src={image}
                borderRadius="8"
                alt=""
                as={motion.img}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              />
            </AspectRatio>
            )}

            {!!options.length
              && (
                <Flex direction="column" as={motion.div}>
                  {options.map(({ name, value }, id) => (
                    <Button
                      key={value}
                      as={motion.button}
                      initial={{ x: 50 * id, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      p={4}
                      m={2}
                      onClick={optionsHandler(value)}
                    >
                      {name}
                    </Button>
                  ))}
                </Flex>
              )}

            {!!buttonMessage && <Button onClick={nextHandler}>{buttonMessage}</Button>}
          </div>
        </Box>
      </AnimatePresence>
    </Container>
  );
};

export default App;
