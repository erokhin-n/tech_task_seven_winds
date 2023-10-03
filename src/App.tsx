import React from 'react';
import './App.css';
import Table from './table/Table';
import { Grid } from '@mui/material';
import Header from './EmptyComponents/Header';
import { SideBar } from './EmptyComponents/SideBar';

function App() {
	return (
		<Grid container>
			<Grid item md={12}><Header /></Grid>
			<Grid item md={2}><SideBar /></Grid>
			<Grid item md={10}>
				<Table />
			</Grid>
			
		</Grid> 
	);
}

export default App;
