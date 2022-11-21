import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.component';
import Input from '../components/inputs/Input.component';

import { getFolders, createFolder } from '../axios/folder.axios';

const Folder = () => {
	const navigate = useNavigate();

	const { user } = useSelector((state) => ({ ...state }));

	const [folders, setFolders] = useState([]);
	const [isCreateFolderOpened, setIsCreateFolderOpened] = useState(false);
	const [folderName, setFolderName] = useState('');

	const fetchFolders = async () => {
		await getFolders()
			.then((res) => {
				console.log(res.data);
				setFolders(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchFolders();
	}, []);

	return (
		<div className='w-screen flex items-center flex-col bg-[#eeeeef] min-h-screen'>
			<Navbar />
			<div className='max-w-5xl w-full px-6'>
				<div className='flex items-center justify-between mt-3 px-3'>
					<h1 className='font-semibold text-4xl'>Folders</h1>
					{user.role === 'admin' && (
						<button
							className='bg-[#285fdd] text-white p-2 rounded shadow-lg my-3'
							onClick={() => setIsCreateFolderOpened(!isCreateFolderOpened)}
						>
							CREATE NEW FOLDER
						</button>
					)}
				</div>
				<div className='grid md:grid-cols-3 sm:grid-cols-2'>
					{folders.length > 0 ? (
						folders.map((folder, index) => {
							return (
								<div
									key={index}
									className='bg-white p-5 inline-block m-3 h-28 shadow-lg rounded cursor-pointer'
									onClick={()=>navigate('/' + folder.id_folder)}
								>
									<b>Name - </b>
									{folder.name}
									<br />
									<b>Email - </b>
									{folder.name + '@randm.com'}
									<br />
									<b>Password - </b>
									{folder.name}
									<br />
								</div>
							);
						})
					) : (
						<div>No folders found</div>
					)}
				</div>
				{isCreateFolderOpened && (
					<div
						className='w-screen h-full absolute z-10 top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'
						onClick={() => setIsCreateFolderOpened(false)}
					>
						<div
							className='bg-[#eeeeef] p-9 rounded'
							onClick={(e) => e.stopPropagation()}
						>
							<Input
								field={folderName}
								setField={setFolderName}
								type='text'
								fieldName='Folder name'
								className='bg-transparent mt-2 mb-1'
								placeholder='Enter Folder Name'
							/>
							<button
								className='bg-[#285fdd] text-white p-2 rounded shadow-lg my-2 w-full'
								onClick={() =>
									folderName.length > 3 &&
									createFolder(folderName)
										.then(async (res) => await fetchFolders())
										.catch((err) => {
											console.log(err);
										})
								}
							>
								CREATE FOLDER
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Folder;
