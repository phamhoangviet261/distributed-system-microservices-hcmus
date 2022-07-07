import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from 'styled-components';
import EditProduct from './EditProduct';
import { useRef } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  ['&:hover']: {
    cursor: "pointer",
    backgroundColor: "#EEE",
  },
}));


const rows = [
    {
        "_id": "62c4f9bbd9e6be98efed3166",
        "sold": 20,
        "rest": 50,
        "discount": 23,
        "NSX": "2022-05-26T13:41:00.553Z",
        "HSD": "2023-10-02T11:56:17.760Z",
        "id": "sp001",
        "name": "Thịt ba rọi heo tươi C.P khay 500g",
        "linkImg": "https://cdn.tgdd.vn/Products/Images/8781/228329/bhx/ba-roi-heo-khay-500g-202111262046493617_300x300.jpg",
        "descriptions": "1  Hương vị cola sảng khoái, thơm lừng hoà quyện trong miếng kẹo mềm dẻo, kích thích mọi giác quan.",
        "price": 100000,
        "rating": 4,
        "reviews": 7,
        "lsp": "lsp001",
        "updatedAt": "2022-07-07T09:50:45.139Z",
        "storeId": "STORE0",
        "storeName": "Cua Hang Bach Hoa Xanh"
    },
    {
        "_id": "62c4f9bbd9e6be98efed3167",
        "sold": 30,
        "rest": 50,
        "discount": 21,
        "NSX": "2022-04-05T14:38:37.445Z",
        "HSD": "2023-09-02T13:22:49.965Z",
        "id": "sp002",
        "name": "Thịt heo xay nhuyễn G khay 300g",
        "linkImg": "https://cdn.tgdd.vn/Products/Images/8781/245247/bhx/thit-heo-xay-nhap-khau-tam-uop-bach-hoa-xanh-tui-250g-202107081024096978_300x300.jpeg",
        "descriptions": "2  Hương vị cola sảng khoái, thơm lừng hoà quyện trong miếng kẹo mềm dẻo, kích thích mọi giác quan.",
        "price": 52000,
        "rating": 5,
        "reviews": 7,
        "lsp": "lsp001",
        "storeId": "STORE1",
        "updatedAt": "2022-07-07T09:50:45.184Z",
        "storeName": "Cua Hang Family Mark"
    },
    {
        "_id": "62c4f9bbd9e6be98efed3168",
        "sold": 40,
        "rest": 50,
        "discount": 9,
        "NSX": "2022-01-04T07:12:07.896Z",
        "HSD": "2023-07-09T04:10:05.920Z",
        "id": "sp003",
        "name": "Ba chỉ bò Úc tươi Pacow khay 250g",
        "linkImg": "https://cdn.tgdd.vn/Products/Images/8139/223384/bhx/thit-ba-chi-bo-uc-pacow-khay-250g-202112031540589978_300x300.jpg",
        "descriptions": "3  Hương vị cola sảng khoái, thơm lừng hoà quyện trong miếng kẹo mềm dẻo, kích thích mọi giác quan.",
        "price": 69000,
        "rating": 4,
        "reviews": 7,
        "lsp": "lsp001",
        "storeId": "STORE2",
        "updatedAt": "2022-07-07T09:50:45.232Z",
        "storeName": "Cua Hang Tap Hoa"
    }
];

const Image = style.img`
    width: 50px;
`

export default function StoreTable() {

    const EditButton = useRef(null);
    const HandleClick = () => {
        EditButton.current.click();
    }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"100px"}></StyledTableCell>
            <StyledTableCell align="left">Tên</StyledTableCell>
            <StyledTableCell align="left">Đã bán</StyledTableCell>
            <StyledTableCell align="left">Còn lại</StyledTableCell>
            <StyledTableCell align="left">Giá</StyledTableCell>
            <StyledTableCell align="left">Chỉnh sửa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow onClick={HandleClick} key={row.name}>
              <StyledTableCell component="th" scope="row">
                <Image src={row.linkImg} alt='product image'/>
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.sold}</StyledTableCell>
              <StyledTableCell align="left">{row.rest}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left"><EditProduct ref={EditButton}></EditProduct></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
