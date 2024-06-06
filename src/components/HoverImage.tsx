import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  thumbnailSrc: string;
  fullImageSrc: string;
  alt: string;
}
const HoverImage = ({ thumbnailSrc, fullImageSrc, alt }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position="relative"
      display="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image rounded={"md"} boxSize={400} src={thumbnailSrc} alt={alt} />
      <Image
        src={fullImageSrc}
        alt={alt}
        position="absolute"
        top="120px"
        left="0"
        zIndex={1}
        boxShadow="md"
        transition="transform 0.3s ease"
        rounded={"md"}
        transform={isHovered ? "scale(1.7)" : "scale(1)"}
        visibility={isHovered ? "visible" : "hidden"}
      />
    </Box>
  );
};

export default HoverImage;
