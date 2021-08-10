import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from './MobileTable.module.css';

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell className={styles.cellIcon}>
          <span className={styles.cellIconContent}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {row.vendor}
          </span>
        </TableCell>
        <TableCell>{row.tariff}</TableCell>
        <TableCell>{row.summary.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Авто</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.car}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Предоплата</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.prepay}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Км вкл.</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.kmInc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Время вкл.</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.timeInc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Км овер</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.kmOver}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' className={styles.miniTableCell}>Время овер</TableCell>
                    <TableCell className={styles.miniTableCell}>{row.timeOver}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function MobileTable({ rows }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Служба</TableCell>
            <TableCell>Тариф</TableCell>
            <TableCell>Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
