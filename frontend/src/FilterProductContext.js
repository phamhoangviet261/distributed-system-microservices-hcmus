import {useState, createContext} from 'react';
const FilterProductContext = createContext();

function FilterProductProvider({children}) {
    const [listProduct, setListProduct] = useState([]);
    const [listProductDefault, setListProductDefault] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const value = {
        list: listProduct,
        count: count,
        listDef: listProductDefault,
        page: page,
        maxPage: maxPage,
        updateListProduct: (newListProduct) => {
            setListProduct(newListProduct);
        },
        updateListProductDefault: (newListProduct) => {
            setListProductDefault(newListProduct);
        },
        updateCount: (newListProduct) => {
            console.log('update count ne');
            setListProduct(newListProduct);
            setCount(count + 1);
        },
        updatePage: (newPage) => {
            setPage(newPage);
        },
        updateMaxPage: (newMaxPage) => {
            setMaxPage(newMaxPage);
        }
    };
    return <FilterProductContext.Provider value={value}>{children}</FilterProductContext.Provider>;
}

export {FilterProductContext, FilterProductProvider};
