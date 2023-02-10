import {FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ArticlesForm( {sort, setSort, order, setOrder, topicQuery}) {
    const navigate = useNavigate();

    const handleSortChange = (event) => {
        console.log(event.target.value);
        setSort(event.target.value);
        setOrder("desc");

        return navigate(
            topicQuery
            ?
            `/?topic=${topicQuery}&sort_by=${event.target.value}`
            :
            `/?sort_by=${event.target.value}`

        );
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    }

    return ( 
        <form className="d-flex">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="sort-form me-3">
                <div>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
                sx={{width: "120px"}}
                >
                <MenuItem value={"votes"} type="submit">
                    Votes
                </MenuItem>
                <MenuItem value={"comment_count"}>
                    Engagment
                </MenuItem>
                <MenuItem value={"created_at"}>
                    date
                </MenuItem>
                </Select>

                </div>

                
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="order-form me-3 d-md-flex d-none ">
                <div>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="order"
                    onChange={handleOrderChange}
                    sx={{width: "120px"}}
                    >
                        <MenuItem value={"desc"} type="submit">
                            Decending
                        </MenuItem>
                        <MenuItem value={"asc"}>
                            Ascending
                        </MenuItem>
                    </Select>

                </div>
            </FormControl>

        </form>
    );
}

export default ArticlesForm;