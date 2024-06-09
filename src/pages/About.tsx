import { Box, Heading, Text, Stack, Flex, Image } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Box padding="4" maxW="1200px" margin="0 auto" pt={20}>
      <Stack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" my={4}>
          About Us
        </Heading>

        <Flex direction={{ base: "column", md: "row" }} align="center">
          <Box flex={1}>
            <Image
              borderRadius="md"
              src="/Founder.jpg"
              alt="About Us"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
          <Box flex={2} p={4}>
            <Text fontSize="lg" mb={4}>
              Welcome to Elimr, your number one source for all things fashion.
              We're dedicated to giving you the very best of clothing and
              accessories, with a focus on quality, customer service, and
              uniqueness.
            </Text>
            <Text fontSize="lg" mb={4}>
              Founded in 2021 by Ismail Ibrahim, Elimr has come a long way from
              its beginnings in a small home office in San Francisco, CA. When
              John first started out, his passion for providing high-quality
              fashion at affordable prices drove him to quit his day job, do
              tons of research, and turn hard work and inspiration into a
              booming online store. We now serve customers all over the world
              and are thrilled to be a part of the eco-friendly wing of the
              fashion industry.
            </Text>
            <Text fontSize="lg" mb={4}>
              We hope you enjoy our products as much as we enjoy offering them
              to you. If you have any questions or comments, please don't
              hesitate to contact us.
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Sincerely,
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Ismail Ibrahim, Founder
            </Text>
          </Box>
        </Flex>

        <Heading as="h2" size="xl" textAlign="center" my={4}>
          Our Mission
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Our mission is to provide affordable, high-quality fashion that fits
          every lifestyle. We aim to inspire confidence and empower our
          customers to express their unique style.
        </Text>

        <Heading as="h2" size="xl" textAlign="center" my={4}>
          Our Vision
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Our vision is to be a leading global fashion retailer, known for our
          commitment to sustainability, innovation, and excellence in customer
          service. We strive to make fashion accessible to everyone, everywhere.
        </Text>

        <Heading as="h2" size="xl" textAlign="center" my={4}>
          Our Values
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={4}>
          Integrity, Customer Focus, Innovation, and Excellence. These values
          guide us in everything we do. We believe in doing business with
          honesty and transparency, always putting our customers first,
          continuously innovating, and striving for excellence in all our
          endeavors.
        </Text>
      </Stack>
    </Box>
  );
};

export default AboutPage;
