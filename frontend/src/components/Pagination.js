import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {FilterProductContext} from '../FilterProductContext';

export default function PaginationRounded() {
    const filterProductContext = React.useContext(FilterProductContext);
    const HandleChange = (event) => {
        filterProductContext.updatePage(event.currentTarget.textContent);
        window.scrollTo(0, 1700);
    };

    React.useEffect(() => {
        filterProductContext.updatePage(1);
    }, []);

    return (
        <Stack spacing={2} style={{margin: '50px 0'}}>
            <Pagination onChange={HandleChange} count={filterProductContext.maxPage} variant="outlined" defaultPage={1} shape="rounded" />
        </Stack>
    );
}
