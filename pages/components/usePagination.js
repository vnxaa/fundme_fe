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
                            {_DATA.currentData().map(collecting => {
                                return (
                                    <Grid item xs={2} sm={4} md={4}>
                                        <NFT
                                            id={collecting.id}
                                            uri={collecting.tokenURI}
                                            state="own"
                                            button="Sell"
                                        />
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
                                    {_DATA.currentData().map(listing => {
                                        return (
                                            <Grid item xs={2} sm={4} md={4}>
                                                <NFT
                                                    id={listing.id}
                                                    uri={listing.tokenURI}
                                                    state="sell"
                                                    price={listing.price}
                                                    button="Cancel"
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </div>
                        :
                        <div>
                            {props.obj == 'market' ?
                                <div>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            {_DATA.currentData().map(market => {
                                                return (
                                                    <Grid item xs={2} sm={4} md={4}>
                                                        <NFT
                                                            id={market.id}
                                                            uri={market.tokenURI}
                                                            state="market"
                                                            price={market.price}
                                                            button="Buy"
                                                            author={market.from}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Box>
                                </div>
                                :
                                <div>
                                    {props.obj == 'campaign' ?
                                        <div>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid
                                                    container
                                                    spacing={{ xs: 2, md: 3 }}
                                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                                >
                                                    {_DATA.currentData().map(campaign => {
                                                        return (
                                                            <Grid item xs={4} sm={8} md={12}>
                                                                <MyCampaign
                                                                    title={campaign.title}
                                                                    image={campaign.image}
                                                                    id={campaign._id}
                                                                />
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                            </Box>
                                        </div>
                                        :
                                        <div>
                                            No Oject Choose
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            }
            <Pagination
                className="flex justify-center mt-5 text-white"
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                color="primary"
            />
        </div>
    );
}