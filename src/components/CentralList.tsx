import React from "react";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/core";
//import { MdStar } from "react-icons/md";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useState } from "react";

export function CentralList(): JSX.Element {
    const [movies] = useState<Movie[]>(
        movieList.map((movie) => {
            return {
                image: movie.image,
                title: movie.name,
                description: movie.desc,
                maturity_rating: movie.age,
                cast: movie.cast,
                genre: movie.genre,
                user_rating: 1
            };
        })
    );

    function handleOnDrag(e: React.DragEvent, widgetType: Movie) {
        e.dataTransfer.setData("widgetType", JSON.stringify(widgetType));
    }

    return (
        <div>
            <h1>Central Movie List</h1>
            <div className="col">
                {movies.map((movie) => (
                    <div key={movie.title}>
                        <div className="border">
                            <div
                                draggable
                                onDragStart={(e) => handleOnDrag(e, movie)}
                            >
                                <Box p="5" maxW="320px" borderWidth="1px">
                                    <Image
                                        borderRadius="md"
                                        src={movie.image}
                                        alt={movie.title}
                                    />
                                    <Flex align="baseline" mt={2}>
                                        <Badge color="pink">
                                            {movie.maturity_rating}
                                        </Badge>
                                        <Text
                                            ml={2}
                                            textTransform="uppercase"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color="pink.800"
                                        >
                                            {movie.genre.join(" & ")}
                                        </Text>
                                    </Flex>
                                    <Text
                                        mt={2}
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        lineHeight="short"
                                    >
                                        {movie.title}
                                    </Text>
                                    <Text mt={2}>{movie.description}</Text>
                                    <Flex mt={2} align="center">
                                        <Text ml={1} fontSize="sm">
                                            <b>{movie.cast.join(" , ")}</b>
                                        </Text>
                                    </Flex>
                                </Box>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
