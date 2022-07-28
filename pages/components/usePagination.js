import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MyCampaign from "./myCampaign";
import NFT from "./nft";
export default function UsePagination(props) {

    let data = props.list
    let [page, setPage] = useState(1);
    const PER_PAGE = props.perpage;
    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            {props.obj == 'collecting' ?
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {_DATA.currentData().map(nft => {
                                return (
                                    <Grid item xs={2} sm={4} md={4}>
                                        <Item className="border-solid border-gray-100 border-2">
                                            <NFT
                                                id={nft.id}
                                                uri={nft.tokenURI}
                                                isSell={false}
                                                button="Sell"
                                            />
                                        </Item>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </div>
                :
                <div>
                    {props.obj == 'listing' ?
                        <div>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                >
                                    {_DATA.currentData().map(nft => {
                                        return (
                                            <Grid item xs={2} sm={4} md={4}>
                                                <Item className="border-solid border-gray-100 border-2">
                                                    <NFT
                                                        id={nft.id}
                                                        uri={nft.tokenURI}
                                                        isSell={true}
                                                        price={nft.price}
                                                        button="Cancel"
                                                    />
                                                </Item>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </div>
                        :
                        <div>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                >
                                    {_DATA.currentData().map(campaign => {
                                        return (
                                            <Grid item xs={4} sm={4} md={6}>
                                                <Item className="border-solid border-gray-100 border-2">
                                                    <MyCampaign
                                                        title={campaign.title}
                                                        image={campaign.image}
                                                        id={campaign._id}
                                                    />
                                                </Item>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </div>
                    }
                </div>
            }
            <Pagination
                className="flex justify-center mt-5"
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </div>
    );
}