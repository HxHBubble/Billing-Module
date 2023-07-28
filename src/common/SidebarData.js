import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
	{
		title: 'Beginning',
		path: '/',
		icon: <AiIcons.AiFillHome />,
		cName: 'nav-text'
	},
	{
		title: 'Products',
		path: '/products',
		icon: <FaIcons.FaCartPlus />,
		cName: 'nav-text'
	},
	{
		title: 'Categories',
		path: '/categories',
		icon: <FaIcons.FaBuffer />,
		cName: 'nav-text'
	},
	{
		title: 'Clients',
		path: '/clients',
		icon: <FaIcons.FaUserAlt />,
		cName: 'nav-text'
	},
	{
		title: 'Bills',
		path: '/invoices',
		icon: <IoIcons.IoIosPaper />,
		cName: 'nav-text'
	}
];